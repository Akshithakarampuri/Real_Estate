export const INITIAL_PROPERTIES = [
  {
    id: "PROP001",
    title: "The Altitude Sky Villa & Penthouse",
    price: 32500000, // ₹3.25 Cr
    location: "Worli Sea Face",
    city: "Mumbai",
    bhk: 4,
    bathrooms: 4,
    area: 3450,
    propertyType: "Penthouse",
    verified: true,
    featured: true,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "3 Covered",
    floor: "42 of 45",
    constructionYear: 2023,
    coordinates: { lat: 19.0176, lng: 72.8172 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Swimming Pool", "Fitness Gym", "24/7 Security & CCTV", "High-speed Elevators", "100% Power Backup", "Clubhouse & Lounge", "EV Charging Station"],
    description: "Experience ultra-luxury living overlooking the Arabian Sea. This bespoke penthouse features double-height ceilings, Italian marble flooring throughout, imported German designer kitchen, private temperature-controlled plunge pool, and expansive wraparound sun deck.",
    viewsCount: 1420,
    status: "active",
    fraudScore: 4, // 0-100 (low risk)
    matchPercentage: 98,
    matchReasons: ["Prime sea view location", "Spacious 4BHK floor plan", "Top-tier clubhouse amenities"],
    agent: {
      id: "agt_1",
      name: "Vikram Singhania",
      agency: "Sotheby's Prime Realty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      dealsClosed: 48,
      phone: "+91 98200 45678",
      email: "vikram.singhania@estateiq.com"
    },
    seller: {
      id: "sel_1",
      name: "Aarav Oberoi",
      phone: "+91 98211 99887"
    }
  },
  {
    id: "PROP002",
    title: "Contemporary Minimalist Forest Villa",
    price: 21000000, // ₹2.10 Cr
    location: "Whitefield Hope Farm",
    city: "Bangalore",
    bhk: 4,
    bathrooms: 4,
    area: 2850,
    propertyType: "Villa",
    verified: true,
    featured: true,
    furnishing: "Semi-Furnished",
    possession: "Ready to Move",
    parking: "2 Covered",
    floor: "G + 2 Floors",
    constructionYear: 2022,
    coordinates: { lat: 12.9850, lng: 77.7470 },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Landscaped Garden", "Fitness Gym", "Swimming Pool", "24/7 Security & CCTV", "EV Charging Station", "Clubhouse & Lounge"],
    description: "Nestled in an exclusive gated botanical enclave in Whitefield, this triplex villa seamlessly integrates biophilic architectural design with sustainable smart home automation and expansive private garden courtyard.",
    viewsCount: 980,
    status: "active",
    fraudScore: 8,
    matchPercentage: 94,
    matchReasons: ["5 mins from Tech Corridors", "Private lush botanical garden", "Smart energy solar equipped"],
    agent: {
      id: "agt_2",
      name: "Priya Sundaram",
      agency: "Prestige Elite Homes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      dealsClosed: 36,
      phone: "+91 99801 12345",
      email: "priya.sundaram@estateiq.com"
    },
    seller: {
      id: "sel_2",
      name: "Ramesh Kulkarni",
      phone: "+91 98450 67890"
    }
  },
  {
    id: "PROP003",
    title: "Lakeview Grand 3BHK Residence",
    price: 8900000, // ₹89 Lac
    location: "Gachibowli Financial District",
    city: "Hyderabad",
    bhk: 3,
    bathrooms: 3,
    area: 1950,
    propertyType: "Apartment",
    verified: true,
    featured: true,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "2 Covered",
    floor: "18 of 28",
    constructionYear: 2023,
    coordinates: { lat: 17.4400, lng: 78.3489 },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Swimming Pool", "Fitness Gym", "High-speed Elevators", "100% Power Backup", "Kids Play Zone", "Badminton / Tennis Court"],
    description: "Spectacular panoramic lakeview 3BHK flat located in the heart of Gachibowli Financial District. Minutes from major multinational tech campuses, international schools, and metro transit.",
    viewsCount: 1650,
    status: "active",
    fraudScore: 2,
    matchPercentage: 96,
    matchReasons: ["Immediate IT corridor access", "High rental yield profile (7.2%)", "Fully furnished turnkey setup"],
    agent: {
      id: "agt_1",
      name: "Vikram Singhania",
      agency: "Sotheby's Prime Realty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      dealsClosed: 48,
      phone: "+91 98200 45678",
      email: "vikram.singhania@estateiq.com"
    },
    seller: {
      id: "sel_1",
      name: "Aarav Oberoi",
      phone: "+91 98211 99887"
    }
  },
  {
    id: "PROP004",
    title: "Golf Course Heights Signature 4BHK",
    price: 45000000, // ₹4.50 Cr
    location: "Golf Course Extension Road",
    city: "Delhi NCR",
    bhk: 4,
    bathrooms: 5,
    area: 4200,
    propertyType: "Apartment",
    verified: true,
    featured: true,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "3 Covered",
    floor: "24 of 32",
    constructionYear: 2024,
    coordinates: { lat: 28.4116, lng: 77.0864 },
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Swimming Pool", "Clubhouse & Lounge", "Fitness Gym", "24/7 Security & CCTV", "High-speed Elevators", "EV Charging Station", "Badminton / Tennis Court"],
    description: "Overlooking an 18-hole championship golf course, this palatial residence boasts VRV air conditioning, automated motorized shades, private elevators, and bespoke German cabinetry.",
    viewsCount: 1120,
    status: "active",
    fraudScore: 5,
    matchPercentage: 91,
    matchReasons: ["Championship golf course views", "Ultra-spacious floor plate", "Double private elevator lobbies"],
    agent: {
      id: "agt_2",
      name: "Priya Sundaram",
      agency: "Prestige Elite Homes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      dealsClosed: 36,
      phone: "+91 99801 12345",
      email: "priya.sundaram@estateiq.com"
    },
    seller: {
      id: "sel_3",
      name: "Deepak Mehra",
      phone: "+91 98110 54321"
    }
  },
  {
    id: "PROP005",
    title: "Sun-drenched Portuguese Heritage Villa",
    price: 18500000, // ₹1.85 Cr
    location: "Assagao",
    city: "Goa",
    bhk: 3,
    bathrooms: 3,
    area: 2400,
    propertyType: "Villa",
    verified: true,
    featured: false,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "2 Open",
    floor: "G + 1 Floor",
    constructionYear: 2021,
    coordinates: { lat: 15.5900, lng: 73.7700 },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Swimming Pool", "Landscaped Garden", "24/7 Security & CCTV", "100% Power Backup"],
    description: "Restored Goan villa surrounded by lush coconut groves. Features exposed laterite walls, high teakwood rafters, private turquoise swimming pool, and an outdoor barbecue veranda.",
    viewsCount: 2240,
    status: "active",
    fraudScore: 3,
    matchPercentage: 89,
    matchReasons: ["High vacation rental income potential", "Quiet heritage enclave", "Private pool sanctuary"],
    agent: {
      id: "agt_1",
      name: "Vikram Singhania",
      agency: "Sotheby's Prime Realty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      dealsClosed: 48,
      phone: "+91 98200 45678",
      email: "vikram.singhania@estateiq.com"
    },
    seller: {
      id: "sel_2",
      name: "Ramesh Kulkarni",
      phone: "+91 98450 67890"
    }
  },
  {
    id: "PROP006",
    title: "Koregaon Park Riverside 3BHK Haven",
    price: 14500000, // ₹1.45 Cr
    location: "Koregaon Park North Main Road",
    city: "Pune",
    bhk: 3,
    bathrooms: 3,
    area: 1780,
    propertyType: "Apartment",
    verified: true,
    featured: false,
    furnishing: "Semi-Furnished",
    possession: "Ready to Move",
    parking: "2 Covered",
    floor: "8 of 16",
    constructionYear: 2022,
    coordinates: { lat: 18.5362, lng: 73.8938 },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Fitness Gym", "Swimming Pool", "Clubhouse & Lounge", "Kids Play Zone", "24/7 Security & CCTV"],
    description: "Elegantly appointed urban home in Pune's most sought-after neighborhood. Walking distance to premier dining, artisan cafes, and Osho garden.",
    viewsCount: 790,
    status: "active",
    fraudScore: 6,
    matchPercentage: 92,
    matchReasons: ["Prime cultural & culinary district", "Low maintenance society", "River-facing balcony"],
    agent: {
      id: "agt_2",
      name: "Priya Sundaram",
      agency: "Prestige Elite Homes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      dealsClosed: 36,
      phone: "+91 99801 12345",
      email: "priya.sundaram@estateiq.com"
    },
    seller: {
      id: "sel_1",
      name: "Aarav Oberoi",
      phone: "+91 98211 99887"
    }
  },
  {
    id: "PROP007",
    title: "Modern Smart Studio Loft",
    price: 4800000, // ₹48 Lac
    location: "HSR Layout Sector 2",
    city: "Bangalore",
    bhk: 1,
    bathrooms: 1,
    area: 680,
    propertyType: "Studio",
    verified: true,
    featured: false,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "1 Covered",
    floor: "4 of 6",
    constructionYear: 2023,
    coordinates: { lat: 12.9121, lng: 77.6446 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["100% Power Backup", "High-speed Elevators", "24/7 Security & CCTV", "EV Charging Station"],
    description: "Compact, high-tech modern studio loft tailor-made for startup founders, remote engineers, and young professionals in Bengaluru's startup hub.",
    viewsCount: 1890,
    status: "active",
    fraudScore: 1,
    matchPercentage: 97,
    matchReasons: ["HSR startup district walking proximity", "High rental demand from techies", "Plug-and-play IoT automation"],
    agent: {
      id: "agt_1",
      name: "Vikram Singhania",
      agency: "Sotheby's Prime Realty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      dealsClosed: 48,
      phone: "+91 98200 45678",
      email: "vikram.singhania@estateiq.com"
    },
    seller: {
      id: "sel_2",
      name: "Ramesh Kulkarni",
      phone: "+91 98450 67890"
    }
  },
  {
    id: "PROP008",
    title: "Suspicious Low-Price Bandra Flat (Audit Flagged)",
    price: 3500000, // ₹35 Lac (Suspiciously cheap for Bandra West)
    location: "Bandra West Carter Road",
    city: "Mumbai",
    bhk: 3,
    bathrooms: 2,
    area: 1450,
    propertyType: "Apartment",
    verified: false,
    featured: false,
    furnishing: "Fully Furnished",
    possession: "Ready to Move",
    parking: "1 Open",
    floor: "2 of 4",
    constructionYear: 2018,
    coordinates: { lat: 19.0657, lng: 72.8258 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["24/7 Security & CCTV"],
    description: "Extremely urgent sale at 70% below circle rate. Cash preferred immediately.",
    viewsCount: 310,
    status: "pending",
    fraudScore: 88, // CRITICAL RISK
    fraudReason: "Price anomaly (78% below Bandra market median) & unverified phone number",
    matchPercentage: 40,
    matchReasons: ["Flagged for price anomaly", "Under administrative review"],
    agent: null,
    seller: {
      id: "sel_anon",
      name: "Suspicious Seller X",
      phone: "+91 90000 00000"
    }
  }
];

export const MOCK_USERS = [
  {
    id: "usr_buyer",
    name: "Rohan Sharma",
    email: "buyer@estateiq.com",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 12345",
    verified: true,
    savedSearches: ["3BHK in Gachibowli under 1 Cr", "Worli Sea View Penthouses"],
    notificationsCount: 3
  },
  {
    id: "usr_seller",
    name: "Aarav Oberoi",
    email: "seller@estateiq.com",
    role: "seller",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98211 99887",
    verified: true,
    totalListings: 4,
    notificationsCount: 5
  },
  {
    id: "usr_agent",
    name: "Vikram Singhania",
    email: "agent@estateiq.com",
    role: "agent",
    agency: "Sotheby's Prime Realty",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98200 45678",
    verified: true,
    licenseNumber: "MahaRERA/AGT/2021/88741",
    dealsClosed: 48,
    notificationsCount: 8
  },
  {
    id: "usr_admin",
    name: "Dr. Elena Vance",
    email: "admin@estateiq.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    phone: "+91 99999 00001",
    verified: true,
    department: "Trust & Safety / Platform Operations",
    notificationsCount: 12
  }
];

export const MOCK_BOOKINGS = [
  {
    id: "BK-1001",
    propertyId: "PROP001",
    propertyTitle: "The Altitude Sky Villa & Penthouse",
    propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80",
    buyerId: "usr_buyer",
    buyerName: "Rohan Sharma",
    buyerPhone: "+91 98765 12345",
    date: "2026-09-15",
    time: "11:30 AM",
    status: "Accepted",
    message: "Interested in high-floor ventilation and parking allocation."
  },
  {
    id: "BK-1002",
    propertyId: "PROP003",
    propertyTitle: "Lakeview Grand 3BHK Residence",
    propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80",
    buyerId: "usr_buyer",
    buyerName: "Rohan Sharma",
    buyerPhone: "+91 98765 12345",
    date: "2026-09-18",
    time: "04:00 PM",
    status: "Pending",
    message: "Would like to inspect clubhouse amenities during visit."
  },
  {
    id: "BK-1003",
    propertyId: "PROP002",
    propertyTitle: "Contemporary Minimalist Forest Villa",
    propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80",
    buyerId: "usr_buyer_2",
    buyerName: "Ananya Deshmukh",
    buyerPhone: "+91 98111 22334",
    date: "2026-09-12",
    time: "02:00 PM",
    status: "Accepted",
    message: "Requesting presence of architectural layout blueprints."
  }
];

export const MOCK_INQUIRIES = [
  {
    id: "INQ-201",
    propertyId: "PROP001",
    propertyTitle: "The Altitude Sky Villa",
    buyerName: "Rohan Sharma",
    buyerEmail: "buyer@estateiq.com",
    lastMessage: "Is there any room for slight negotiation on the registration costs?",
    timestamp: "2026-09-09T14:30:00Z",
    unread: false,
    messages: [
      { id: "m1", sender: "buyer", text: "Hello Vikram, I saw this listing on EstateIQ. Looks breathtaking.", time: "10:15 AM" },
      { id: "m2", sender: "agent", text: "Hello Rohan! Thank you. It is one of the premier residences in Worli. Would you like a private walkthrough?", time: "10:20 AM" },
      { id: "m3", sender: "buyer", text: "Is there any room for slight negotiation on the registration costs?", time: "10:24 AM" }
    ]
  },
  {
    id: "INQ-202",
    propertyId: "PROP003",
    propertyTitle: "Lakeview Grand 3BHK",
    buyerName: "Amitabh Sen",
    buyerEmail: "amitabh.sen@example.com",
    lastMessage: "Does this apartment come with pre-installed EV charger in the basement?",
    timestamp: "2026-09-08T09:12:00Z",
    unread: true,
    messages: [
      { id: "m1", sender: "buyer", text: "Does this apartment come with pre-installed EV charger in the basement?", time: "Yesterday" }
    ]
  }
];

export const MOCK_CRM_LEADS = [
  {
    id: "lead-1",
    name: "Siddharth Malhotra",
    email: "siddharth.m@corp.in",
    phone: "+91 98201 11223",
    stage: "NEW",
    budget: "₹2.5 Cr - ₹3.5 Cr",
    interest: "Worli / Bandra West",
    notes: "Seeking sea-facing 3BHK or 4BHK with immediate possession.",
    score: 85
  },
  {
    id: "lead-2",
    name: "Neha Kapoor",
    email: "neha.kapoor@tech.com",
    phone: "+91 98450 99887",
    stage: "CONTACTED",
    budget: "₹80 L - ₹1.2 Cr",
    interest: "Gachibowli / Hitec City",
    notes: "Phone call held. Sending Lakeview Grand brochure.",
    score: 92
  },
  {
    id: "lead-3",
    name: "Karan Johar",
    email: "karan.johar@studio.in",
    phone: "+91 98200 77665",
    stage: "VISITED",
    budget: "₹4.0 Cr - ₹5.5 Cr",
    interest: "Golf Course Extn",
    notes: "Site visit completed on Sept 5th. Loved the golf course fairway view.",
    score: 95
  },
  {
    id: "lead-4",
    name: "Sunita Rao",
    email: "sunita.rao@health.org",
    phone: "+91 99887 66554",
    stage: "NEGOTIATION",
    budget: "₹1.8 Cr",
    interest: "Assagao Villa",
    notes: "Token advance draft under discussion with legal advisors.",
    score: 98
  },
  {
    id: "lead-5",
    name: "Aditya Roy",
    email: "aditya.roy@venture.com",
    phone: "+91 98112 33445",
    stage: "CLOSED",
    budget: "₹2.1 Cr",
    interest: "Whitefield Villa",
    notes: "Sale agreement signed & registered on Aug 28th.",
    score: 100
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Visit Request Confirmed",
    message: "Your site visit for The Altitude Sky Villa has been approved for Sept 15, 11:30 AM.",
    type: "booking",
    time: "2 hours ago",
    read: false
  },
  {
    id: "notif-2",
    title: "AI Price Alert",
    message: "A property matching your criteria in Gachibowli dropped by 4.5% this week.",
    type: "recommendation",
    time: "Yesterday",
    read: false
  },
  {
    id: "notif-3",
    title: "New Buyer Inquiry",
    message: "Rohan Sharma requested information on Lakeview Grand Residence.",
    type: "inquiry",
    time: "2 days ago",
    read: true
  }
];

export const MOCK_MARKET_TRENDS = {
  cities: [
    { city: "Mumbai", avgPriceSqft: 28500, yoyGrowth: 9.8, demandScore: 94, supplyRatio: "Tight" },
    { city: "Bangalore", avgPriceSqft: 11200, yoyGrowth: 14.2, demandScore: 96, supplyRatio: "Balanced" },
    { city: "Hyderabad", avgPriceSqft: 8900, yoyGrowth: 16.5, demandScore: 98, supplyRatio: "Growing" },
    { city: "Delhi NCR", avgPriceSqft: 14500, yoyGrowth: 11.0, demandScore: 89, supplyRatio: "Balanced" },
    { city: "Pune", avgPriceSqft: 8200, yoyGrowth: 8.5, demandScore: 86, supplyRatio: "High" },
    { city: "Goa", avgPriceSqft: 12500, yoyGrowth: 18.2, demandScore: 92, supplyRatio: "Scarce" },
  ],
  priceHistory: [
    { year: '2022', Mumbai: 24000, Bangalore: 8400, Hyderabad: 6200, DelhiNCR: 12000 },
    { year: '2023', Mumbai: 25500, Bangalore: 9200, Hyderabad: 7100, DelhiNCR: 12800 },
    { year: '2024', Mumbai: 26800, Bangalore: 10100, Hyderabad: 8000, DelhiNCR: 13500 },
    { year: '2025', Mumbai: 27900, Bangalore: 10800, Hyderabad: 8500, DelhiNCR: 14100 },
    { year: '2026', Mumbai: 28500, Bangalore: 11200, Hyderabad: 8900, DelhiNCR: 14500 },
  ],
  propertyTypeBreakdown: [
    { name: 'Apartments', percentage: 58, value: 58 },
    { name: 'Independent Villas', percentage: 22, value: 22 },
    { name: 'Penthouses', percentage: 10, value: 10 },
    { name: 'Plots & Land', percentage: 6, value: 6 },
    { name: 'Studios & Others', percentage: 4, value: 4 },
  ]
};

export const MOCK_REVIEWS = [
  {
    id: "rev-1",
    author: "Deepika Padukone",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "August 2026",
    comment: "Flawless walkthrough experience! The building management is exceptionally maintained, and the high-speed elevators & gym views are unmatched.",
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    author: "Tanmay Bhat",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    date: "July 2026",
    comment: "The neighborhood acoustics and security protocols are state-of-the-art. Highly recommend scheduling a weekend sunset visit.",
    verifiedPurchase: true
  }
];
