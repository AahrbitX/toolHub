# ToolHub 🔧

A collection of simple and useful tools like JPG to PNG converter, PDF splitter, QR code generator, and more – powered by FastAPI (backend) and Next.js (frontend).

---

## ⚙️ Features
- JPG to PNG Converter
- PDF to Image Converter
- QR Code Generator
- PDF Splitter
- URL Shortener
- And more...

---

## 🏗️ Tech Stack
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (React)
- **Image Processing**: Pillow
- **PDF Tools**: PyMuPDF, pdf2image
- **QR Code**: qrcode
- **Deployment**: (Vercel / Render / Docker, customize here)

---

## 📁 Project Structure

toolhub/
├── backend/
│ ├── main.py
│ ├── routes/
│ └── services/
├── frontend/
│ └── (Next.js app)
├── .env
├── .gitignore
└── README.md

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/toolhub.git
cd toolhub

```
### 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```


### 3. Setup Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev

```




