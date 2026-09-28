import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PROFILE, PROJECTS, SKILL_GROUPS, EDUCATION, ACHIEVEMENTS } from '../../config/profile';
import '../../styles/DevOS.scss';

// Events the 3D scene listens for on `window`. While the OS is open they are
// stopped at `document` (after React has handled them) so the camera never moves.
const BLOCKED_EVENTS = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'pointermove', 'mousemove', 'keydown'];

const TECH_COUNT = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

const APPS = [
    { id: 'home', label: 'Home', glyph: '⌂' },
    { id: 'projects', label: 'Projects', glyph: '▤' },
    { id: 'skills', label: 'Skills', glyph: '{ }' },
    { id: 'education', label: 'Education', glyph: '✎' },
    { id: 'achievements', label: 'Achievements', glyph: '★' },
    { id: 'contact', label: 'Contact', glyph: '@' },
];

const BOOT_LINES = [
    { text: 'PK-OS 1.0 · booting developer workspace', tag: null },
    { text: `mounting ~/projects`, value: `${PROJECTS.length} found`, tag: 'ok' },
    { text: 'indexing skills', value: `${TECH_COUNT} technologies`, tag: 'ok' },
    { text: 'loading education', value: 'CGPA 9.54 / 10', tag: 'ok' },
    { text: 'loading achievements', value: `${ACHIEVEMENTS.length} awards`, tag: 'ok' },
    { text: 'contact channels', value: 'online', tag: 'ok' },
];

// Camera-style zoom applied to the room while entering/leaving the OS
const ZOOM = 1.22;
const ZOOM_FILTER = 'blur(7px) saturate(0.5)';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Missing = ({ field }) => (
    <span className="os-missing">
        missing · add <code>{field}</code> in <code>src/config/profile.js</code>
    </span>
);

const Chips = ({ items }) => (
    <ul className="os-chips">
        {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
);

// ---------------------------------------------------------------------------
// Apps
// ---------------------------------------------------------------------------

const HomeApp = ({ onOpenApp }) => (
    <div className="os-home">
        <p className="os-prompt"><span>$</span> whoami</p>
        <h1 className="os-name"><span className="os-highlight">{PROFILE.name}</span></h1>
        <p className="os-role">
            <span className="os-status" aria-hidden="true" />
            {PROFILE.role} · {PROFILE.location}
        </p>
        <p className="os-summary">{PROFILE.summary}</p>

        <div className="os-stats">
            <div className="os-stat"><strong>9.54</strong><span>CGPA / 10</span></div>
            <div className="os-stat"><strong>{PROJECTS.length}</strong><span>full-stack projects</span></div>
            <div className="os-stat"><strong>{ACHIEVEMENTS.length}</strong><span>hackathon &amp; competition awards</span></div>
            <div className="os-stat"><strong>{TECH_COUNT}+</strong><span>technologies</span></div>
        </div>

        <div className="os-actions">
            <a className="os-btn os-btn--primary" href={PROFILE.resume} download="Pranav_Kad_Resume.pdf">Download Resume ↓</a>
            <button type="button" className="os-btn" onClick={() => onOpenApp('projects')}>Open projects →</button>
            <a className="os-btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="os-btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
    </div>
);

const ProjectsApp = ({ onOpenProject, cardRefs }) => (
    <div>
        <p className="os-app-intro">
            <code>ls ~/projects</code> — select a project to open its case study.
        </p>
        <div className="os-project-grid">
            {PROJECTS.map((p, i) => (
                <button
                    type="button"
                    key={p.id}
                    className="os-project-card"
                    onClick={() => onOpenProject(p.id)}
                    ref={(el) => { cardRefs.current[p.id] = el; }}
                >
                    <span className="os-project-card__meta">
                        <span>{`// ${String(i + 1).padStart(2, '0')}`}</span>
                        <span>{p.year}</span>
                    </span>
                    <span className="os-project-card__title">{p.title}</span>
                    <span className="os-project-card__tagline">{p.tagline}</span>
                    <Chips items={p.stack} />
                    <span className="os-project-card__open">open case study →</span>
                </button>
            ))}
        </div>
    </div>
);

const SkillsApp = () => (
    <div className="os-skill-grid">
        {SKILL_GROUPS.map((g) => (
            <section key={g.label} className="os-panel">
                <h3 className="os-panel__label">{`// ${g.label.toLowerCase()}`}</h3>
                <Chips items={g.items} />
            </section>
        ))}
    </div>
);

const EducationApp = () => (
    <ol className="os-timeline">
        {EDUCATION.map((e) => (
            <li key={e.degree}>
                <span className="os-timeline__years">{e.years}</span>
                <strong>{e.degree}</strong>
                <span className="os-muted">{e.school}</span>
                <span className="os-timeline__score">{e.score}</span>
            </li>
        ))}
    </ol>
);

const AchievementsApp = () => (
    <ul className="os-awards">
        {ACHIEVEMENTS.map((a) => (
            <li key={a.title} className="os-award">
                <span className={`os-award__stamp ${a.rank.length > 4 ? 'os-award__stamp--long' : ''}`}>{a.rank}</span>
                <div>
                    <strong>{a.title}</strong>
                    <span className="os-muted">{a.detail} · {a.year}</span>
                </div>
            </li>
        ))}
    </ul>
);

const ContactApp = () => (
    <div className="os-contact">
        <p className="os-app-intro">Fastest way to reach me is email. Resume is one click away.</p>
        <ul className="os-contact-list">
            <li><span>email</span><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li><span>phone</span><a href={`tel:${PROFILE.phone.replace(/-/g, '')}`}>{PROFILE.phone}</a></li>
            <li><span>linkedin</span><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/pranav-kad</a></li>
            <li><span>github</span><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">github.com/Pranav-K15</a></li>
            <li><span>resume</span><a href={PROFILE.resume} download="Pranav_Kad_Resume.pdf">Pranav_Kad_Resume.pdf ↓</a></li>
        </ul>
    </div>
);

// ---------------------------------------------------------------------------
// Case study
// ---------------------------------------------------------------------------

const CaseStudy = ({ project, onClose, onStep, closeRef }) => (
    <div className="os-case" role="dialog" aria-modal="true" aria-labelledby="os-case-title">
        <div className="os-case__bar">
            <button type="button" className="os-link-btn" onClick={onClose} ref={closeRef}>← back to projects</button>
            <span className="os-case__path">~/projects/{project.id}/README.md</span>
            <span className="os-case__nav">
                <button type="button" className="os-link-btn" onClick={() => onStep(-1)} aria-label="Previous project">‹ prev</button>
                <button type="button" className="os-link-btn" onClick={() => onStep(1)} aria-label="Next project">next ›</button>
            </span>
        </div>

        <div className="os-case__body">
            <p className="os-case__year">{project.year}</p>
            <h2 id="os-case-title" className="os-case__title">{project.title}</h2>
            <p className="os-case__tagline">{project.tagline}</p>

            <section>
                <h3>## Overview</h3>
                <p>{project.overview}</p>
            </section>

            <section>
                <h3>## My contribution</h3>
                <p className="os-case__role">
                    <span className="os-muted">role:</span> {project.role ? project.role : <Missing field="role" />}
                </p>
                <ul className="os-bullets">
                    {project.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
            </section>

            <section>
                <h3>## Tech stack</h3>
                <Chips items={project.stackDetail || project.stack} />
            </section>

            <section>
                <h3>## Architecture</h3>
                <p className="os-muted os-case__note">Components named in the resume:</p>
                <div className="os-arch">
                    {project.architecture.map((a) => (
                        <div key={a.layer} className="os-arch__node">
                            <span className="os-arch__layer">{a.layer}</span>
                            <span>{a.detail}</span>
                        </div>
                    ))}
                </div>
                <p className="os-case__note">
                    <span className="os-muted">data flow:</span>{' '}
                    {project.architectureNotes ? project.architectureNotes : <Missing field="architectureNotes" />}
                </p>
            </section>

            <section>
                <h3>## Links</h3>
                <ul className="os-links">
                    <li>
                        <span className="os-muted">github</span>
                        {project.github
                            ? <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github} ↗</a>
                            : <Missing field="github" />}
                    </li>
                    <li>
                        <span className="os-muted">live demo</span>
                        {project.demo
                            ? <a href={project.demo} target="_blank" rel="noopener noreferrer">{project.demo} ↗</a>
                            : <Missing field="demo" />}
                    </li>
                </ul>
            </section>
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// Developer OS shell
// ---------------------------------------------------------------------------

const DevOS = ({ onSceneFreeze }) => {
    // closed -> entering -> booting -> desktop -> exiting -> closed
    const [phase, setPhase] = useState('closed');
    const [app, setApp] = useState('home');
    const [projectId, setProjectId] = useState(null);
    const [bootStep, setBootStep] = useState(0);
    const [clock, setClock] = useState('');

    const launcherRef = useRef(null);
    const rootRef = useRef(null);
    const backRef = useRef(null);
    const caseCloseRef = useRef(null);
    const cardRefs = useRef({});
    const dockRefs = useRef([]);
    const timelineRef = useRef(null);
    const restoreFocusRef = useRef(false);

    const isOpen = phase !== 'closed';
    const project = PROJECTS.find((p) => p.id === projectId) || null;

    const getWrapper = () => document.querySelector('.canvas-wrapper');

    const open = useCallback(() => {
        if (phase !== 'closed') return;
        setApp('home');
        setProjectId(null);
        setBootStep(0);

        if (prefersReducedMotion()) {
            setPhase('desktop');
            onSceneFreeze?.(true);
            return;
        }

        setPhase('entering');
        timelineRef.current?.kill();
        timelineRef.current = gsap.timeline({
            onComplete: () => {
                setPhase('booting');
                onSceneFreeze?.(true);
                // The OS now covers the screen. Drop the zoom so the canvas is never
                // measured (e.g. on window resize) while scaled.
                gsap.set(getWrapper(), { clearProps: 'transform,filter' });
            },
        }).to(getWrapper(), {
            scale: ZOOM,
            filter: ZOOM_FILTER,
            duration: 0.75,
            ease: 'power2.in',
        });
    }, [phase, onSceneFreeze]);

    const close = useCallback(() => {
        if (phase === 'closed' || phase === 'exiting') return;
        setPhase('exiting');
        onSceneFreeze?.(false);
        timelineRef.current?.kill();

        const done = () => {
            gsap.set(getWrapper(), { clearProps: 'transform,filter' });
            // Make R3F re-measure the canvas in case anything resized while zoomed
            window.dispatchEvent(new Event('resize'));
            setPhase('closed');
            setProjectId(null);
            restoreFocusRef.current = true;
        };

        if (prefersReducedMotion()) {
            done();
            return;
        }

        timelineRef.current = gsap.timeline({ onComplete: done }).fromTo(
            getWrapper(),
            { scale: ZOOM, filter: ZOOM_FILTER },
            { scale: 1, filter: 'blur(0px) saturate(1)', duration: 0.6, delay: 0.15, ease: 'power2.out' }
        );
    }, [phase, onSceneFreeze]);

    // Return focus to the launcher once it is visible again
    useEffect(() => {
        if (phase === 'closed' && restoreFocusRef.current) {
            restoreFocusRef.current = false;
            launcherRef.current?.focus();
        }
    }, [phase]);

    // Boot sequence
    useEffect(() => {
        if (phase !== 'booting') return;
        if (bootStep < BOOT_LINES.length) {
            const t = setTimeout(() => setBootStep((s) => s + 1), bootStep === 0 ? 260 : 170);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => setPhase('desktop'), 520);
        return () => clearTimeout(t);
    }, [phase, bootStep]);

    // Keep keyboard/scroll input away from the 3D scene while open
    useEffect(() => {
        if (!isOpen) return;
        const stop = (e) => e.stopPropagation();
        BLOCKED_EVENTS.forEach((type) => document.addEventListener(type, stop, { passive: true }));
        return () => BLOCKED_EVENTS.forEach((type) => document.removeEventListener(type, stop));
    }, [isOpen]);

    // Clock in the top bar
    useEffect(() => {
        if (phase !== 'desktop') return;
        const tick = () => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        tick();
        const id = setInterval(tick, 20000);
        return () => clearInterval(id);
    }, [phase]);

    // Make the room UI behind the OS unreachable for keyboard / screen readers
    useEffect(() => {
        if (!isOpen) return;
        const behind = document.querySelectorAll('.canvas-wrapper, .navigation-ui, .sr-overlay');
        behind.forEach((el) => { el.inert = true; });
        return () => behind.forEach((el) => { el.inert = false; });
    }, [isOpen]);

    // Focus management
    useEffect(() => {
        if (phase === 'booting') rootRef.current?.focus();
        if (phase === 'desktop' && !projectId) backRef.current?.focus();
    }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (projectId) caseCloseRef.current?.focus();
    }, [projectId]);

    const closeProject = () => {
        const id = projectId;
        setProjectId(null);
        requestAnimationFrame(() => cardRefs.current[id]?.focus());
    };

    const stepProject = (dir) => {
        const idx = PROJECTS.findIndex((p) => p.id === projectId);
        setProjectId(PROJECTS[(idx + dir + PROJECTS.length) % PROJECTS.length].id);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            if (projectId) closeProject();
            else close();
            return;
        }
        if (phase === 'booting') setPhase('desktop');
    };

    const onDockKeyDown = (e, index) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const next = (index + keys[e.key] + APPS.length) % APPS.length;
        setApp(APPS[next].id);
        setProjectId(null);
        dockRefs.current[next]?.focus();
    };

    const openApp = (id) => {
        setApp(id);
        setProjectId(null);
    };

    const currentApp = APPS.find((a) => a.id === app);

    return (
        <>
            <div className={`os-launcher ${isOpen ? 'os-launcher--hidden' : ''}`}>
                <button type="button" className="os-launch-btn os-launch-btn--primary" onClick={open} ref={launcherRef}>
                    <span className="os-pulse" aria-hidden="true" />
                    View Overview
                </button>
                <a className="os-launch-btn" href={PROFILE.resume} download="Pranav_Kad_Resume.pdf">
                    Resume ↓
                </a>
            </div>

            {phase === 'entering' && <div className="os-scan" aria-hidden="true" />}

            {(phase === 'booting' || phase === 'desktop' || phase === 'exiting') && (
                <div
                    className={`os ${phase === 'exiting' ? 'os--exiting' : ''}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Developer OS overview"
                    tabIndex={-1}
                    ref={rootRef}
                    onKeyDown={onKeyDown}
                    onClick={phase === 'booting'
                        ? (e) => { if (!e.target.closest('.os-back')) setPhase('desktop'); }
                        : undefined}
                >
                    <div className="os-scanlines" aria-hidden="true" />

                    {/* Top bar - always visible */}
                    <header className="os-topbar">
                        <span className="os-topbar__brand">◆ PK-OS</span>
                        <span className="os-topbar__path">
                            pranav@portfolio:~/{phase === 'booting' ? 'boot' : (project ? `projects/${project.id}` : app)}
                        </span>
                        {clock && phase === 'desktop' && <span className="os-topbar__clock">{clock}</span>}
                        <button type="button" className="os-back" onClick={close} ref={backRef}>
                            ← Back to Room <kbd>Esc</kbd>
                        </button>
                    </header>

                    {phase === 'booting' ? (
                        <div className="os-boot" aria-live="polite">
                            {BOOT_LINES.slice(0, bootStep).map((line) => (
                                <p key={line.text} className="os-boot__line">
                                    {line.tag && <span className="os-boot__tag">[ ok ]</span>}
                                    <span>{line.text}</span>
                                    {line.value && <span className="os-boot__value">{line.value}</span>}
                                </p>
                            ))}
                            <p className="os-boot__line os-boot__cursor-line">
                                <span className="os-cursor" aria-hidden="true" />
                            </p>
                            <p className="os-boot__hint">press any key to skip</p>
                        </div>
                    ) : (
                        <div className="os-desktop">
                            <nav className="os-dock" aria-label="Apps" role="tablist" aria-orientation="vertical">
                                {APPS.map((a, i) => (
                                    <button
                                        key={a.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={app === a.id}
                                        tabIndex={app === a.id ? 0 : -1}
                                        className={`os-dock__item ${app === a.id ? 'active' : ''}`}
                                        onClick={() => openApp(a.id)}
                                        onKeyDown={(e) => onDockKeyDown(e, i)}
                                        ref={(el) => { dockRefs.current[i] = el; }}
                                    >
                                        <span className="os-dock__glyph" aria-hidden="true">{a.glyph}</span>
                                        <span className="os-dock__label">{a.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <main className="os-window" role="tabpanel" aria-label={currentApp.label}>
                                <div className="os-window__bar">
                                    <span className="os-window__dots" aria-hidden="true"><i /><i /><i /></span>
                                    <span className="os-window__title">{currentApp.label.toLowerCase()}.app</span>
                                </div>
                                <div className="os-window__body" key={app}>
                                    {app === 'home' && <HomeApp onOpenApp={openApp} />}
                                    {app === 'projects' && <ProjectsApp onOpenProject={setProjectId} cardRefs={cardRefs} />}
                                    {app === 'skills' && <SkillsApp />}
                                    {app === 'education' && <EducationApp />}
                                    {app === 'achievements' && <AchievementsApp />}
                                    {app === 'contact' && <ContactApp />}
                                </div>

                                {project && (
                                    <CaseStudy
                                        project={project}
                                        onClose={closeProject}
                                        onStep={stepProject}
                                        closeRef={caseCloseRef}
                                    />
                                )}
                            </main>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default DevOS;
