import React from 'react';

export default function PathCard({ path, chosen, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`path-card ${chosen ? 'chosen' : ''} ${path.recommended ? 'recommended' : ''}`}
        >

            <div className="path-header">
                <span className="path-emoji">{path.emoji}</span>
                <span className="path-name">{path.name}</span>
                {path.recommended && (
                    <span className="rec-badge">recommended</span>
                )}
                <span className="path-prob">{path.probability}%</span>
            </div>

            <p className="path-desc">{path.description}</p>

            <div className="path-steps">
                {path.steps.map((step, i) => (
                    <div key={i} className="path-step">
                        <span className="step-dot" />
                        {step}
                    </div>
                ))}
            </div>

        </div>
    );
}