interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface OllamaResponse {
    message: {
        role: string;
        content: string;
    };
    done: boolean;
}

interface AIServiceConfig {
    baseUrl?: string;
    model?: string;
}

const defaultConfig: Required<AIServiceConfig> = {
    baseUrl: 'http://localhost:11434',
    model: 'mistral',
};

const createAIService = (config: AIServiceConfig = {}): ReturnType<typeof getAIService> => {
    const baseUrl = config.baseUrl ?? defaultConfig.baseUrl;
    const model = config.model ?? defaultConfig.model;
    return getAIService(baseUrl, model);
};

const getAIService = (baseUrl: string, model: string) => {
    const generateResponse = async (messages: Message[]): Promise<string> => {
        const response = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                messages,
                stream: false
            })
        });
        if (!response.ok) {
            throw new Error('Failed to generate response');
        }
        const data = await response.json() as OllamaResponse;
        return data.message.content;
    };

    const analyzePokemon = async (pokemonName: string): Promise<string> => {
        const messages: Message[] = [
            {
                role: 'system',
                content: 'You are a Pokemon VGC expert. Analyze Pokemon for competitive battles.'
            },
            {
                role: 'user',
                content: `Analyze ${pokemonName} for VGC battles. Consider its strengths, weaknesses, common roles, and typical teammates.`
            }
        ];
        return generateResponse(messages);
    };

    const suggestCounters = async (pokemonName: string): Promise<string> => {
        const messages: Message[] = [
            {
                role: 'system',
                content: 'You are a Pokemon VGC expert. Suggest counters for Pokemon in competitive battles.'
            },
            {
                role: 'user',
                content: `What are the best counters to ${pokemonName} in VGC? Consider type matchups, common moves, and abilities.`
            }
        ];
        return generateResponse(messages);
    };

    const suggestPokemon = async (input: string): Promise<string> => {
        const cleanInput = input.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const messages: Message[] = [
            {
                role: 'system',
                content: 'You are a Pokemon database. STRICT MATCHING RULES:\n1. FIRST try exact prefix matches\n2. Then try common misspellings or partial matches\n3. Return EXACTLY ONE real Pokemon name\n4. ONLY lowercase letters and hyphens\n5. NO explanations or lists\n6. NO made-up Pokemon\n\nExamples of matches:\n"kor" → "koraidon"\n"ho" or "ho-" → "ho-oh"\n"amoon" or "amon" → "amoonguss"\n"pory" → "porygon-z"\n"type" → "type-null"\n"char" → "charizard"\n"cind" → "cinderace"\n"drag" → "dragonite"\n"sala" → "salamence"\n"gard" → "gardevoir"'
            },
            {
                role: 'user',
                content: cleanInput
            }
        ];
        const response = await generateResponse(messages);
        const cleaned = response.trim().toLowerCase();
        return cleaned.match(/^[a-z0-9-]+$/)?.[0] || cleanInput;
    };

    return {
        generateResponse,
        analyzePokemon,
        suggestCounters,
        suggestPokemon,
    };
};

export const aiService = createAIService();

export const customAi = createAIService({
    baseUrl: 'http://custom-url:11434',
    model: 'mistral-medium'
}); 