
import React from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.5 16h9M12 11V3m0 0l-3 3m3-3l3 3" />
        <circle cx="12" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default StethoscopeIcon;
