import React, { useState, useEffect } from 'react';

function HeroImage({ path, userImage }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const prompts = {
        'Focus mode': 'student desk at night laptop glowing deep focus productivity cinematic photorealistic',
        'Distraction loop': 'person on phone late night social media distracted tired dark room cinematic',
        'Reset walk': 'person walking alone peaceful night street fresh air calm cinematic photorealistic',
        'Slow start': 'cozy desk warm coffee mug steam rising soft morning light calm cinematic photorealistic',
    };

    const prompt = prompts[path.name] || `${path.name} cinematic photorealistic`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=300&nologo=true`;

    return (
        <div style={{ width: '100%', height: 200, position: 'relative', overflow: 'hidden', borderRadius: 24, marginBottom: 20 }}>
            {!loaded && !error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg,#EEF2FF,#EDE9FE)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                    <div style={{
                        width: 32, height: 32,
                        border: '2px solid rgba(99,102,241,0.2)',
                        borderTopColor: '#6366F1',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                    <span style={{ fontSize: 11, color: '#6366F1', fontWeight: 700 }}>Generating your future vision...</span>
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg,#EEF2FF,#EDE9FE)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 48,
                }}>{path.emoji}</div>
            )}
            <img
                src={url} alt="AI future vision"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                }}
            />
            {/* Overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
                borderRadius: 24,
            }} />
            {/* Content on image */}
            <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
                <div style={{
                    fontSize: 22, fontWeight: 900, color: '#fff',
                    letterSpacing: '-0.03em', marginBottom: 4,
                    textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}>{path.emoji} {path.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    Your future if you choose this path now
                </div>
            </div>
            {/* AI tag */}
            <div style={{
                position: 'absolute', top: 14, right: 14,
                fontSize: 9, background: 'rgba(255,255,255,0.2)',
                color: '#fff', padding: '4px 10px',
                borderRadius: 999, fontWeight: 800,
                backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.3)',
            }}>✦ AI VISION</div>
            {/* Probability */}
            <div style={{
                position: 'absolute', top: 14, left: 14,
                fontSize: 11, background: 'rgba(255,255,255,0.2)',
                color: '#fff', padding: '4px 12px',
                borderRadius: 999, fontWeight: 900,
                backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.3)',
            }}>{path.probability}% likely</div>
        </div>
    );
}

function generateTimeline(path) {
    const now = new Date();
    const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const add = (mins) => { const d = new Date(now); d.setMinutes(d.getMinutes() + mins); return fmt(d); };

    const timelines = {
        'Focus mode': [
            { time: 'Right now', title: 'You start immediately', desc: 'Phone face down. Timer set. The first 5 minutes are the hardest but most important.', tag: 'NOW', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#6366F1', glow: true },
            { time: add(10), title: 'Resistance fades', desc: 'The urge to check your phone weakens. Your brain locks into the task.', tag: 'In 10 mins', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#818CF8' },
            { time: add(25), title: 'Flow state begins', desc: 'You lose track of time in the best way. Real progress is happening right now.', tag: '✓ Milestone', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: add(45), title: 'Session complete 🎉', desc: 'Timer goes off. You did it. Take a 10-min break — you earned it completely.', tag: '✓ Done', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: 'Tomorrow', title: 'You wake up ahead', desc: "Yesterday's focus compounds. You start today with real momentum already built.", tag: '★ Best outcome', tagColor: '#EDE9FE', tagText: '#7C3AED', dot: '#8B5CF6', glow: true },
        ],
        'Distraction loop': [
            { time: 'Right now', title: 'Just 5 minutes...', desc: 'You tell yourself it will be quick. The phone feels magnetic right now.', tag: 'NOW', tagColor: '#FEF3C7', tagText: '#92400E', dot: '#F59E0B', glow: true },
            { time: add(15), title: 'YouTube pulls you in', desc: 'One video leads to another. The algorithm knows exactly what to show you.', tag: '⚠ Warning', tagColor: '#FEF3C7', tagText: '#92400E', dot: '#F59E0B' },
            { time: add(60), title: '1 hour gone', desc: "You check the time and feel the guilt creeping in. But it's hard to stop now.", tag: '⚠ Danger', tagColor: '#FCE7F3', tagText: '#BE185D', dot: '#EC4899' },
            { time: add(120), title: '2 hours vanished', desc: 'The work is still there. Untouched. The panic sets in slowly but surely.', tag: '✗ Lost time', tagColor: '#FEE2E2', tagText: '#991B1B', dot: '#EF4444' },
            { time: 'Tonight', title: 'Late night catch-up', desc: 'Rushing at midnight. Tired, stressed, low quality work done under pressure.', tag: '✗ Worst outcome', tagColor: '#FEE2E2', tagText: '#991B1B', dot: '#EF4444', glow: true },
        ],
        'Reset walk': [
            { time: 'Right now', title: 'You stand up and leave', desc: 'No phone, no headphones. Just you and the outside world for a few minutes.', tag: 'NOW', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#6366F1', glow: true },
            { time: add(5), title: 'Brain starts to decompress', desc: 'The fresh air hits differently. The tension in your shoulders begins to release.', tag: 'In 5 mins', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#818CF8' },
            { time: add(10), title: 'Ideas start flowing', desc: 'Walks are when breakthroughs happen. Your subconscious is working on the problem.', tag: '✓ Good sign', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: add(15), title: 'You return refreshed', desc: 'Sit back down with a clearer mind. The task feels less overwhelming now.', tag: '✓ Reset done', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: add(60), title: 'Productive session follows', desc: 'The walk paid off. Your best work often comes right after a proper reset.', tag: '★ Great outcome', tagColor: '#EDE9FE', tagText: '#7C3AED', dot: '#8B5CF6', glow: true },
        ],
        'Slow start': [
            { time: 'Right now', title: 'You make something warm', desc: 'Tea or coffee. The ritual of making it is itself a transition into work mode.', tag: 'NOW', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#6366F1', glow: true },
            { time: add(10), title: 'Light planning only', desc: 'Review your notes. No heavy lifting yet. Just easing your brain into the zone.', tag: 'In 10 mins', tagColor: '#EEF2FF', tagText: '#4F46E5', dot: '#818CF8' },
            { time: add(20), title: 'Work mode activates', desc: "The warm drink worked. You're in a comfortable, focused state now.", tag: '✓ Transition', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: add(45), title: 'Steady progress', desc: 'Not the fastest session but consistent and comfortable. Quality stays high.', tag: '✓ Steady', tagColor: '#D1FAE5', tagText: '#065F46', dot: '#10B981' },
            { time: 'Later tonight', title: 'Satisfied and calm', desc: 'You finish at a reasonable time feeling good about what you accomplished today.', tag: '★ Good outcome', tagColor: '#EDE9FE', tagText: '#7C3AED', dot: '#8B5CF6', glow: true },
        ],
    };

    return timelines[path.name] || path.subPaths.map((sp, i) => ({
        time: i === 0 ? 'Right now' : add(i * 30),
        title: sp.name, desc: sp.desc,
        tag: i === 0 ? 'NOW' : 'Next',
        tagColor: '#EEF2FF', tagText: '#4F46E5',
        dot: '#6366F1', glow: i === 0,
    }));
}

export default function ExpandScreen({ path, userImage, onBack, onChoose }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        [0, 80, 160, 220, 280, 340, 400, 460, 520, 580].forEach((delay, i) =>
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

    const timeline = generateTimeline(path);

    const stats = [
        { val: path.probability + '%', label: 'Likely' },
        { val: path.steps.length + ' steps', label: 'To start' },
        { val: path.subPaths.length + ' paths', label: 'Branch out' },
    ];

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
                    Path deep dive
                </h2>
                <span style={{
                    fontSize: 10, background: '#EEF2FF', color: '#4F46E5',
                    border: '1px solid #C7D2FE', padding: '4px 12px',
                    borderRadius: 999, fontWeight: 800,
                }}>EXPANDED</span>
            </div>

            {/* Hero AI Image */}
            <div style={{ ...anim(2, 80), position: 'relative', zIndex: 1 }}>
                <HeroImage path={path} userImage={userImage} />
            </div>

            {/* Stats row */}
            <div style={{ ...anim(3, 160), position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
                {stats.map((s, i) => (
                    <div key={i} style={{
                        background: '#fff', border: '0.5px solid #E0E7FF',
                        borderRadius: 16, padding: '12px 10px', textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                    }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: '#4F46E5', letterSpacing: '-0.02em' }}>{s.val}</div>
                        <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, marginTop: 3 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Timeline label */}
            <div style={{ ...anim(4, 200), position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 10, color: '#6366F1', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>your timeline</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(99,102,241,0.15)' }} />
            </div>

            {/* Timeline */}
            <div style={{ ...anim(4, 220), position: 'relative', zIndex: 1, paddingLeft: 28, marginBottom: 28 }}>
                {/* Vertical line */}
                <div style={{
                    position: 'absolute', left: 9, top: 12, bottom: 12,
                    width: 2,
                    background: 'linear-gradient(180deg,#6366F1,#C7D2FE)',
                    borderRadius: 999,
                }} />

                {timeline.map((item, i) => (
                    <div key={i} style={{
                        position: 'relative', marginBottom: 16,
                        ...anim(5, i * 80),
                    }}>
                        {/* Dot */}
                        <div style={{
                            position: 'absolute', left: -22, top: 4,
                            width: 16, height: 16, borderRadius: '50%',
                            background: item.dot,
                            boxShadow: item.glow ? `0 0 10px ${item.dot}99` : 'none',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 8,
                            color: '#fff', fontWeight: 900,
                            border: '2px solid #fff',
                        }}>{i + 1}</div>

                        {/* Time */}
                        <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 700, marginBottom: 5 }}>{item.time}</div>

                        {/* Card */}
                        <div style={{
                            background: '#fff',
                            border: i === 0 ? '1.5px solid #6366F1' : '0.5px solid #E0E7FF',
                            borderRadius: 16, padding: '12px 14px',
                            boxShadow: i === 0
                                ? '0 0 0 3px rgba(99,102,241,0.08), 0 4px 16px rgba(99,102,241,0.1)'
                                : '0 2px 8px rgba(99,102,241,0.05)',
                        }}>
                            <div style={{ fontSize: 14, fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.02em', marginBottom: 5 }}>
                                {item.title}
                            </div>
                            <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.65, fontWeight: 500, marginBottom: 8 }}>
                                {item.desc}
                            </div>
                            <span style={{
                                fontSize: 9, background: item.tagColor,
                                color: item.tagText, padding: '3px 10px',
                                borderRadius: 999, fontWeight: 800,
                            }}>{item.tag}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sub branches */}
            <div style={{ ...anim(6, 300), position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 10, color: '#6366F1', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>where this leads</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(99,102,241,0.15)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                    {path.subPaths.map((sp, i) => (
                        <div key={i} style={{
                            background: '#fff',
                            borderLeft: `3px solid ${i === 0 ? '#6366F1' : '#8B5CF6'}`,
                            border: `0.5px solid ${i === 0 ? '#C7D2FE' : '#DDD6FE'}`,
                            borderRadius: 16, padding: '12px 14px',
                            boxShadow: '0 2px 8px rgba(99,102,241,0.05)',
                        }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{i === 0 ? '🔥' : '😴'}</div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: i === 0 ? '#4F46E5' : '#7C3AED', letterSpacing: '-0.02em', marginBottom: 4 }}>{sp.name}</div>
                            <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.55, fontWeight: 500 }}>{sp.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action buttons */}
            <div style={{ ...anim(7, 380), position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                    onClick={onChoose}
                    style={{
                        padding: 15,
                        background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
                        color: '#fff', border: 'none', borderRadius: 16,
                        fontSize: 13, fontWeight: 900, cursor: 'pointer',
                        fontFamily: 'system-ui, sans-serif',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(99,102,241,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.35)'; }}
                >
                    ✦ Choose this path
                </button>
                <button
                    onClick={onBack}
                    style={{
                        padding: 15,
                        background: '#fff', color: '#4F46E5',
                        border: '1.5px solid #E0E7FF', borderRadius: 16,
                        fontSize: 13, fontWeight: 900, cursor: 'pointer',
                        fontFamily: 'system-ui, sans-serif',
                        boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
                    }}
                >← Back to paths</button>
            </div>

        </div>
    );
}