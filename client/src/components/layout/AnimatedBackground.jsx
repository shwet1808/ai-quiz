import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background transition-colors duration-300 app-shell">
            {/* The background is intentionally static so the app feels calm during timed quizzes. */}
            <div
                className="absolute inset-0 opacity-[0.08] dark:opacity-[0.07]"
                style={{
                    backgroundImage: `
                        linear-gradient(currentColor 1px, transparent 1px),
                        linear-gradient(90deg, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                    color: 'rgb(var(--text-primary))'
                }}
            />
            <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/10 to-transparent dark:from-accent/5" />
        </div>
    );
};

export default AnimatedBackground;
