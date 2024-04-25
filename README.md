# 📊 Metrics Application

Welcome to the Metrics Application project! This application allows you to post and visualize metrics in a user-friendly way. Each metric includes a timestamp, name, and value. Metrics are displayed on a timeline and can show averages per minute, hour, and day, while being persisted in the database.

## 🛠️ Technologies

The application uses the following technologies:

- **Frontend**:

  - React for the user interface.
  - D3.js for data visualization.
  - React Toastify for notifications.
  - Web Vitals for performance monitoring.

- **Backend**:
  - Express.js for the server.
  - Body-parser and CORS for request handling.
  - Knex and MySQL for database interaction.
  - Moment.js for time formatting and manipulation.

## 🛠️ Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/belenjn/metrics-app.git
   ```

2. Change to the project directory:

   ```bash
   cd metrics-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the MySQL database:

   - Create a new MySQL database and a user.
   - Update the database connection settings in a `.env` file (example provided in the repository).

5. Start the application:

   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## 📜 Scripts

- `npm start`: Start the development server.
- `npm build`: Build the application for production.
- `npm test`: Run tests using Jest and Testing Library.
