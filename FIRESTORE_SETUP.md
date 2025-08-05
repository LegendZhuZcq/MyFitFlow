# Firestore Setup and Workout Data Migration

This guide will help you set up Firestore and migrate your workout data from the sample data to your Firestore database.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Firestore enabled in your Firebase project
3. Node.js and npm installed

## Setup Instructions

### 1. Firebase Project Configuration

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Navigate to **Project Settings** → **General** → **Your apps**
4. If you haven't added a web app, click "Add app" and select the web platform
5. Copy your Firebase configuration values

### 2. Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values with your actual Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   ```

### 3. Enable Firestore

1. In your Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select a location for your database

### 4. Deploy Firestore Rules and Indexes

Deploy the security rules and indexes to your Firebase project:

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes
```

## Data Structure

The workout data will be saved to Firestore with the following structure:

```
workout (database)
└── fitflow (collection)
    └── workouts (subcollection)
        ├── workout-1 (document)
        ├── workout-2 (document)
        └── workout-3 (document)
```

Each workout document contains:
- Basic workout information (id, userId, name, date, completed, etc.)
- Nested exercises array with exercise details
- Each exercise contains a sets array with set information
- All Date objects are converted to Firestore Timestamps

## Migration Options

### Option 1: Using the API Endpoint

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Make a POST request to the migration endpoint:
   ```bash
   curl -X POST http://localhost:9002/api/migrate-workouts
   ```

### Option 2: Using the UI Component

1. Import and use the `MigrationButton` component in any page:
   ```tsx
   import { MigrationButton } from '@/components/migration-button';
   
   export default function Page() {
     return (
       <div>
         <MigrationButton />
       </div>
     );
   }
   ```

2. Click the "Migrate Workouts to Firestore" button

### Option 3: Programmatic Migration

You can also run the migration programmatically:

```typescript
import { runMigration } from '@/scripts/migrate-workouts';

// In an async function
const result = await runMigration();
console.log(result);
```

## Files Created

The following files have been created for the Firestore integration:

- `src/lib/firebase.ts` - Firebase configuration and initialization
- `src/lib/firestore-service.ts` - Firestore service functions for saving data
- `src/scripts/migrate-workouts.ts` - Migration script
- `src/app/api/migrate-workouts/route.ts` - API endpoint for migration
- `src/components/migration-button.tsx` - UI component for triggering migration
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore indexes configuration
- `.env.local.example` - Environment variables template

## Security Rules

The current Firestore rules allow all read/write access for testing purposes. For production, you should:

1. Enable Firebase Authentication
2. Update the rules in `firestore.rules` to restrict access:
   ```javascript
   // Allow only authenticated users to access their own data
   allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
   ```

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Make sure your `.env.local` file has the correct Firebase configuration values.

2. **Permission denied**: Check your Firestore security rules and ensure they allow the operations you're trying to perform.

3. **Network errors**: Ensure your Firebase project is active and Firestore is enabled.

4. **Date conversion errors**: The migration script automatically converts JavaScript Date objects to Firestore Timestamps.

### Verification

After migration, you can verify the data in your Firebase Console:

1. Go to **Firestore Database**
2. Navigate to the `workout` → `fitflow` → `workouts` collection
3. You should see 3 workout documents with IDs: `workout-1`, `workout-2`, `workout-3`

## Next Steps

After successful migration, you can:

1. Create functions to read workout data from Firestore
2. Implement real-time listeners for workout updates
3. Add user authentication and update security rules
4. Create CRUD operations for managing workouts

## Support

If you encounter any issues, check the browser console and server logs for detailed error messages.
