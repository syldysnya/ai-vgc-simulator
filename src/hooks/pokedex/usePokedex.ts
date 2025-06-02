import { useState, useEffect, useCallback } from 'react';
import type { PokemonPokedex } from '../../types/pokemon.js';
import { pokemonService } from '../../services/pokedex.js';

interface PokedexState {
    pokemon: PokemonPokedex | null;
    isLoading: boolean;
    error: Error | null;
}

export const usePokedex = (initialPokemonName?: string) => {
    const [state, setState] = useState<PokedexState>({
        pokemon: null,
        isLoading: false,
        error: null
    });

    const fetchPokemon = useCallback(async (pokemonName: string) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const pokemon = await pokemonService.getPokemonByName(pokemonName);
            setState(prev => ({ ...prev, pokemon, isLoading: false }));
        } catch (error) {
            setState(prev => ({ 
                ...prev, 
                error: error instanceof Error ? error : new Error('Failed to fetch Pokemon'), 
                isLoading: false 
            }));
        }
    }, []);

    useEffect(() => {
        if (initialPokemonName) {
            fetchPokemon(initialPokemonName);
        }
    }, [initialPokemonName, fetchPokemon]);

    return {
        ...state,
        fetchPokemon
    };
};