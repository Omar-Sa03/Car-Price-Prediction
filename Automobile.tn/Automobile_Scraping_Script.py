import time
import re
import csv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.automobile.tn"
START_SEARCH_URL = "https://www.automobile.tn/fr/neuf/recherche"

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
})

def fetch_soup(url: str) -> BeautifulSoup:
    resp = session.get(url, timeout=15)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


# ---------- search listing & pagination ----------

def parse_car_urls(soup: BeautifulSoup) -> set[str]:
    """Model URLs from listing cards: <div class="versions-item"><a href="/fr/neuf/skoda/fabia">...</a>"""
    urls = set()
    for a in soup.select("div.versions-item a"):
        href = a.get("href")
        if not href:
            continue
        urls.add(urljoin(BASE_URL, href))
    return urls


def find_next_page_url(soup: BeautifulSoup, current_url: str) -> str | None:
    """Follow pagination 'next' link (uses ?page=N)."""
    a = soup.select_one("ul.pagination a[rel=next]")
    if a and a.get("href"):
        return urljoin(current_url, a["href"])

    a = soup.select_one("ul.pagination li.next a")
    if a and a.get("href"):
        return urljoin(current_url, a["href"])

    for cand in soup.select("ul.pagination a"):
        text = cand.get_text(strip=True).lower()
        if text.startswith("suiv") and cand.get("href"):
            return urljoin(current_url, cand["href"])

    for cand in soup.select("ul.pagination a"):
        href = cand.get("href") or ""
        if "page=" in href:
            return urljoin(current_url, href)

    return None


def get_all_car_urls(start_url: str) -> list[str]:
    visited_pages: set[str] = set()
    all_urls: set[str] = set()
    current_url = start_url

    while current_url and current_url not in visited_pages:
        print(f"Fetching search page: {current_url}")
        visited_pages.add(current_url)

        soup = fetch_soup(current_url)
        page_urls = parse_car_urls(soup)
        print(f"  Found {len(page_urls)} model URLs on this page.")

        new_urls = page_urls - all_urls
        print(f"  New URLs: {len(new_urls)}")
        all_urls.update(new_urls)

        next_url = find_next_page_url(soup, current_url)
        if not next_url:
            print("No next page link found, stopping pagination.")
            break

        current_url = next_url
        time.sleep(1.0)

    return sorted(all_urls)


# ---------- technical details parsing ----------

def build_specs_dict(soup: BeautifulSoup) -> dict[str, str]:
    """
    Build a dict {label: value} from all <table> blocks inside
    <div class="technical-details" id="specs">.
    """
    specs = {}
    container = soup.select_one("div.technical-details#specs")
    if not container:
        return specs

    for row in container.select("table tbody tr"):
        th = row.select_one("th")
        td = row.select_one("td")
        if not th or not td:
            continue
        label = th.get_text(strip=True)
        value = td.get_text(" ", strip=True)
        specs[label] = value
    return specs


def parse_brand_model_from_url(model_url: str) -> tuple[str, str]:
    """
    From URLs like:
      https://www.automobile.tn/fr/neuf/volkswagen/t-cross
      https://www.automobile.tn/fr/neuf/skoda/fabia
    return ("Volkswagen", "T Cross") or ("Skoda", "Fabia").
    """
    path = urlparse(model_url).path  # ex: /fr/neuf/volkswagen/t-cross
    parts = [p for p in path.split("/") if p]

    try:
        i = parts.index("neuf")
    except ValueError:
        return "", ""

    if len(parts) <= i + 2:
        return "", ""

    brand_slug = parts[i + 1]
    model_slug = parts[i + 2]

    brand = brand_slug.replace("-", " ").title()
    model = model_slug.replace("-", " ").title()

    return brand, model


def parse_price(soup: BeautifulSoup) -> int | None:
    """
    Extract price from version page:
      <div class="version-details">
        <div class="buttons">
          <div>A partir de
            <span>66 980 <span class="suffix">DT</span> <sup>TTC</sup></span>
          </div>
        </div>
    Return integer (e.g. 66980) or None.
    """
    # 1) Main pattern: version-details/buttons
    span = soup.select_one("div.version-details div.buttons div span")
    if span:
        txt = span.get_text(" ", strip=True)
        digits = re.sub(r"[^\d]", "", txt)
        if digits:
            return int(digits)

    # 2) Fallback: old versions table (model pages)
    cell = soup.select_one("div.versions-details table.versions tbody tr td.price")
    if cell:
        txt = cell.get_text(" ", strip=True)
        digits = re.sub(r"[^\d]", "", txt)
        if digits:
            return int(digits)

    return None


def get_first_specs_url(model_url: str) -> str | None:
    """
    From a model page (/fr/neuf/skoda/fabia),
    get the first version's fiche-technique URL (#specs), if any.
    """
    soup = fetch_soup(model_url)
    row = soup.select_one("div#detail_content table.versions tbody tr")
    if not row:
        return None
    a = row.select_one("td.specs a")
    if not a or not a.get("href"):
        return None
    return urljoin(BASE_URL, a["href"])  # ex: /fr/neuf/skoda/fabia/1.0-l-mpi-essence#specs


def extract_int(text: str) -> int | None:
    m = re.search(r"\d+", text or "")
    return int(m.group(0)) if m else None


def parse_car_row(model_url: str) -> dict:
    """
    Parse one model and return:
    Marque, Modèle, Année, Kilométrage, Carburant, Boîte_vitesse,
    Puissance_fiscale, Puissance_din, Nombre_portes, Etat_generale, Prix.
    """
    print(f"Parsing model: {model_url}")

    # 1) Brand/model from URL (always consistent)
    marque, modele = parse_brand_model_from_url(model_url)

    # 2) Decide which page to parse for technical details
    fiche_url = get_first_specs_url(model_url)
    if fiche_url is not None:
        fiche_url = fiche_url.split("#", 1)[0]
        soup = fetch_soup(fiche_url)
    else:
        # no version table: parse directly on model_url
        soup = fetch_soup(model_url)

    specs = build_specs_dict(soup)
    price = parse_price(soup)

    carburant = specs.get("Energie", "")
    pf_text = specs.get("Puissance fiscale", "")
    portes_text = specs.get("Nombre de portes", "")
    puissance_din_text = specs.get("Puissance (ch.din)", "")

    pf = extract_int(pf_text)
    nb_portes = extract_int(portes_text)
    puissance_din = extract_int(puissance_din_text)

    row = {
        "Marque": marque,
        "Modèle": modele,
        "Année": "",
        "Kilométrage": 0,
        "Carburant": carburant,
        "Boîte_vitesse": specs.get("Boîte", ""),
        "Puissance_fiscale": pf,
        "Puissance_din": puissance_din,   # nouveau champ
        "Nombre_portes": nb_portes,
        "Etat_generale": "nouvelle",
        "Prix": price,
    }
    return row


# ---------- main pipeline ----------

def main():
    # 1) Collect all model URLs
    car_urls = get_all_car_urls(START_SEARCH_URL)
    print(f"\nTotal unique model URLs collected: {len(car_urls)}\n")

    # 2) Parse each model
    rows: list[dict] = []
    for i, url in enumerate(car_urls, start=1):
        print(f"[{i}/{len(car_urls)}] {url}")
        try:
            row = parse_car_row(url)
            rows.append(row)
        except Exception as e:
            print(f"  Error on {url}: {e}")
        time.sleep(0.5)

    # 3) Save to CSV
    fieldnames = [
        "Marque",
        "Modèle",
        "Année",
        "Kilométrage",
        "Carburant",
        "Boîte_vitesse",
        "Puissance_fiscale",
        "Puissance_din",      # ajouté ici
        "Nombre_portes",
        "Etat_generale",
        "Prix",
    ]

    with open("automobile_tn_neuf.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    print(f"\nSaved {len(rows)} rows to automobile_tn_neuf.csv")


if __name__ == "__main__":
    main()
