export async function generatePaths(imageBase64, contextText) {
    const model = imageBase64 ? 'llava' : 'llama3';
    const prompt = buildPrompt(contextText);

    const messages = imageBase64
        ? [{ role: 'user', content: prompt, images: [imageBase64] }]
        : [{ role: 'user', content: prompt }];

    try {
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, messages, stream: false })
        });

        const data = await response.json();
        const text = data.message?.content || '';
        const clean = text.replace(/```json|```/g, '').trim();
        return JSON.parse(clean);

    } catch (err) {
        console.error('Ollama error:', err);
        return fallbackPaths();
    }
}

function buildPrompt(context) {
    const situation = context || 'my current situation';
    return `You are a moment-to-future path generator.
Given this situation: "${situation}", generate 4 realistic possible next paths.

Return ONLY valid JSON, no explanation, no markdown:
{
  "scene": "short scene label (max 3 words)",
  "paths": [
    {
      "emoji": "single emoji",
      "name": "Path name (2-4 words)",
      "probability": 35,
      "description": "1-2 sentence description",
      "steps": ["step 1", "step 2", "step 3"],
      "recommended": true,
      "subPaths": [
        { "name": "sub-path name", "desc": "what happens if you go deeper" },
        { "name": "sub-path name", "desc": "what happens if you go deeper" }
      ]
    }
  ]
}

Rules:
- Exactly 4 paths. Exactly 1 recommended=true.
- Probabilities must sum to 100.
- Steps: exactly 3, under 8 words each.
- SubPaths: exactly 2 per path.
- Realistic decisions only, no fantasy.`;
}

function fallbackPaths() {
    return {
        scene: 'Your moment',
        paths: [
            {
                emoji: '🌱', name: 'Focus mode', probability: 30,
                description: 'You commit to what matters. Deep work begins.',
                steps: ['Close distractions', 'Set a 45-min timer', 'Start the task'],
                recommended: true,
                subPaths: [
                    { name: 'Flow state', desc: 'Deep work, lose track of time.' },
                    { name: 'Micro-break', desc: 'Short break after 45 min.' }
                ]
            },
            {
                emoji: '📱', name: 'Distraction loop', probability: 35,
                description: "Phone for '5 minutes'. 2 hours disappear.",
                steps: ['Open phone', 'YouTube → Instagram', 'Guilt sets in'],
                recommended: false,
                subPaths: [
                    { name: 'Hard stop', desc: 'You catch yourself and close apps.' },
                    { name: 'Full scroll', desc: 'Evening gone, nothing done.' }
                ]
            },
            {
                emoji: '🚶', name: 'Reset walk', probability: 20,
                description: 'Step away to reset. Return sharper.',
                steps: ['Leave desk', '10-min walk', 'Return refreshed'],
                recommended: false,
                subPaths: [
                    { name: 'Extended break', desc: 'Walk becomes a longer reset.' },
                    { name: 'Back to focus', desc: 'Sit down energized immediately.' }
                ]
            },
            {
                emoji: '☕', name: 'Slow start', probability: 15,
                description: 'Ease in gently. Tea, light prep, then action.',
                steps: ['Make a drink', 'Light prep only', 'Ease into work'],
                recommended: false,
                subPaths: [
                    { name: 'Comfortable flow', desc: 'Gentle start leads to steady session.' },
                    { name: 'Endless prep', desc: 'Prep becomes procrastination.' }
                ]
            }
        ]
    };
}
