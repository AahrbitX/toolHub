from PIL import Image
import io
from fastapi import UploadFile


async def convert_jpg_to_png(file:UploadFile):
    image =Image.open(file.file)
    buffer= io.BytesIO()
    image.save(buffer,format ="PNG")
    buffer.seek(0)
    return buffer

