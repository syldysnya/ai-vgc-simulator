import { readFile } from 'fs/promises';
import { parseTeamFile } from '../utils/team/teamParser.ts';
import { join } from 'path';

const main = async (): Promise<void> => {
    try {
        // Read team files
        const teamOnePath = join(process.cwd(), 'input_data', 'teamOne.txt');
        const teamTwoPath = join(process.cwd(), 'input_data', 'teamTwo.txt');

        const [teamOneContent, teamTwoContent] = await Promise.all([
            readFile(teamOnePath, 'utf-8'),
            readFile(teamTwoPath, 'utf-8')
        ]);

        // Parse teams
        const teamOne = parseTeamFile(teamOneContent);
        const teamTwo = parseTeamFile(teamTwoContent);

        // Print the parsed teams
        console.log('Team One:');
        console.log(JSON.stringify(teamOne, null, 2));
        
        console.log('\nTeam Two:');
        console.log(JSON.stringify(teamTwo, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
};

main(); 