#----RZECZPOSPOLITA----
url = "https://www.rp.pl"
response = requests.get(url)
text = response.text
data = BeautifulSoup(text,'html.parser')
containers = data.find_all('a', class_="contentLink")
temp = {}
for container in containers:
    if container.get('href') not in temp.keys():
        temp[container.get('href')] = {}
    if container.img:
        #print("img",container.img)
        if container.img.get('data-src') and container.img.get('data-src').startswith("https"):
            temp[container.get('href')]['img']=container.img.get('data-src')
        else:
            temp[container.get('href')]['img'] = container.img.get('src')
    elif container.h3:
        #print("title",container.h3.get_text())
        temp[container.get('href')]['title'] = container.h3.get_text(strip=True)