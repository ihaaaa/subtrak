# Overview

SubTrak is a full-stack subscription management web application designed to help users track their subscriptions, analyze spending patterns, and receive AI-powered cost optimization recommendations. The application provides a comprehensive dashboard for managing subscription services with features like expense tracking, usage analytics, and intelligent insights to help users optimize their subscription spending.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with **React 18** using modern development practices:
- **Build System**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with a dark theme design system using CSS custom properties
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod schema validation for type-safe forms
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Type Safety**: Full TypeScript implementation across the application

## Backend Architecture
The backend follows a RESTful API design pattern:
- **Runtime**: Node.js 18 with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with session-based authentication
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Structure**: Modular route handlers with middleware for authentication
- **Data Validation**: Shared Zod schemas between frontend and backend

## Database Design
The application uses a relational database structure with three main entities:
- **Users Table**: Stores user profile information from Replit Auth
- **Subscriptions Table**: Core entity tracking subscription details (name, cost, billing frequency, category, usage rating)
- **Sessions Table**: Manages user authentication sessions

## Authentication Flow
- **Provider**: Replit Auth using OpenID Connect
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Authorization**: Middleware-based route protection
- **User Data**: Automatic user creation/updates on authentication

## AI Integration Architecture
The application includes a modular AI recommendation system:
- **Current Implementation**: Mock recommendation service returning static suggestions
- **Future Integration**: Designed for OpenAI API integration with user subscription analysis
- **Recommendation Types**: Usage-based cancellation suggestions and cost optimization plans

## Development Workflow
- **Monorepo Structure**: Shared TypeScript types and schemas between client and server
- **Concurrent Development**: Vite dev server for frontend, tsx for backend development
- **Database Management**: Drizzle Kit for schema migrations and database operations
- **Code Quality**: ESLint and Prettier for consistent code formatting

# External Dependencies

## Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite development
- **express**: Web application framework for Node.js
- **drizzle-orm**: Type-safe ORM for PostgreSQL database operations
- **@tanstack/react-query**: Data fetching and caching library
- **wouter**: Lightweight routing library for React

## Database and Authentication
- **pg**: PostgreSQL client for Node.js
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **openid-client**: OpenID Connect client for Replit Auth integration
- **passport**: Authentication middleware (used with OpenID strategy)

## UI and Design System
- **@radix-ui/react-***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for component variant management
- **lucide-react**: Icon library for UI components

## Form Handling and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Resolvers for various validation libraries
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

## Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Type-safe JavaScript superset
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

## Planned Integrations
- **OpenAI API**: For generating intelligent subscription recommendations
- **Additional Analytics Services**: For enhanced spending pattern analysis