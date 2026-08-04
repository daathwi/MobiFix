from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "SS Mobifix"
    app_tagline: str = "Phone repair in Vijayawada"
    owner_name: str = "K. Yathinivas"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000

    whatsapp_number: str = "919292353522"
    phone_display: str = "9292 3535 22"
    email: str = "kothamasuyathinivas@gmail.com"
    address: str = "Mobifix, Governorpet, Vijayawada, Andhra Pradesh"
    maps_url: str = (
        "https://www.google.com/maps/place/Mobifix-2/@16.5122646,80.6296066,18z/"
        "data=!4m10!1m2!2m1!1sMobifix!3m6!1s0x3a35f100716d9023:0xe7f796d8ce823f7"
        "!8m2!3d16.5122646!4d80.6296066!15sCgdNb2JpZml4"
        "kgEYbW9iaWxlX3Bob25lX3JlcGFpcl9zaG9w4AEA!16s%2Fg%2F11ybykfbh3"
    )
    maps_embed_url: str = (
        "https://www.google.com/maps?q=16.5122646,80.6296066&z=18&output=embed"
    )

    static_dir: Path = BASE_DIR / "static"
    templates_dir: Path = BASE_DIR / "templates"


settings = Settings()
