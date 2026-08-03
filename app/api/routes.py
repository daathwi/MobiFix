from fastapi import APIRouter, HTTPException, Query

from app.data import store
from app.models.schemas import (
    Accessory,
    BookingCreate,
    BookingResponse,
    ContactCreate,
    ContactResponse,
    Review,
    ReviewCreate,
    ReviewStats,
    Service,
    StoreInfo,
)

router = APIRouter(prefix="/api")


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/store", response_model=StoreInfo)
def store_info() -> StoreInfo:
    return store.get_store_info()


@router.get("/services", response_model=list[Service])
def list_services() -> list[Service]:
    return store.get_services()


@router.get("/services/{service_id}", response_model=Service)
def get_service(service_id: str) -> Service:
    service = store.get_service(service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.get("/accessories", response_model=list[Accessory])
def list_accessories() -> list[Accessory]:
    return store.get_accessories()


@router.get("/reviews", response_model=list[Review])
def list_reviews(
    category: str | None = Query(default=None, description="Filter by category"),
) -> list[Review]:
    return store.get_reviews(category)


@router.get("/reviews/stats", response_model=ReviewStats)
def review_stats() -> ReviewStats:
    return store.get_review_stats()


@router.post("/reviews", response_model=Review, status_code=201)
def create_review(payload: ReviewCreate) -> Review:
    return store.create_review(payload)


@router.post("/bookings", response_model=BookingResponse, status_code=201)
def create_booking(payload: BookingCreate) -> BookingResponse:
    try:
        return store.create_booking(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.get("/bookings/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: str) -> BookingResponse:
    booking = store.get_booking(booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/contact", response_model=ContactResponse, status_code=201)
def create_contact(payload: ContactCreate) -> ContactResponse:
    return store.create_contact(payload)
