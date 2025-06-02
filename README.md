# VGC Training Simulation

This project aims to create a training simulation for Pokémon VGC (Video Game Championships) battles. The simulation will help players practice and improve their competitive battling skills.

# Stage 1:
Working on suggesting correct 4 pokemons based on input from a player.
AI will suggest best 4 pokemons that can beat a player's team.

# Pokemon Team Parser

A TypeScript parser for Pokemon team data that converts text-based team formats into structured JSON data.

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

The parser can convert Pokemon team data from the standard text format into a structured JSON format. Here's an example of the input format:

```
Lunala @ Electric Seed  
Ability: Shadow Shield  
Level: 50  
Tera Type: Fairy  
EVs: 132 HP / 172 Def / 180 SpA / 12 SpD / 12 Spe  
Modest Nature  
IVs: 0 Atk  
- Moongeist Beam  
- Moonblast  
- Trick Room  
- Wide Guard  
```

And it will be converted to:

```json
{
  "name": "Lunala",
  "item": "Electric Seed",
  "ability": "Shadow Shield",
  "level": 50,
  "teraType": "Fairy",
  "evs": {
    "hp": 132,
    "atk": 0,
    "def": 172,
    "spa": 180,
    "spd": 12,
    "spe": 12
  },
  "nature": "modest",
  "ivs": {
    "hp": null,
    "atk": 0,
    "def": null,
    "spa": null,
    "spd": null,
    "spe": null
  },
  "moves": [
    "Moongeist Beam",
    "Moonblast",
    "Trick Room",
    "Wide Guard"
  ]
}
```

### Example Code

```typescript
import { readFile } from 'fs/promises';
import { parseTeamFile } from './utils/teamParser.js';

// Read and parse a team file
const teamContent = await readFile('path/to/team.txt', 'utf-8');
const team = parseTeamFile(teamContent);
console.log(JSON.stringify(team, null, 2));
```

## Building

To build the project:

```bash
npm run build
```

## Running the Example

To run the example code that parses sample team files:

```bash
npm start
```

## Features

- Parses Pokemon names and held items
- Extracts abilities, levels, and Tera types
- Parses EVs (Effort Values) and IVs (Individual Values)
- Captures natures and moves
- Handles missing values with appropriate defaults
- Supports multiple Pokemon in a single team file

## Type Definitions

The parser provides TypeScript type definitions for the parsed data:

```typescript
interface PokemonStats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

interface Pokemon {
    name: string;
    item: string;
    ability: string;
    level: number;
    teraType: string;
    evs: PokemonStats;
    nature: string;
    ivs: {
        hp: number | null;
        atk: number | null;
        def: number | null;
        spa: number | null;
        spd: number | null;
        spe: number | null;
    };
    moves: string[];
}
```