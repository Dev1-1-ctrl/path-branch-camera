import React, { useEffect, useState } from 'react';

const messages = [
    'Reading your moment...',
    'Mapping decision space...',
    'Growing the branches...',
    'Almost there...'
];

export default function LoadingScreen() {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI(x => (x + 1) % messages.length), 1400);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="app-shell">
            <div className="loading-wrap">
                <div className="loading-orb">🌿</div>
                <p className="loading-msg">{messages[i]}</p>
                <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
                    Ollama is thinking locally
                </p>
                <div className="spinner" />
            </div>
        </div>
    );
}