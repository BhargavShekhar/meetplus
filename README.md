# MeetPlus: A Full-Stack Real-Time Video Calling App


**MeetPlus** is a high-performance, multi-participant video conferencing application built from the ground up with a scalable, self-hosted architecture. It uses a Next.js frontend, a self-hosted LiveKit server on AWS, and is built within a Turborepo for efficient monorepo management.

**Live Demos:**
* **Frontend (Vercel):** `https.meet.bhargavshekhar.shop`
* **Backend (LiveKit):** `wss://livekit.bhargavshekhar.shop`

---

## 🚀 Key Features

* **Multi-participant rooms:** Real-time video and audio conferencing.
* **Secure by default:** Uses token-based authentication (JWT) to control access to rooms.
* **Scalable SFU Backend:** Built on **LiveKit**, a powerful open-source WebRTC Selective Forwarding Unit (SFU).
* **Recording-Ready:** Includes a self-hosted **LiveKit Egress** service, ready to record and download sessions.
* **Professional Deployment:** A clean separation of concerns, with the frontend on Vercel and the stateful backend on AWS.

## 🏗️ System Architecture

This project is not a simple monolith. It's a distributed system composed of two main parts:

1.  **The Frontend (`web` app):**
    * A **Next.js** application deployed to **Vercel**.
    * It serves the React-based user interface.
    * It includes a secure Next.js API route (`/api/token`) that communicates with the LiveKit backend to securely generate access tokens. **The API secret is never exposed to the client.**

2.  **The Backend (LiveKit Server):**
    * A **LiveKit SFU** server running on an **AWS EC2** instance.
    * This server is fully containerized using **Docker Compose** and manages:
        * **LiveKit:** The main SFU for routing all video/audio.
        * **Caddy:** An automatic reverse proxy that provides free, auto-renewing SSL certificates from Let's Encrypt.
        * **Redis:** An in-memory store for coordinating state.
        * **Egress:** The service for rendering and recording rooms (requires a high-CPU instance to run).
    * All networking is handled by **GoDaddy DNS**, pointing subdomains to Vercel and AWS as needed.

## 🛠️ Tech Stack

This project uses a modern, full-stack, real-time technology set.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Monorepo** | **Turborepo** | Managing the `web` app and shared packages. |
| **Frontend** | **Next.js** / **React** | UI and client-side logic. |
| | **TypeScript** | Type-safe code across the entire stack. |
| **Real-Time Backend**| **LiveKit** | WebRTC Selective Forwarding Unit (SFU). |
| **Backend Deployment**| **AWS EC2** | Hosting the LiveKit Docker containers. |
| | **Docker** / **Docker Compose**| Containerizing and running the backend services. |
| **Frontend Deployment**| **Vercel** | Hosting the Next.js frontend. |
| **Networking** | **GoDaddy** | DNS management for all custom domains. |
| | **Caddy** | Auto-SSL & reverse proxy for the LiveKit server. |
| **Database/Store** | **Redis** | State management for the LiveKit server. |

---

## 🌎 Production Deployment

This project is fully deployed. The infrastructure is set up as follows:

1.  **Frontend (`web`):**
    * Deployed to **Vercel**.
    * Environment variables `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and `NEXT_PUBLIC_LIVEKIT_URL` are set in the Vercel project settings.
    * The `web` app is available at `https://meet.bhargavshekhar.shop`.

2.  **Backend (LiveKit):**
    * Deployed on an **AWS EC2 (t3.micro)** instance.
    * Runs **Docker Compose** to manage `livekit`, `caddy`, `redis`, and `egress` services.
    * The `livekit.yaml` and `docker-compose.yaml` are configured for production (see the `livekit.bhargavshekhar.shop_docker` directory).

3.  **DNS (GoDaddy):**
    * **A Record** for `livekit.bhargavshekhar.shop` points to the EC2 server's Elastic IP.
    * **A Record** for `turn.bhargavshekhar.shop` points to the *same* EC2 Elastic IP.
    * **CNAME Record** for `meet.bhargavshekhar.shop` points to `cname.vercel-dns.com`.

---

## 💻 Running Locally

You can run the entire stack on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [pnpm](https://pnpm.io/) (or `npm`/`yarn`)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Run the LiveKit Backend (Local Dev Mode)

For local development, you don't need the complex production `docker-compose` setup. Just run the simple development server:

```sh
# This command pulls the LiveKit image and runs it in dev mode
docker run -it --rm \
  -p 7880:7880 \
  -p 7881:7881/udp \
  livekit/livekit-server \
  --dev