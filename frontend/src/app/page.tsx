'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const pos = useRef({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    pos.current.dragging = true;
    pos.current.offsetX = e.clientX - pos.current.x;
    pos.current.offsetY = e.clientY - pos.current.y;
    if (imgRef.current) imgRef.current.style.cursor = "grabbing";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    pos.current.dragging = true;
    pos.current.offsetX = touch.clientX - pos.current.x;
    pos.current.offsetY = touch.clientY - pos.current.y;
    if (imgRef.current) imgRef.current.style.cursor = "grabbing";
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!pos.current.dragging) return;
    pos.current.x = e.clientX - pos.current.offsetX;
    pos.current.y = e.clientY - pos.current.offsetY;
    updatePosition();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!pos.current.dragging) return;
    const touch = e.touches[0];
    pos.current.x = touch.clientX - pos.current.offsetX;
    pos.current.y = touch.clientY - pos.current.offsetY;
    updatePosition();
  };

  const handleMouseUp = () => {
    pos.current.dragging = false;
    if (imgRef.current) imgRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    pos.current.dragging = false;
    if (imgRef.current) imgRef.current.style.cursor = "grab";
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

   const updatePosition = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      imgRef.current.style.transition = "none";
    }
  };
  useEffect(() => {
  const testCORS = async () => {
    try {
      const res = await fetch("https://toolhub-1.onrender.com/api/convert/test-cors", {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("CORS test failed");

      const data = await res.json();
      console.log("CORS test successful:", data);
    } catch (error) {
      console.error("CORS test error:", error);
    }
  };

  testCORS();
}, []);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setImageURL(null);
    setDownloadReady(false);
    pos.current.x = 0;
    pos.current.y = 0;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://toolhub-1.onrender.com/api/convert/jpg-to-png", {
        method: "POST",
        body: formData,

        credentials: "omit",
	mode: "cors",
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageURL(url);
      setDownloadReady(true);

      setTimeout(() => {
        if (imgRef.current) {
          imgRef.current.style.transform = "translate(0, 0)";
          imgRef.current.style.transition = "transform 0.3s ease";
          imgRef.current.style.cursor = "grab";
        }
      }, 100);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageURL) return;
    const link = document.createElement("a");
    link.href = imageURL;
    link.setAttribute("download", "converted.png");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900 text-white px-6 md:px-20 py-12 font-sans select-none transition-all duration-300">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div className="text-xl font-bold cursor-pointer hover:text-purple-400 transition">Toolhub</div>
        <nav className="space-x-8 hidden md:flex text-sm font-medium text-gray-300"></nav>
        <div className="space-x-4">
          <button className="text-gray-400 hover:text-white text-sm transition">Login</button>
          <button className="border border-purple-500 text-purple-400 rounded-full px-5 py-2 text-sm hover:bg-purple-600 hover:text-white transition duration-300">
            Get Started
          </button>
        </div>
      </header>

      <main className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          <span className="text-orange-400">AI Powered</span>
          <br /> JPG to PNG Converter
        </h1>

        <p className="text-gray-400 mb-10 text-base sm:text-lg">
          Powered by <span className="text-orange-400 font-semibold">Aahrbitx</span>
        </p>

        {/* File input */}
        <label className="block w-full mb-8 cursor-pointer border-2 border-dashed border-gray-400 py-8 px-4 rounded-xl bg-cyan-900/10 hover:bg-cyan-900/30 transition-all duration-300">
          <span className="block text-gray-300 text-lg font-semibold mb-2">Upload JPEG File</span>
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] ?? null;
              setFile(selectedFile);
              setImageURL(null);
              setDownloadReady(false);
              pos.current.x = 0;
              pos.current.y = 0;
            }}
            className="hidden"
          />
        </label>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className={`w-full py-4 rounded-full font-bold text-lg mb-10 uppercase tracking-wide transition-all duration-300
            ${
              file && !loading
                ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 shadow-[0_0_18px_rgba(0,255,255,0.6)]"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
            text-white
          `}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {/* Preview */}
        {imageURL && (
          <div className="mb-10 relative h-[300px]">
            <h3 className="text-xl font-semibold mb-4 text-purple-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
              Preview (drag me):
            </h3>

            <Image
              src={imageURL}
              alt="Converted PNG"
              ref={imgRef}
              width={400}
              height={300}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="absolute cursor-grab rounded-xl border-4 border-cyan-500 shadow-[0_0_20px_rgb(0,255,255)] max-w-full max-h-[280px] select-none"
              style={{ userSelect: "none", touchAction: "none", transition: "transform 0.3s ease" }}
            />
          </div>
        )}

        {/* Download button */}
        {downloadReady && (
          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-full font-bold text-lg uppercase bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-[0_0_18px_rgba(0,255,0,0.6)] text-white transition duration-300"
          >
            Download PNG
          </button>
        )}
      </main>
    </div>
  );
}

