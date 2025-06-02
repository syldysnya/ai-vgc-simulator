// This file is used to run arbitrary functions for testing and development

// import { interactiveMain } from "./interactive.js";
import { matchManager } from "./utils/match/matchManager.ts";

async function main() {
    console.log("Starting runner...");
    try {
        console.log("Runner is working!");
        await matchManager();
    } catch (error) {
        console.error("Error running main:", error);
        process.exit(1);
    }
}

// Handle any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    process.exit(1);
});

// Run the main function and handle any errors
main().catch(error => {
    console.error('Error in main:', error);
    process.exit(1);
}); 