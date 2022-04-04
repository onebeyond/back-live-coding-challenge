const GameEvents = {
    NewGame: 'new_game',
    GamePoint: 'game_point',
};

const createNewGameEvent = ({ id, player1Id, player2Id, ts }) => ({
    type: GameEvents.NewGame,
    id,
    player1Id,
    player2Id,
    ts
});

const createGamePointEvent = ({ id, playerId, ts }) => ({
    type: GameEvents.NewGame,
    id,
    playerId,
    ts
});
