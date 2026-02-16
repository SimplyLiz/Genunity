const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const hasClerk = Boolean(key && !key.includes("REPLACE_ME"));
