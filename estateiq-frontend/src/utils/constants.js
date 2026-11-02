export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  AGENT: 'agent',
  ADMIN: 'admin',
};

export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Plot',
  'Commercial',
  'Studio',
  'Row House',
];

export const CITIES = [
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Delhi NCR',
  'Pune',
  'Goa',
  'Chennai',
  'Kolkata',
];

export const BHK_OPTIONS = [1, 2, 3, 4, 5];

export const FURNISHING_STATUS = [
  'Fully Furnished',
  'Semi-Furnished',
  'Unfurnished',
];

export const POSSESSION_STATUS = [
  'Ready to Move',
  'Under Construction',
  'Upcoming Project',
];

export const AMENITIES_LIST = [
  { id: 'parking', name: 'Reserved Parking', category: 'General' },
  { id: 'pool', name: 'Swimming Pool', category: 'Recreation' },
  { id: 'gym', name: 'Fitness Gym', category: 'Wellness' },
  { id: 'security', name: '24/7 Security & CCTV', category: 'Safety' },
  { id: 'lift', name: 'High-speed Elevators', category: 'General' },
  { id: 'power', name: '100% Power Backup', category: 'Utilities' },
  { id: 'clubhouse', name: 'Clubhouse & Lounge', category: 'Recreation' },
  { id: 'garden', name: 'Landscaped Garden', category: 'Nature' },
  { id: 'ev_charging', name: 'EV Charging Station', category: 'Eco' },
  { id: 'water_purifier', name: 'RO Water Plant', category: 'Utilities' },
  { id: 'sports', name: 'Badminton / Tennis Court', category: 'Recreation' },
  { id: 'play_area', name: 'Kids Play Zone', category: 'Family' },
];

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended for You' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Listed' },
  { value: 'views', label: 'Most Popular' },
];

export const LEAD_STAGES = {
  NEW: { label: 'New Inquiries', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  CONTACTED: { label: 'Contacted', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  VISITED: { label: 'Site Visited', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  NEGOTIATION: { label: 'Negotiation', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  CLOSED: { label: 'Deal Closed', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

export const FRAUD_RISK_LEVELS = {
  LOW: { label: 'Low Risk', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  MEDIUM: { label: 'Medium Risk', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  HIGH: { label: 'High Risk', badge: 'bg-orange-50 text-orange-700 border-orange-200' },
  CRITICAL: { label: 'Critical Risk', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
};
