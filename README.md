# Paw Gang - Social Network for Criminal Dogs

## First Fullstack project in the form of a Social Network, called "Paw Gang" - a social network for criminal dogs, part of the coding bootcamp at SPICED Academy

This project was done in React.
The same is much of the style of platforms like Facebook. Users can create their profile, upload and change a profile picture, see the last three users who joined the platform recently and search for other users with the search field option. Users can add other users as friends, and also have friend requests in pending status or even cancel them. There is also a public chat available, where users can also chat with other users privately by clicking on their picture icon.

## Key Features

### User Management
- **Registration**: Create new user accounts with email/password
- **Login**: Authenticate users with session management  
- **Profile**: View and edit user profiles with bio and profile pictures
- **Account Deletion**: Complete user data removal

### Social Features
- **User Search**: Find users by name with real-time search functionality
- **Friend System**: Send, accept, reject, and cancel friend requests
- **Friends List**: View pending and accepted friendships with status management
- **Recent Users**: See the last three users who joined the platform

### Real-time Chat
- **Public Chat**: Global chat room for all users to communicate
- **Private Chat**: One-on-one messaging between friends by clicking on profile pictures
- **Online Status**: See who's currently online in real-time
- **Message History**: Recent messages loaded automatically on connection

### File Management
- **Profile Pictures**: Upload and change profile images
- **Image Storage**: Local temporary storage + AWS S3 permanent storage
- **File Cleanup**: Automatic cleanup of user images on account deletion

### Login mask:

<img width="1275" alt="Screenshot 2019-08-01 at 11 09 05" src="https://user-images.githubusercontent.com/29626222/62281468-1a1bf780-b44e-11e9-9229-baa571e523cd.png">

### User profile:

<img width="1278" alt="Screenshot 2019-08-01 at 11 09 44" src="https://user-images.githubusercontent.com/29626222/62281489-2acc6d80-b44e-11e9-8e45-313f9ab7a196.png">

### Other users search:

<img width="1280" alt="Screenshot 2019-08-01 at 11 12 12" src="https://user-images.githubusercontent.com/29626222/62281505-2f912180-b44e-11e9-857c-b8f734370ccb.png">

### Other user´s profile:

<img width="1278" alt="Screenshot 2019-08-01 at 11 12 27" src="https://user-images.githubusercontent.com/29626222/62281549-43d51e80-b44e-11e9-8b76-d70175c2269d.png">

### Pending friend requests:

<img width="1277" alt="Screenshot 2019-08-01 at 11 10 58" src="https://user-images.githubusercontent.com/29626222/62281520-36b82f80-b44e-11e9-9bf6-fafd4746b583.png">

### Accepted friend requests:

<img width="1277" alt="Screenshot 2019-08-01 at 11 11 30" src="https://user-images.githubusercontent.com/29626222/62281534-3b7ce380-b44e-11e9-95ed-a72484f964a4.png">

### Public and private chat:

<img width="1277" alt="Screenshot 2019-08-01 at 11 15 54" src="https://user-images.githubusercontent.com/29626222/62281564-49326900-b44e-11e9-833f-15129885309f.png">


## Architecture

### Backend (Node.js/Express)
- **Server**: `index.js` - Main Express server with Socket.io integration
- **Database**: PostgreSQL with `spiced-pg` for database operations
- **Authentication**: Session-based authentication with bcrypt password hashing
- **File Upload**: Multer for local storage + AWS S3 for cloud storage
- **Real-time**: Socket.io for live chat functionality

### Frontend (React)
- **State Management**: Redux for global state management
- **Routing**: React Router for client-side navigation
- **Components**: Class-based React components with lifecycle methods
- **Real-time**: Socket.io client for live updates

## Security Features
- Password hashing with bcrypt
- Session-based authentication
- Input validation on server routes
- File upload size limits
- SQL injection prevention with parameterized queries

## File Structure
```
├── index.js              # Main server file
├── src/
│   ├── App.js           # Main React component
│   ├── start.js         # React app entry point
│   ├── constants.js     # Application constants
│   └── components/      # React components
├── utils/
│   ├── db.js           # Database functions
│   └── bc.js           # Password hashing utilities
├── public/             # Static assets
└── uploads/            # Temporary file storage
```
