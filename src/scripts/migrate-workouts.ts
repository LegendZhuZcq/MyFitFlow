import { getInitialWorkouts } from '@/data/sample-workouts';
import { saveWorkoutsToFirestore, saveWorkoutWithDateId } from '@/lib/firestore-service';

// Migration script to save sample workouts to Firestore
export const migrateWorkoutsToFirestore = async (): Promise<void> => {
  try {
    console.log('Starting workout migration to Firestore...');
    
    // Get the sample workout data
    const workouts = getInitialWorkouts();
    
    console.log(`Found ${Object.keys(workouts).length} workouts to migrate`);
    
    // Option 1: Save workouts using their workout IDs as document IDs
    await saveWorkoutsToFirestore(workouts);
    
    // Option 2: Alternative approach - save workouts using date keys as document IDs
    // Uncomment the following lines if you prefer this approach:
    /*
    const dateBasedSavePromises = Object.entries(workouts).map(([dateKey, workout]) => 
      saveWorkoutWithDateId(dateKey, workout)
    );
    await Promise.all(dateBasedSavePromises);
    */
    
    console.log('✅ Workout migration completed successfully!');
    console.log('Data saved to Firestore database: "workout", collection: "fitflow"');
    
  } catch (error) {
    console.error('❌ Error during workout migration:', error);
    throw error;
  }
};

// Function to run the migration (can be called from a component or API route)
export const runMigration = async (): Promise<{ success: boolean; message: string }> => {
  try {
    await migrateWorkoutsToFirestore();
    return {
      success: true,
      message: 'Workouts successfully migrated to Firestore'
    };
  } catch (error) {
    return {
      success: false,
      message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
