/**
 * Create a Mulberry32 pseudo-random number generator.
 * @param seed The seed to use for the random number generator. Must be a
 * positive integer less than 2^32.
 * @returns A function that returns a pseudo-random number between 0
 * (inclusive) and 1 (exclusive) every time it is called.
 */
export function mulberry32(seed: number): () => number {
    return function () {
        let t = (seed += 0x6d2b_79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
    };
}
