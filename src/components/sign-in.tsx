"use client";

import { useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export default function SignIn() {
  const uiRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import FirebaseUI only on client side
    const loadFirebaseUI = async () => {
      if (typeof window !== 'undefined') {
        const firebaseui = await import('firebaseui');
        
        // Load CSS dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.css';
        document.head.appendChild(link);

        // Initialize FirebaseUI only once
        if (!uiRef.current) {
          uiRef.current = new firebaseui.auth.AuthUI(auth);
        }

        const uiConfig: firebaseui.auth.Config = {
          signInSuccessUrl: '/',
          signInOptions: [
            EmailAuthProvider.PROVIDER_ID,
            GoogleAuthProvider.PROVIDER_ID,
          ],
          tosUrl: '/terms',
          privacyPolicyUrl: '/privacy',
          credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        };

        // Start the FirebaseUI widget
        uiRef.current.start('#firebaseui-auth-container', uiConfig);
      }
    };

    loadFirebaseUI();

    // Cleanup function
    return () => {
      if (uiRef.current) {
        uiRef.current.reset();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">MyFitFlow</h1>
          <p className="text-muted-foreground">Sign in to track your workouts</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div id="firebaseui-auth-container"></div>
        </div>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
