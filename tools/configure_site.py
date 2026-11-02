"""Set the real public website address after deployment for SEO files.
Usage: python tools/configure_site.py https://YOUR-SITE.netlify.app
Only standard library required. Safe to rerun if deployment URL changes.
"""
import sys
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree.ElementTree import Element, SubElement, ElementTree

ROOT = Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'about.html', 'projects.html', 'enquiry.html', 'contact.html']

def run(base):
    base = base.rstrip('/') + '/'
    parsed = urlsplit(base)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.username or parsed.password or any(c.isspace() for c in base):
        raise ValueError('Enter your real public https:// domain, such as https://my-hmu-site.netlify.app')
    root = Element('urlset', {'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'})
    for page in PAGES:
        href = base if page == 'index.html' else base + page
        url = SubElement(root, 'url')
        SubElement(url, 'loc').text = href
        doc = ROOT / page
        html = doc.read_text(encoding='utf-8')
        # Rerunning updates canonical and social page URL rather than duplicating tags.
        import re
        html = re.sub(r'\s*<link rel="canonical"[^>]*>', '', html)
        html = re.sub(r'\s*<meta property="og:url"[^>]*>', '', html)
        html = html.replace('</head>', f'  <link rel="canonical" href="{href}" />\n    <meta property="og:url" content="{href}" />\n  </head>')
        doc.write_text(html, encoding='utf-8')
    ElementTree(root).write(ROOT / 'sitemap.xml', encoding='utf-8', xml_declaration=True)
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n', encoding='utf-8')
    print('SEO URLs configured for:', base)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('Usage: python tools/configure_site.py https://YOUR-REAL-DOMAIN.netlify.app')
    try:
        run(sys.argv[1])
    except ValueError as exc:
        sys.exit(str(exc))
