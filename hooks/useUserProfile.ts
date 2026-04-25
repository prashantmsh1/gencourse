import { useState, useEffect } from 'react';
import { useUser } from '@clerk/expo';
import { getUserProfile, getLevels } from '@/services/user.service';
import { getActiveEnrollment } from '@/services/course.service';
import { getDailyBounties, completeBounty as completeBountyService } from '@/services/bounty.service';
import { getAllTrophies, getUserTrophies } from '@/services/trophy.service';

export function useUserProfile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [activeQuest, setActiveQuest] = useState<any>(null);
  const [bounties, setBounties] = useState<any[]>([]);
  const [allTrophies, setAllTrophies] = useState<any[]>([]);
  const [userTrophies, setUserTrophies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bountiesLoading, setBountiesLoading] = useState(false);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const profileData = await getUserProfile(user.id);
      
      if (profileData) {
        const [levelsData, questData, trophiesData, userTrophiesData] = await Promise.all([
          getLevels(),
          getActiveEnrollment(profileData.id),
          getAllTrophies(),
          getUserTrophies(profileData.id),
        ]);
        setProfile(profileData);
        setLevels(levelsData);
        setActiveQuest(questData);
        setAllTrophies(trophiesData);
        setUserTrophies(userTrophiesData);
        
        // Start fetching bounties in background (non-blocking)
        fetchBounties(profileData.id);
      }
    } catch (error) {
      console.error('Error in useUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBounties = async (userId: number) => {
    try {
      setBountiesLoading(true);
      const bountiesData = await getDailyBounties(userId);
      setBounties(bountiesData);
    } catch (error) {
      console.error('Error fetching bounties:', error);
    } finally {
      setBountiesLoading(false);
    }
  };

  const handleCompleteBounty = async (bountyId: number) => {
    if (!profile?.id) return;
    try {
      const result = await completeBountyService(profile.id, bountyId);
      if (result) {
        // Refresh profile and bounties to reflect rewards
        await fetchProfile();
      }
    } catch (error) {
      console.error('Error completing bounty in hook:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchProfile();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [isLoaded, user?.id]);

  return { 
    profile, 
    levels, 
    activeQuest, 
    bounties, 
    allTrophies,
    userTrophies,
    loading, 
    bountiesLoading,
    refresh: fetchProfile,
    completeBounty: handleCompleteBounty
  };
}
