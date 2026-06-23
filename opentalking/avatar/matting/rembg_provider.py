from __future__ import annotations

from io import BytesIO

from PIL import Image

from .base import MattingError


class RembgMattingProvider:
    name = "rembg"

    def remove_background(self, image: Image.Image, *, settings: object | None = None) -> Image.Image:
        try:
            from rembg import remove
        except ImportError as exc:
            raise MattingError(
                "rembg is not installed; install the avatar matting extra or choose another provider"
            ) from exc

        input_buffer = BytesIO()
        image.convert("RGBA").save(input_buffer, format="PNG")
        try:
            output = remove(input_buffer.getvalue())
            result = Image.open(BytesIO(output))
            result.load()
        except Exception as exc:  # noqa: BLE001
            raise MattingError(f"rembg failed: {exc}") from exc
        return result.convert("RGBA")
