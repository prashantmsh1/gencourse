import { useState, useEffect } from 'react';
import { useUser } from '@clerk/expo';
import { getUserProfile, getLevels } from '../services/user.service';
import { getActiveEnrollment } from '../services/course.service';

export function useUserProfile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [activeQuest, setActiveQuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const profileData = await getUserProfile(user.id);
      
      if (profileData) {
        const [levelsData, questData] = await Promise.all([
          getLevels(),
          getActiveEnrollment(profileData.id)
        ]);
        setProfile(profileData);
        setLevels(levelsData);
        setActiveQuest(questData);
      }
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

  return { profile, levels, activeQuest, loading, refresh: fetchProfile };
}
