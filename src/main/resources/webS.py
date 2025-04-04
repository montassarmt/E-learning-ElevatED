from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pandas as pd

# Set up ChromeDriver
chrome_driver_path = "C:\\Users\\hp\\Downloads\\chromedriver-win64\\chromedriver.exe"
service = Service(executable_path=chrome_driver_path)
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run headless for performance
driver = webdriver.Chrome(service=service, options=options)

# Open the webpage
url = "https://elearningindustry.com/directory/software-categories/learning-management-systems"
driver.get(url)

# Wait for the main content to load
WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CLASS_NAME, "columns")))

# Handle cookie popup if it appears

# Scroll until all elements are loaded
#last_height = driver.execute_script("return document.body.scrollHeight")
last_height=42729

scroll_count = 0
while True:
    driver.execute_script("window.scrollTo(0, 42729);")
    scroll_count += 1
    time.sleep(3)  # Allow time for lazy loading

    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

print("✅ Scrolling complete. Extracting data...")

# Extract elements using Selenium (not BeautifulSoup)
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

    results.append({"Title": title, "Description": description, "Reviews": reviews})

# Convert to Pandas DataFrame
df = pd.DataFrame(results)

if df.empty:
    print("❌ No data found. The page may be loading dynamically.")
else:
    print(df)


# Close WebDriver
driver.quit()
