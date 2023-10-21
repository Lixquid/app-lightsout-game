import { Game } from "./game";

export const gameTypes: Record<
    string,
    {
        name: string;
        description: string;
        toggles: (size: number) => Game["toggles"];
        cellMax: number;
    }
> = {
    classic: {
        name: "Classic Lights Out",
        description:
            "The original Lights Out game. Lights are either on or off, and are toggled in a cross pattern.",
        toggles(size) {
            const toggles: Game["toggles"] = new Array(size)
                .fill(0)
                .map(() => new Array(size).fill(0).map(() => []));

            // For each cell, toggle the cell and the adjacent cells
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    // Centre
                    toggles[x]![y]!.push([x, y, 1]);
                    // Up
                    if (y > 0) {
                        toggles[x]![y]!.push([x, y - 1, 1]);
                    }
                    // Down
                    if (y < size - 1) {
                        toggles[x]![y]!.push([x, y + 1, 1]);
                    }
                    // Left
                    if (x > 0) {
                        toggles[x]![y]!.push([x - 1, y, 1]);
                    }
                    // Right
                    if (x < size - 1) {
                        toggles[x]![y]!.push([x + 1, y, 1]);
                    }
                }
            }

            return toggles;
        },
        cellMax: 2,
    },
    wrap: {
        name: "Wraparound Lights Out",
        description:
            'Also known as "Mini Lights Out". Lights are either on or off, and are toggled in a cross pattern. The board wraps around, so toggling a light on the far left will also toggle the light on the far right.',
        toggles(size) {
            const toggles: Game["toggles"] = new Array(size)
                .fill(0)
                .map(() => new Array(size).fill(0).map(() => []));

            // For each cell, toggle the cell and the adjacent cells
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    // Centre
                    toggles[x]![y]!.push([x, y, 1]);
                    // Up
                    toggles[x]![y]!.push([x, (y - 1 + size) % size, 1]);
                    // Down
                    toggles[x]![y]!.push([x, (y + 1) % size, 1]);
                    // Left
                    toggles[x]![y]!.push([(x - 1 + size) % size, y, 1]);
                    // Right
                    toggles[x]![y]!.push([(x + 1) % size, y, 1]);
                }
            }

            return toggles;
        },
        cellMax: 2,
    },
};
