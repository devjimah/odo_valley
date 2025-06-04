# Odo Valley Tourism Website

A Next.js tourism website with an admin dashboard for content management.

## Features

- Stunning front-end tourism website with artistic design
- Server-side API with MongoDB database
- Admin dashboard for content management
- Authentication for admin users
- CRUD operations for destinations, tours, testimonials, and gallery

## Project Structure

- `/app` - Next.js front-end tourism website
- `/server` - Express.js back-end server with MongoDB
- `/admin` - Next.js admin dashboard

## Prerequisites

- Node.js (>= 14.x)
- MongoDB (local or MongoDB Atlas)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd odo_valley
```

2. Install dependencies for the main project:

```bash
npm install
```

3. Install dependencies for the admin dashboard:

```bash
cd admin
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/odo_valley
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

## Running the Project

### Quick Start (Using Scripts)

#### For Windows Users:

```bash
start-all.bat
```

#### For Unix/Linux/macOS Users:

```bash
./start-all.sh
```

These scripts will:

1. Check if MongoDB is running, and start it if necessary
2. Start the API server
3. Start the main website
4. Start the admin dashboard

### Manual Start

1. Start MongoDB if running locally:

```bash
# Using the provided script
./start-mongodb.sh  # Unix/Linux/macOS
start-mongodb.bat   # Windows

# Or using the MongoDB command directly
mongod --dbpath=data/db
```

2. Create the first admin user:

```bash
npm run create-admin
```

This will create an admin user with the following credentials:

- Email: admin@odovalley.com
- Password: admin123

3. Run all components (website, server, and admin dashboard):

```bash
npm run dev:all
```

Or run individual components:

- Main website: `npm run dev`
- Server: `npm run dev:server`
- Admin dashboard: `npm run dev:admin`

### Production Mode

1. Build the Next.js applications:

```bash
npm run build
cd admin && npm run build && cd ..
```

2. Start the server in production mode:

```bash
NODE_ENV=production npm run server
```

## Accessing the Applications

- Tourism Website: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- API Server: http://localhost:5000/api

## Admin Dashboard Login

- Email: admin@odovalley.com
- Password: admin123

## API Endpoints

- Authentication: `/api/auth`
- Destinations: `/api/destinations`
- Tours: `/api/tours`
- Testimonials: `/api/testimonials`
- Gallery: `/api/gallery`

## License

MIT
