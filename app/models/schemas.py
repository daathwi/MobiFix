from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


class ReviewCategory(str, Enum):
    all = "all"
    screen = "screen"
    battery = "battery"
    micro_soldering = "micro-soldering"
    accessories = "accessories"


class Service(BaseModel):
    id: str
    name: str
    icon: str
    price_label: str
    price_from: int
    time_label: str
    description: str = ""
    featured: bool = True
    image_url: str = ""


class Accessory(BaseModel):
    id: str
    name: str
    description: str
    price: int
    image_url: str
    category: str


class Review(BaseModel):
    id: str
    name: str
    initials: str
    device: str
    rating: int = Field(ge=1, le=5)
    text: str
    headline: Optional[str] = None
    category: str = "screen"
    tags: list[str] = Field(default_factory=list)
    verified: bool = False
    featured: bool = False
    layout: str = "compact"  # featured | vertical | compact | live
    avatar_url: Optional[str] = None
    icon: Optional[str] = None
    date_label: Optional[str] = None
    live: bool = False


class ReviewCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    device: str = Field(min_length=2, max_length=80)
    category: str = Field(min_length=2, max_length=40)
    rating: int = Field(ge=1, le=5)
    headline: Optional[str] = Field(default=None, max_length=160)
    text: str = Field(min_length=10, max_length=1000)


class ReviewStats(BaseModel):
    average_rating: float
    review_count: int
    devices_repaired: str
    success_rate: str
    five_star_count: str
    average_turnaround: str


class StoreInfo(BaseModel):
    name: str
    phone: str
    whatsapp: str
    email: str
    address: str
    maps_url: str
    hours: dict[str, str]
    rating: float
    review_count: int
    technicians_on_site: bool = True


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=10, max_length=15)
    email: Optional[EmailStr] = None
    device: str = Field(min_length=2, max_length=80)
    service_id: str
    preferred_slot: Optional[str] = None
    notes: Optional[str] = Field(default=None, max_length=500)


class BookingResponse(BaseModel):
    id: str
    status: BookingStatus
    name: str
    phone: str
    email: Optional[str] = None
    device: str
    service_id: str
    service_name: str
    preferred_slot: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    message: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    phone: Optional[str] = None
    message: str = Field(min_length=5, max_length=1000)


class ContactResponse(BaseModel):
    id: str
    message: str
    created_at: datetime
