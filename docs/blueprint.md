# **App Name**: HandyHub

## Core Features:

- Service Category Browse: Display a hero section with a banner image and service categories as interactive cards with images and 'Book Now' buttons.
- Service-Specific Technician Listing: Fetch and display a dynamic list of technicians based on the user's selected service type using the Spring Boot backend API (GET /api/technicians?serviceType={type}).
- Technician Profile Display: Present each technician's image, name, service type, rating, and experience on dedicated cards for user selection.
- Booking Initiation: Enable users to select a technician and initiate a booking by sending a POST request to the Spring Boot backend API (/api/booking).
- Booking Confirmation: Upon successful booking, display a confirmation message including the technician's name and estimated arrival time.
- Mobile-First Responsive Design: Implement a fully responsive layout with rounded cards, subtle shadow effects, and modern aesthetics suitable for mobile and desktop viewing.
- Backend API Integration: Handle all data fetching and submission operations through the Spring Boot REST API (http://localhost:8080).

## Style Guidelines:

- Primary brand color: A deep, trustworthy blue (#1E5AB9) to evoke reliability and professionalism in the service offering.
- Background color: A very light, subtle off-white with a blue tint (#F3F6F9) creating a clean, calm, and spacious interface.
- Accent color: A vibrant yet sophisticated violet (#610DED) for calls to action, highlights, and interactive elements, providing a modern visual pop.
- Font choice: 'Poppins' (geometric sans-serif) for both headlines and body text, ensuring a modern, precise, and contemporary feel throughout the application's text.
- Utilize clear, service-specific icons for category representation (e.g., a wrench for plumbing) and consistent, rounded star icons for technician ratings.
- A mobile-first design approach with a fluid grid, incorporating prominent rounded corners and soft, diffused shadow effects on cards to give a modern, 'floating' aesthetic.
- Integrate subtle hover animations on interactive cards and buttons, alongside smooth transitions for content loading and page navigation, enhancing overall user experience.