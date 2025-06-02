import { logger } from '../logs/logger.js';
import { Pokemon as PokemonData, Nature, PokemonStats } from '../../types/pokemon.js';

type StatsTable = PokemonStats;
type StatName = keyof PokemonStats;

interface PokemonStatsInfo {
    name: string;
    stats: {
        hp: number;
        atk: number;
        def: number;
        spa: number;
        spd: number;
        spe: number;
    };
}

const calculateHp = (p: PokemonData): number => {
    return Math.floor(0.01 * (2 * p.stats.hp + p.ivs.hp + Math.floor(0.25 * p.evs.hp)) * p.level) + p.level + 10;
}

/**
 * Gets the nature multiplier for a given stat
 * @param nature The nature name
 * @param stat The stat to check
 * @returns 1.1 if nature boosts the stat, 0.9 if nature reduces the stat, 1.0 otherwise
 */
const getNatureMultiplier = (nature: Nature, stat: keyof StatsTable): number => {
    const neutralNatures = ['Hardy', 'Docile', 'Serious', 'Bashful', 'Quirky'];
    if (neutralNatures.includes(nature) || stat === 'hp') return 1.0;

    // Nature modifier table
    const natureEffects: Record<Nature, { increase?: keyof StatsTable, decrease?: keyof StatsTable }> = {
        Lonely: { increase: 'atk', decrease: 'def' },
        Brave: { increase: 'atk', decrease: 'spe' },
        Adamant: { increase: 'atk', decrease: 'spa' },
        Naughty: { increase: 'atk', decrease: 'spd' },
        Bold: { increase: 'def', decrease: 'atk' },
        Relaxed: { increase: 'def', decrease: 'spe' },
        Impish: { increase: 'def', decrease: 'spa' },
        Lax: { increase: 'def', decrease: 'spd' },
        Timid: { increase: 'spe', decrease: 'atk' },
        Hasty: { increase: 'spe', decrease: 'def' },
        Jolly: { increase: 'spe', decrease: 'spa' },
        Naive: { increase: 'spe', decrease: 'spd' },
        Modest: { increase: 'spa', decrease: 'atk' },
        Mild: { increase: 'spa', decrease: 'def' },
        Quiet: { increase: 'spa', decrease: 'spe' },
        Rash: { increase: 'spa', decrease: 'spd' },
        Calm: { increase: 'spd', decrease: 'atk' },
        Gentle: { increase: 'spd', decrease: 'def' },
        Sassy: { increase: 'spd', decrease: 'spe' },
        Careful: { increase: 'spd', decrease: 'spa' },
        // Neutral natures
        Hardy: {},
        Docile: {},
        Serious: {},
        Bashful: {},
        Quirky: {}
    };

    const effect = natureEffects[nature];
    if (!effect) return 1.0;
    if (effect.increase === stat) return 1.1;
    if (effect.decrease === stat) return 0.9;
    return 1.0;
};

const calculateStats = (p: PokemonData): StatsTable => {
    const stats: StatsTable = {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0
    };

    // Calculate HP (not affected by nature)
    stats.hp = Math.floor(0.01 * (2 * p.stats.hp + p.ivs.hp + Math.floor(0.25 * p.evs.hp)) * p.level) + p.level + 10;

    // Calculate other stats with nature
    const otherStats: StatName[] = ['atk', 'def', 'spa', 'spd', 'spe'];
    for (const stat of otherStats) {
        const baseCalculation = Math.floor(0.01 * (2 * p.stats[stat] + p.ivs[stat] + Math.floor(0.25 * p.evs[stat])) * p.level) + 5;
        const natureMultiplier = getNatureMultiplier(p.nature, stat);
        stats[stat] = Math.floor(baseCalculation * natureMultiplier);
    }

    return stats;
};

/**
 * Gets the calculated stats of a specific Pokemon after applying nature, EVs, IVs and items
 * @param p The Pokemon data to calculate stats for
 * @returns Object containing the Pokemon's name, calculated stats, and whether it exists
 */
export const getPokemonStats = (p: PokemonData): PokemonStatsInfo => {
    const stats = calculateStats(p);
    logger.info(`\nCalculating stats for ${p.name}`);
    logger.info(JSON.stringify(stats, null, 2));

    return {
        name: p.name,
        stats
    };
};
