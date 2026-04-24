import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/expo';
import { syncUserToDatabase } from '../services/user.service';

export function useUserSync() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      syncUserToDatabase(user);
    }
  }, [isSignedIn, user]);
}
