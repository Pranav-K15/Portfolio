import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Local fonts (TTF format required by troika)
const TITLE_FONT_URL = '/fonts/PermanentMarker-Regular.ttf';
const BODY_FONT_URL = '/fonts/Kalam-Regular.ttf';

const INK = '#2b2016';

// Name sits above the avatar's head so it's readable from the start of the corridor
const NAME_Y = 1.0;

/**
 * HeroText - name in marker ink with a tagline underneath.
 * Letters and tagline words split apart as the camera walks through them.
 */
const HeroText = ({ position = [0, 0.3, 0] }) => {
    const groupRef = useRef();
    const letterRefs = useRef([]);
    const taglineRefs = useRef([]);
    const { camera } = useThree();

    // Responsive scale based on screen width - FLUID (no breakpoints)
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const minWidth = 320;
            const maxWidth = 1200;
            const minScale = 0.65;
            const maxScale = 1.0;

            const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
            const t = (clampedWidth - minWidth) / (maxWidth - minWidth);
            setScale(minScale + t * (maxScale - minScale));
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Split and dodge state
    const splitAmount = useRef(0);
    const targetSplit = useRef(0);
    const floatY = useRef(0);
    // Pre-allocate Vector3 to avoid per-frame garbage collection
    const worldPosVec = useRef(new THREE.Vector3());

    // Letter positions for "PRANAV" split effect
    const letters = useMemo(() => {
        const word = 'PRANAV';
        const spacing = 0.42;
        const start = -((word.length - 1) * spacing) / 2;
        return word.split('').map((char, i) => {
            const baseX = start + i * spacing;
            return { key: `${char}-${i}`, char, baseX, splitDir: baseX * 1.6 };
        });
    }, []);

    // Tagline words for split effect
    const taglineWords = useMemo(() => [
        { text: '—', baseX: -0.95, splitDir: -1.5 },
        { text: 'full-stack', baseX: -0.42, splitDir: -0.8 },
        { text: 'developer', baseX: 0.42, splitDir: 0.8 },
        { text: '—', baseX: 0.95, splitDir: 1.5 },
    ], []);

    // Animation loop
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // === SPLIT LOGIC based on camera distance ===
        groupRef.current.getWorldPosition(worldPosVec.current);
        const distance = camera.position.z - worldPosVec.current.z;

        const SPLIT_START = 3;
        const SPLIT_PEAK = 0;
        const SPLIT_END = -2;
        const SPLIT_AMOUNT = 0.9;

        if (distance > SPLIT_PEAK && distance < SPLIT_START) {
            const t = (SPLIT_START - distance) / (SPLIT_START - SPLIT_PEAK);
            targetSplit.current = SPLIT_AMOUNT * easeOutQuad(t);
        } else if (distance <= SPLIT_PEAK && distance > SPLIT_END) {
            const t = (distance - SPLIT_END) / (SPLIT_PEAK - SPLIT_END);
            targetSplit.current = SPLIT_AMOUNT * easeOutQuad(t);
        } else {
            targetSplit.current = 0;
        }

        splitAmount.current = THREE.MathUtils.lerp(splitAmount.current, targetSplit.current, 0.08);

        // Apply split to each letter of the name
        letterRefs.current.forEach((ref, i) => {
            if (ref) {
                // Ensure opacity is 1
                if (ref.material) ref.material.opacity = 1;
                ref.scale.setScalar(1); // Ensure scale is 1, no lingering pop effect

                const letter = letters[i];
                ref.position.x = letter.baseX + letter.splitDir * splitAmount.current;
                ref.position.y = NAME_Y + Math.sin(time * 0.7 + i * 0.5) * 0.015;
                ref.rotation.z = Math.sin(time * 0.5 + i) * 0.02 * (1 + splitAmount.current);
            }
        });

        // Apply split to tagline words
        taglineRefs.current.forEach((ref, i) => {
            if (ref) {
                // Ensure opacity is 1
                if (ref.material) ref.material.opacity = 1;

                const word = taglineWords[i];
                ref.position.x = word.baseX + word.splitDir * splitAmount.current * 0.6;
                ref.position.y = -0.45 + Math.sin(time * 0.6 + i * 0.3) * 0.008;
            }
        });

        // === FLOATING ANIMATION ===
        floatY.current = Math.sin(time * 0.5) * 0.02;
        // Don't override Y position entirely, add to base
        groupRef.current.position.y = position[1] + floatY.current;
    });

    return (
        <group ref={groupRef} position={position} scale={[scale, scale, 1]}>
            {letters.map((letter, i) => (
                <Text
                    key={letter.key}
                    ref={(el) => (letterRefs.current[i] = el)}
                    position={[letter.baseX, NAME_Y, 0]}
                    fontSize={0.62}
                    font={TITLE_FONT_URL}
                    color={INK}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0}
                >
                    {letter.char}
                </Text>
            ))}

            {taglineWords.map((word, i) => (
                <Text
                    key={`${word.text}-${i}`}
                    ref={(el) => (taglineRefs.current[i] = el)}
                    position={[word.baseX, -0.55, 0.3]}
                    fontSize={0.17}
                    font={BODY_FONT_URL}
                    color="#63563f"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.02}
                >
                    {word.text}
                </Text>
            ))}

            {/* Soft paper backing so the tagline + stack stay readable over the avatar */}
            <mesh position={[0, -0.6, 0.28]}>
                <planeGeometry args={[2.75, 0.52]} />
                <meshBasicMaterial color="#faf3e6" transparent opacity={0.82} depthWrite={false} />
            </mesh>

            <Text
                position={[0, -0.72, 0.3]}
                fontSize={0.1}
                font={BODY_FONT_URL}
                color="#6f6248"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.03}
            >
                Next.js · Node.js · Express · PostgreSQL · MongoDB · AWS
            </Text>

            {/* Hand-drawn underline beneath the name */}
            <mesh position={[0, NAME_Y - 0.38, 0]} rotation={[0, 0, -0.025]}>
                <planeGeometry args={[2.3, 0.022]} />
                <meshBasicMaterial color={INK} transparent opacity={0.75} side={2} />
            </mesh>
            <mesh position={[0.15, NAME_Y - 0.43, 0]} rotation={[0, 0, 0.02]}>
                <planeGeometry args={[1.7, 0.014]} />
                <meshBasicMaterial color={INK} transparent opacity={0.45} side={2} />
            </mesh>
        </group>
    );
};

// Easing function
const easeOutQuad = (t) => t * (2 - t);

export default HeroText;
