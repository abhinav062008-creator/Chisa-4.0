// ========== CHISA AVATAR STATES - WITH YOUR NEW IMAGE ==========
// This file provides the avatar system for Chisa's emotions
// Your new image URL is embedded below

const AVATAR_STATES = {
    serene: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    gentle: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    happy: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    curious: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    thoughtful: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    flirty: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    caring: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    excited: {
        imageUrl: "https://i.ibb.co/TBvPVP23/Screenshot-2026-03-03-13-00-10-52-40deb401b9ffe8e1df2f1cc5ba480b12.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    }
};

console.log('✅ Avatar states loaded with your new Chisa image!');

// Make it globally available
if (typeof window !== 'undefined') {
    window.AVATAR_STATES = AVATAR_STATES;
}
