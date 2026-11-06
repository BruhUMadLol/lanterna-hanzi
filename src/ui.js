export const navIcons={
 audio:'<path d="M4 9h4l5-4v14l-5-4H4zM17 8a6 6 0 0 1 0 8M20 5a10 10 0 0 1 0 14"/>',
 home:'<path d="M4 11 12 4l8 7v9h-6v-6h-4v6H4z"/>',
 library:'<path d="M4 4h7a4 4 0 0 1 4 4v13a5 5 0 0 0-4-2H4zM15 8a4 4 0 0 1 4-4h2v15h-2a5 5 0 0 0-4 2"/>',
 collections:'<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M7 3h10M6 5h12M9 12h6M9 16h4"/>',
 game:'<path d="M8 5h8M9 3h6M8 19h8M12 19v3"/><rect x="5" y="5" width="14" height="14" rx="6"/><path d="M10 8v8M14 8v8"/>',
 settings:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'
};
export const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navIcons[name]}</svg>`;
