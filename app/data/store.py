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
        description="Genuine leather protection — premium feel, everyday wear.",
        price=2499,
        image_url="/static/images/accessories/leather.jpg",
        category="protection",
    ),
    Accessory(
        id="gan-charger",
        name="Ultra Fast Chargers",
        description="65W Power Delivery — charge to full without waiting around.",
        price=1999,
        image_url="/static/images/accessories/charger.jpg",
        category="power",
    ),
    Accessory(
        id="braided-cable",
        name="Braided USB-C Cables",
        description="Tough braided cable built for daily plug-in and pull-out.",
        price=699,
        image_url="/static/images/accessories/cable.jpg",
        category="power",
    ),
    Accessory(
        id="earbuds",
        name="Wireless Earbuds",
        description="Clean sound and solid battery — pick up with your repair.",
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
        headline=None,
        text=(
            "My iPhone stopped turning on after it fell. Three shops told me the board was gone "
            "and I should buy a new phone. I almost did. A friend pushed me to try SS Mobifix. "
            "They opened it, showed me the fault on the board, said the price first, and brought "
            "it back the same evening. I walked out with my own phone — not a new one."
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
        headline=None,
        text=(
            "The screen cracked on a trip and I didn’t want to leave the phone somewhere overnight. "
            "I drove from Guntur in the morning, WhatsApped them the model from the road, and "
            "walked in around 11. They fitted a new screen while I sat there with chai. In under "
            "half an hour the touch and colours felt like my phone again — then I drove home."
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
        text=(
            "By lunch my Pixel was already begging for a charger. I started carrying a power bank "
            "everywhere and still ran out. Came up from Vizag on a Saturday, waited while they "
            "swapped the battery, and that night I watched a full film without hunting for a plug. "
            "Small thing, but I finally stopped thinking about the battery every hour."
        ),
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
        text=(
            "My S23 Ultra only charged if I held the cable at a weird angle. Half the shops "
            "wanted to open it without explaining anything. Here they put it on the bench, "
            "showed me the loose port, gave a clear price, and fixed it in a few minutes. "
            "No pressure, no mystery bill — just honest work."
        ),
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
        text=(
            "I couldn’t sit in the shop the whole day, so I messaged them from Nellore and left "
            "the phone. They kept updating me on WhatsApp — diagnosis, price, when it would be "
            "ready — all in Telugu, no confusing English. By evening I picked it up feeling like "
            "I’d been talking to a neighbour, not a repair counter. Already told my brother to go."
        ),
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
        text=(
            "I dropped my iPhone 13 on the floor outside a medical shop and the glass spiderwebbed. "
            "I was shaken — photos, UPI, everything was on that phone. Walked into SS Mobifix in "
            "Governorpet, watched them replace the screen, and twenty minutes later I was paying "
            "for medicines again like nothing happened. It still looks and feels like my old phone."
        ),
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
        text=(
            "I’d already been burned once — WhatsApp quoted one price, counter asked for more. "
            "So I was nervous. SS Mobifix sent me the battery quote on WhatsApp, I came from "
            "Rajahmundry, and the bill at the counter was exactly that amount. Phone lasts a "
            "full day now, and I finally trust a repair shop again."
        ),
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
        text=(
            "My Vivo went into a bucket of water for maybe two seconds. Every shop said the "
            "board was finished. I brought it here as a last try, half expecting bad news. "
            "They cleaned it, worked on the board, and called me when it powered on. Seeing "
            "the home screen light up after that — I almost cried in the shop."
        ),
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
        text=(
            "My OnePlus got stuck after a software mess and I couldn’t even get past the lock. "
            "I don’t understand half the tech talk, but they sat with me, explained the FRP "
            "issue in Telugu, fixed it patiently, and showed me it booting clean before I left. "
            "Felt like someone actually cared that I understood what happened."
        ),
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
        text=(
            "Came from Machilipatnam just for a small repair and planned to leave right after. "
            "The work was clean, so I ended up buying a case and charger from them too. On the "
            "bus home the phone felt solid again — and the accessories didn’t feel like cheap "
            "add-ons. I’ll make the trip again whenever something goes wrong."
        ),
        category="accessories",
        tags=["Accessories"],
        layout="compact",
        icon="shopping_bag",
    ),
]

BOOKINGS: list[BookingResponse] = []
CONTACTS: list[ContactResponse] = []
USER_REVIEWS: list[Review] = []

BRANCHES: list[dict[str, str]] = [
    {
        "id": "governorpet",
        "name": "Governorpet",
        "title": "Governorpet, Vijayawada",
        "area": "Governorpet, Vijayawada",
        "address": "Mobifix, Governorpet, Vijayawada, Andhra Pradesh",
        "blurb": "Walk-in counter for while-you-wait screens, batteries, and everyday repairs.",
        "maps_url": (
            "https://www.google.com/maps/place/Mobifix-2/@16.5122646,80.6296066,18z/"
            "data=!4m10!1m2!2m1!1sMobifix!3m6!1s0x3a35f100716d9023:0xe7f796d8ce823f7"
            "!8m2!3d16.5122646!4d80.6296066!15sCgdNb2JpZml4"
            "kgEYbW9iaWxlX3Bob25lX3JlcGFpcl9zaG9w4AEA!16s%2Fg%2F11ybykfbh3"
        ),
        "maps_embed_url": (
            "https://www.google.com/maps?q=16.5122646,80.6296066&z=18&output=embed"
        ),
        "phone": settings.phone_display,
        "hours": "Mon–Sat 10 AM – 8 PM · Sun 11 AM – 4 PM",
    },
    {
        "id": "gandhi-nagar",
        "name": "Gandhi Nagar",
        "title": "Gandhi Nagar, Vijayawada",
        "area": "Opp. Hotel Ilapuram, Gandhi Nagar",
        "address": (
            "Dr.no. 26-27-63, Opp. Hotel Ilapuram Main Gate, "
            "Gandhi Nagar, Vijayawada - 520003"
        ),
        "blurb": "Chip-level service, unlocking, software updates, and original accessories.",
        "maps_url": (
            "https://www.google.com/maps/place/Mobifix/@16.5160111,80.6258098,18z/"
            "data=!4m10!1m2!2m1!1sMobifix!3m6!1s0x3a35efbff66bb4ef:0x3ea29ae7632bcd46"
            "!8m2!3d16.5160111!4d80.6258098!15sCgdNb2JpZml4"
            "kgEUcGhvbmVfcmVwYWlyX3NlcnZpY2XgAQA!16s%2Fg%2F11vsysf274"
        ),
        "maps_embed_url": (
            "https://www.google.com/maps?q=16.5160111,80.6258098&z=18&output=embed"
        ),
        "phone": settings.phone_display,
        "hours": "Mon–Sat 10 AM – 8 PM · Sun 11 AM – 4 PM",
    },
]


def get_branches() -> list[dict[str, str]]:
    return BRANCHES


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
