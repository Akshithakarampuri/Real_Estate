import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';

// Public & Buyer Pages
import { LandingPage } from '../pages/buyer/LandingPage';
import { PropertySearch } from '../pages/buyer/PropertySearch';
import { PropertyDetails } from '../pages/buyer/PropertyDetails';
import { MapPage } from '../pages/buyer/MapPage';
import { CompareProperties } from '../pages/buyer/CompareProperties';
import { Favorites } from '../pages/buyer/Favorites';
import { RecentlyViewed } from '../pages/buyer/RecentlyViewed';
import { Bookings } from '../pages/buyer/Bookings';
import { Recommendations } from '../pages/buyer/Recommendations';
import { PricePredictor } from '../pages/buyer/PricePredictor';
import { Inquiries } from '../pages/buyer/Inquiries';
import { MarketTrends } from '../pages/buyer/MarketTrends';
import { Profile } from '../pages/buyer/Profile';
import { BuyerDashboard } from '../pages/buyer/BuyerDashboard';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword, ResetPassword } from '../pages/auth/ForgotPassword';

// Seller Pages
import { SellerDashboard } from '../pages/seller/SellerDashboard';
import { AddProperty } from '../pages/seller/AddProperty';
import { EditProperty } from '../pages/seller/EditProperty';
import { SellerListings } from '../pages/seller/SellerListings';
import { SellerAnalytics } from '../pages/seller/SellerAnalytics';
import { SellerInquiries } from '../pages/seller/SellerInquiries';
import { SellerBookings } from '../pages/seller/SellerBookings';

// Agent Pages
import { AgentDashboard } from '../pages/agent/AgentDashboard';
import { AgentClientsCRM } from '../pages/agent/AgentClientsCRM';
import { AgentListings } from '../pages/agent/AgentListings';
import { AgentCalendar } from '../pages/agent/AgentCalendar';
import { AgentAnalytics } from '../pages/agent/AgentAnalytics';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UserManagement } from '../pages/admin/UserManagement';
import { PropertyVerification } from '../pages/admin/PropertyVerification';
import { FraudDetection } from '../pages/admin/FraudDetection';
import { ReviewModeration } from '../pages/admin/ReviewModeration';
import { Reports } from '../pages/admin/Reports';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public & Marketplace Routes (MainLayout with Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<PropertySearch />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/compare" element={<CompareProperties />} />
        <Route path="/market-trends" element={<MarketTrends />} />
        <Route path="/ai-valuation" element={<PricePredictor />} />
        <Route path="/price-predictor" element={<PricePredictor />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recently-viewed" element={<RecentlyViewed />} />
        <Route path="/recommendations" element={<Recommendations />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* 2. Buyer Portal Routes (DashboardLayout with Role-Adaptive Sidebar) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 3. Seller Module Routes */}
      <Route
        path="/seller"
        element={
          <RoleBasedRoute allowedRoles={['seller', 'admin']}>
            <DashboardLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="listings" element={<SellerListings />} />
        <Route path="properties/new" element={<AddProperty />} />
        <Route path="properties/:id/edit" element={<EditProperty />} />
        <Route path="properties/:id/analytics" element={<SellerAnalytics />} />
        <Route path="inquiries" element={<SellerInquiries />} />
        <Route path="bookings" element={<SellerBookings />} />
      </Route>

      {/* 4. Agent Module Routes */}
      <Route
        path="/agent"
        element={
          <RoleBasedRoute allowedRoles={['agent', 'admin']}>
            <DashboardLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="dashboard" element={<AgentDashboard />} />
        <Route path="listings" element={<AgentListings />} />
        <Route path="clients" element={<AgentClientsCRM />} />
        <Route path="calendar" element={<AgentCalendar />} />
        <Route path="analytics" element={<AgentAnalytics />} />
      </Route>

      {/* 5. Admin Module Routes */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="properties/pending" element={<PropertyVerification />} />
        <Route path="fraud" element={<FraudDetection />} />
        <Route path="reviews" element={<ReviewModeration />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Catch-all Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
