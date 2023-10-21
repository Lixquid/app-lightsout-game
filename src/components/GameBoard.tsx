import { useMemo } from "preact/hooks";
import { Game, isGameWon } from "../lib/game";

interface GameBoardProps {
    game: Game;
    toggleCell: (x: number, y: number) => void;
}

function buttonClass(cell: number) {
    switch (cell) {
        case 1:
            return "s1";
        case 2:
            return "s2";
        case 3:
            return "s3";
    }
    return "";
}

export function GameBoard(props: GameBoardProps) {
    const { game, toggleCell } = props;

    const boardCoords = useMemo(
        () =>
            new Array(game.boardSize)
                .fill(0)
                .map(() => new Array(game.boardSize).fill(null)) as unknown[][],
        [game.boardSize]
    );

    const gameWon = isGameWon(game);

    return (
        <div class="text-center">
            <div class="h3 mb-3">
                Moves: {game.actionCount}
                {gameWon && (
                    <span class="d-inline-block ms-3 text-success">
                        You win!
                    </span>
                )}
            </div>
            {boardCoords.map((row, y) => (
                <div class="board-row" key={y}>
                    {row.map((_, x) => (
                        <button
                            key={x}
                            class={`board-cell ${buttonClass(
                                game.board[x]![y]!
                            )}`}
                            onClick={() => toggleCell(x, y)}
                            disabled={gameWon}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
