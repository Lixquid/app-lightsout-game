import { mulberry32 } from "./util";

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
 * @param rngSeed The seed to use for the random number generator. If null, a random seed will be used.
 * @returns The new game object.
 */
export function newGame(
    size: number,
    toggles: Game["toggles"],
    max: number,
    initSteps: number,
    rngSeed: number | null
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

    const rng = rngSeed === null ? Math.random : mulberry32(rngSeed);
    // Randomise the board
    for (let i = 0; i < initSteps; i++) {
        const x = Math.floor(rng() * size);
        const y = Math.floor(rng() * size);
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
