from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.convert import router as convert_router

app = FastAPI()


origins = [
    "http://localhost:3000",
    "https://toolspot.netlify.app",
]


# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)


app.include_router(convert_router,prefix="/api")
