// Single source of truth for portfolio content (taken from the resume).
// Used by the 3D project cards and the Developer OS overview.
//
// Fields set to `null` are NOT on the resume. The Developer OS shows them as
// "missing — fill me in". Replace `null` with real values when you have them.

export const PROFILE = {
    name: 'Pranav Kad',
    role: 'Full-Stack Developer',
    location: 'Pune, India',
    summary:
        'Full-stack developer and B.E. student at MMCOE (SPPU) with a 9.54/10 CGPA. ' +
        'I build web apps end to end: Next.js and React frontends, Node.js/Express APIs, ' +
        'SQL and NoSQL databases, and deployments on AWS and Vercel.',
    email: 'pranavkad15@gmail.com',
    phone: '+91-9373498761',
    linkedin: 'https://www.linkedin.com/in/pranav-kad/',
    github: 'https://github.com/Pranav-K15',
    resume: '/resume/Pranav_Kad_Resume.pdf',
};

export const PROJECTS = [
    {
        id: 'vanvitrak',
        title: 'Vanvitrak',
        year: '2025',
        tagline: 'AI-powered land records verification platform',
        cardSummary: 'Land-record verification with WebGIS, OCR and satellite data, an MCP chatbot, and blockchain (SHA-256 + Solidity) document checks.',
        overview: 'An AI-powered land records verification system integrating WebGIS, OCR and satellite data.',
        role: null, // e.g. "Full-stack developer, team of 4"
        stack: ['Next.js', 'Express.js', 'MongoDB', 'Python'],
        stackDetail: ['Next.js', 'Express.js', 'MongoDB', 'Python', 'WebGIS', 'OCR', 'Solidity', 'MCP'],
        highlights: [
            'Integrated WebGIS, OCR and satellite data to verify land records.',
            'Built an MCP-based chatbot serving real-time land records, satellite layers and scheme eligibility.',
            'Implemented blockchain verification: PDF upload, SHA-256 hashing, MongoDB storage and Solidity smart-contract validation.',
            'Built an AI remote-sensing pipeline to map land assets and generate FRA claim polygons.',
        ],
        // Components named on the resume. How they connect is not documented yet.
        architecture: [
            { layer: 'Frontend', detail: 'Next.js web app' },
            { layer: 'API', detail: 'Express.js server' },
            { layer: 'Data', detail: 'MongoDB storage' },
            { layer: 'Geo / AI', detail: 'WebGIS, satellite data, OCR, Python remote-sensing pipeline' },
            { layer: 'Verification', detail: 'SHA-256 hashing + Solidity smart contract' },
            { layer: 'Assistant', detail: 'MCP-based chatbot' },
        ],
        architectureNotes: null, // data flow / diagram description
        github: null,
        demo: null,
        url: null,
    },
    {
        id: 'content-genie',
        title: 'Content Genie',
        year: '2025',
        tagline: 'AI-powered content generation web app',
        cardSummary: 'Generates content with the Gemini API. Clerk auth, credit-based payments, PostgreSQL + Drizzle ORM, Tailwind UI.',
        overview: 'An AI-powered web app that generates dynamic content using the Google Gemini API.',
        role: null,
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Gemini API'],
        stackDetail: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Google Gemini API', 'Clerk', 'Tailwind CSS'],
        highlights: [
            'Generates dynamic content with the Google Gemini API.',
            'Credit-based payment system and user authentication with Clerk.',
            'PostgreSQL with Drizzle ORM for storage; Tailwind CSS for the UI.',
        ],
        architecture: [
            { layer: 'Frontend', detail: 'Next.js + TypeScript, Tailwind CSS' },
            { layer: 'Auth', detail: 'Clerk' },
            { layer: 'AI', detail: 'Google Gemini API' },
            { layer: 'Data', detail: 'PostgreSQL via Drizzle ORM' },
            { layer: 'Billing', detail: 'Credit-based payment system' },
        ],
        architectureNotes: null,
        github: null,
        demo: null,
        url: null,
    },
    {
        id: 'lms',
        title: 'Enterprise LMS',
        year: '2025',
        tagline: 'Full-stack learning management system',
        cardSummary: 'Courses, video streaming and dashboards. Clerk auth, Stripe payments, AWS backend, Vercel frontend, Dockerized.',
        overview: 'A full-stack LMS with course management, video streaming and user dashboards.',
        role: null,
        stack: ['Next.js', 'Node.js', 'AWS', 'Docker'],
        stackDetail: ['Next.js', 'Node.js', 'AWS', 'Docker', 'Vercel', 'Clerk', 'Stripe'],
        highlights: [
            'Course management, video streaming and user dashboards.',
            'Clerk authentication and Stripe payment processing.',
            'Backend on AWS, frontend on Vercel, containerized with Docker.',
        ],
        architecture: [
            { layer: 'Frontend', detail: 'Next.js, deployed on Vercel' },
            { layer: 'Backend', detail: 'Node.js, deployed on AWS' },
            { layer: 'Runtime', detail: 'Docker containers' },
            { layer: 'Auth', detail: 'Clerk' },
            { layer: 'Payments', detail: 'Stripe' },
        ],
        architectureNotes: null,
        github: null,
        demo: null,
        url: null,
    },
    {
        id: 'socioscrape',
        title: 'Socioscrape',
        year: '2024',
        tagline: 'Social media forensic analysis platform (SIH 2024)',
        cardSummary: 'Forensic analysis of social media data for legal cases. I built the dashboards and designed the MySQL schema.',
        overview: 'A social media investigation platform for legal and forensic use cases, built for Smart India Hackathon 2024.',
        role: 'Frontend development and database design (team project)',
        stack: ['JavaScript', 'Node.js', 'Express.js', 'MySQL'],
        stackDetail: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'AI/ML'],
        highlights: [
            'Frontend development and database design for a legal/forensic social media investigation platform.',
            'Interactive dashboards in HTML, CSS and JavaScript to analyze social media data.',
            'Designed and managed the MySQL schema for investigation case data.',
        ],
        architecture: [
            { layer: 'Frontend', detail: 'HTML, CSS, JavaScript dashboards' },
            { layer: 'Backend', detail: 'Node.js + Express.js' },
            { layer: 'Data', detail: 'MySQL (investigation case data)' },
            { layer: 'Analysis', detail: 'AI/ML components' },
        ],
        architectureNotes: null,
        github: null,
        demo: null,
        url: null,
    },
];

export const SKILL_GROUPS = [
    { label: 'Languages', items: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'] },
    { label: 'Frontend', items: ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'] },
    { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
    { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'MySQL'] },
    { label: 'Cloud & DevOps', items: ['AWS (S3, Lambda, API Gateway, CloudFront)', 'Docker', 'Vercel'] },
    { label: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Figma'] },
];

export const EDUCATION = [
    { degree: 'B.E.', school: 'MMCOE, Savitribai Phule Pune University', score: 'CGPA 9.54/10 (current)', years: '2023 – 2027' },
    { degree: 'Senior Secondary (HSC)', school: 'Maharashtra State Board', score: '78.60%', years: '2023' },
    { degree: 'Secondary (SSC)', school: 'Maharashtra State Board', score: '93.20%', years: '2021' },
];

export const ACHIEVEMENTS = [
    { rank: '2nd', title: 'Smart India Hackathon 2024 — Internal Hackathon (Idea Competition)', detail: 'MMCOE, Pune', year: '2024' },
    { rank: '3rd', title: 'GDG Hackathon', detail: 'Google Developer Groups', year: '2025' },
    { rank: '3rd', title: 'Impetus 2025-26 — International Level Project Competition', detail: 'PICT, Pune · 300+ participants', year: 'Mar 2026' },
    { rank: 'Consolation', title: 'Vishwanova — National Level Project Competition', detail: 'MIT-WPU, Pune · 700+ teams, 3000+ participants', year: 'Apr 2026' },
];
