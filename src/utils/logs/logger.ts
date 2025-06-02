import { appendFile, existsSync, mkdirSync, truncateSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

const appendFileAsync = promisify(appendFile);

class Logger {
    #logFile = (() => {
        const logsDir = join(process.cwd(), 'logs');
        if (!existsSync(logsDir)) {
            mkdirSync(logsDir, { recursive: true });
        }
        const logFilePath = join(logsDir, 'match.log');
        
        // Clear the file if it exists
        if (existsSync(logFilePath)) {
            truncateSync(logFilePath, 0);
        }
        
        return logFilePath;
    })();

    #writeToFile = async (message: string): Promise<void> => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        await appendFileAsync(this.#logFile, logMessage, 'utf-8');
    };

    info = async (message: string): Promise<void> => {
        console.log(message);
        await this.#writeToFile(`[INFO] ${message}`);
    };

    error = async (message: string): Promise<void> => {
        console.error(message);
        await this.#writeToFile(`[ERROR] ${message}`);
    };

    debug = async (message: string): Promise<void> => {
        console.debug(message);
        await this.#writeToFile(`[DEBUG] ${message}`);
    };

    clearLogs = async (): Promise<void> => {
        // Implementation of clearLogs method
    };
}

export const logger = new Logger(); 