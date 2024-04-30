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

  - **Communication**:
  - WebSocket for real-time data transmission.

## 📡 WebSocket

The project uses WebSocket to enable real-time communication between the server and clients. The benefits of using WebSocket include:

- **Real-time updates**: Allows instant data transmission between the server and clients.
- **Persistent connection**: Establishes a constant connection, avoiding the need for repeated HTTP requests.
- **Efficiency**: Reduces overhead associated with traditional HTTP requests.

By using WebSocket, the project can offer real-time updates of metrics, providing a more dynamic and responsive user experience.

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
   - In the provided .env.example file, enter your database connection settings (e.g., database name, host, user, password).
   - Save the file as .env in the root directory of the backend.

5. Start the application:

   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## 📜 Scripts

- `npm start`: Start the development server.
- `npm build`: Build the application for production.

# 🖼️ User Interface

The application features an intuitive user interface for managing and visualizing metrics. Here is a screenshot of the main dashboard:

## Form

<img width="1439" alt="Captura de pantalla 2024-04-26 a las 16 08 02" src="https://github.com/belenjn/metrics-app/assets/75947904/8c137074-07bf-468a-8903-6718ad8b32a5">

## Metrics

<img width="1439" alt="Captura de pantalla 2024-04-26 a las 16 07 53" src="https://github.com/belenjn/metrics-app/assets/75947904/82520e70-27dc-48b2-a228-5ed9152c8953">
