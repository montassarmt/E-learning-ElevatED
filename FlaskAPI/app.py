from flask import Flask, request, jsonify
import pandas as pd
import joblib
import logging
from sqlalchemy import create_engine, text
import traceback
import numpy as np
from decimal import Decimal

app = Flask(__name__)

# Configuration des logs
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('flask_api.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuration MySQL
DB_URI = "mysql+pymysql://root:@localhost/db_elearning"
engine = create_engine(DB_URI)

# Chargement du modèle et du scaler
try:
    model = joblib.load('model/final_satisfaction_model_v1.pkl')
    scaler = joblib.load('model/scaler.pkl')
    logger.info("Modèle et scaler chargés avec succès")
except Exception as e:
    logger.critical(f"Échec du chargement du modèle ou du scaler: {str(e)}")
    raise

def convert_decimal_to_float(df):
    """Convert Decimal columns to float and clean non-numeric entries."""
    for col in df.columns:
        if df[col].dtype == object:
            # Essayer de convertir toutes les valeurs en float
            df[col] = pd.to_numeric(df[col], errors='coerce')  # 'coerce' remplace les erreurs par NaN
    return df

def get_user_data_from_db(user_id):
    query = text("""
        SELECT 
            session_duration AS SessionDuration,
            sessions_per_week AS SessionsPerWeek,
            course_completion AS CourseCompletion,
            quiz_scores AS QuizScores,
            account_age_days AS AccountAgeDays,
            recent_activity_days AS RecentActivity,
            course_data_science AS Course_DataScience,
            course_web_development AS Course_WebDevelopment
        FROM user_metrics
        WHERE user_id = :user_id
    """)
    try:
        with engine.connect() as connection:
            result = connection.execute(query, {"user_id": user_id})
            rows = result.fetchall()
            columns = result.keys()
            df = pd.DataFrame(rows, columns=columns)
            df = convert_decimal_to_float(df)
        return df
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des données: {str(e)}")
        raise

def handle_outliers(df, numeric_cols):
    """Cap outliers at 95th percentile and ensure float type"""
    for col in numeric_cols:
        if col in df.columns:
            # Ensure column is float type
            df[col] = pd.to_numeric(df[col], errors='coerce').astype(float)
            # Handle outliers
            upper_limit = df[col].quantile(0.95)
            df[col] = np.where(df[col] > upper_limit, upper_limit, df[col])
    return df

@app.route('/predict', methods=['POST'])
def predict():
    try:
        logger.info("Nouvelle requête reçue")

        # Récupération des données JSON envoyées
        data = request.get_json()
        if not data or 'user_id' not in data:
            return jsonify({"error": "Champ 'user_id' manquant"}), 400

        user_id = data['user_id']
        logger.debug(f"UserID reçu: {user_id}")

        # Récupérer les données utilisateur depuis la base de données
        df = get_user_data_from_db(user_id)

        if df.empty:
            logger.warning(f"Aucune donnée trouvée pour userID: {user_id}")
            return jsonify({"error": "Utilisateur non trouvé"}), 404

        logger.debug(f"Données récupérées pour {user_id}: {df.to_dict()}")

        # Define numeric columns for processing
        numeric_cols = ['SessionDuration', 'SessionsPerWeek', 'QuizScores', 
                       'AccountAgeDays', 'RecentActivity']
        
        # Handle outliers and ensure proper numeric types
        df = handle_outliers(df, numeric_cols)

        # Vérification si des NaN ont été introduits après nettoyage
        if df.isnull().any().any():
            logger.warning(f"Des valeurs manquantes détectées pour userID {user_id}")
            df = df.fillna(0)  # Remplacer les NaN par 0, ou d'autres valeurs de ton choix

        # Appliquer la normalisation
        df[numeric_cols] = scaler.transform(df[numeric_cols])

        # Ensure all model expected features are present
        for col in model.feature_names_in_:
            if col not in df.columns:
                df[col] = 0  # Default value for missing columns
        df = df[model.feature_names_in_]  # Reorder columns

        # Prédiction avec le modèle
        prediction = model.predict(df)[0]
        probabilities = model.predict_proba(df)[0]

        logger.info(f"Prédiction réussie pour {user_id}: {prediction}")

        return jsonify({
            "user_id": user_id,
            "predicted_satisfaction": int(prediction),
            "probabilities": {
                "1": float(probabilities[0]),
                "2": float(probabilities[1]),
                "3": float(probabilities[2]),
                "4": float(probabilities[3]),
                "5": float(probabilities[4])
            }
        })

    except Exception as e:
        logger.error(f"Erreur lors de la prédiction pour userID {data.get('user_id', 'inconnu')}: {str(e)}\n{traceback.format_exc()}")
        return jsonify({
            "code": "internal_error",
            "message": "Erreur interne du serveur",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    logger.info("Démarrage de l'API Flask")
    app.run(host='0.0.0.0', port=5000, debug=False)
