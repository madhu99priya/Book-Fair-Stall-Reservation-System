# Book-Fair-Stall-Reservation-System

## Backend Setup

### Prerequisites

- Java 21 or higher
- Maven 3.6 or higher
- PostgreSQL database (or Supabase account)

### Environment Configuration

1. **Create Environment File**

   Navigate to the `backend` directory and create a `.env` file similar to the `.env.example`:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure Environment Variables**

   Open the newly created `.env` file and replace the placeholder values with your actual configuration:

   ```env
   # Database Configuration
   DB_URL=your_actual_database_url
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here

   # Email Configuration (for notifications)
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

   **Important Notes:**

   - Use the `.env.example` file as a template - do not modify the example file directly
   - The JWT secret should be a long, random string for security
   - For Supabase users, use the connection pooler URL format

### Running the Backend

1. **Install Dependencies and Run**

   ```bash
   # Make sure you're in the backend directory
   cd backend

   # Install dependencies and run the application
   ./mvnw spring-boot:run
   ```

2. **Alternative: Using Maven directly**

   ```bash
   mvn spring-boot:run
   ```

### Database Setup

- The application uses PostgreSQL with Hibernate's `ddl-auto=update`
- Tables will be automatically created on first run
- Make sure your database is accessible and credentials are correct

## Frontend Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Frontend-Vendor Setup (Vendor Portal)

1. **Navigate to Frontend-Vendor Directory**

   ```bash
   cd frontend-vendor
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   The vendor portal will be available at `http://localhost:5173`

### Frontend-Admin Setup (Admin Portal)

1. **Navigate to Frontend-Admin Directory**

   ```bash
   cd frontend-admin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   The admin portal will be available at `http://localhost:5174`

## Running the Complete Application

### Option 1: Manual Setup (Recommended for Development)

1. **Start Backend Server**

   ```bash
   # Terminal 1
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start Vendor Frontend**

   ```bash
   # Terminal 2
   cd frontend-vendor
   npm install
   npm run dev
   ```

3. **Start Admin Frontend**
   ```bash
   # Terminal 3
   cd frontend-admin
   npm install
   npm run dev
   ```

## Application Access

- **Backend API**: `http://localhost:8081`
- **Vendor Portal**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5174`

## Troubleshooting

### Backend Issues

**Common Issues:**

1. **Database Connection Error**

   - Verify your database is running and accessible
   - Check DB_URL, DB_USERNAME, and DB_PASSWORD in your `.env` file
   - For Supabase users, ensure your project is not paused

2. **Environment Variables Not Loading**

   - Ensure `.env` file is in the `backend` directory (same level as `pom.xml`)
   - Check that variable names in `.env` match exactly (case-sensitive)
   - Make sure you created `.env` based on `.env.example` template

3. **Port Already in Use**
   - Change `SERVER_PORT` in `.env` to a different port (e.g., 8082)
   - Or stop any other application using port 8081

### Frontend Issues

**Common Issues:**

1. **Node Modules Installation Fails**

   - Ensure Node.js version 16 or higher is installed
   - Try clearing npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again

2. **Port Already in Use**

   - Frontend applications will automatically use the next available port
   - Or manually specify port: `PORT=5174 npm start`

3. **API Connection Issues**

   - Ensure backend server is running on the correct port
   - Check if API endpoints in frontend are pointing to correct backend URL
   - Verify CORS configuration in backend allows frontend domains

### General Tips

- Make sure all three services (backend + both frontends) are running simultaneously
- Check browser console for any JavaScript errors
- Verify network requests in browser developer tools
- Ensure all dependencies are properly installed before starting services

## Project Structure

```
Book-Fair-Stall-Reservation-System/
├── backend/                 # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── .env
├── frontend-vendor/         # React vendor portal
│   ├── src/
│   ├── package.json
│   └── public/
├── frontend-admin/          # React admin portal
│   ├── src/
│   ├── package.json
│   └── public/
└── README.md
```
