import { useState } from "preact/hooks";
import { Game, newGame } from "../lib/game";
import { gameTypes } from "../lib/gameTypes";

interface NewGameCardProps {
    setGame: (game: Game) => void;
}

export function NewGameCard(props: NewGameCardProps) {
    const [size, setSize] = useState(5);
    const [type, setType] = useState<keyof typeof gameTypes>("classic");

    return (
        <div class="card mt-5">
            <div class="card-header">
                <span>New Game</span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="newGame-size" class="form-label">
                            Board size
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="newGame-size"
                            min="3"
                            max="10"
                            value={size}
                            onChange={(e) =>
                                setSize(Number(e.currentTarget.value))
                            }
                        />
                        <div class="form-text">
                            The width and height of the board.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="newGame-type" class="form-label">
                            Game type
                        </label>
                        <select
                            class="form-select"
                            id="newGame-type"
                            value={type}
                            onChange={(e) =>
                                setType(e.currentTarget.value as any)
                            }
                        >
                            {Object.entries(gameTypes).map(([key, value]) => (
                                <option value={key}>{value.name}</option>
                            ))}
                        </select>
                        <div class="form-text">
                            {gameTypes[type]!.description}
                        </div>
                    </div>
                </div>
                <div class="float-end">
                    <button
                        class="btn btn-lg btn-primary"
                        onClick={() => {
                            props.setGame(
                                newGame(
                                    size,
                                    gameTypes[type]!.toggles(size),
                                    gameTypes[type]!.cellMax,
                                    100
                                )
                            );
                        }}
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    );
}
