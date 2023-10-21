import { useState } from "preact/hooks";
import {
    Game,
    createTogglesClassic,
    createTogglesWrap,
    newGame,
} from "../lib/game";

interface NewGameCardProps {
    setGame: (game: Game) => void;
}

const gameTypes: Record<
    string,
    {
        name: string;
        description: string;
        createToggles: (size: number) => Game["toggles"];
        maxValue: number;
    }
> = {
    classic: {
        name: "Classic Lights Out",
        description:
            "The original Lights Out game. Lights are either on or off, and are toggled in a cross pattern.",
        createToggles: createTogglesClassic,
        maxValue: 2,
    },
    wraparound: {
        name: "Wraparound Lights Out",
        description:
            'Also known as "Mini Lights Out". Lights are either on or off, and are toggled in a cross pattern. The board wraps around, so toggling a light on the far left will also toggle the light on the far right.',
        createToggles: createTogglesWrap,
        maxValue: 2,
    },
};

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
                                    gameTypes[type]!.createToggles(size),
                                    gameTypes[type]!.maxValue,
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
