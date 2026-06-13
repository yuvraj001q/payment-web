"use client";

import { useState, useRef } from "react";
import { Download, Copy, Check, Loader2 } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  profileSlug: string;
  businessName: string;
}

export default function QRCodeGenerator({ profileSlug, businessName }: QRCodeGeneratorProps) {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(300);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profileUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${profileSlug}`;

  async function generateQR() {
    setGenerating(true);
    try {
      await QRCode.toCanvas(canvasRef.current!, profileUrl, {
        width: size,
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
      });
    } catch (err) {
      console.error("Failed to generate QR code:", err);
    }
    setGenerating(false);
  }

  function downloadPNG() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${profileSlug}-qr.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  function downloadSVG() {
    QRCode.toString(profileUrl, {
      type: "svg",
      width: size,
      margin: 2,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    }).then((svg) => {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.download = `${profileSlug}-qr.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="glass-card p-8 flex flex-col items-center justify-center">
          <canvas ref={canvasRef} className="rounded-xl" />
          {generating && (
            <div className="mt-4">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="label">Foreground Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="input flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="input flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Size: {size}px</label>
            <input
              type="range"
              min={150}
              max={500}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <button onClick={generateQR} className="btn-primary w-full">
            Generate QR Code
          </button>

          <div className="flex gap-3">
            <button onClick={downloadPNG} className="btn-secondary flex-1">
              <Download className="h-4 w-4" />
              PNG
            </button>
            <button onClick={downloadSVG} className="btn-secondary flex-1">
              <Download className="h-4 w-4" />
              SVG
            </button>
            <button onClick={copyLink} className="btn-secondary flex-1">
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>

          <div className="glass-card p-3">
            <p className="text-xs text-muted-foreground break-all">{profileUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
