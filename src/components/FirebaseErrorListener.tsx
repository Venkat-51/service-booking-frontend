'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // Surfacing contextual errors for debugging
      console.error('Firestore Permission Error:', error.context);
      
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: `You don't have access to ${error.context.operation} at ${error.context.path}. Check your Security Rules.`,
      });
      
      // We throw the error so Next.js development overlay can catch it if needed,
      // or simply rely on the toast for visibility.
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}