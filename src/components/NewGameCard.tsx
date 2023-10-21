import { Game, createTogglesClassic, newGame } from "../lib/game";

interface NewGameCardProps {
    setGame: (game: Game) => void;
}

export function NewGameCard(props: NewGameCardProps) {
    return (
        <div class="card mt-5">
            <div class="card-header">
                <span>New Game</span>
            </div>
            <div class="card-body">
                <div class="float-end">
                    <button
                        class="btn btn-lg btn-primary"
                        onClick={() => {
                            props.setGame(
                                newGame(5, createTogglesClassic(5), 2, 100)
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
