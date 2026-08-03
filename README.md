# MOBIFIX

Professional smartphone repair storefront — FastAPI backend serving HTML, CSS, and JS.

## Stack

- **Backend:** FastAPI + Pydantic
- **Frontend:** HTML / CSS / Vanilla JS (served by FastAPI)
- **Design:** Technical Minimalism — dark charcoal, brand crimson (`#AA0909`), Montserrat / Inter / Space Grotesk

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Project layout

```
app/
  main.py           # FastAPI app — serves templates + mounts /static
  api/routes.py     # REST API
  core/config.py    # Settings (phone, WhatsApp, address…)
  data/store.py     # Services, accessories, reviews + in-memory bookings
  models/schemas.py # Pydantic models
templates/
  index.html
static/
  css/styles.css
  js/main.js
  images/favicon.svg
```

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/health` | Health check |
| `GET`  | `/api/store` | Workshop info |
| `GET`  | `/api/services` | Repair catalog |
| `GET`  | `/api/accessories` | Accessory catalog |
| `GET`  | `/api/reviews` | Customer reviews |
| `POST` | `/api/bookings` | Create repair booking |
| `GET`  | `/api/bookings/{id}` | Fetch booking by id |
| `POST` | `/api/contact` | Contact message |

### Book a repair

```bash
curl -X POST http://127.0.0.1:8000/api/bookings \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Arjun Kapoor",
    "phone": "9876543210",
    "device": "iPhone 14 Pro",
    "service_id": "display",
    "preferred_slot": "Today 4 PM"
  }'
```

## Themes

The storefront supports **dark** and **light** modes. Preference is saved in `localStorage` (`mobifix-theme`) and defaults to the system color scheme.

## Pages

| Path | Description |
|------|-------------|
| `/` | Home — hero + section teasers |
| `/services` | Full repair catalog |
| `/gallery` | Workshop photo gallery |
| `/accessories` | Accessories shop |
| `/reviews` | Testimonials bento + write review |
| `/about` | About Us — workshop map & hours |

## Photos

Local SVG placeholders live in `static/images/` (hero, accessories, workshop map, gallery). Replace them with your own JPG/PNG assets and update paths in `templates/index.html` and `app/data/store.py`.

## Configuration

Optional `.env` overrides (see `app/core/config.py`):

```
PHONE_DISPLAY=+91 9876543210
WHATSAPP_NUMBER=919876543210
EMAIL=kothamasuyathinivas@gmail.com
ADDRESS=123 Tech Avenue, Electronic City, Bangalore, KA 560100
```
