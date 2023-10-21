import { Game } from "./game";

function emptyToggles(size: number): Game["toggles"] {
    return new Array(size)
        .fill(0)
        .map(() => new Array(size).fill(0).map(() => []));
}

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
            const toggles = emptyToggles(size);

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
            const toggles = emptyToggles(size);

            // For each cell, toggle the cell and the adjacent cells, modulo
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
    threeState: {
        name: "Three State Lights Out",
        description:
            "Also known as Lights Out 2000. Lights can be off, on, or red; lights cycle in the order off -> on -> red -> off. Lights are toggled in a cross pattern.",
        toggles(size) {
            const toggles = emptyToggles(size);

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
        cellMax: 3,
    },
    cross: {
        name: "Cross Lights Out",
        description:
            "Seen in Lights Out Deluxe. Lights are either on or off, and are toggled in a cross pattern.",
        toggles(size) {
            const toggles = emptyToggles(size);

            // For each cell, toggle the cell and the cells in a cross pattern
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    // Centre
                    toggles[x]![y]!.push([x, y, 1]);
                    // Top-Left
                    if (x > 0 && y > 0) {
                        toggles[x]![y]!.push([x - 1, y - 1, 1]);
                    }
                    // Top-Right
                    if (x < size - 1 && y > 0) {
                        toggles[x]![y]!.push([x + 1, y - 1, 1]);
                    }
                    // Bottom-Left
                    if (x > 0 && y < size - 1) {
                        toggles[x]![y]!.push([x - 1, y + 1, 1]);
                    }
                    // Bottom-Right
                    if (x < size - 1 && y < size - 1) {
                        toggles[x]![y]!.push([x + 1, y + 1, 1]);
                    }
                }
            }

            return toggles;
        },
        cellMax: 2,
    },
    knights: {
        name: "Knights Lights Out",
        description:
            "Seen in XL-25. Lights are either on or off, and are toggled with it and every cell that is a chess knight's move (two squares in one direction, one square in the other) away.",
        toggles(size) {
            const toggles = emptyToggles(size);

            // For each cell, toggle the cell and the cells L shaped away
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    // Centre
                    toggles[x]![y]!.push([x, y, 1]);
                    // Up-Left
                    if (x > 0 && y > 1) {
                        toggles[x]![y]!.push([x - 1, y - 2, 1]);
                    }
                    // Up-Right
                    if (x < size - 1 && y > 1) {
                        toggles[x]![y]!.push([x + 1, y - 2, 1]);
                    }
                    // Right-Up
                    if (x < size - 2 && y > 0) {
                        toggles[x]![y]!.push([x + 2, y - 1, 1]);
                    }
                    // Right-Down
                    if (x < size - 2 && y < size - 1) {
                        toggles[x]![y]!.push([x + 2, y + 1, 1]);
                    }
                    // Down-Right
                    if (x < size - 1 && y < size - 2) {
                        toggles[x]![y]!.push([x + 1, y + 2, 1]);
                    }
                    // Down-Left
                    if (x > 0 && y < size - 2) {
                        toggles[x]![y]!.push([x - 1, y + 2, 1]);
                    }
                    // Left-Down
                    if (x > 1 && y < size - 1) {
                        toggles[x]![y]!.push([x - 2, y + 1, 1]);
                    }
                    // Left-Up
                    if (x > 1 && y > 0) {
                        toggles[x]![y]!.push([x - 2, y - 1, 1]);
                    }
                }
            }

            return toggles;
        },
        cellMax: 2,
    },
};
