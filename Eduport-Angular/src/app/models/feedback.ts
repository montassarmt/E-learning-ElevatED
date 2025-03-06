export interface Feedback {
    feedbackId?: number; // Optionnel pour la création
    comments: string;
    rating: number;
    feedbackType: 'TEXT' | 'AUDIO';
    audioFilePath?: string; // Optionnel si feedbackType est TEXT
    userId: number;
    user?: {
        name: string;
      }; // ID de l'utilisateur associé
  }