import * as dotenv from 'dotenv';
import { db } from './index';
import { levels } from './schema';
dotenv.config();

const initialLevels = [
  { level: 1, title: 'Nomad', xpRequired: 0, coinsRequired: 0, icon: 'tent' },
  { level: 2, title: 'Scout', xpRequired: 100, coinsRequired: 50, icon: 'tent' },
  { level: 3, title: 'Apprentice', xpRequired: 300, coinsRequired: 150, icon: 'tent' },
  { level: 4, title: 'Pathfinder', xpRequired: 600, coinsRequired: 300, icon: 'outpost' },
  { level: 5, title: 'Code Wizard', xpRequired: 1000, coinsRequired: 500, icon: 'outpost' },
  { level: 6, title: 'Battlemage', xpRequired: 1500, coinsRequired: 800, icon: 'outpost' },
  { level: 7, title: 'Archmage', xpRequired: 2200, coinsRequired: 1200, icon: 'fortress' },
  { level: 8, title: 'Warlord', xpRequired: 3000, coinsRequired: 1800, icon: 'fortress' },
  { level: 9, title: 'Lorekeeper', xpRequired: 4000, coinsRequired: 2500, icon: 'citadel' },
  { level: 10, title: 'Grandmaster', xpRequired: 5500, coinsRequired: 3500, icon: 'citadel' },
];

async function seed() {
  console.log('Seeding levels...');
  try {
    for (const l of initialLevels) {
      await db.insert(levels).values(l).onConflictDoUpdate({
        target: levels.level,
        set: {
          title: l.title,
          xpRequired: l.xpRequired,
          coinsRequired: l.coinsRequired,
          icon: l.icon,
        },
      });
    }
    console.log('Successfully seeded levels!');
  } catch (error) {
    console.error('Error seeding levels:', error);
  } finally {
    process.exit(0);
  }
}

seed();
