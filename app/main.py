from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.api.routes import router as api_router
from app.core.config import settings
from app.data.store import get_branches

app = FastAPI(
    title="SS Mobifix",
    description="Phone repairing, unlocking, original accessories — booking & storefront API",
    version="1.0.0",
)

app.include_router(api_router)
app.mount("/static", StaticFiles(directory=settings.static_dir), name="static")

templates = Jinja2Templates(directory=settings.templates_dir)

PAGES = {
    "home": {
        "template": "index.html",
        "page_title": "SS Mobifix | Phone Repair in Vijayawada",
        "page_description": "Phone repair in Vijayawada. Clear starting prices, while-you-wait service, 90-day warranty. WhatsApp SS Mobifix in Governorpet.",
        "app_bar_title": "SS Mobifix",
    },
    "services": {
        "template": "services.html",
        "page_title": "Services | SS Mobifix",
        "page_description": "Screen, battery, charging, unlock and board repairs at SS Mobifix, Governorpet.",
        "app_bar_title": "Services",
    },
    "gallery": {
        "template": "gallery.html",
        "page_title": "Gallery | SS Mobifix",
        "page_description": "Inside the SS Mobifix shop in Governorpet.",
        "app_bar_title": "Gallery",
    },
    "accessories": {
        "template": "accessories.html",
        "page_title": "Shop | SS Mobifix",
        "page_description": "Buy phone cases, chargers, cables and earbuds from SS Mobifix shop in Governorpet. Order on WhatsApp.",
        "app_bar_title": "Shop",
    },
    "reviews": {
        "template": "reviews.html",
        "page_title": "Reviews | SS Mobifix",
        "page_description": "Customer reviews for SS Mobifix repairs.",
        "app_bar_title": "Reviews",
    },
    "about": {
        "template": "about.html",
        "page_title": "About | SS Mobifix",
        "page_description": "Visit SS Mobifix in Governorpet — hours, address, and how to reach us.",
        "app_bar_title": "About",
    },
}


def _page_context(request: Request, active_page: str, **extra: object) -> dict:
    meta = PAGES.get(active_page, PAGES["home"])
    return {
        "request": request,
        "store_name": settings.app_name,
        "phone": settings.phone_display,
        "whatsapp": settings.whatsapp_number,
        "email": settings.email,
        "address": settings.address,
        "maps_url": settings.maps_url,
        "maps_embed_url": settings.maps_embed_url,
        "branches": get_branches(),
        "owner_name": settings.owner_name,
        "tagline": settings.app_tagline,
        "active_page": active_page,
        "page_title": meta["page_title"],
        "page_description": meta["page_description"],
        "app_bar_title": meta.get("app_bar_title", "SS Mobifix"),
        **extra,
    }


def _render(request: Request, active_page: str) -> HTMLResponse:
    meta = PAGES[active_page]
    return templates.TemplateResponse(
        request=request,
        name=meta["template"],
        context=_page_context(request, active_page),
    )


@app.get("/", response_class=HTMLResponse)
async def home(request: Request) -> HTMLResponse:
    return _render(request, "home")


@app.get("/services", response_class=HTMLResponse)
async def services_page(request: Request) -> HTMLResponse:
    return _render(request, "services")

@app.get("/gallery", response_class=HTMLResponse)
async def gallery_page(request: Request) -> HTMLResponse:
    return _render(request, "gallery")


@app.get("/shop", response_class=HTMLResponse)
async def shop_page(request: Request) -> HTMLResponse:
    return _render(request, "accessories")


@app.get("/accessories", include_in_schema=False)
async def accessories_redirect() -> RedirectResponse:
    return RedirectResponse(url="/shop", status_code=301)

@app.get("/reviews", include_in_schema=False)
async def reviews_redirect() -> RedirectResponse:
    return RedirectResponse(url="/#reviews", status_code=302)


@app.get("/about", include_in_schema=False)
async def about_redirect() -> RedirectResponse:
    return RedirectResponse(url="/#location", status_code=302)


@app.get("/contact", include_in_schema=False)
async def contact_redirect() -> RedirectResponse:
    return RedirectResponse(url="/#location", status_code=301)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> FileResponse:
    icon = Path(settings.static_dir) / "images" / "favicon.svg"
    return FileResponse(icon)
