"""Quick static checks (no third-party packages) for Part 3 project assets and links.
Usage: python tools/validate_project.py
Browser interactions still need manual testing on the deployed site.
"""
import re
from pathlib import Path
from html.parser import HTMLParser
from xml.etree import ElementTree
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parent.parent
PAGES=['index.html','about.html','projects.html','enquiry.html','contact.html']

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.links=[];self.imgs=[];self.titles=0;self.h1=0;self.descriptions=0
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.append(d['id'])
        if tag=='a' and 'href' in d:self.links.append(d['href'])
        if tag=='img':self.imgs.append(d)
        if tag=='title':self.titles+=1
        if tag=='h1':self.h1+=1
        if tag=='meta' and d.get('name')=='description':self.descriptions+=1

failures=[]
for page in PAGES:
    path=ROOT/page
    if not path.exists():failures.append(f'Missing {page}');continue
    doc=PageParser();doc.feed(path.read_text(encoding='utf-8'))
    if len(set(doc.ids))!=len(doc.ids):failures.append(f'{page}: duplicate IDs')
    if doc.h1!=1:failures.append(f'{page}: requires exactly one H1')
    if doc.titles!=1 or doc.descriptions!=1:failures.append(f'{page}: missing title/description')
    for link in doc.links:
        part=urlsplit(link)
        target=part.path
        if not part.scheme and not part.netloc and target.endswith('.html') and not (ROOT/target).is_file():
            failures.append(f'{page}: broken page link {target}')
    for img in doc.imgs:
        if 'alt' not in img:failures.append(f'{page}: image has no alt text')
        if img.get('src','').startswith('images/') and not (ROOT/img['src']).exists():
            failures.append(f'{page}: missing image {img["src"]}')
    print(f'{page}: {len(doc.ids)} element IDs, {len(doc.links)} links, {len(doc.imgs)} image(s)')
for image in (ROOT/'images').glob('*.svg'):
    try:ElementTree.parse(image)
    except Exception as e:failures.append(f'Invalid SVG {image.name}: {e}')
try:ElementTree.parse(ROOT/'sitemap.xml')
except Exception as e:failures.append(f'Invalid sitemap XML: {e}')
for f in ['programmes.js','script.js','styles.css','README.md','robots.txt','netlify.toml','_headers']:
    if not (ROOT/f).exists():failures.append('Missing '+f)
assert not failures, '\n'.join(failures)
print('Static integrity checks passed. Browser-based interaction and live Netlify forms still require testing.')
