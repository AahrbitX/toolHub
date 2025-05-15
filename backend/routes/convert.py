from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse
from services.image_converter import convert_jpg_to_png

router = APIRouter()


@router.post("/convert/jpg-to-png")
async def convert(file: UploadFile = File(...)):
    converted_image = await convert_jpg_to_png(file)
    return StreamingResponse(
        converted_image,
        media_type="image/png"
    )

