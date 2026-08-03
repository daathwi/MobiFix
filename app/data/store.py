"""In-memory store data for MobiFix."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from app.core.config import settings
from app.models.schemas import (
    Accessory,
    BookingCreate,
    BookingResponse,
    BookingStatus,
    ContactCreate,
    ContactResponse,
    Review,
    ReviewCreate,
    ReviewStats,
    Service,
    StoreInfo,
)

SERVICES: list[Service] = [
    Service(
        id="display",
        name="Broken Display",
        icon="screenshot",
        price_label="Starts from",
        price_from=1199,
        time_label="30 Mins",
        description="OEM-grade screen assembly with pixel-perfect calibration.",
        image_url="/static/images/services/display.jpg",
    ),
    Service(
        id="unlocking",
        name="Phone Unlocking",
        icon="lock_open",
        price_label="Starts from",
        price_from=299,
        time_label="30 Mins",
        description="Network unlock, pattern/PIN recovery, and account unlock support.",
        image_url="/static/images/services/face-id.jpg",
    ),
    Service(
        id="water-damage",
        name="Water Damage",
        icon="water_drop",
        price_label="Starts from",
        price_from=499,
        time_label="2-24 Hrs",
        description="Ultrasonic cleaning and corrosion recovery for liquid damage.",
        image_url="/static/images/services/water-damage.jpg",
    ),
    Service(
        id="battery",
        name="Battery Replacement",
        icon="battery_charging_full",
        price_label="Starts from",
        price_from=899,
        time_label="15 Mins",
        description="Genuine battery replacement with health diagnostics.",
        image_url="/static/images/services/battery.jpg",
    ),
    Service(
        id="no-power",
        name="No Power",
        icon="bolt",
        price_label="Starts from",
        price_from=199,
        time_label="30 Mins",
        description="Boot failures, charging port, power IC — we bring dead phones back.",
        image_url="/static/images/services/charging.jpg",
    ),
    Service(
        id="mic-speaker",
        name="No Mic / Speaker",
        icon="mic",
        price_label="Starts from",
        price_from=399,
        time_label="20 Mins",
        description="Microphone, earpiece, and loudspeaker diagnostics and replacement.",
        image_url="/static/images/services/speaker.jpg",
    ),
    Service(
        id="softwares",
        name="Software Update",
        icon="terminal",
        price_label="Starts from",
        price_from=399,
        time_label="30 Mins",
        description="Flashing, FRP unlock, OS update, and software recovery (Apple & Android).",
        image_url="/static/images/services/camera.jpg",
    ),
    Service(
        id="motherboard",
        name="Motherboard Works",
        icon="memory",
        price_label="Starts from",
        price_from=999,
        time_label="2-48 Hrs",
        description="Chip-level microsoldering and motherboard diagnostics.",
        image_url="/static/images/services/more.jpg",
    ),
]

ACCESSORIES: list[Accessory] = [
    Accessory(
        id="leather-case",
        name="Signature Leather Cases",
        description="Hand-crafted genuine leather for the ultimate feel and protection.",
        price=2499,
        image_url="/static/images/accessories/leather.jpg",
        category="protection",
    ),
    Accessory(
        id="gan-charger",
        name="Ultra Fast Chargers",
        description="65W Power Delivery to get your device to 100% in no time.",
        price=1999,
        image_url="/static/images/accessories/charger.jpg",
        category="power",
    ),
    Accessory(
        id="braided-cable",
        name="Braided USB-C Cables",
        description="Military-grade braided cables that survive daily chaos.",
        price=699,
        image_url="/static/images/accessories/cable.jpg",
        category="power",
    ),
    Accessory(
        id="earbuds",
        name="Wireless Earbuds",
        description="Clean sound, solid battery, synced with your repaired device.",
        price=2999,
        image_url="/static/images/accessories/earbuds.jpg",
        category="audio",
    ),
]

REVIEWS: list[Review] = [
    Review(
        id="r1",
        name="Venkata Sai Reddy",
        initials="VR",
        device="iPhone 14 Pro · Vijayawada",
        rating=5,
        headline="Board repair when three shops in Vijayawada said throw it.",
        text=(
            "My MacBook logic board failed and everyone said buy a new one. "
            "SS Mobifix diagnosed a blown capacitor and fixed it same day. "
            "Clear pricing — exactly what Andhra customers need."
        ),
        category="micro-soldering",
        tags=["Micro-soldering", "Board Repair"],
        verified=True,
        featured=True,
        layout="featured",
        avatar_url="/static/images/reviews/avatar-1.jpg",
        date_label="February 12, 2024",
    ),
    Review(
        id="r2",
        name="Anusha Chowdary",
        initials="AC",
        device="iPhone 14 Pro · Guntur",
        rating=5,
        headline="Display starts from ₹1199 — screen looked original in 20 mins.",
        text=(
            "Came from Guntur for a cracked screen. They fitted it while I waited. "
            "Touch and colours are perfect. Honest ‘starts from’ pricing."
        ),
        category="screen",
        tags=["Screen Repairs"],
        layout="vertical",
        avatar_url="/static/images/reviews/avatar-2.jpg",
    ),
    Review(
        id="r3",
        name="Ramesh Naidu",
        initials="RN",
        device="Pixel 7 · Visakhapatnam",
        rating=5,
        text="Battery starts from ₹899 and mine was done clean. All-day backup again. From Vizag — worth the visit.",
        category="battery",
        tags=["Battery"],
        layout="compact",
        icon="battery_charging_full",
        avatar_url="/static/images/reviews/avatar-3.jpg",
    ),
    Review(
        id="r4",
        name="Sravani Devi",
        initials="SD",
        device="Samsung S23 Ultra · Tirupati",
        rating=4,
        text="Diagnostic was open and detailed. Charging port starts from ₹199 — fixed in minutes. Solid shop.",
        category="screen",
        tags=["Diagnostics"],
        layout="compact",
        icon="phone_android",
        avatar_url="/static/images/reviews/avatar-4.jpg",
    ),
    Review(
        id="r5",
        name="Bhaskar Rao",
        initials="BR",
        device="iPhone 15 · Nellore",
        rating=5,
        text="Quick WhatsApp updates throughout. Friendly Telugu support and clean work. Will send family here.",
        category="accessories",
        tags=["Support"],
        layout="live",
        icon="support_agent",
        live=True,
        avatar_url="/static/images/reviews/avatar-5.jpg",
    ),
    Review(
        id="r6",
        name="Lakshmi Prasanna",
        initials="LP",
        device="iPhone 13 · Kakinada",
        rating=5,
        text="Fastest screen swap in Kakinada area for me. Looks OEM, no lag. Highly recommend SS Mobifix.",
        category="screen",
        tags=["Screen Repairs"],
        layout="compact",
        icon="screenshot",
    ),
    Review(
        id="r7",
        name="Sai Teja",
        initials="ST",
        device="Redmi Note 12 · Rajahmundry",
        rating=5,
        text="Battery health finally made sense again. Transparent bill — starts from price matched what they said.",
        category="battery",
        tags=["Battery"],
        layout="compact",
        icon="battery_charging_full",
    ),
    Review(
        id="r8",
        name="Pavani Reddy",
        initials="PR",
        device="Vivo V29 · Ongole",
        rating=5,
        text="Water damage save when others gave up. Real board-level skill. Proud AP tech shop energy.",
        category="micro-soldering",
        tags=["Board Repair"],
        layout="compact",
        icon="water_drop",
    ),
    Review(
        id="r9",
        name="Kartikeya Varma",
        initials="KV",
        device="OnePlus 12 · Amaravati",
        rating=5,
        text="Software issue + FRP unlock handled patiently. Phone boots clean. Clear explanation in Telugu.",
        category="micro-soldering",
        tags=["Softwares"],
        layout="compact",
        icon="terminal",
    ),
    Review(
        id="r10",
        name="Divya Sri",
        initials="DS",
        device="iPhone 13 · Machilipatnam",
        rating=5,
        text="Bought a case and charger after the repair. Quality matches the service. Will come back from Machilipatnam anytime.",
        category="accessories",
        tags=["Accessories"],
        layout="compact",
        icon="shopping_bag",
    ),
]

BOOKINGS: list[BookingResponse] = []
CONTACTS: list[ContactResponse] = []
USER_REVIEWS: list[Review] = []


def get_store_info() -> StoreInfo:
    return StoreInfo(
        name=settings.app_name,
        phone=settings.phone_display,
        whatsapp=settings.whatsapp_number,
        email=settings.email,
        address=settings.address,
        maps_url=settings.maps_url,
        hours={
            "weekdays": "Monday - Saturday: 10:00 AM - 08:00 PM",
            "sunday": "Sunday: 11:00 AM - 04:00 PM",
        },
        rating=4.8,
        review_count=10000,
        technicians_on_site=True,
    )


def get_services() -> list[Service]:
    return SERVICES


def get_service(service_id: str) -> Service | None:
    return next((s for s in SERVICES if s.id == service_id), None)


def get_accessories() -> list[Accessory]:
    return ACCESSORIES


def all_reviews() -> list[Review]:
    return [*USER_REVIEWS, *REVIEWS]


def get_reviews(category: str | None = None) -> list[Review]:
    reviews = all_reviews()
    if not category or category == "all":
        return reviews
    return [r for r in reviews if r.category == category]


def get_review_stats() -> ReviewStats:
    reviews = all_reviews()
    avg = round(sum(r.rating for r in reviews) / len(reviews), 1) if reviews else 4.8
    return ReviewStats(
        average_rating=avg,
        review_count=len(reviews),
        devices_repaired="12k+",
        success_rate="98%",
        five_star_count="500+",
        average_turnaround="24h",
    )


def create_review(payload: ReviewCreate) -> Review:
    allowed = {"screen", "battery", "micro-soldering", "accessories"}
    category = payload.category if payload.category in allowed else "screen"
    parts = payload.name.split()
    initials = (
        f"{parts[0][0]}{parts[-1][0]}".upper()
        if len(parts) >= 2
        else payload.name[:2].upper()
    )
    review = Review(
        id=f"UR-{uuid4().hex[:8].upper()}",
        name=payload.name,
        initials=initials,
        device=payload.device,
        rating=payload.rating,
        headline=payload.headline,
        text=payload.text,
        category=category,
        tags=[category.replace("-", " ").title()],
        layout="compact",
        icon={
            "screen": "screenshot",
            "battery": "battery_charging_full",
            "micro-soldering": "memory",
            "accessories": "shopping_bag",
        }.get(category, "rate_review"),
        date_label=datetime.now(timezone.utc).strftime("%B %d, %Y"),
        verified=False,
    )
    USER_REVIEWS.insert(0, review)
    return review


def create_booking(payload: BookingCreate) -> BookingResponse:
    service = get_service(payload.service_id)
    if service is None:
        raise ValueError(f"Unknown service: {payload.service_id}")

    booking = BookingResponse(
        id=f"MF-{uuid4().hex[:8].upper()}",
        status=BookingStatus.pending,
        name=payload.name,
        phone=payload.phone,
        email=payload.email,
        device=payload.device,
        service_id=payload.service_id,
        service_name=service.name,
        preferred_slot=payload.preferred_slot,
        notes=payload.notes,
        created_at=datetime.now(timezone.utc),
        message=(
            f"Booking confirmed for {service.name}. "
            f"We'll reach you on {payload.phone} shortly."
        ),
    )
    BOOKINGS.append(booking)
    return booking


def get_booking(booking_id: str) -> BookingResponse | None:
    return next((b for b in BOOKINGS if b.id == booking_id), None)


def create_contact(payload: ContactCreate) -> ContactResponse:
    contact = ContactResponse(
        id=f"CT-{uuid4().hex[:8].upper()}",
        message="Thanks for reaching out. Our team will get back to you within 2 hours.",
        created_at=datetime.now(timezone.utc),
    )
    CONTACTS.append(contact)
    return contact
