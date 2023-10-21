type Array2D<T> = T[][];

export interface Game {
    /** The light status of each cell, indexed by x then y. */
    board: Array2D<number>;
    /** The maximum value of each cell. */
    boardMax: number;
    /** The number of columns and rows in the game board. */
    boardSize: number;

    /** An array of coordinates that each cell will toggle. */
    toggles: Array2D<[x: number, y: number, amt: number][]>;
    /** The number of toggles performed so far. */
    actionCount: number;
}

/**
 * Returns the game board after the specified cell has been toggled. This does
 * not mutate the original game board.
 * @param game The game object to be updated.
 * @param x The x coordinate of the cell to be toggled.
 * @param y The y coordinate of the cell to be toggled.
 * @returns The updated game board.
 */
export function toggleCell(game: Game, x: number, y: number): Game["board"] {
    // Clone the board
    const board = game.board.map((row) => row.slice());

    // For each toggle, mutate the board
    for (const [tx, ty, amt] of game.toggles[x]![y]!) {
        board[tx]![ty] = (board[tx]![ty]! + amt) % game.boardMax;
    }

    return board;
}

/**
 * Creates a new game object with a randomised light state.
 * @param size The number of columns and rows in the game board.
 * @param toggles The cells each cell will toggle.
 * @param max The maximum value of each cell.
 * @param initSteps The number of random steps to perform on the board to initialise it.
 * @returns The new game object.
 */
export function newGame(
    size: number,
    toggles: Game["toggles"],
    max: number,
    initSteps: number
): Game {
    // Create a new blank board
    const board: Game["board"] = new Array(size)
        .fill(0)
        .map(() => new Array(size).fill(0));

    // Create the game object
    const game: Game = {
        board,
        boardMax: max,
        boardSize: size,
        toggles,
        actionCount: 0,
    };

    // Randomise the board
    for (let i = 0; i < initSteps; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        game.board = toggleCell(game, x, y);
    }

    return game;
}

/**
 * Returns if the game has been won.
 * @param game The game object to be checked.
 */
export function isGameWon(game: Game): boolean {
    // Check if all cells are unlit
    for (const row of game.board) {
        for (const cell of row) {
            if (cell !== 0) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Creates the toggle pattern for the classic game of Lights Out.
 * ```
 *   ██
 * ██████
 *   ██
 * ```
 * @param size The number of columns and rows in the game board.
 * @returns The toggle pattern.
 */
export function createTogglesClassic(size: number): Game["toggles"] {
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
}
