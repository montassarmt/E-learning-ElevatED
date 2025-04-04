from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

# Scroll multiple times to trigger lazy loading
scroll_attempts = 20
max_items = 50  # Limit the number of items to scrape
scraped_items = 0  # Track the number of items scraped

last_number = driver.execute_script('return document.body.scrollHeight')
print("initial height : ", last_number)
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(5)  # Allow time for new content to load
    newHeight = driver.execute_script('return document.body.scrollHeight')
    print("new height 1 : ",newHeight)
    if newHeight == last_number:
        print("new height 2: ",newHeight)
        break
    last_number = newHeight
    print("new height final : ", newHeight)

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
