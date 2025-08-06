"use client";

import { Dumbbell, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-8 border-b border-border shrink-0">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold tracking-tighter text-foreground">
          Elaine's Workout Plan
        </h1>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </header>
  );
};

export default Header;
