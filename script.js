// ============================================
// GLOBAL STATE
// ============================================

let currentScene = 'home';
// World transform coordinates (relative to initial -200vw, -100vh position)
const sceneCoordinates = {
    home: { x: -200, y: -100 },      // Initial position to show home scene at (200vw, 100vh)
    experience: { x: -200, y: 0 },   // Show experience scene at (200vw, 0vh) - above home
    projects: { x: -100, y: -100 },  // Show projects scene at (100vw, 100vh) - right of home
    activities: { x: -200, y: -200 }, // Show activities scene at (200vw, 200vh) - below home
    contact: { x: -300, y: -100 }    // Show contact scene at (300vw, 100vh) - left of home
};

// ============================================
// NAVIGATION
// ============================================

function navigateTo(scene) {
    if (currentScene === scene) return;
    
    // Flash overlay
    const overlay = document.getElementById('transition-overlay');
    gsap.to(overlay, {
        opacity: 0.15,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });
    
    // Update back button
    const backBtn = document.getElementById('back-btn');
    if (scene === 'home') {
        gsap.to(backBtn, { opacity: 0, duration: 0.2, onComplete: () => backBtn.style.display = 'none' });
    } else {
        backBtn.style.display = 'block';
        gsap.fromTo(backBtn, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    }
    
    // Pan world
    if (window.innerWidth >= 768) {
        const coords = sceneCoordinates[scene];
        gsap.to('#world', {
            x: `${coords.x}vw`,
            y: `${coords.y}vh`,
            duration: 1.2,
            ease: 'power3.inOut'
        });
    } else {
        // Mobile: scroll to scene
        const sceneEl = document.getElementById(`scene-${scene}`);
        sceneEl.scrollIntoView({ behavior: 'smooth' });
    }
    
    currentScene = scene;
    
    // Trigger scene-specific init
    if (scene === 'experience') {
        initExperienceScene();
    } else if (scene === 'projects') {
        initProjectsScene();
    } else if (scene === 'contact') {
        initContactScene();
    }
}

// ============================================
// ZONE 2: EXPERIENCE SCENE
// ============================================

let hasTyped = false;

function initExperienceScene() {
    const terminalContent = document.getElementById('terminal-content');
    const terminalWindow = document.querySelector('.terminal-window-container');
    
    // Entrance animation
    gsap.fromTo(terminalWindow, 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
    );
    
    // Typewriter effect (only once)
    if (!hasTyped) {
        startTypewriter();
        hasTyped = true;
    } else {
        // Show full content immediately
        terminalContent.innerHTML = getFullTerminalContent();
    }
}

function startTypewriter() {
    const terminalContent = document.getElementById('terminal-content');
    terminalContent.innerHTML = '';
    
    const content = [
        '$ whoami',
        '> Emily Do — CS + Math Student @ Stanford University',
        '',
        '$ cat experience.txt',
        '',
        '[2025–Present] Software Engineer Intern — Mercy Beyond Borders',
        '   React, Python, Airtable API | Santa Clara, CA',
        '   → Collaborated with 6+ engineers to build full-stack data platform',
        '   → Conducted 10+ user interviews, translating feedback into UI iterations',
        '   → Built React + TypeScript interface for 1,000+ structured scholar records',
        '   → Developed Python/SQL pipelines, reducing data retrieval time by 80%',
        '   → Trained custom ML model improving tagging accuracy across datasets',
        '   → Automated grant reporting, saving 10+ manual hours per cycle',
        '',
        '[2024–2025] Software Engineer Intern — Swoon Learning',
        '   TypeScript, React, PostgreSQL, Docker, AWS | San Jose, CA',
        '   → Built tutoring management platform scaling from 0 to 200+ users',
        '   → Shipped automated flashcards, session reminders, adaptive prompts',
        '   → Integrated PostgreSQL + Zoom/calendar APIs for real-time scheduling',
        '   → Optimized SQL queries, improving load times by 30%',
        '   → Contributed to weekly production releases via standups + sprint planning',
        '',
        '[2024–Present] Math Tutor — Independent',
        '   → Raised math proficiency of 6+ underperforming middle school students',
        '   → Year-long personalized tutoring with habit-building focus',
        '',
        '$ cat skills.txt',
        '',
        'Languages & Libraries:',
        '   C/C++, Python, TypeScript, JavaScript, SQL, HTML/CSS',
        '   Pandas, NumPy, scikit-learn',
        '',
        'Frameworks & Tools:',
        '   React, FastAPI, Node.js, Express.js, Next.js',
        '   Tailwind CSS, REST APIs, OAuth 2.0',
        '',
        'Databases & DevOps:',
        '   PostgreSQL, MongoDB, Git, Docker, AWS',
        '   CI/CD, Linux, Jira, Confluence, LaunchDarkly',
        '',
        '$ _'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeNextChar() {
        if (lineIndex >= content.length) {
            // Add blinking cursor
            terminalContent.innerHTML += '<span class="cursor"></span>';
            return;
        }
        
        const line = content[lineIndex];
        
        if (charIndex < line.length) {
            terminalContent.textContent += line[charIndex];
            charIndex++;
            setTimeout(typeNextChar, 3);
        } else {
            terminalContent.textContent += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeNextChar, 50);
        }
    }
    
    typeNextChar();
}

function getFullTerminalContent() {
    return `$ whoami
> Emily Do — CS + Math Student @ Stanford University

$ cat experience.txt

[2025–Present] Software Engineer Intern — Mercy Beyond Borders
   React, Python, Airtable API | Santa Clara, CA
   → Collaborated with 6+ engineers to build full-stack data platform
   → Conducted 10+ user interviews, translating feedback into UI iterations
   → Built React + TypeScript interface for 1,000+ structured scholar records
   → Developed Python/SQL pipelines, reducing data retrieval time by 80%
   → Trained custom ML model improving tagging accuracy across datasets
   → Automated grant reporting, saving 10+ manual hours per cycle

[2024–2025] Software Engineer Intern — Swoon Learning
   TypeScript, React, PostgreSQL, Docker, AWS | San Jose, CA
   → Built tutoring management platform scaling from 0 to 200+ users
   → Shipped automated flashcards, session reminders, adaptive prompts
   → Integrated PostgreSQL + Zoom/calendar APIs for real-time scheduling
   → Optimized SQL queries, improving load times by 30%
   → Contributed to weekly production releases via standups + sprint planning

[2024–Present] Math Tutor — Independent
   → Raised math proficiency of 6+ underperforming middle school students
   → Year-long personalized tutoring with habit-building focus

$ cat skills.txt

Languages & Libraries:
   C/C++, Python, TypeScript, JavaScript, SQL, HTML/CSS
   Pandas, NumPy, scikit-learn

Frameworks & Tools:
   React, FastAPI, Node.js, Express.js, Next.js
   Tailwind CSS, REST APIs, OAuth 2.0

Databases & DevOps:
   PostgreSQL, MongoDB, Git, Docker, AWS
   CI/CD, Linux, Jira, Confluence, LaunchDarkly

$ <span class="cursor"></span>`;
}

// ============================================
// ZONE 3: PROJECTS SCENE
// ============================================

function initProjectsScene() {
    const folders = document.querySelectorAll('.folder:not(.folder-spacer)');
    folders.forEach(folder => {
        folder.addEventListener('click', () => toggleFolder(folder));
    });
}

function toggleFolder(folder) {
    const isOpen = folder.classList.contains('open');
    
    if (isOpen) {
        closeFolder(folder);
    } else {
        // Close all other folders
        document.querySelectorAll('.folder.open').forEach(f => {
            if (f !== folder) closeFolder(f);
        });
        openFolder(folder);
    }
}

// Store click outside handlers
const folderClickHandlers = new WeakMap();

function openFolder(folder) {
    folder.classList.add('open');
    
    // Get cabinet position
    const cabinet = document.querySelector('.cabinet-closeup');
    const cabinetRect = cabinet.getBoundingClientRect();
    const folderRect = folder.getBoundingClientRect();
    
    // Center of folder at top-left corner of cabinet
    const targetX = cabinetRect.left - (folderRect.width / 2);
    const targetY = cabinetRect.top - (folderRect.height / 2);
    
    // Bring to front
    folder.style.zIndex = '1000';
    folder.style.position = 'fixed';
    folder.style.left = `${targetX}px`;
    folder.style.top = `${targetY}px`;
    folder.style.width = `${folderRect.width}px`;
    
    gsap.fromTo(folder, 
        { scale: 0.9, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
    );
    
    // Dim other folders
    document.querySelectorAll('.folder').forEach(f => {
        if (f !== folder) {
            f.classList.add('dimmed');
        }
    });
    
    // Add click outside handler
    const handleClickOutside = (e) => {
        if (!folder.contains(e.target) && !e.target.closest('.folder')) {
            closeFolder(folder);
        }
    };
    
    // Store handler for cleanup
    folderClickHandlers.set(folder, handleClickOutside);
    
    // Use setTimeout to avoid immediate trigger from the click that opened it
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);
}

function closeFolder(folder) {
    folder.classList.remove('open');
    folder.classList.remove('dimmed');
    
    // Remove click outside handler
    const handleClickOutside = folderClickHandlers.get(folder);
    if (handleClickOutside) {
        document.removeEventListener('click', handleClickOutside);
        folderClickHandlers.delete(folder);
    }
    
    // Reset styles and animate back
    gsap.to(folder, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            folder.style.position = '';
            folder.style.left = '';
            folder.style.top = '';
            folder.style.width = '';
            folder.style.zIndex = '';
        }
    });
    
    // Undim all
    document.querySelectorAll('.folder').forEach(f => {
        f.classList.remove('dimmed');
    });
}

// ============================================
// ZONE 4: ACTIVITIES SCENE
// ============================================

const activityData = {
    trophy: {
        title: 'The Gold Medal | Team USA Taekwondo',
        description: 'World Poomsae finalist, 4x National Gold, 2x US Open Gold, 2x Pan Am Gold medalist. Led a team of 5 to secure their first-ever national team member spot by pivoting from logistics-only leadership to an empathy-driven model built on team cohesion and psychological safety.'
    },
    headphones: {
        title: 'The Headphones | Teaching & Coaching',
        description: 'Managed 6-month training cycles for 18 athletes. Developed custom animations for virtual routine instruction and identified 15% higher engagement with gamified drills over rote repetition. Maintained a 100% Black Belt pass rate across all coached athletes.'
    },
    notebook: {
        title: 'The Notebook | WEEI 501(c)(3)',
        description: 'As Founder, designed scalable workflows to distribute $7,000+ in seed capital, launching 30+ women-led businesses across 3 countries. Implemented data-driven impact tracking and streamlined grant logistics, reaching 30+ entrepreneurs in underrepresented urban centers.'
    },
    screwdriver: {
        title: 'The Screwdriver | Laptop Repair Initiative',
        description: 'Through the NP3 Chromebook Tutorial, recruited and trained 40 students to diagnose and refurbish 500+ laptops, saving Natomas Unified School District an estimated $100,000 in replacement costs and bridging the digital divide at district scale.'
    },
    caterpillar: {
        title: 'The Caterpillar | CENG 501(c)(3)',
        description: 'As VP of Marketing, led curriculum and outreach strategy that doubled student enrollment to 1,859, targeting underrepresented minorities. Launched a fundraising and corporate matching program raising $12,000 to ensure program financial sustainability.'
    },
    mahjong: {
        title: 'The Mahjong Tile | CodeClimbers',
        description: 'Organized bimonthly workshops for 80+ seniors and led free Web Dev and Python classes for 100+ students, bridging the tech knowledge gap across generations and making technical literacy accessible as a universal language.'
    },
    heart: {
        title: 'The Heart Sticker',
        description: 'From a dear friend. A reminder that the best systems — technical or human — are built with care.'
    }
};

function initActivitiesScene() {
    const activitiesScene = document.getElementById('scene-activities');
    
    // Create modal container if it doesn't exist
    if (!activitiesScene.querySelector('.activity-modal')) {
        const modal = document.createElement('div');
        modal.className = 'activity-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeActivityModal()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeActivityModal()">×</button>
                <h2 class="modal-title"></h2>
                <p class="modal-description"></p>
            </div>
        `;
        activitiesScene.appendChild(modal);
    }
    
    // Bind click handlers - images should already have onclick in HTML, but ensure they work
    Object.keys(activityData).forEach(key => {
        const component = document.getElementById(`${key}-component`);
        if (component) {
            // Remove any existing listeners and add new one
            component.onclick = () => openActivityModal(key);
        }
    });
}

function openActivityModal(activityKey) {
    const modal = document.querySelector('#scene-activities .activity-modal');
    const data = activityData[activityKey];
    
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-description').textContent = data.description;
    
    modal.classList.add('active');
    
    gsap.fromTo(modal.querySelector('.modal-content'),
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }
    );
}

function closeActivityModal() {
    const modal = document.querySelector('#scene-activities .activity-modal');
    if (!modal) return;
    
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.85,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
        }
    });
}

// ============================================
// ZONE 5: CONTACT SCENE
// ============================================

function initContactScene() {
    const frames = document.querySelectorAll('#scene-contact .frame');
    
    // Entrance animation
    gsap.fromTo(frames,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.15 }
    );
}

// ============================================
// CUSTOM CURSOR
// ============================================

function updateCursor(e) {
    const cursor = document.querySelector('body::after');
    if (window.innerWidth >= 768) {
        document.body.style.setProperty('--cursor-x', e.clientX + 'px');
        document.body.style.setProperty('--cursor-y', e.clientY + 'px');
    }
}

document.addEventListener('mousemove', (e) => {
    const style = document.documentElement.style;
    style.setProperty('--cursor-x', e.clientX + 'px');
    style.setProperty('--cursor-y', e.clientY + 'px');
});

// ============================================
// LOAD ANIMATION
// ============================================

function initLoadAnimation() {
    const title = document.querySelector('#scene-home .title');
    const navButtons = document.querySelectorAll('#scene-home .nav-btn');
    const desk = document.querySelector('.desk-container');
    const deskObjects = document.querySelectorAll('.desk-objects > *');
    
    // Title drops in
    gsap.from(title, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out',
        delay: 0.2
    });
    
    // Nav buttons stagger in
    gsap.from(navButtons, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out',
        stagger: 0.1,
        delay: 0.4
    });
    
    // Desk rises from below
    gsap.from(desk, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Desk objects fade and float in
    gsap.from(deskObjects, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.8
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize world position - must match CSS initial transform: translate(-200vw, -100vh)
    gsap.set('#world', {
        x: '-200vw',
        y: '-100vh'
    });
    
    // Load animation
    initLoadAnimation();
    
    // Initialize activities scene
    initActivitiesScene();
    
    // Initialize contact scene
    initContactScene();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            // Mobile mode
            gsap.set('#world', { x: 0, y: 0 });
        } else {
            // Desktop mode - restore position
            const coords = sceneCoordinates[currentScene];
            gsap.set('#world', {
                x: `${coords.x}vw`,
                y: `${coords.y}vh`
            });
        }
    });
});
