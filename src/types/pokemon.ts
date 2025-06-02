export type Nature = 
    | 'Hardy' | 'Lonely' | 'Brave' | 'Adamant' | 'Naughty'
    | 'Bold' | 'Docile' | 'Relaxed' | 'Impish' | 'Lax'
    | 'Timid' | 'Hasty' | 'Serious' | 'Jolly' | 'Naive'
    | 'Modest' | 'Mild' | 'Quiet' | 'Bashful' | 'Rash'
    | 'Calm' | 'Gentle' | 'Sassy' | 'Careful' | 'Quirky';

export interface PokemonStats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

export interface PokemonType {
    name: string;
}

export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    item: string;
    ability: string;
    level: number;
    teraType: string;
    types: PokemonType[];
    stats: PokemonStats;
    evs: PokemonStats;
    nature: Nature;
    ivs: PokemonStats;
    moves: string[];
    bst: number;
    tags: string[];
}

export interface PokemonPokedex {
    id: number;
    name: string;
    weight: number;
    types: PokemonType[];
    stats: PokemonStats;
    tags: string[];
    bst: number;
}

export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonSpecies {
    name: string;
    id: number;
}
