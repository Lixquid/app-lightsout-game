import { useState } from "preact/hooks";
import { GameBoard } from "./components/GameBoard";
import { NewGameCard } from "./components/NewGameCard";
import { newGame, toggleCell } from "./lib/game";
import { gameTypes } from "./lib/gameTypes";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset["bsTheme"] =
            html.dataset["bsTheme"] === "dark" ? "light" : "dark";
    }
}

export function App() {
    const [game, setGame] = useState(() =>
        newGame(
            5,
            gameTypes["classic"]!.toggles(5),
            gameTypes["classic"]!.cellMax,
            100,
            null
        )
    );

    return (
        <div class="container mx-auto py-5">
            <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                <h1>Lights Out</h1>
                <div>
                    <button
                        class="btn btn-outline-secondary me-2"
                        onClick={toggleDarkMode}
                        title="Toggle dark mode"
                    >
                        <i class="bi bi-moon-fill" />
                    </button>
                    <a
                        href="https://lixquid.com"
                        class="btn btn-outline-primary float-end"
                    >
                        <i class="bi bi-box-arrow-up-right me-2" />
                        lixquid.com
                    </a>
                </div>
            </div>
            <GameBoard
                game={game}
                toggleCell={(x, y) => {
                    setGame((game) => ({
                        ...game,
                        board: toggleCell(game, x, y),
                        actionCount: game.actionCount + 1,
                    }));
                }}
            />
            <NewGameCard setGame={setGame} />
            <div class="mt-5 text-end">
                <a href="https://github.com/lixquid/app-lightsout-game">
                    <i class="bi bi-box-arrow-up-right me-2" />
                    Source code
                </a>
            </div>
        </div>
    );
}
