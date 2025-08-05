'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function MigrationButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleMigration = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/migrate-workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ success: false, message: data.error || 'Migration failed' });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Migrate Workout Data to Firestore</h3>
        <p className="text-sm text-gray-600 mb-4">
          This will save all sample workout data to your Firestore database in the "workout" database, "fitflow" collection.
        </p>
        
        <Button 
          onClick={handleMigration} 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? 'Migrating...' : 'Migrate Workouts to Firestore'}
        </Button>
      </div>

      {result && (
        <Alert className={result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={result.success ? 'text-green-700' : 'text-red-700'}>
            {result.success ? '✅ ' : '❌ '}
            {result.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
