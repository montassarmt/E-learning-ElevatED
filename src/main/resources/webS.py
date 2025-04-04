from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

# Set path to ChromeDriver
chrome_driver_path = "C:\\Users\\hp\\Downloads\\chromedriver-win64\\chromedriver.exe"  

# Create a Service object for ChromeDriver
service = Service(executable_path=chrome_driver_path)

# Initialize the WebDriver with the Service object
driver = webdriver.Chrome(service=service)

# Open the webpage
url = "https://elearningindustry.com/directory/software-categories/learning-management-systems"
driver.get(url)

# Wait for the element to load completely
WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.CLASS_NAME, "listings"))
)

# Scroll down to trigger JavaScript loading multiple times
scroll_attempts = 20  # You can adjust this number based on how much data you need
for _ in range(scroll_attempts):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)  # Wait for new content to load

# Now parse the page after scrolling and loading all items
soup = BeautifulSoup(driver.page_source, 'html.parser')
data = soup.find('div', class_='listings js-entries')

if data:
    titles = data.find_all('h3', class_='listing-title')
    print([title.text.strip() for title in titles])
else:
    print("Element not found. Page may be dynamically loading data.") 

# Close the driver after scraping
driver.quit()
