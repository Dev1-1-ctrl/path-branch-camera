import React, { useRef, useState, useEffect } from 'react';

export default function CaptureScreen({ onCapture }) {
    const fileRef = useRef();
    const videoRef = useRef();
    const canvasRef = useRef();
    const [preview, setPreview] = useState(null);
    const [base64, setBase64] = useState(null);
    const [context, setContext] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false);
    const [stream, setStream] = useState(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [0, 100, 200, 300, 400, 500].map((delay, i) =>
            setTimeout(() => setStep(s => Math.max(s, i + 1)), delay)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    async function openCamera() {
        try {
            const s = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(s);
            setCameraOpen(true);
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                    videoRef.current.play();
                }
            }, 100);
        } catch {
            alert('Camera not accessible. Please allow camera permission.');
        }
    }

    function takePhoto() {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPreview(dataUrl);
        setBase64(dataUrl.split(',')[1]);
        stopCamera();
    }

    function stopCamera() {
        if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
        setCameraOpen(false);
    }

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setPreview(ev.target.result);
            setBase64(ev.target.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    }

    function anim(s, delay = 0) {
        return {
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            opacity: step >= s ? 1 : 0,
            transform: step >= s ? 'translateY(0px)' : 'translateY(28px)',
        };
    }

    const S = {
        shell: {
            maxWidth: 520, margin: '0 auto',
            padding: '0 1.5rem 6rem',
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #F0EFFF 0%, #FAF5FF 50%, #EEF2FF 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative', overflow: 'hidden',
        },
        glow1: {
            position: 'fixed', top: -200, left: '50%',
            transform: 'translateX(-50%)',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
        },
        glow2: {
            position: 'fixed', bottom: -100, right: -100,
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
        },
        header: {
            ...anim(1, 0),
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.75rem 0 0',
            position: 'relative', zIndex: 1,
        },
        logoWrap: {
            display: 'flex', alignItems: 'center', gap: 10,
        },
        logoIcon: {
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            borderRadius: 12, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            boxShadow: '0 4px 16px rgba(99,102,241,0.45)',
        },
        logoText: {
            fontSize: 19,
            fontWeight: 900,
            color: '#1E1B4B',
            letterSpacing: '-0.04em',
        },
        badge: {
            fontSize: 10, fontWeight: 800,
            background: '#EEF2FF', color: '#4F46E5',
            border: '1.5px solid #C7D2FE',
            padding: '4px 12px', borderRadius: 999,
            letterSpacing: '0.08em',
        },
        hero: {
            ...anim(2, 80),
            margin: '2rem 0 1.75rem',
            position: 'relative', zIndex: 1,
        },
        heroTitle: {
            fontSize: 40,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: '#1E1B4B',
            marginBottom: 12,
        },
        heroGrad: {
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
        },
        heroSub: {
            fontSize: 15, color: '#4B5563',
            lineHeight: 1.7, maxWidth: 360,
            fontWeight: 400,
        },
        captureWrap: {
            ...anim(3, 160),
            position: 'relative', zIndex: 1,
        },
        captureZone: {
            border: '2px dashed #C7D2FE',
            borderRadius: 28, minHeight: 230,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column',
            gap: 14, cursor: 'pointer',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(238,242,255,0.8))',
            backdropFilter: 'blur(8px)',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
        },
        captureIcon: {
            width: 64, height: 64,
            background: '#fff',
            border: '2px solid #E0E7FF',
            borderRadius: 20,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28,
            boxShadow: '0 8px 24px rgba(99,102,241,0.15)',
            transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        },
        captureHint: {
            fontSize: 15, fontWeight: 700,
            color: '#4F46E5',
        },
        captureSub: {
            fontSize: 12, color: '#A5B4FC',
            letterSpacing: '0.05em',
        },
        divider: {
            display: 'flex', alignItems: 'center',
            gap: 12, margin: '14px 0',
        },
        divLine: { flex: 1, height: 1, background: 'rgba(99,102,241,0.15)' },
        divText: { fontSize: 11, color: '#C7D2FE', fontWeight: 600, letterSpacing: '0.08em' },
        camBtn: {
            width: '100%', padding: 14,
            background: '#fff', color: '#4F46E5',
            border: '2px solid #E0E7FF',
            borderRadius: 18, fontSize: 14, fontWeight: 700,
            fontFamily: 'system-ui, sans-serif', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
            transition: 'all 0.2s',
            boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
        },
        textarea: {
            width: '100%', marginTop: 14,
            padding: '14px 18px', borderRadius: 18,
            border: '2px solid #E0E7FF',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            fontSize: 14, fontWeight: 500,
            fontFamily: 'system-ui, sans-serif',
            color: '#1E1B4B', resize: 'none',
            outline: 'none', lineHeight: 1.6,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
        },
        genBtn: (disabled) => ({
            marginTop: 14, width: '100%', padding: 17,
            background: disabled
                ? '#E0E7FF'
                : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            color: disabled ? '#A5B4FC' : '#fff',
            border: 'none', borderRadius: 18,
            fontSize: 16, fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: disabled ? 'none' : '0 6px 28px rgba(99,102,241,0.4)',
            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10,
            letterSpacing: '-0.01em',
        }),
    };

    const disabled = !base64 && !context;

    return (
        <div style={S.shell}>
            <div style={S.glow1} />
            <div style={S.glow2} />

            {/* Header */}
            <div style={S.header}>
                <div style={S.logoWrap}>
                    <div style={S.logoIcon}>📸</div>
                    <span style={S.logoText}>PathBranch</span>
                </div>
                <span style={S.badge}>BETA</span>
            </div>

            {/* Hero */}
            <div style={S.hero}>
                <h1 style={S.heroTitle}>
                    Freeze a moment.<br />
                    <span style={S.heroGrad}>Explore every future.</span>
                </h1>
                <p style={S.heroSub}>
                    Capture where you are right now — AI maps all possible paths your next decision could take you.
                </p>
            </div>

            {/* Camera */}
            {cameraOpen && (
                <div style={{ ...anim(3, 0), position: 'relative', zIndex: 1 }}>
                    <div style={{ borderRadius: 24, overflow: 'hidden', border: '2px solid #C7D2FE', marginBottom: 10, boxShadow: '0 8px 32px rgba(99,102,241,0.15)' }}>
                        <video ref={videoRef} style={{ width: '100%', display: 'block' }} autoPlay playsInline />
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={takePhoto} style={{ ...S.genBtn(false), flex: 1, marginTop: 0 }}>📸 Take Photo</button>
                        <button onClick={stopCamera} style={{ ...S.camBtn, width: 'auto', padding: '14px 20px' }}>✕</button>
                    </div>
                </div>
            )}

            {/* Upload */}
            {!cameraOpen && (
                <div style={S.captureWrap}>
                    <div
                        onClick={() => fileRef.current.click()}
                        style={S.captureZone}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#6366F1';
                            e.currentTarget.style.boxShadow = '0 0 0 6px rgba(99,102,241,0.1), 0 8px 32px rgba(99,102,241,0.15)';
                            e.currentTarget.querySelector('.cam-icon').style.transform = 'scale(1.1) rotate(-5deg)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = '#C7D2FE';
                            e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.08)';
                            e.currentTarget.querySelector('.cam-icon').style.transform = 'scale(1) rotate(0deg)';
                        }}
                    >
                        {preview ? (
                            <img src={preview} alt="preview" style={{ width: '100%', height: 230, objectFit: 'cover', borderRadius: 26 }} />
                        ) : (
                            <>
                                <div className="cam-icon" style={S.captureIcon}>📷</div>
                                <span style={S.captureHint}>Tap to upload a photo</span>
                                <span style={S.captureSub}>desk · room · street · anywhere</span>
                            </>
                        )}
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

            {!cameraOpen && (
                <>
                    <div style={{ ...anim(4, 240), position: 'relative', zIndex: 1 }}>
                        <div style={S.divider}>
                            <div style={S.divLine} /><span style={S.divText}>OR</span><div style={S.divLine} />
                        </div>
                        <button
                            onClick={openCamera}
                            style={S.camBtn}
                            onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.borderColor = '#6366F1'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E0E7FF'; }}
                        >
                            📷 Open Camera
                        </button>
                    </div>

                    <div style={{ ...anim(5, 320), position: 'relative', zIndex: 1 }}>
                        <textarea
                            value={context}
                            onChange={e => setContext(e.target.value)}
                            placeholder="What are you doing right now? (optional)"
                            rows={2}
                            style={S.textarea}
                            onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                            onBlur={e => { e.target.style.borderColor = '#E0E7FF'; e.target.style.boxShadow = '0 2px 12px rgba(99,102,241,0.06)'; }}
                        />
                    </div>

                    <div style={{ ...anim(6, 400), position: 'relative', zIndex: 1 }}>
                        <button
                            disabled={disabled}
                            onClick={() => onCapture(base64, context)}
                            style={S.genBtn(disabled)}
                            onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(99,102,241,0.5)'; } }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = disabled ? 'none' : '0 6px 28px rgba(99,102,241,0.4)'; }}
                            onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'; }}
                            onMouseUp={e => { if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        >
                            🌿 Generate my paths
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}