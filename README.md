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

### Running the Application

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

### Troubleshooting

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
