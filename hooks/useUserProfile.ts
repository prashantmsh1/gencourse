import { useState, useEffect } from 'react';
import { useUser } from '@clerk/expo';
import { getUserProfile, getLevels } from '../services/user.service';

export function useUserProfile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const [profileData, levelsData] = await Promise.all([
        getUserProfile(user.id),
        getLevels()
      ]);
      setProfile(profileData);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error in useUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchProfile();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [isLoaded, user?.id]);

  return { profile, levels, loading, refresh: fetchProfile };
}
