package com.estateai.config;

import com.estateai.model.*;
import com.estateai.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final InquiryRepository inquiryRepository;
    private final AgentLeadRepository agentLeadRepository;
    private final AgentAppointmentRepository agentAppointmentRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Checking database initialization status...");
        seedUsers();
        seedProperties();
        seedBookings();
        seedInquiries();
        seedAgentData();
        seedNotifications();
        log.info("Database seeding check complete.");
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            log.info("Seeding initial users...");

            User admin = User.builder()
                    .name("Vikram Malhotra (Superadmin)")
                    .email("admin@estateiq.com")
                    .phone("+91 99000 11223")
                    .password(passwordEncoder.encode("Password123"))
                    .role(Role.ADMIN)
                    .profileImage("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80")
                    .avatar("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80")
                    .status("active")
                    .isVerified(true)
                    .isBlocked(false)
                    .build();

            User agent = User.builder()
                    .name("Pooja Batra (Senior Broker)")
                    .email("agent@estateiq.com")
                    .phone("+91 98200 44556")
                    .password(passwordEncoder.encode("Password123"))
                    .role(Role.AGENT)
                    .profileImage("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80")
                    .avatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80")
                    .status("active")
                    .isVerified(true)
                    .isBlocked(false)
                    .build();

            User seller = User.builder()
                    .name("Rajesh Singhania (Builder & Owner)")
                    .email("seller@estateiq.com")
                    .phone("+91 98210 55667")
                    .password(passwordEncoder.encode("Password123"))
                    .role(Role.SELLER)
                    .profileImage("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")
                    .avatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")
                    .status("active")
                    .isVerified(true)
                    .isBlocked(false)
                    .build();

            User buyer = User.builder()
                    .name("Arjun Sharma")
                    .email("buyer@estateiq.com")
                    .phone("+91 98765 43210")
                    .password(passwordEncoder.encode("Password123"))
                    .role(Role.BUYER)
                    .profileImage("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80")
                    .avatar("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80")
                    .status("active")
                    .isVerified(true)
                    .isBlocked(false)
                    .build();

            userRepository.saveAll(List.of(admin, agent, seller, buyer));
            log.info("Saved 4 default users (admin, agent, seller, buyer).");
        }
    }

    private void seedProperties() {
        if (propertyRepository.count() == 0) {
            log.info("Seeding initial properties...");

            Property p1 = Property.builder()
                    .id("PROP001")
                    .title("The Grand Horizon Penthouse")
                    .description("Ultra-luxury duplex penthouse overlooking the Arabian Sea with private infinity pool and smart home automation.")
                    .price(145000000L) // 14.5 Cr
                    .propertyType("Penthouse")
                    .location("Worli Sea Face")
                    .city("Mumbai")
                    .state("Maharashtra")
                    .bhk(4)
                    .bathrooms(5)
                    .area(4200)
                    .furnishing("Fully Furnished")
                    .possession("Ready to Move")
                    .constructionYear(2023)
                    .amenities(List.of("Swimming Pool", "Fitness Gym", "24/7 Security & CCTV", "Reserved Parking", "High-speed Elevators", "Clubhouse & Lounge"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(19.0178).lng(72.8478).build())
                    .sellerName("Rajesh Singhania")
                    .sellerPhone("+91 98210 55667")
                    .sellerEmail("seller@estateiq.com")
                    .sellerType("Owner")
                    .status("active")
                    .verified(true)
                    .viewsCount(2840)
                    .fraudScore(4)
                    .matchPercentage(96)
                    .matchReasons(List.of("Matches luxury budget range", "Prime coastal location", "High architectural quality rating"))
                    .createdAt(Instant.now())
                    .build();

            Property p2 = Property.builder()
                    .id("PROP002")
                    .title("Serenity Palms Luxury Villa")
                    .description("Portuguese colonial architectural estate with lush tropical orchards, private lap pool, and solar grid.")
                    .price(82000000L) // 8.2 Cr
                    .propertyType("Villa")
                    .location("Candolim Hillside")
                    .city("Goa")
                    .state("Goa")
                    .bhk(5)
                    .bathrooms(6)
                    .area(5800)
                    .furnishing("Fully Furnished")
                    .possession("Ready to Move")
                    .constructionYear(2022)
                    .amenities(List.of("Swimming Pool", "Landscaped Garden", "24/7 Security & CCTV", "Reserved Parking", "EV Charging Station", "100% Power Backup"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(15.5173).lng(73.7663).build())
                    .sellerName("Pooja Batra")
                    .sellerPhone("+91 98200 44556")
                    .sellerEmail("agent@estateiq.com")
                    .sellerType("Agent")
                    .status("active")
                    .verified(true)
                    .viewsCount(1920)
                    .fraudScore(6)
                    .matchPercentage(92)
                    .matchReasons(List.of("Spacious family retreat", "Independent title deeds verified"))
                    .createdAt(Instant.now())
                    .build();

            Property p3 = Property.builder()
                    .id("PROP003")
                    .title("Cyber Heights Smart 3BHK")
                    .description("Contemporary home equipped with IoT climate control, biometric lock systems, and walking distance to HITEC City.")
                    .price(24000000L) // 2.4 Cr
                    .propertyType("Apartment")
                    .location("Madhapur, Hitec City")
                    .city("Hyderabad")
                    .state("Telangana")
                    .bhk(3)
                    .bathrooms(3)
                    .area(2150)
                    .furnishing("Semi-Furnished")
                    .possession("Ready to Move")
                    .constructionYear(2024)
                    .amenities(List.of("Fitness Gym", "Clubhouse & Lounge", "High-speed Elevators", "100% Power Backup", "EV Charging Station", "Kids Play Zone"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(17.4483).lng(78.3915).build())
                    .sellerName("Rajesh Singhania")
                    .sellerPhone("+91 98210 55667")
                    .sellerEmail("seller@estateiq.com")
                    .sellerType("Builder")
                    .status("active")
                    .verified(true)
                    .viewsCount(3410)
                    .fraudScore(2)
                    .matchPercentage(94)
                    .matchReasons(List.of("Close to IT technology corridor", "Zero occupancy lag", "Excellent capital appreciation trend"))
                    .createdAt(Instant.now())
                    .build();

            Property p4 = Property.builder()
                    .id("PROP004")
                    .title("Emerald Green Residencies 2BHK")
                    .description("Quiet garden-facing apartment close to top international schools and tech parks with clubhouse membership included.")
                    .price(12500000L) // 1.25 Cr
                    .propertyType("Apartment")
                    .location("Whitefield Main Road")
                    .city("Bangalore")
                    .state("Karnataka")
                    .bhk(2)
                    .bathrooms(2)
                    .area(1420)
                    .furnishing("Semi-Furnished")
                    .possession("Under Construction")
                    .constructionYear(2025)
                    .amenities(List.of("Swimming Pool", "Landscaped Garden", "Kids Play Zone", "Badminton / Tennis Court", "24/7 Security & CCTV"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(12.9698).lng(77.7499).build())
                    .sellerName("Pooja Batra")
                    .sellerPhone("+91 98200 44556")
                    .sellerEmail("agent@estateiq.com")
                    .sellerType("Agent")
                    .status("active")
                    .verified(true)
                    .viewsCount(1580)
                    .fraudScore(3)
                    .matchPercentage(89)
                    .matchReasons(List.of("Affordable entry into tech hub", "RERA registered project"))
                    .createdAt(Instant.now())
                    .build();

            Property p5 = Property.builder()
                    .id("PROP005")
                    .title("The Sovereign Manor Estate")
                    .description("Palatial luxury mansion on 2 acres with private squash court, temperature controlled pool, and cinema hall.")
                    .price(260000000L) // 26 Cr
                    .propertyType("Villa")
                    .location("Golf Course Extension")
                    .city("Delhi NCR")
                    .state("Haryana")
                    .bhk(6)
                    .bathrooms(7)
                    .area(7500)
                    .furnishing("Fully Furnished")
                    .possession("Ready to Move")
                    .constructionYear(2023)
                    .amenities(List.of("Swimming Pool", "Fitness Gym", "Landscaped Garden", "Reserved Parking", "Clubhouse & Lounge", "100% Power Backup"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(28.4595).lng(77.0266).build())
                    .sellerName("Rajesh Singhania")
                    .sellerPhone("+91 98210 55667")
                    .sellerEmail("seller@estateiq.com")
                    .sellerType("Owner")
                    .status("active")
                    .verified(true)
                    .viewsCount(4120)
                    .fraudScore(1)
                    .matchPercentage(98)
                    .matchReasons(List.of("Trophy asset on golf course", "Fully furnished designer interiors"))
                    .createdAt(Instant.now())
                    .build();

            Property p6 = Property.builder()
                    .id("PROP006")
                    .title("Koregaon Park Riverside 3BHK")
                    .description("Leafy riverside residence in Pune's most culturally vibrant neighborhood, featuring wrap-around balcony.")
                    .price(18500000L) // 1.85 Cr
                    .propertyType("Apartment")
                    .location("Lane 5, Koregaon Park")
                    .city("Pune")
                    .state("Maharashtra")
                    .bhk(3)
                    .bathrooms(3)
                    .area(1950)
                    .furnishing("Fully Furnished")
                    .possession("Ready to Move")
                    .constructionYear(2022)
                    .amenities(List.of("Clubhouse & Lounge", "Landscaped Garden", "High-speed Elevators", "24/7 Security & CCTV", "Reserved Parking"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(18.5362).lng(73.894).build())
                    .sellerName("Aarav Oberoi")
                    .sellerPhone("+91 98211 99887")
                    .sellerEmail("seller@estateiq.com")
                    .sellerType("Owner")
                    .status("active")
                    .verified(true)
                    .viewsCount(980)
                    .fraudScore(5)
                    .matchPercentage(87)
                    .matchReasons(List.of("Boutique residential block", "Prime culinary & lifestyle district"))
                    .createdAt(Instant.now())
                    .build();

            Property p7 = Property.builder()
                    .id("PROP007")
                    .title("Salt Lake Eco Residence 2BHK")
                    .description("Energy-efficient apartment overlooking central wetland park with rooftop solar and rainwater harvesting.")
                    .price(8500000L) // 85 Lac
                    .propertyType("Apartment")
                    .location("Sector V, Salt Lake")
                    .city("Kolkata")
                    .state("West Bengal")
                    .bhk(2)
                    .bathrooms(2)
                    .area(1180)
                    .furnishing("Unfurnished")
                    .possession("Ready to Move")
                    .constructionYear(2023)
                    .amenities(List.of("Landscaped Garden", "100% Power Backup", "High-speed Elevators", "RO Water Plant", "24/7 Security & CCTV"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1502005229762-ae1b46000281?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(22.5867).lng(88.4178).build())
                    .sellerName("Pooja Batra")
                    .sellerPhone("+91 98200 44556")
                    .sellerEmail("agent@estateiq.com")
                    .sellerType("Agent")
                    .status("active")
                    .verified(true)
                    .viewsCount(740)
                    .fraudScore(2)
                    .matchPercentage(84)
                    .matchReasons(List.of("Budget-friendly", "Direct metro access"))
                    .createdAt(Instant.now())
                    .build();

            Property p8 = Property.builder()
                    .id("PROP008")
                    .title("Suspicious Low-Price Bandra Flat (Audit Flagged)")
                    .description("Listing flagged by AI risk engine for pricing 78% below current circle rate and unverified contact info.")
                    .price(3500000L) // 35 Lac (Suspiciously cheap for Bandra)
                    .propertyType("Apartment")
                    .location("Hill Road, Bandra West")
                    .city("Mumbai")
                    .state("Maharashtra")
                    .bhk(2)
                    .bathrooms(2)
                    .area(950)
                    .furnishing("Unfurnished")
                    .possession("Ready to Move")
                    .constructionYear(2018)
                    .amenities(List.of("Reserved Parking"))
                    .images(List.of(
                            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                    ))
                    .coordinates(Coordinates.builder().lat(19.0596).lng(72.8295).build())
                    .sellerName("Suspicious Seller X")
                    .sellerPhone("+91 90000 00000")
                    .sellerEmail("suspicious@fake.com")
                    .sellerType("Owner")
                    .status("pending")
                    .verified(false)
                    .viewsCount(110)
                    .fraudScore(88)
                    .matchPercentage(35)
                    .matchReasons(List.of("Flagged for manual compliance audit"))
                    .createdAt(Instant.now())
                    .build();

            propertyRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8));
            log.info("Saved 8 initial properties with full amenities and coordinates.");
        }
    }

    private void seedBookings() {
        if (bookingRepository.count() == 0) {
            log.info("Seeding initial visit bookings...");
            Booking b1 = Booking.builder()
                    .id("BK-1001")
                    .propertyId("PROP001")
                    .propertyTitle("The Grand Horizon Penthouse")
                    .propertyLocation("Worli Sea Face, Mumbai")
                    .propertyPrice(145000000L)
                    .propertyImage("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80")
                    .buyerName("Arjun Sharma")
                    .buyerEmail("buyer@estateiq.com")
                    .buyerPhone("+91 98765 43210")
                    .sellerId("seller_1")
                    .date("2026-09-14")
                    .time("11:00 AM")
                    .status("Confirmed")
                    .notes("Requested penthouse terrace walkthrough and parking inspection.")
                    .createdAt(Instant.now())
                    .build();

            Booking b2 = Booking.builder()
                    .id("BK-1002")
                    .propertyId("PROP003")
                    .propertyTitle("Cyber Heights Smart 3BHK")
                    .propertyLocation("Madhapur, Hyderabad")
                    .propertyPrice(24000000L)
                    .propertyImage("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80")
                    .buyerName("Arjun Sharma")
                    .buyerEmail("buyer@estateiq.com")
                    .buyerPhone("+91 98765 43210")
                    .sellerId("seller_1")
                    .date("2026-09-18")
                    .time("03:30 PM")
                    .status("Pending")
                    .notes("Inquiring about bank loan pre-approval assistance.")
                    .createdAt(Instant.now())
                    .build();

            bookingRepository.saveAll(List.of(b1, b2));
        }
    }

    private void seedInquiries() {
        if (inquiryRepository.count() == 0) {
            log.info("Seeding initial inquiries...");
            Inquiry inq1 = Inquiry.builder()
                    .id("INQ-301")
                    .propertyId("PROP001")
                    .propertyTitle("The Grand Horizon Penthouse")
                    .buyerName("Arjun Sharma")
                    .buyerEmail("buyer@estateiq.com")
                    .sellerId("seller_1")
                    .lastMessage("What is the quarterly maintenance fee for the duplex infinity pool?")
                    .timestamp(Instant.now())
                    .unread(false)
                    .messages(new ArrayList<>(List.of(
                            InquiryMessage.builder()
                                    .id("msg-1")
                                    .sender("buyer")
                                    .text("Hi Rajesh, I loved the virtual video tour. Is the furniture included in the list price?")
                                    .time("Yesterday 4:15 PM")
                                    .timestamp(Instant.now().minusSeconds(86400))
                                    .build(),
                            InquiryMessage.builder()
                                    .id("msg-2")
                                    .sender("seller")
                                    .text("Hello Arjun! Yes, all imported Italian marble fixtures and custom lighting are included.")
                                    .time("Yesterday 5:20 PM")
                                    .timestamp(Instant.now().minusSeconds(82800))
                                    .build(),
                            InquiryMessage.builder()
                                    .id("msg-3")
                                    .sender("buyer")
                                    .text("What is the quarterly maintenance fee for the duplex infinity pool?")
                                    .time("Today 10:02 AM")
                                    .timestamp(Instant.now().minusSeconds(3600))
                                    .build()
                    )))
                    .build();

            inquiryRepository.save(inq1);
        }
    }

    private void seedAgentData() {
        if (agentLeadRepository.count() == 0) {
            log.info("Seeding initial CRM leads...");
            AgentLead l1 = AgentLead.builder()
                    .id("lead-1")
                    .agentId("agt_1")
                    .name("Dr. Sameer Joshi")
                    .email("dr.joshi@apollo.org")
                    .phone("+91 98205 11990")
                    .budget("₹12 - ₹15 Cr")
                    .preferredLocation("Worli / Lower Parel")
                    .propertyType("Penthouse")
                    .stage("VISITED")
                    .score(94)
                    .notes("Looking for sea-facing penthouses with minimum 4 car parks.")
                    .createdAt(Instant.now())
                    .build();

            AgentLead l2 = AgentLead.builder()
                    .id("lead-2")
                    .agentId("agt_1")
                    .name("Sunita Menon")
                    .email("sunita.menon@fintech.io")
                    .phone("+91 98401 22883")
                    .budget("₹2 - ₹3 Cr")
                    .preferredLocation("Hitec City / Madhapur")
                    .propertyType("Apartment")
                    .stage("CONTACTED")
                    .score(86)
                    .notes("Needs high floor with immediate metro connectivity.")
                    .createdAt(Instant.now())
                    .build();

            AgentLead l3 = AgentLead.builder()
                    .id("lead-3")
                    .agentId("agt_1")
                    .name("Kunal Aggarwal")
                    .email("kunal@aggarwalholdings.com")
                    .phone("+91 98110 33774")
                    .budget("₹20+ Cr")
                    .preferredLocation("Golf Course Ext, Gurgaon")
                    .propertyType("Villa")
                    .stage("NEGOTIATION")
                    .score(98)
                    .notes("Offers made on Sovereign Manor. Drafting token agreements.")
                    .createdAt(Instant.now())
                    .build();

            agentLeadRepository.saveAll(List.of(l1, l2, l3));
        }

        if (agentAppointmentRepository.count() == 0) {
            AgentAppointment apt1 = AgentAppointment.builder()
                    .id("apt-1")
                    .agentId("agt_1")
                    .clientName("Siddharth Malhotra")
                    .phone("+91 98201 11223")
                    .propertyTitle("The Altitude Sky Villa")
                    .date("2026-09-12")
                    .time("10:30 AM")
                    .type("Site Walkthrough")
                    .status("Confirmed")
                    .build();

            AgentAppointment apt2 = AgentAppointment.builder()
                    .id("apt-2")
                    .agentId("agt_1")
                    .clientName("Neha Kapoor")
                    .phone("+91 98450 99887")
                    .propertyTitle("Lakeview Grand 3BHK")
                    .date("2026-09-12")
                    .time("03:00 PM")
                    .type("Contract Signing Prep")
                    .status("Confirmed")
                    .build();

            agentAppointmentRepository.saveAll(List.of(apt1, apt2));
        }
    }

    private void seedNotifications() {
        if (notificationRepository.count() == 0) {
            log.info("Seeding initial notifications...");
            Notification n1 = Notification.builder()
                    .id("notif-1")
                    .title("Visit Confirmed!")
                    .message("Seller accepted your visit appointment for The Grand Horizon Penthouse on Sep 14 at 11:00 AM.")
                    .type("booking")
                    .time("10m ago")
                    .read(false)
                    .createdAt(Instant.now())
                    .build();

            Notification n2 = Notification.builder()
                    .id("notif-2")
                    .title("Price Alert")
                    .message("Emerald Green Residencies reduced price by ₹5,00,000. Check the updated EMI breakdown.")
                    .type("price")
                    .time("2h ago")
                    .read(false)
                    .createdAt(Instant.now())
                    .build();

            Notification n3 = Notification.builder()
                    .id("notif-3")
                    .title("Listing Verified")
                    .message("Your property 'Cyber Heights Smart 3BHK' has been officially verified by EstateIQ Compliance.")
                    .type("system")
                    .time("1d ago")
                    .read(true)
                    .createdAt(Instant.now())
                    .build();

            notificationRepository.saveAll(List.of(n1, n2, n3));
        }
    }
}
