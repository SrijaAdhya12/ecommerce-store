import { unstable_cache as nextCache } from "next/cache";

type Callback<T extends any[] = any[]> = (...args: T) => Promise<any>;

export function cache<T extends Callback>(
    cb: T,
    keyParts: string[],
    options: { revalidate?: number | false; tags?: string[] } = {}
) {
    // Wrap the callback with nextCache directly
    return nextCache(cb, keyParts, options);
}
