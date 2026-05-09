# 🔐 Secure E2EE Cloud Storage Demo

A lightweight, client-side End-to-End Encrypted (E2EE) file storage prototype built with vanilla JavaScript and the Web Crypto API. This project demonstrates how to build a "Zero-Knowledge" architecture where the server never has access to user data or encryption keys.

## 🌟 Key Features
- **Zero-Knowledge Architecture**: Encryption and decryption happen entirely in the browser. The server only stores scrambled data.
- **Client-Side Encryption**: Uses **AES-GCM** (256-bit) for data and **PBKDF2** for secure key derivation from passwords.
- **No Dependencies**: Built with pure JavaScript (no heavy frameworks), making it fast and easy to understand.
- **Responsive Design**: Fully functional on both desktop and mobile devices.
- **Secure Key Management**: Generates unique identity keys and salts for every user registration.

## 🏗️ How It Works (The Algorithm)
1. **Registration**: User creates a password. The browser derives a **Master Key** using PBKDF2 and a random salt.
2. **Encryption**: When a file is uploaded, it is encrypted locally using the Master Key before leaving the device.
3. **Storage**: Only the encrypted blob (ciphertext) and the salt are sent to the "server" (simulated via LocalStorage for this demo).
4. **Decryption**: Upon login, the Master Key is re-derived from the password. The server sends the blob, and the browser decrypts it locally.

## 🚀 How to Run
Since this is a client-side app, you can run it instantly:
1. **Download**: Clone this repository or download the source files (`index.html`, `crypto.js`, `app.js`).
2. **Run Locally**: 
   - **Desktop**: Open `index.html` in Chrome, Firefox, or Edge.
   - **Mobile**: Use an editor like **Spck Editor** or **Acode** to run the local server, or upload the files to a static host.
3. **Live Demo**: [Insert your GitHub Pages Link here once deployed]

## 🛠️ Tech Stack
- **Language**: JavaScript (ES6+)
- **API**: Web Crypto API (Native browser security)
- **Algorithms**: AES-GCM, PBKDF2, SHA-256
- **Hosting**: GitHub Pages
- **IDE Used**: Spck Editor (Android)

## ⚠️ Important Notes
- **Demo Only**: This project uses `localStorage` to simulate a database. Data will be lost if cache is cleared.
- **Production Ready?**: No. For a real-world application, you would need:
  - A real backend (Firebase, Supabase, or AWS S3).
  - Stronger key derivation (Argon2id via libsodium).
  - File chunking for large uploads.
  - HTTPS enforcement.

## 📜 License
MIT License - Feel free to use this for educational purposes.

---
