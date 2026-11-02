# EstateIQ — Intelligent Real Estate Marketplace Frontend

A modern, responsive, production-quality commercial real-estate marketplace frontend built with **React.js, Vite, Tailwind CSS, React Router v6, Axios, Recharts, Framer Motion, and Context API**.

Designed to integrate seamlessly with an existing **Spring Boot + MongoDB REST API** backend and a separate **FastAPI AI microservice**.

---

## 🌟 Key Features

### 🧑‍💼 Buyer Experience
- **Interactive Landing Page**: Hero with high-resolution visual, multi-tab search (Buy/Rent, City, BHK, Type, Budget), popular locations, and why choose us.
- **Advanced Marketplace Search (`/properties`)**: Filter by location, price slider, BHK pills, area, furnishing, possession, amenities, and verified status. Includes Grid, List, and Map toggle views with server-ready pagination.
- **Property Details (`/properties/:id`)**: Fullscreen image gallery lightbox, key specifications, icon-mapped society amenities, approximate geolocation map, seller/agent card with direct triggers, verified buyer reviews, and AI similar recommendations.
- **Interactive EMI Calculator**: Live sliders for valuation, down payment, interest rate, and tenure with an interactive Recharts donut breakdown of Principal vs. Interest.
- **Schedule Visit Modal (`/bookings`)**: Slot selector (Morning, Afternoon, Evening) with appointment status tracking (`Pending`, `Accepted`, `Rejected`, `Rescheduled`, `Completed`).
- **Interactive Map View (`/map`)**: Full cartography with price tags, radius distance search (5km, 10km, 25km, 50km), and clickable property preview cards.
- **Side-by-Side Property Comparison (`/compare`)**: Compare 2 to 4 properties simultaneously with parameter matrix.
- **Saved Favorites (`/favorites`) & Browsing History (`/recently-viewed`)**: Synchronized locally and via REST endpoints.
- **Direct Inquiry & Chat (`/inquiries`)**: Multi-turn chat interface with property context header.

### 🏡 Seller Studio
- **Seller Dashboard (`/seller/dashboard`)**: Portfolio KPI metrics (Total listings, Active listings, Total views, Inquiries, Upcoming visits) with Recharts weekly view trends.
- **6-Step Property Listing Wizard (`/seller/properties/new`)**:
  - *Step 1*: Basic information & specifications
  - *Step 2*: Geolocation address, pincode & coordinates
  - *Step 3*: Pricing, maintenance & **AI Price Estimate**
  - *Step 4*: Society amenities selector
  - *Step 5*: Cloudinary media upload with **AI Image Quality Inspection** (sharpness, blur detection, and lighting assessment)
  - *Step 6*: Full live card preview before submission
- **Listings Management (`/seller/listings`)**: Table with active/paused status pills, views count, audit badges, edit, delete, and pause actions.
- **Listing Analytics (`/seller/properties/:id/analytics`)**: Views over time, conversion rates, and buyer demographic charts.
- **Visit Requests (`/seller/bookings`)**: Accept, reject, or reschedule incoming walkthrough requests.
- **Inquiry Inbox (`/seller/inquiries`)**: Reply directly to prospective buyers.

### 🤝 Agent CRM Suite
- **Agent Dashboard (`/agent/dashboard`)**: Deal tracking, active listings, visits, and commission performance.
- **Kanban CRM Pipeline (`/agent/clients`)**: Drag/advance leads across stages: `NEW` → `CONTACTED` → `VISITED` → `NEGOTIATION` → `CLOSED`. Includes search, filters, and client registration modal.
- **Managed Listings (`/agent/listings`)**: Assigned broker listings with direct seller contact details.
- **Appointment Calendar (`/agent/calendar`)**: Month, Week, and Day views with client inspection times.
- **Sales Analytics (`/agent/analytics`)**: Monthly commission bar charts and deal velocity lines.

### 🛡️ Admin Command Center
- **Admin Dashboard (`/admin/dashboard`)**: Platform-wide KPIs, user growth area charts, and regional inventory density.
- **User Directory (`/admin/users`)**: Search, filter by role (Buyer, Seller, Agent, Admin), and block/unblock accounts.
- **Property Verification Queue (`/admin/properties/pending`)**: Review pending submissions with one-click approval or rejection with audit feedback modal.
- **AI Fraud Shield (`/admin/fraud`)**: Suspicious listings flagged for circle rate anomalies (e.g. 78% below median) or duplicate media with risk levels (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
- **Review Moderation (`/admin/reviews`) & Platform Reports (`/admin/reports`)**: Audit buyer reviews and export compliance CSV logs.

### 🤖 AI Microservices & Market Trends
- **AI Price Prediction**: Interactive valuation engine calling `POST /predict-price` on the FastAPI microservice.
- **AI Recommendations (`/recommendations`)**: Match score percentage badges and persona filters (Remote Architect, Growing Family, Luxury Investor).
- **Market Trends 2026 (`/market-trends`)**: 5-year historical price appreciation line charts and property type breakdown.

---

## ⚡ Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Verification
```bash
npm run build
```

---

## 🔑 Ready-to-Test Demo Credentials

The platform features an instant **1-Click Quick Role Switcher** in the top navigation bar, allowing evaluators to jump between all 4 roles instantly:

| Role | Email | Password | Default Workspace |
|---|---|---|---|
| **Buyer** | `buyer@estateiq.com` | `password123` | `/buyer/dashboard` |
| **Seller** | `seller@estateiq.com` | `password123` | `/seller/dashboard` |
| **Agent** | `agent@estateiq.com` | `password123` | `/agent/dashboard` |
| **Admin** | `admin@estateiq.com` | `password123` | `/admin/dashboard` |

---

## 🌐 Environment Configuration (`.env`)

Configure `.env` to connect to real backend services:

```ini
# Spring Boot REST API Base URL
VITE_API_BASE_URL=http://localhost:8080/api

# FastAPI AI Microservice URL (Price Prediction & Lifestyle engine)
VITE_FASTAPI_URL=http://localhost:8000

# Google Maps API Key (Optional: interactive vector cartography runs if empty)
VITE_GOOGLE_MAPS_API_KEY=

# Cloudinary Integration (Client-side unsigned image upload)
VITE_CLOUDINARY_CLOUD_NAME=demo_cloud
VITE_CLOUDINARY_UPLOAD_PRESET=estateiq_preset

# Dual-Mode Flag: When true, mock data runs locally without requiring active Spring Boot
VITE_USE_MOCK_API=true
```

---

## 🏛️ Project Directory Structure

```
src/
├── assets/
├── components/
│   ├── common/         # Navbar, Footer, Button, Input, Select, Badge, Modal, Skeleton, EmptyState, QuickRoleSwitcher
│   ├── layout/         # MainLayout, DashboardLayout, Sidebar
│   ├── property/       # PropertyCard, PropertyGrid, PropertyFilter, ImageGallery, AmenitiesList, EmiCalculator, ReviewList, SimilarProperties
│   ├── forms/          # Step1Basic, Step2Location, Step3Pricing, Step4Amenities, Step5Media, Step6Preview, AiPriceEstimateCard
│   ├── charts/         # AnalyticsCharts, MarketTrendCharts
│   ├── maps/           # PropertyMapView, MapMarkerCard
│   └── modals/         # ScheduleVisitModal, InquiryModal
│
├── pages/
│   ├── auth/           # Login, Register, ForgotPassword, ResetPassword
│   ├── buyer/          # LandingPage, PropertySearch, PropertyDetails, MapPage, CompareProperties, Favorites, RecentlyViewed, Bookings, Recommendations, Inquiries, MarketTrends, Profile, BuyerDashboard
│   ├── seller/         # SellerDashboard, AddProperty, EditProperty, SellerListings, SellerAnalytics, SellerInquiries, SellerBookings
│   ├── agent/          # AgentDashboard, AgentClientsCRM, AgentListings, AgentCalendar, AgentAnalytics
│   └── admin/          # AdminDashboard, UserManagement, PropertyVerification, FraudDetection, ReviewModeration, Reports
│
├── services/           # api.js, authService, propertyService, bookingService, favoriteService, inquiryService, agentService, adminService, notificationService, aiService
├── context/            # AuthContext, AppContext, ToastContext
├── utils/              # constants, formatters, mockData, emiCalculations, pdfGenerator
└── routes/             # AppRoutes, ProtectedRoute, RoleBasedRoute
```
