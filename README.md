# Construction Assistant MVP

This project is a fully functional Minimum Viable Product for a mobile-first construction job site application. It features a custom backend built with Node.js/Express and an SQLite dummy database containing prepopulated construction knowledge, tools, and mock AI interactions. The frontend is built iteratively via React Native (Expo) and styled with high-contrast, worker-friendly aesthetics.

## How It Works
The mobile app communicates with a local backend API which stores realistic dummy construction tips, handles calculator logic if needed, and mimics standard AI response times using specific heuristics.

## How to Run the Project

You will need two terminal windows to run the frontend and backend simultaneously.

### 1. Start the Backend API
1. Open a new terminal.
2. Navigate to the backend folder:
   ```bash
   cd "backend"
   ```
3. Start the server (runs on `localhost:3000`):
   ```bash
   node server.js
   ```

### 2. Start the Mobile Frontend (React Native Expo)
1. Open a second terminal.
2. Navigate to the mobile folder:
   ```bash
   cd "mobile"
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
4. By pressing `w` in the terminal, you can view the app immediately in your web browser. Alternatively, to view it on your phone, download the heavily used **Expo Go** app from your phone's app store and scan the QR code.

> **Note on connectivity:** If testing on a physical mobile device, update `mobile/src/api.js` to change `127.0.0.1` to your computer's local Wi-Fi IP address (e.g. `192.168.1.100`) so your phone can reach the backend. If you press `w` to run it in the web browser on the same PC, `127.0.0.1` works perfectly as-is!

Enjoy the app!
