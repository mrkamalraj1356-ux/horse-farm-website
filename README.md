# 🐎 Premium Horse Farm & Equestrian Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square\&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square\&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square\&logo=tailwindcss)](https://tailwindcss.com/) [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square\&logo=vercel)](https://vercel.com/)

A premium, modern and responsive **Horse Farm & Equestrian website** built to showcase horses, their individual media, farm facilities and customer enquiry services.

The platform provides an elegant digital experience where visitors can explore horses, view horse-specific images and videos, enquire about buying or selling horses, book horses, explore the farm and interact with an AI-powered Horse Assistant.

---

## ✨ Features

### 🐎 Horse Collection

* Browse available horses in a premium collection layout.
* Individual horse profile pages.
* Horse-specific information and specifications.
* Search and browsing experience.
* Availability and pricing information.
* Similar horse recommendations.

### 🖼️ Unique Horse Media

Every horse has its own dedicated media structure.

```text
public/
└── horses/
    ├── badal/
    │   ├── badal-1.jpg
    │   ├── badal-2.jpg
    │   ├── badal-3.jpg
    │   └── badal-1.mp4
    │
    ├── chetak/
    ├── noor/
    ├── rajveer/
    ├── sultan/
    └── tara/
```

Horse media is kept separate to prevent one horse's photos or videos from appearing on another horse's profile.

If a horse does not have a video, the website can display an appropriate fallback instead of using another horse's media.

---

## 🎥 Horse Video Experience

Horse profile pages support dedicated video sections.

Visitors can:

* Watch horse videos.
* View horse-specific media.
* Explore images and videos together.
* Access media directly from the horse's profile.

The system is designed so that horse media remains connected to the correct horse data.

---

## 🤖 AI Horse Assistant

The website includes an interactive **AI Horse Assistant** designed to help visitors with common questions.

Users can ask about:

* 🐎 Specific horses
* 💰 Horse pricing
* 📋 Horse details
* 📅 Booking
* 🛒 Buying a horse
* 🐴 Selling a horse
* 🏇 Farm information
* 📩 Enquiries

The chatbot interface is designed to provide a faster and more convenient way for visitors to find information without repeatedly contacting the farm.

> **Note:** The current version contains the frontend/prototype implementation. A production AI API and backend data integration can be connected in a future version.

---

## 🛒 Buy a Horse

A dedicated horse buying enquiry flow allows visitors to submit their interest in a horse.

The interface is designed to collect relevant customer information and horse requirements.

---

## 🐴 Sell Your Horse

The website includes a dedicated **Sell Your Horse** page where horse owners can submit their horse details and contact information.

---

## 📅 Book a Horse

Visitors can use the booking interface to submit a request for a horse.

The current implementation focuses on the website experience and enquiry flow. Production booking/payment functionality can be integrated later.

---

## 🏡 Farm Experience

The website presents the farm through dedicated sections for:

* 🐎 Horse riding
* 🏇 Training
* 🏠 Stables
* 🌿 Pasture
* 🧹 Grooming
* 🏟️ Arena
* 📜 Farm heritage

The goal is to create a premium digital representation of the farm and its equestrian environment.

---

## 📸 Gallery

A dedicated gallery showcases:

* Horses
* Farm facilities
* Riding
* Training
* Stables
* Farm environment
* Equestrian activities

---

## 📱 Instagram Integration

The website includes an Instagram section designed to connect the farm's social media presence with the website.

This creates a connection between:

```text
Instagram
     ↓
Horse Farm Website
     ↓
Horse Profiles
     ↓
Enquiries
```

---

## 📱 Responsive Design

The website is designed for:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The interface adapts to different screen sizes while maintaining the premium visual experience.

---

## 🏗️ Project Architecture

The project follows a modular Next.js architecture with reusable components and centralized horse data.

```text
User
 │
 ├── Home
 │
 ├── Horse Collection
 │       │
 │       └── Horse Details
 │              ├── Images
 │              ├── Videos
 │              ├── Horse Information
 │              └── Ask AI
 │
 ├── Buy Horse
 ├── Sell Horse
 ├── Book Horse
 ├── Gallery
 ├── Instagram
 ├── About Farm
 └── Contact
         │
         └── Enquiry
```

---

## 🛠️ Technology Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **CSS**
* **Responsive UI**

### Development

* **Node.js**
* **npm**
* **Git**
* **GitHub**

### Deployment

* **Vercel**

### AI

* AI Horse Assistant frontend/prototype
* Centralized horse data integration
* Production AI API integration planned for future development

---

## 📂 Project Structure

```text
horse-farm-website/
│
├── public/
│   ├── farm/
│   ├── horses/
│   │   ├── badal/
│   │   ├── chetak/
│   │   ├── noor/
│   │   ├── rajveer/
│   │   ├── sultan/
│   │   └── tara/
│   └── ...
│
├── scripts/
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── book/
│   │   ├── buy/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── horses/
│   │   ├── instagram/
│   │   ├── sell/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── AIChatbot.tsx
│   │   ├── BrandLogo.tsx
│   │   ├── Footer.tsx
│   │   ├── HorseCard.tsx
│   │   ├── HorseGallery.tsx
│   │   ├── HorseVideoSection.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   │
│   ├── data/
│   │   ├── config.ts
│   │   ├── gallery.ts
│   │   ├── horses.ts
│   │   └── instagram.ts
│   │
│   └── utils/
│       └── media.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── ...
```

---

## 🚀 Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/mrkamalraj1356-ux/horse-farm-website.git
```

### 2. Enter the project

```bash
cd horse-farm-website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🔐 Environment Variables

If future backend or AI services require API keys, create a local environment file:

```text
.env.local
```

Never commit API keys, passwords or private credentials to GitHub.

Example:

```env
AI_API_KEY=your_api_key
```

> `.env.local` is excluded from Git through `.gitignore`.

---

## 🌐 Deployment

The project can be deployed using **Vercel**.

Recommended deployment flow:

```text
GitHub
   ↓
Vercel
   ↓
Production Website
   ↓
Custom Domain
```

---

## 🔮 Future Improvements

Planned improvements for future versions include:

* 🤖 Production AI chatbot API
* 🗄️ Database integration
* 👨‍💼 Admin dashboard
* 🐎 Dynamic horse management
* 💰 Dynamic pricing management
* 📸 Cloud media storage
* 🎥 Video optimization
* 📩 Email enquiry notifications
* 💬 WhatsApp enquiry integration
* 📅 Advanced booking system
* 💳 Online payment integration
* 📱 Real Instagram API integration
* 🔐 Admin authentication
* 🔎 Advanced SEO
* 📊 Visitor analytics

---

## 👨‍💻 Internship & Development

This project was developed as part of a **Web Development Internship** and practical project work.

### Developer

**Kamal Prajapat**

**Role:** Web Developer / BCA Student

### Responsibilities

* Website development
* Frontend UI/UX implementation
* Horse listing and detail pages
* Horse-specific media management
* Responsive design
* AI chatbot prototype
* Enquiry forms
* GitHub version control
* Deployment preparation

---

## 📌 Project Status

```text
🟢 Frontend: Completed
🟢 Responsive UI: Implemented
🟢 Horse Profiles: Implemented
🟢 Horse Media: Implemented
🟢 Gallery: Implemented
🟢 Buy/Sell/Book Pages: Implemented
🟢 AI Assistant UI: Implemented
🟡 Production AI Backend: Future
🟡 Admin Panel: Future
🟡 Database: Future
🟡 Payment System: Future
```

---

## 📄 License

This project is currently maintained as a private/professional development project.

License terms can be added when the project is officially released as open source.

---

## ❤️ Built With Passion for Horses

Built with modern web technologies to create a premium digital experience for the **equestrian and horse-farming community**.

**Developed by Kamal Prajapat** 🐎
