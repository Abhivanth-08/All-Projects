import requests
from bs4 import BeautifulSoup
import json


def scrape(url,fs):
    response = requests.get(url)
    if response.status_code == 200:
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.title.text.strip()
        headings = [h.text.strip() for h in soup.find_all('h2')]
        paragraphs = [p.text.strip() for p in soup.find_all('p')]

        data = {
            "title": title,
            "headings": headings,
            "paragraphs": paragraphs
        }

        file_path = 'C:\\Users\\abhiv\\OneDrive\\Desktop\\design studio\\subdomain3\\'+fs+'.json'
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)

        print("Data successfully scraped and saved to", file_path)
    else:
        print("Failed to retrieve the page. Status code:", response.status_code)



def ext_link(ur):
    url = ur
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            if not href.startswith('http'):
                href = requests.compat.urljoin(url, href)
            links.append(href)
        data = {"links": links}
        file_path = 'C:\\Users\\abhiv\\OneDrive\\Desktop\\design studio\\subdomain3\\links.json'
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)

        print("Links successfully scraped and saved to", file_path)
    else:
        print("Failed to retrieve the page. Status code:", response.status_code)
    return links


li1=ext_link("https://kpriet.ac.in")
li=ext_link('https://kpriet.ac.in/aiml')
print(li)
j=0
for i in li:
    if i not in li1:
        try:
            scrape(i,li[j].split("/")[-1])
        except:
            pass
    j+=1
