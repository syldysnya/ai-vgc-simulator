/**
 * Handles the match between two teams
 * @param teamOne The first team
 * @param teamTwo The second team
 * @returns Promise<MatchResult> containing the result of the match
 */

import { MatchResult } from "../../types/match.ts"
import { loadPokemons } from "../team/teamLoader.ts";
import { logger } from "../logs/logger.ts";
import { getPokemonStats } from "./pokemonStats.ts";

export const matchManager = async (): Promise<MatchResult> => {
    try {
        await logger.info("Starting new match");
        const teamOne = await loadPokemons({ teamFileName: 'teamOne.txt' });
        await logger.debug(`Team One loaded with ${teamOne.length} Pokemon`);
        
        const teamTwo = await loadPokemons({ teamFileName: 'teamTwo.txt' });
        await logger.debug(`Team Two loaded with ${teamTwo.length} Pokemon`);

        for (const pokemon of teamTwo) {
            getPokemonStats(pokemon);
        }

        const matchResult: MatchResult = {
            winner: {
                team: teamOne,
                name: "Team One"
            },
            loser: {
                team: teamTwo,
                name: "Team Two"
            }
        };
        // await logger.info(`Match completed. Winner: ${matchResult.winner.name}`);

        return matchResult;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        await logger.error(`Error in match: ${errorMessage}`);
        throw error;
    }
};