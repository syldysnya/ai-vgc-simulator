import { Pokemon } from './pokemon.ts';

export interface TeamResult {
    team: Pokemon[];
    name: string;
}

export interface MatchResult {
    winner: TeamResult;
    loser: TeamResult;
}