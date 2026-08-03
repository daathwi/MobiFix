from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "SS Mobifix"
    app_tagline: str = "Phone Repairing Unlocking Original Accessories"
    owner_name: str = "K. Yathinivas"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000

    whatsapp_number: str = "919292353522"
    phone_display: str = "9292 3535 22"
    email: str = "kothamasuyathinivas@gmail.com"
    address: str = (
        "Dr.no. 26-27-63, Opp. Hotel Ilapuram Main Gate, "
        "Gandhi Nagar, Vijayawada - 520003"
    )
    maps_url: str = (
        "https://www.google.com/maps/search/?api=1&query="
        "Hotel+Ilapuram+Gandhi+Nagar+Vijayawada+520003"
    )

    static_dir: Path = BASE_DIR / "static"
    templates_dir: Path = BASE_DIR / "templates"


settings = Settings()
