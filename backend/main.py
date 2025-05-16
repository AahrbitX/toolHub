from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.convert import router as convert_router

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Allow any origin
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # Allow all headers
)

# Add test route to check CORS
@app.get("/api/convert/test-cors")
def test_cors():
    return {"message": "CORS is working"}

# Mount your actual API routes
app.include_router(convert_router, prefix="/api/convert")




