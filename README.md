# Nawy Real Estate Assessment Project

A modern real estate listing platform built with Next.js and NestJS that showcases property listings with detailed views, advanced filtering.

## Project Structure

```
nawy-assessment/
├── frontend/           # Next.js frontend application
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utility functions
│   └── public/       # Static assets
│── backend/          # NestJS backend application
│   ├── src/          # Source files
│   │   ├── areas/    # Area module
│   │   ├── projects/ # Project module
│   │   ├── units/    # Unit module
│   │   └── developers/ # Developer module
│   └── uploads/      # Uploaded images storage
└── project-docker.yaml # Developer module

```

## Features

### Frontend
- Responsive property listings with grid and list views
- Advanced filtering system (area, price range, bedrooms, bathrooms)
- Image carousel with responsive design
- Mobile-first design approach
- Modern UI with Tailwind CSS and shadcn/ui
- Property submission form with image upload
- Location information for properties

### Backend
- RESTful API built with NestJS
- MongoDB integration with Mongoose
- File upload system for property images
- Seeder service for initial data
- Modular architecture
- Input validation and error handling

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Embla Carousel
- Lucide Icons

### Backend
- NestJS
- TypeScript
- MongoDB with Mongoose
- Multer (for file uploads)
- Class Validator
- Class Transformer

## Getting Started

### Running the Application

1. Clone the repo:
```
git clone https://github.com/saifsalemm/nawy-assessment.git saif-salem-assessment
```

2. Run the docker compose command:
```
cd saif-salem-assessment
docker compose -f project-docker.yaml up -d
```

3. Open http://localhost:3000 in your browser

## Main Features Walkthrough

### Property Listing
- Grid view with property cards showing key information
- Quick filters for area, price range, number of rooms/bathrooms, developer, and project
- Responsive design

### Property Details
- Comprehensive property information
- Image gallery with responsive carousel
- Payment plan calculator
- Developer information
- Location details

### Add New Property
- Multi-step form for property submission
- Image upload with preview
- Area, project and developer selection

## If I Had More Time, I Would...

   - Implement user authentication
   - Add role-based access control
   - Create separate admin and user dashboards
   - Implement more advanced filtering options (payment plans)
   - Add sorting functionality
   - Save search preferences
   - Show nearby amenities and points of interest
   - Add favorites/wishlist functionality
   - Implement property comparison tool
   - Add unit tests for components
   - Add API integration tests