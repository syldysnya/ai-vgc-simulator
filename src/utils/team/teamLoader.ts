import { readFile } from 'fs/promises';
import { join } from 'path';
import { Pokemon } from '../../types/pokemon.js';
import { parseTeamFile } from './teamParser.js';
import { pokemonService } from '../../services/pokedex.js';

/**
 * Loads and parses a single team file from the input_data directory
 * @param filename The name of the team file (e.g., 'teamOne.txt' or 'teamTwo.txt')
 * @returns Promise<Pokemon[]> containing the parsed team
 */
export const loadSingleTeam = async (filename: string): Promise<Pokemon[]> => {
    try {
        const teamPath = join(process.cwd(), 'input_data', filename);
        const teamContent = await readFile(teamPath, 'utf-8');
        return parseTeamFile(teamContent);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error loading team file ${filename}:`, error.message);
            return [];
        }
        return [];
    }
}; 

export const loadPokemons = async ({ teamFileName }: { teamFileName: string }): Promise<Pokemon[]> => {
    try {
        const team = await loadSingleTeam(teamFileName);
        const pokemons = [];

        for (const p of team) {
            try {
                let pokemon = await pokemonService.getPokemonByName(p.name);

                if (!pokemon) {
                    console.error(`Pokemon ${p.name} not found, skipping`);
                    continue;
                }

                const fullePokemon = {
                    ...p,
                    stats: pokemon.stats,
                    types: pokemon.types,
                    weight: pokemon.weight,
                    id: pokemon.id,
                    bst: pokemon.bst,
                    tags: pokemon.tags
                };
                pokemons.push(fullePokemon);
            } catch (error) {
                console.error(`Error loading Pokemon ${p.name}:`, error);
            }
        }

        return pokemons;
    } catch (error) {
        console.error('Error in loadPokemons:', error);
        return []
    }
}