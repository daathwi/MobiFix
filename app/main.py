from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.api.routes import router as api_router
from app.core.config import settings

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
        "page_title": "SS Mobifix | Phone Repair · Unlock · Accessories",
        "page_description": "SS Mobifix Vijayawada — transparent starts-from pricing, same-day phone repair, unlocking & accessories. Opp. Hotel Ilapuram, Gandhi Nagar.",
    },
    "services": {
        "template": "services.html",
        "page_title": "Services | SS Mobifix",
        "page_description": "Screen, battery, board repair, unlock — SS Mobifix services.",
    },
    "gallery": {
        "template": "gallery.html",
        "page_title": "Gallery | SS Mobifix",
        "page_description": "Inside the SS Mobifix workshop.",
    },
    "accessories": {
        "template": "accessories.html",
        "page_title": "Accessories | SS Mobifix",
        "page_description": "Original accessories from SS Mobifix.",
    },
    "reviews": {
        "template": "reviews.html",
        "page_title": "Reviews | SS Mobifix",
        "page_description": "Real customer reviews for SS Mobifix repairs.",
    },
    "about": {
        "template": "about.html",
        "page_title": "About Us | SS Mobifix",
        "page_description": "About SS Mobifix — workshop, hours, and how to reach us.",
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
        "owner_name": settings.owner_name,
        "tagline": settings.app_tagline,
        "active_page": active_page,
        "page_title": meta["page_title"],
        "page_description": meta["page_description"],
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


@app.get("/accessories", response_class=HTMLResponse)
async def accessories_page(request: Request) -> HTMLResponse:
    return _render(request, "accessories")


@app.get("/reviews", response_class=HTMLResponse)
async def reviews_page(request: Request) -> HTMLResponse:
    return _render(request, "reviews")


@app.get("/about", response_class=HTMLResponse)
async def about_page(request: Request) -> HTMLResponse:
    return _render(request, "about")


@app.get("/contact", include_in_schema=False)
async def contact_redirect() -> RedirectResponse:
    return RedirectResponse(url="/about", status_code=301)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> FileResponse:
    icon = Path(settings.static_dir) / "images" / "favicon.svg"
    return FileResponse(icon)
