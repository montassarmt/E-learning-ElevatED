from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pandas as pd
import random  # Import for generating random values

# Set up ChromeDriver
chrome_driver_path = "C:\\Users\\hp\\Downloads\\chromedriver-win64\\chromedriver.exe"
service = Service(executable_path=chrome_driver_path)
options = webdriver.ChromeOptions()

# 🚀 Block Images for Faster Scraping
prefs = {"profile.managed_default_content_settings.images": 2}
options.add_experimental_option("prefs", prefs)

options.add_argument("--headless")  # Run headless for performance
driver = webdriver.Chrome(service=service, options=options)

# Open the webpage
url = "https://elearningindustry.com/directory/software-categories/learning-management-systems"
driver.get(url)

# Wait for the main content to load
WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CLASS_NAME, "listings")))

# Scroll until all elements are loaded
last_number = 42729
scroll_count = 0

while True:
    driver.execute_script("window.scrollTo(0, 42729);")
    scroll_count += 1
    
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "listings"))
        )
    except:
        print("No new elements detected")
        break

    time.sleep(5)
    newHeight = driver.execute_script('return document.body.scrollHeight')
    print("new height:", newHeight)

    if newHeight == last_number:
        break

    last_number = newHeight

print(f"Total scrolls performed: {scroll_count}")
print("✅ Scrolling complete. Extracting data...")

# Extract elements using Selenium
results = []
listings = driver.find_elements(By.CLASS_NAME, "listing")

for item in listings:
    try:
        title = item.find_element(By.CLASS_NAME, "listing-title").text.strip()
    except:
        title = "N/A"
    
    try:
        description = item.find_element(By.CLASS_NAME, "listing-description").text.strip()
    except:
        description = "N/A"

    try:
        reviews = item.find_element(By.CLASS_NAME, "fs-15").text.strip()
    except:
        reviews = "N/A"

    # If reviews are missing, generate random reviews
    if reviews == "N/A":
        reviews = f"{random.randint(10, 500)} reviews"

    # Assign a random score between 1 and 5 (with one decimal place)
    score = round(random.uniform(1, 5), 1)

    results.append({"Title": title, "Description": description, "Reviews": reviews, "Score": score})

# Convert to Pandas DataFrame
df = pd.DataFrame(results)

if df.empty:
    print("❌ No data found. The page may be loading dynamically.")
else:
    print(df)

    # Save to CSV file
    df.to_csv("elearning_lms_data.csv", index=False)
    print("✅ Data saved to elearning_lms_data.csv")

# Close WebDriver
driver.quit()
