from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.convert import router as convert_router

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(convert_router,prefix="/api")
