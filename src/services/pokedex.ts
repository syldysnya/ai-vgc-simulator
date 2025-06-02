import { PokemonPokedex } from '../types/pokemon.js';
import { Dex } from '@pkmn/dex';
import { logger } from '../utils/logs/logger.ts';

export interface UsePokedexReturn {
    getPokemonByName: (name: string) => Promise<PokemonPokedex>;
    getPokemonById: (id: number) => Promise<PokemonPokedex>;
}

const transformPokemon = (pokemon: any): PokemonPokedex => ({
    id: pokemon.num,
    name: pokemon.name,
    weight: pokemon.weightkg,
    types: pokemon.types,
    stats: {
        hp: pokemon.baseStats.hp ?? 0,
        atk: pokemon.baseStats.atk ?? 0,
        def: pokemon.baseStats.def ?? 0,
        spa: pokemon.baseStats.spa ?? 0,
        spd: pokemon.baseStats.spd ?? 0,
        spe: pokemon.baseStats.spe ?? 0
    },
    tags: pokemon.tags,
    bst: pokemon.bst
});

export const pokemonService = {
    getPokemonByName: async (name: string): Promise<PokemonPokedex | null> => {
        try {
            console.log(`\nFetching Pokemon ${name}`);
            const formattedName = name.toLowerCase();
            const pokemon = Dex.species.get(formattedName);
            return transformPokemon(pokemon);
        } catch (error) {
            console.error(`Error fetching Pokemon ${name}`);
            return null;
        }
    }
} as const; 