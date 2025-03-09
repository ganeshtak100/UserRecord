
# UserRecord

A React Native application for managing user records with features like create, read, update, and delete operations.

## Features

- User management (CRUD operations)
- Form validation
- Pagination
- Responsive design
- Global loading state
- Error handling

## Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- Axios

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ganeshtak100/UserRecord.git
```
2. Install dependencies:
```bash
cd UserRecord
npm install
```
3. Start the Metro bundler:
```bash
npm start
 ```

4. Run the application:
For iOS:

```bash
npm run ios
 ```

For Android:

```bash
npm run android
 ```
 ## Project Structure
```plaintext
src/
├── components/       # Reusable components
├── controllers/      # Business logic and custom hooks
├── hooks/           # Custom React hooks
├── navigation/      # Navigation configuration
├── screens/         # Screen components
├── services/        # API services
├── store/           # Redux store and slices
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
 ```
```

## Features in Detail
### User Management
- View list of users
- Add new user
- Edit existing user
- Delete user
- Pagination support
### Form Validation
- Required field validation
- Email format validation
- Phone number format validation
- Real-time validation feedback
### Responsive Design
- Adaptive layout
- Responsive font sizes
- Cross-platform compatibility
