# 🚗 DriveFleet - Client Application

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

The frontend interface for **DriveFleet**, a modern, full-stack vehicle booking and fleet management platform. Built for speed and security, this client-side application communicates seamlessly with a decoupled Express backend using mathematically verified **JSON Web Tokens (JWT)** via secure, cross-domain cookies.

---

## 📖 Project Details

**DriveFleet** is a comprehensive peer-to-peer car rental and fleet management solution designed to streamline the vehicle booking process. It empowers users to act as both renters and fleet managers within a single, unified dashboard. 

**For Renters:**
Users can browse a dynamic, real-time inventory of available vehicles, filter by car type, and make instant, secure bookings. A dedicated dashboard allows renters to track their active reservations or cancel bookings when plans change.

**For Fleet Managers (Owners):**
Vehicle owners can easily list their cars on the platform. The application provides a complete CRUD (Create, Read, Update, Delete) interface, allowing owners to upload vehicle images, set daily pricing, update seating capacity, and toggle live availability status based on demand.

The platform is engineered with a strictly decoupled architecture, meaning this Next.js frontend focuses entirely on delivering a lightning-fast, edge-optimized user experience while relying on a separate Express/MongoDB gateway for heavy data processing and JWT security.

---

## ✨ Key Features

* **JWT Stateless Authentication:** Leverages Better Auth's JWT plugin to generate mathematically signed, tamper-proof session tokens.
* **Cross-Domain Security:** Implements `SameSite=none` secure HTTP-only cookies, ensuring JWTs are safely transmitted between the Next.js frontend and the Express backend.
* **Dynamic Fleet Inventory:** Browse real-time vehicle listings retrieved directly from MongoDB.
* **Complete CRUD Dashboard:** Authenticated users can add, update, manage, and delete their own car listings.
* **Transactional Booking System:** Seamlessly reserve vehicles and manage active or cancelled bookings from a private user dashboard.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** Tailwind CSS + DaisyUI
* **Authentication Security:** JSON Web Tokens (JWT)
* **Auth Provider:** [Better Auth](https://better-auth.com/) (Client SDK)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Notifications:** React Hot Toast
* **Deployment:** Vercel
