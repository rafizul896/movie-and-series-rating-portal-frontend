# 🎬 Frontend – Movie & Series Rating & Streaming Portal

This is the _movie-and-series-rating-portal-frontend_ of the Movie & Series Rating & Streaming Portal, built with _Next.js_ and styled using _Tailwind CSS_. It offers a modern, responsive, and user-friendly interface for exploring, reviewing, purchasing, and streaming media content.

🔗 _Live Website_: [https://movie-and-series-rating-portal-frontend.vercel.app](https://movie-and-series-rating-portal-frontend.vercel.app)

- 🚀 Frontend Repository: [movie-and-series-rating-portal-frontend](https://github.com/rafizul896/movie-and-series-rating-portal-frontend)
- 🧠 Backend Repository: [movie-and-series-rating-portal-backend](https://github.com/rafizul896/movie-and-series-rating-portal-backend)

💻 Open [http://localhost:3000](http://localhost:3000) with your browser to see the development version.

---

## ⚙ Tech Stack

- _Next.js_ – React Framework with SSR & SSG
- _Tailwind CSS_ – Utility-first CSS for fast UI development
- _SSR_ – For server-side rendering and making HTTP requests
- _React Hook Form_ – For form handling
- _JWT_ – For managing user sessions via cookies or headers
- _LUCIDEi_ – For icons, providing a wide range of vector icons
- _SHADCN_ – For pre-designed, customizable UI components with Tailwind CSS integration
- _SONNER_ – For toast notifications with smooth animations
- _STRIPE_ – For payment processing and subscription management
- _ZOD_ – For schema validation in TypeScript and JavaScript
- _DATE-FNS_ – For date manipulation and formatting

---

### 🔐 User Features

- ✅ _Authentication_: Secure login, registration, and password reset
- 🎞 _Browse Library_:
  - Filter by genre, release year, rating, and streaming platform
- ✍ _Review System_:
  - Submit 1–10 star ratings
  - Add spoiler warnings and custom tags
  - Edit/delete unpublished reviews
- ❤ _Interaction_:
  - Like/unlike reviews (1 per user)
  - Comment and reply (nested optional)
- 📌 _Watchlist_:
  - Save favorite movies/series
- 💳 _Buy/Rent System_:
  - Purchase or rent with integrated payment gateway
  - Access to secure streaming links
- 👤 _User Profile_:
  - View watchlist, reviews, and purchase history

---

---

## 📱 Pages Overview

- 🏠 _Home Page_
  - Featured/Trending/Editor's Picks
  - Search bar with filters
- 📚 _All Titles Page_
  - Paginated grid layout with sorting/filtering
- 📄 _Details Page_
  - Poster, metadata, reviews, comments, buy/rent options
- 👤 _User Profile Page_
- 🧾 _Purchase History_
- ❓ _FAQ_
- ℹ _About Us_
- 📞 _Contact_

---

## ⚙ Admin-Specific Features

### 1. _Manage Reviews_

- _Approve/Unpublish Reviews:_ Admins can review and approve or unpublish user-generated reviews before they are made visible to the public.
- _Delete Inappropriate Reviews:_ Admins have the ability to delete reviews that violate platform guidelines or contain inappropriate content.

### 2. _Movie/Series Management_

- _Add Movies/Series:_ Admins can add new movies/series to the media library, providing details like title, description, genre, release year, director, cast, and streaming platform.
- _Update Movies/Series:_ Admins can update any information about a movie/series, including pricing, description, and streaming links.
- _Delete Movies/Series:_ Admins can delete movies/series from the library if they are no longer available or necessary.

### 3. _Dashboard & Analytics_

- _Review and User Analytics:_ Admins have access to a dashboard displaying aggregated statistics, such as:
  - Total number of reviews.
  - Most-reviewed or top-rated movies/series.
  - Most active users.
  - Average rating per title.
  - Number of likes on each review.
- _Sales/Rental Reports:_ Admins can access reports related to sales, rentals, and user purchase history.
- _User Activity Monitoring:_ Admins can monitor user activity like:
  - Recently added movies/series to the watchlist.
  - Total number of purchases or rentals made by users.

### 4. _User Management_

- _View User Profiles:_ Admins can view and manage user profiles, including their personal information, reviews, and purchase history.
- _Block/Unblock Users:_ Admins can block/unblock users for violating platform policies.
- _Manage User Roles:_ Admins can assign or change user roles (e.g., user to admin) as needed.

### 5. _Content Moderation_

- _Manage Inappropriate Content:_ Admins can review and remove content that violates the platform's terms and conditions.
- _Spam Detection:_ Admins can flag and remove spammy reviews or comments.

### 6. _Interactive Dashboard_

- _Comprehensive View:_ Admins have a central dashboard where they can see:
  - Pending reviews that need approval.
  - A list of movies/series in the library with options to edit or delete.
  - Insights into sales, rentals, and most popular content.
  - Quick links to manage users, reviews, and movies/series.

---

## 🚀 Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

bash
```
git clone https://github.com/rafizul896/movie-and-series-rating-portal-frontend.git
cd movie-and-series-rating-portal-frontend
npm install
npm run dev


```
> Make sure .env.local contains the API URL and JWT secrets if needed.

## 📁 Folder Structure

```
movie-and-series-rating-portal/
│
├── public/ # Static files served as-is (e.g., favicon, images)
│
├── src/ # Main source code
│ ├── app/ # Application pages and layouts (Next.js routing)
│ ├── assets/ # Images, fonts, logos, and static media
│ ├── components/ # Reusable React components (UI elements, widgets)
│ ├── context/ # React Context API for global state management
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility libraries and third-party integration code
│ ├── middleware/ # Custom middlewares (e.g., auth protection)
│ ├── providers/ # App-level providers (theme, language, session)
│ ├── services/ # API services and business logic (e.g., movieService.ts)
│ ├── style/ # Global styles, Tailwind config overrides, etc.
│ ├── types/ # Global and shared TypeScript type definitions
│ └── utils/ # Utility/helper functions (e.g., dateFormat.ts)
│
├── .env.local # Local environment variables (API URL, secrets)
├── tailwind.config.js # Tailwind CSS configuration
├── next.config.js # Next.js configuration file
├── tsconfig.json # TypeScript configuration
└── package.json # Project metadata and dependencies

```
