import { Nature, Pokemon, PokemonStats } from "../../types/pokemon.js";


const parseEVs = (evString: string): PokemonStats => {
    const stats: PokemonStats = {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0
    };

    const evParts = evString.split('/').map(part => part.trim());
    evParts.forEach(part => {
        const parts = part.split(' ');
        if (parts.length !== 2) return;
        
        const [value, stat] = parts;
        if (!value || !stat) return;
        
        const numValue = parseInt(value);
        
        switch (stat.toLowerCase()) {
            case 'hp':
                stats.hp = numValue;
                break;
            case 'atk':
                stats.atk = numValue;
                break;
            case 'def':
                stats.def = numValue;
                break;
            case 'spa':
                stats.spa = numValue;
                break;
            case 'spd':
                stats.spd = numValue;
                break;
            case 'spe':
                stats.spe = numValue;
                break;
        }
    });

    return stats;
};

const parseIVs = (ivString: string): Partial<PokemonStats> => {
    const ivs: Partial<PokemonStats> = {};
    
    if (!ivString) return {};

    const ivParts = ivString.split('/').map(part => part.trim());
    ivParts.forEach(part => {
        const parts = part.split(' ');
        if (parts.length !== 2) return;
        
        const [value, stat] = parts;
        if (!value || !stat) return;
        
        const numValue = parseInt(value);
        
        switch (stat.toLowerCase()) {
            case 'hp':
                ivs.hp = numValue;
                break;
            case 'atk':
                ivs.atk = numValue;
                break;
            case 'def':
                ivs.def = numValue;
                break;
            case 'spa':
                ivs.spa = numValue;
                break;
            case 'spd':
                ivs.spd = numValue;
                break;
            case 'spe':
                ivs.spe = numValue;
                break;
        }
    });

    return ivs;
};

export const parsePokemon = (pokemonText: string): Pokemon => {
    const lines = pokemonText.split('\n')
        .map(line => line.trim())
        .filter((line): line is string => line.length > 0);
    const moves: string[] = [];
    let evString = '';
    let ivString = '';

    // Initialize default values
    const pokemon: Pokemon = {
        id: 0,
        name: '',
        weight: 0,
        level: 50,
        item: '',
        ability: '',
        teraType: '',
        types: [],
        nature: 'Hardy',
        stats: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [],
        bst: 0,
        tags: []
    };

    lines.forEach(line => {
        if (line.startsWith('-')) {
            moves.push(line.substring(2));
        } else if (line.includes('@')) {
            const [name = '', item = ''] = line.split('@').map(part => part.trim());
            pokemon.name = name;
            pokemon.item = item;
        } else if (line.startsWith('Ability:')) {
            const [, ability = ''] = line.split(':');
            pokemon.ability = ability.trim();
        } else if (line.startsWith('Level:')) {
            const [, level = ''] = line.split(':');
            const parsedLevel = parseInt(level.trim());
            if (!isNaN(parsedLevel)) {
                pokemon.level = parsedLevel;
            }
        } else if (line.startsWith('Tera Type:')) {
            const [, teraType = ''] = line.split(':');
            pokemon.teraType = teraType.trim();
        } else if (line.startsWith('EVs:')) {
            const [, evs = ''] = line.split(':');
            evString = evs.trim();
            pokemon.evs = parseEVs(evString);
        } else if (line.startsWith('IVs:')) {
            const [, ivs = ''] = line.split(':');
            ivString = ivs.trim();
            const parsedIVs = parseIVs(ivString);
            pokemon.ivs = {
                hp: parsedIVs.hp ?? (parsedIVs.hp === 0 ? 0 : 31),
                atk: parsedIVs.atk ?? (parsedIVs.atk === 0 ? 0 : 31),
                def: parsedIVs.def ?? (parsedIVs.def === 0 ? 0 : 31),
                spa: parsedIVs.spa ?? (parsedIVs.spa === 0 ? 0 : 31),
                spd: parsedIVs.spd ?? (parsedIVs.spd === 0 ? 0 : 31),
                spe: parsedIVs.spe ?? (parsedIVs.spe === 0 ? 0 : 31)
            };
        } else if (line.includes('Nature')) {
            const parts = line.split(' ');
            pokemon.nature = parts[0] as Nature;
        }
    });

    pokemon.moves = moves;
    return pokemon;
};

export const parseTeamFile = (fileContent: string): Pokemon[] => {
    const pokemonSections = fileContent.split('\n\n')
        .map(section => section.trim())
        .filter((section): section is string => section.length > 0);
    return pokemonSections.map(section => parsePokemon(section));
}; 