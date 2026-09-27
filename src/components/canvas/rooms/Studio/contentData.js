/**
 * Studio Content Data
 *
 * This file contains all content items for the Studio monitor tower.
 * Repurposed as a technical skills directory: each "platform" is a skill
 * category, and each monitor shows one skill from the resume.
 *
 * Monitor screens use the generic (blank) device bezel textures rather than
 * any custom baked artwork, since the skill items don't have illustrated covers.
 */

const MONITOR_FRONT = '/textures/studio/monitor_front.webp';
const MONITOR_FRONT_PAINTED = '/textures/studio/monitor_front_painted.webp';
const TV_FRONT = '/textures/studio/tv_front.webp';
const TV_FRONT_PAINTED = '/textures/studio/tv_front_painted.webp';
const PHONE_FRONT = '/textures/studio/phone_front.webp';
const PHONE_FRONT_PAINTED = '/textures/studio/phone_front_painted.webp';

export const PLATFORM_CONFIG = {
    languages: {
        color: '#3d3226',
        accentColor: '#2b2016',
        icon: '{ }',
        label: 'Languages',
        shape: 'tv',
    },
    frontend: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '◧',
        label: 'Frontend',
        shape: 'monitor',
    },
    backend: {
        color: '#2E8B57',
        accentColor: '#1f5f3d',
        icon: '⚙',
        label: 'Backend',
        shape: 'phone',
    },
    databases: {
        color: '#8B4513',
        accentColor: '#5e2e0d',
        icon: '⛁',
        label: 'Databases',
        shape: 'tv',
    },
    cloud: {
        color: '#FF9900',
        accentColor: '#cc7a00',
        icon: '☁',
        label: 'Cloud & DevOps',
        shape: 'monitor',
    },
    tools: {
        color: '#6f6248',
        accentColor: '#444444',
        icon: '✦',
        label: 'Tools',
        shape: 'phone',
    },
};

const SHAPE_TEXTURES = {
    tv: { frontTexture: TV_FRONT, paintedFrontTexture: TV_FRONT_PAINTED },
    monitor: { frontTexture: MONITOR_FRONT, paintedFrontTexture: MONITOR_FRONT_PAINTED },
    phone: { frontTexture: PHONE_FRONT, paintedFrontTexture: PHONE_FRONT_PAINTED },
};

// Skills pulled directly from the resume, grouped by category.
const RAW_CONTENT_DATA = [
    // ============ Languages ============
    { id: 'lang-c', platform: 'languages', title: 'C', description: 'Systems-level programming fundamentals.', date: '2023-01-01' },
    { id: 'lang-cpp', platform: 'languages', title: 'C++', description: 'Data structures, algorithms, and competitive programming.', date: '2023-01-01' },
    { id: 'lang-java', platform: 'languages', title: 'Java', description: 'Object-oriented programming and backend fundamentals.', date: '2023-01-01' },
    { id: 'lang-js', platform: 'languages', title: 'JavaScript', description: 'Core language behind all of my full-stack projects.', date: '2023-01-01' },
    { id: 'lang-ts', platform: 'languages', title: 'TypeScript', description: 'Used for type-safe apps like Content Genie.', date: '2023-01-01' },
    { id: 'lang-py', platform: 'languages', title: 'Python', description: 'Used for AI/remote-sensing pipelines in Vanvitrak.', date: '2023-01-01' },

    // ============ Frontend ============
    { id: 'fe-react', platform: 'frontend', title: 'React.js', description: 'Building interactive UIs and dashboards.', date: '2023-01-01' },
    { id: 'fe-next', platform: 'frontend', title: 'Next.js', description: 'Full-stack React framework used in Vanvitrak, Content Genie, and the LMS.', date: '2023-01-01' },
    { id: 'fe-html', platform: 'frontend', title: 'HTML', description: 'Semantic markup fundamentals.', date: '2023-01-01' },
    { id: 'fe-css', platform: 'frontend', title: 'CSS', description: 'Styling and layout fundamentals.', date: '2023-01-01' },
    { id: 'fe-tailwind', platform: 'frontend', title: 'Tailwind CSS', description: 'Utility-first styling used across recent projects.', date: '2023-01-01' },

    // ============ Backend ============
    { id: 'be-node', platform: 'backend', title: 'Node.js', description: 'Backend runtime for Express-based APIs.', date: '2023-01-01' },
    { id: 'be-express', platform: 'backend', title: 'Express.js', description: 'REST API framework used in Vanvitrak and Socioscrape.', date: '2023-01-01' },
    { id: 'be-rest', platform: 'backend', title: 'REST APIs', description: 'Designing and consuming RESTful services.', date: '2023-01-01' },

    // ============ Databases ============
    { id: 'db-postgres', platform: 'databases', title: 'PostgreSQL', description: 'Relational storage with Drizzle ORM in Content Genie.', date: '2023-01-01' },
    { id: 'db-mongo', platform: 'databases', title: 'MongoDB', description: 'Document storage for Vanvitrak, including blockchain-verified records.', date: '2023-01-01' },
    { id: 'db-dynamo', platform: 'databases', title: 'DynamoDB', description: 'AWS-managed NoSQL database.', date: '2023-01-01' },
    { id: 'db-mysql', platform: 'databases', title: 'MySQL', description: 'Relational schema design for Socioscrape.', date: '2023-01-01' },

    // ============ Cloud & DevOps ============
    { id: 'cloud-aws', platform: 'cloud', title: 'AWS', description: 'S3, Lambda, API Gateway, and CloudFront for the Enterprise LMS backend.', date: '2023-01-01' },
    { id: 'cloud-docker', platform: 'cloud', title: 'Docker', description: 'Containerizing backend services for deployment.', date: '2023-01-01' },
    { id: 'cloud-vercel', platform: 'cloud', title: 'Vercel', description: 'Frontend deployment for Next.js apps.', date: '2023-01-01' },

    // ============ Tools ============
    { id: 'tool-git', platform: 'tools', title: 'Git & GitHub', description: 'Version control across all projects.', date: '2023-01-01' },
    { id: 'tool-postman', platform: 'tools', title: 'Postman', description: 'API testing and documentation.', date: '2023-01-01' },
    { id: 'tool-figma', platform: 'tools', title: 'Figma', description: 'UI/UX design and prototyping.', date: '2023-01-01' },
];

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    const shape = PLATFORM_CONFIG[item.platform]?.shape || 'monitor';
    return {
        ...item,
        url: null,
        ...SHAPE_TEXTURES[shape],
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
