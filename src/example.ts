import { pokemonService } from './services/pokedex.js';

const testPokedex = async (): Promise<void> => {
    try {
        // Test getting a Pokemon by name
        console.log('Fetching Koraidon...');
        const koraidon = await pokemonService.getPokemonByName('koraidon');
        console.log('Koraidon data:', koraidon);
    } catch (error) {
        console.error('Error testing services:', error);
    }
};

// Run directly when executed
testPokedex(); 