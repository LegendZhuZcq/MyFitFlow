import { NextResponse } from 'next/server';
import { runMigration } from '@/scripts/migrate-workouts';

export async function POST() {
  try {
    const result = await runMigration();
    
    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: result.message 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.message 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during migration' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Use POST method to trigger workout migration to Firestore',
      endpoint: '/api/migrate-workouts',
      method: 'POST'
    },
    { status: 200 }
  );
}
