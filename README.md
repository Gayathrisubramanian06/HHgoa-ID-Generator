# 🌴 Hacker House Goa 2026 - ID Generator

A purely client-side web application built to generate custom, highly stylized digital ID badges for attendees of Hacker House Goa 2026. Users can upload their photo, enter their name and role, and instantly generate a beautifully branded ID card ready to be shared on social media.

👉 **[Live Demo](https://hhgoa-id-generator-puce.vercel.app/)**

## ✨ Features

- **Dynamic Canvas Rendering:** Uses the HTML5 Canvas API to generate a high-res image combining background graphics, custom text, and user-uploaded photos.
- **HEIC Image Support:** Integrated `heic2any` to automatically convert Apple HEIC/HEIF photos to browser-compatible formats on the fly.
- **Auto Background Removal Overlay:** Seamlessly overlays user photos behind a transparent PNG frame cutout for a professional "studio" look.
- **Barcode Generation:** Uses `JsBarcode` to generate a personalized CODE128 barcode based on a unique timestamp ID.
- **One-Click X (Twitter) Sharing:** 
  - **Desktop:** Automatically uploads the generated ID to ImgBB and redirects to the X composer with the image preview natively attached.
  - **Mobile:** Uses the native Web Share API to seamlessly share the image directly to installed apps.
- **Responsive & Premium UI:** Built with Tailwind CSS, featuring glassmorphism, dynamic animations, and dark mode aesthetics.

## 🛠️ Tech Stack

- **Core:** HTML5, Vanilla JavaScript
- **Styling:** Tailwind CSS (via CDN)
- **Libraries:** 
  - [heic2any](https://github.com/alexcorvi/heic2any) (for iOS photo support)
  - [JsBarcode](https://lindell.me/JsBarcode/) (for barcode generation)
- **APIs:** [ImgBB API](https://api.imgbb.com/) (for temporary image hosting during desktop sharing)

## 🚀 Running Locally

Since this is a fully static client-side application without a backend server, you can run it locally with any simple HTTP server.

1. Clone the repository:
   ```bash
   git clone https://github.com/Gayathrisubramanian06/HHgoa-ID-Generator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd HHgoa-ID-Generator
   ```
3. Start a local server (e.g., using `npx serve` or Python):
   ```bash
   npx serve
   # or
   python3 -m http.server 3000
   ```
4. Open your browser and go to `http://localhost:3000`.

## 📦 Deployment

This project is perfectly suited for zero-config deployments on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

1. Connect your GitHub repository to Vercel.
2. Select this project.
3. Leave the build command empty.
4. Click **Deploy**.

> **Note on the ImgBB API Key:** The ImgBB API key in `success.html` is intentionally left hardcoded as it uses a free, non-billing tier meant strictly for anonymous public image uploads to facilitate desktop sharing.

## 📄 License

MIT License
