# TidyHands - Professional Cleaning Services

TidyHands is a modern, world-class web application for a professional cleaning service. It features a sleek, minimalist design with a focus on user experience, professional storytelling, and an interactive quotation system.

## Features

- **Modern Aesthetic**: Girly yet professional design using Poppins and Dancing Script fonts with a `#EC4078` (Pink) theme.
- **Storytelling Homepage**: Compelling narrative with local Kisumu-based testimonials (HelpHeal Foundation, PAG Church).
- **Interactive Quotation Form**: Minimalist, card-based selection for service categories, levels, and frequency.
- **Service Showcase**: Detailed pages for Residential, Commercial, Deep Cleaning, and Move In/Out services.
- **Modern Blog**: Clean grid layout for expert cleaning tips and industry news.
- **Responsive Header**: Sleek mobile navigation with a hamburger menu.
- **Full-Stack Setup**: Built with Express.js, EJS templates, and integrated with Directus CMS and Postgres via Docker.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), Vanilla CSS
- **CMS**: Directus (Headless CMS)
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (Optional, for full stack)

### Local Setup (Node.js)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env` file in the root (refer to `.env` example if available or use the provided defaults):
   ```env
   PORT=3000
   NODE_ENV=development
   ```

3. **Run the application**:
   ```bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Docker Setup (Full Stack)

This setup includes the Express app, Directus CMS, and a PostgreSQL database.

1. **Configure environment**:
   Ensure your `.env` file has the necessary database and Directus credentials.

2. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - **Express App**: `http://localhost:3000`
   - **Directus Admin**: `http://localhost:8056`

## Project Structure

```
TidyHands/
├── app.js               # Main application entry point
├── Dockerfile           # Docker configuration for Express app
├── docker-compose.yaml  # Multi-container orchestration
├── public/              # Static assets (CSS, Images, JS)
│   ├── css/style.css    # Modern minimalist styles
│   └── images/          # Project images (logo, hero, etc.)
├── routes/              # Express route definitions
├── views/               # EJS templates for all pages
└── ROADMAP.md           # Future development plans
```

## License

This project is licensed under the ISC License.
