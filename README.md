# VGC Training Simulation (Work in Progress)

This project aims to create a training simulation for Pokémon VGC (Video Game Championships) battles. The simulation will help players practice and improve their competitive battling skills.

## Current Progress

### Completed Features
- Implemented a Pokemon team parser that converts text-based team formats into structured JSON
- Added support for parsing complete Pokemon data including:
  - Pokemon names and held items
  - Abilities, levels, and Tera types
  - EVs (Effort Values) and IVs (Individual Values)
  - Natures and moves
  - Multiple Pokemon in a single team file

### In Development
- AI-powered team suggestion system that will recommend 4 Pokemon to counter a player's team
- Battle simulation features (planned)

### Example Code

```typescript
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
        suggestPokemon,
    };
};
```