import { unstable_cache as nextCache } from "next/cache";

type Callback<Args extends unknown[] = unknown[], Return = unknown> = (...args: Args) => Promise<Return>;

export function cache<Args extends unknown[], Return>(
    cb: Callback<Args, Return>,
    keyParts: string[],
    options: { revalidate?: number | false; tags?: string[] } = {}
) {
    return nextCache(cb, keyParts, options);
}