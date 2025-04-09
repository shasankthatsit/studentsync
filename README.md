# StudentSync

StudentSync is a comprehensive academic management system designed to help students organize their studies, track progress, and manage their academic life effectively.

## Features

- **Task Management**: Create, track, and manage academic tasks and assignments
- **Calendar Integration**: Schedule and manage academic events and deadlines
- **Progress Tracking**: Monitor academic performance across subjects
- **Study Groups**: Collaborate with peers in study groups
- **Notes**: Create and organize study notes
- **Settings**: Customize your academic preferences
- **Chatbot**: Get instant help with academic queries

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/studentsync.git
   cd studentsync
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/studentsync
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user

### Tasks

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

### Calendar

- `GET /api/calendar`: Get all events
- `POST /api/calendar`: Create a new event
- `PUT /api/calendar/:id`: Update an event
- `DELETE /api/calendar/:id`: Delete an event

### Progress

- `GET /api/progress`: Get all subjects
- `POST /api/progress`: Create a new subject
- `PUT /api/progress/:id`: Update a subject
- `DELETE /api/progress/:id`: Delete a subject
- `POST /api/progress/:id/assignments`: Add an assignment to a subject

## Testing

1. Run backend tests:
   ```bash
   cd backend
   npm test
   ```

2. Run frontend tests:
   ```bash
   cd frontend
   npm test
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@studentsync.com or join our Slack channel. 
## Requirements
- **Study Reminder**: Allow users to set reminders for study sessions or deadlines with notifications.
- **Task Checker**: A to-do list feature to add, edit, and check off tasks.
- **Note Taker**: A simple interface for users to write and save notes.
- **Document Uploader**: Enable users to upload files (e.g., PDFs, images) for study materials.
- **AI Chatbot**: An intelligent assistant to retrieve and summarize data from reminders, tasks, notes, and uploaded documents.
- User authentication (login/signup) to secure personal data.
- Responsive design for accessibility on desktop and mobile devices.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (React.js for dynamic UI)
- **Backend**: Node.js with Express.js (simple server setup)
- **Database**: MongoDB (to store user data, tasks, notes, and file metadata)
- **File Storage**: Cloudinary or AWS S3 (for document uploads)
- **AI Chatbot**: Integrate an API like xAI's Grok or OpenAI (for data processing and responses)
- **Notifications**: Browser notifications or email (via a service like SendGrid)
- **Hosting**: Vercel or Heroku (easy deployment)

## Milestones
1. **Project Setup & Authentication**
   - Set up the tech stack, initialize the project, and implement user login/signup functionality.
   
2. **Core Features Development**
   - Build the study reminder, task checker, and note taker interfaces with basic CRUD (Create, Read, Update, Delete) operations.

3. **Document Uploader**
   - Add file upload functionality and integrate with a cloud storage solution.

4. **AI Chatbot Integration**
   - Connect the AI chatbot to retrieve and process data from reminders, tasks, notes, and documents.

5. **Testing & Deployment**
   - Test all features for bugs, ensure responsiveness, and deploy the website to a hosting platform. 