import React, { useState, useEffect } from 'react';

function getImagePrompt(pathName, scene, userContext) {
    const prompts = {
        'Focus mode': `person studying at ${scene}, deep focus, laptop glowing, night time, cinematic lighting, photorealistic`,
        'Distraction loop': `person distracted by phone at ${scene}, social media, tired eyes, dark room, cinematic`,
        'Reset walk': `person walking outside at night, peaceful street, fresh air, cinematic lighting, photorealistic`,
        'Slow start': `person making coffee at ${scene}, warm light, cozy morning, steam rising, cinematic, photorealistic`,
    };
    const base = prompts[pathName] || `person at ${scene}, ${pathName}, cinematic, photorealistic`;
    return `${base}, ${userContext || ''}`;
}

function PathImage({ prompt, fallbackColor }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!loaded) setError(true);
        }, 20000);
        return () => clearTimeout(timeout);
    }, [loaded]);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=200&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
    return (
        <div style={{ width: '100%', height: 110, position: 'relative', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
            {!loaded && !error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: fallbackColor,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'column', gap: 6,
                }}>
                    <div style={{
                        width: 24, height: 24,
                        border: '2px solid rgba(99,102,241,0.3)',
                        borderTopColor: '#6366F1',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                    <span style={{ fontSize: 10, color: '#6366F1', fontWeight: 700 }}>Generating AI vision...</span>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: fallbackColor,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 32,
                }}>🔮</div>
            )}
            <img
                src={url}
                alt="AI vision"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))',
            }} />
            <div style={{
                position: 'absolute', top: 8, left: 10,
                fontSize: 9, background: 'rgba(255,255,255,0.2)',
                color: '#fff', padding: '3px 8px',
                borderRadius: 999, fontWeight: 800,
                backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.3)',
            }}>✦ AI VISION</div>
        </div>
    );
}

const cardColors = [
    { bg: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', fallback: 'linear-gradient(135deg,#EEF2FF,#C7D2FE)', emoji: '#EEF2FF', name: '#1E1B4B', prob: '#4F46E5', probBg: '#EEF2FF', probBorder: '#C7D2FE', step: '#6366F1', stepBg: '#EEF2FF', desc: '#374151', border: '#C7D2FE', accent: '#6366F1' },
    { bg: 'linear-gradient(135deg,#FDF4FF,#EDE9FE)', fallback: 'linear-gradient(135deg,#FDF4FF,#E9D5FF)', emoji: '#EDE9FE', name: '#1E1B4B', prob: '#7C3AED', probBg: '#EDE9FE', probBorder: '#DDD6FE', step: '#7C3AED', stepBg: '#EDE9FE', desc: '#374151', border: '#DDD6FE', accent: '#8B5CF6' },
    { bg: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', fallback: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)', emoji: '#DBEAFE', name: '#1E1B4B', prob: '#1D4ED8', probBg: '#DBEAFE', probBorder: '#BFDBFE', step: '#1D4ED8', stepBg: '#DBEAFE', desc: '#374151', border: '#BFDBFE', accent: '#3B82F6' },
    { bg: 'linear-gradient(135deg,#FDF2F8,#FCE7F3)', fallback: 'linear-gradient(135deg,#FDF2F8,#FBCFE8)', emoji: '#FCE7F3', name: '#1E1B4B', prob: '#BE185D', probBg: '#FCE7F3', probBorder: '#FBCFE8', step: '#BE185D', stepBg: '#FCE7F3', desc: '#374151', border: '#FBCFE8', accent: '#EC4899' },
];

export default function PathsScreen({ data, userImage, onExpand, onBack }) {
    const [chosen, setChosen] = useState(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        [0, 80, 160, 240, 320, 400, 480].forEach((delay, i) =>
            setTimeout(() => setStep(s => Math.max(s, i + 1)), delay)
        );
    }, []);

    function anim(s, delay = 0) {
        return {
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            opacity: step >= s ? 1 : 0,
            transform: step >= s ? 'translateY(0px)' : 'translateY(28px)',
        };
    }

    const scene = data.scene || 'desk';
    const context = '';

    return (
        <div style={{
            maxWidth: 520, margin: '0 auto',
            padding: '0 1.5rem 6rem',
            minHeight: '100vh',
            background: 'linear-gradient(160deg,#F0EFFF 0%,#FAF5FF 50%,#EDE9FE 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
        }}>

            {/* Glow */}
            <div style={{
                position: 'fixed', top: -150, left: '50%',
                transform: 'translateX(-50%)',
                width: 600, height: 500,
                background: 'radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)',
                pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Topbar */}
            <div style={{ ...anim(1, 0), position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 14, padding: '1.75rem 0 1.5rem' }}>
                <button onClick={onBack} style={{
                    width: 38, height: 38, background: '#fff',
                    border: '1.5px solid #E0E7FF', borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: 16, color: '#4F46E5',
                    fontWeight: 900, boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
                    flexShrink: 0,
                }}>←</button>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.03em', margin: 0, flex: 1 }}>
                    Decision paths
                </h2>
                <span style={{
                    fontSize: 10, background: '#EEF2FF', color: '#4F46E5',
                    border: '1px solid #C7D2FE', padding: '4px 12px',
                    borderRadius: 999, fontWeight: 800,
                }}>LIVE</span>
            </div>

            {/* Moment card */}
            <div style={{ ...anim(2, 80), position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: '#fff', border: '0.5px solid #E0E7FF',
                    borderRadius: 18, padding: '13px 16px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    marginBottom: 24, boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
                }}>
                    {userImage ? (
                        <img src={`data:image/jpeg;base64,${userImage}`} alt="moment"
                            style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '1.5px solid #E0E7FF' }} />
                    ) : (
                        <div style={{
                            width: 44, height: 44, borderRadius: 10,
                            background: '#EEF2FF', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: 20, flexShrink: 0,
                        }}>📍</div>
                    )}
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#1E1B4B' }}>{data.scene}</div>
                        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · just now
                        </div>
                    </div>
                    <div style={{
                        fontSize: 10, background: '#EEF2FF', color: '#4F46E5',
                        padding: '3px 10px', borderRadius: 999,
                        fontWeight: 800, border: '1px solid #C7D2FE',
                    }}>{data.paths.length} paths</div>
                </div>
            </div>

            {/* Section label */}
            <div style={{ ...anim(2, 100), position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 10, color: '#6366F1', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>your possible futures</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(99,102,241,0.15)' }} />
            </div>

            {/* Path cards */}
            {data.paths.map((p, i) => {
                const c = cardColors[i % cardColors.length];
                const isChosen = chosen === i;
                const prompt = getImagePrompt(p.name, scene, context);

                return (
                    <div key={i} style={{
                        ...anim(3 + i, i * 80),
                        position: 'relative', zIndex: 1,
                        marginBottom: 12,
                    }}>
                        <div
                            onClick={() => setChosen(i)}
                            style={{
                                background: '#fff',
                                border: isChosen ? `2px solid ${c.accent}` : `1px solid ${c.border}`,
                                borderLeft: p.recommended ? `4px solid ${c.accent}` : isChosen ? `2px solid ${c.accent}` : `1px solid ${c.border}`,
                                borderRadius: 20,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: isChosen
                                    ? `0 0 0 4px ${c.accent}22, 0 8px 24px ${c.accent}22`
                                    : '0 2px 12px rgba(99,102,241,0.06)',
                                transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                            }}
                        >
                            {/* AI Image */}
                            <PathImage prompt={prompt} fallbackColor={c.fallback} />

                            {/* Card body */}
                            <div style={{ padding: '14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: 12,
                                        background: c.emoji, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: 18, flexShrink: 0,
                                    }}>{p.emoji}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 15, fontWeight: 900, color: c.name, letterSpacing: '-0.02em' }}>{p.name}</div>
                                    </div>
                                    {p.recommended && (
                                        <span style={{
                                            fontSize: 9, background: '#D1FAE5', color: '#065F46',
                                            padding: '3px 9px', borderRadius: 999, fontWeight: 800,
                                            border: '0.5px solid rgba(16,185,129,0.3)',
                                        }}>✦ TOP</span>
                                    )}
                                    <span style={{
                                        fontSize: 11, fontWeight: 800,
                                        background: c.probBg, color: c.prob,
                                        padding: '3px 10px', borderRadius: 999,
                                        border: `0.5px solid ${c.probBorder}`,
                                    }}>{p.probability}%</span>
                                </div>

                                <p style={{ fontSize: 13, color: c.desc, lineHeight: 1.65, fontWeight: 500, marginBottom: 10 }}>
                                    {p.description}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                                    {p.steps.map((s, si) => (
                                        <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: c.step }}>
                                            <span style={{
                                                width: 18, height: 18, borderRadius: 6,
                                                background: c.stepBg, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center',
                                                fontSize: 9, fontWeight: 900, flexShrink: 0, color: c.step,
                                            }}>{si + 1}</span>
                                            {s}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); onExpand(p); }}
                                    style={{
                                        width: '100%', padding: '10px',
                                        background: `linear-gradient(135deg, ${c.accent}, ${c.accent}CC)`,
                                        color: '#fff', border: 'none', borderRadius: 12,
                                        fontSize: 12, fontWeight: 800, cursor: 'pointer',
                                        fontFamily: 'system-ui, sans-serif',
                                        boxShadow: `0 4px 14px ${c.accent}44`,
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${c.accent}55`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 14px ${c.accent}44`; }}
                                >
                                    🔮 Explore this future →
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Bottom action */}
            <div style={{ ...anim(7, 400), position: 'relative', zIndex: 1, marginTop: 8 }}>
                <button onClick={onBack} style={{
                    width: '100%', padding: 14,
                    background: '#fff', color: '#4F46E5',
                    border: '1.5px solid #E0E7FF', borderRadius: 16,
                    fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    fontFamily: 'system-ui, sans-serif',
                    boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
                }}>🔄 Capture new moment</button>
            </div>

        </div>
    );
}