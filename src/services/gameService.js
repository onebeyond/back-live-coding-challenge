const { createLoveScore } = require('../factories/scoreFactory')();
const { createPlayer } = require('../factories/playerFactory')();
const { createGame } = require('../factories/gameFactory')();

module.exports = () => {
    const handlePlayerScored = (player, playerId, opponentScore) => player.id === playerId
        ? createPlayer({
            ...player,
            score: player.score.winBall(opponentScore),
        }) : createPlayer(player);

    const handleOpponentPlayerScored = (player, playerId, opponentScore) => player.id !== playerId
        ? createPlayer({
            ...player,
            score: player.score.loseBall(opponentScore),
        }) : createPlayer(player);

    const addScoreEvent = (_game) => (playerId) => {
        let game = { ..._game };
        game = createGame({
            player1: handlePlayerScored(game.player1, playerId, game.player2.score.name),
            player2: handlePlayerScored(game.player2, playerId, game.player1.score.name),
        });

        game = createGame({
            player1: handleOpponentPlayerScored(game.player1, playerId, game.player2.score.name),
            player2: handleOpponentPlayerScored(game.player2, playerId, game.player1.score.name),
        });

        return game;
    };

    const getInitialGameState = (player1Id, player2Id) => createGame({
        player1: createPlayer({
            id: player1Id,
            score: createLoveScore(),
        }),
        player2: createPlayer({
            id: player2Id,
            score: createLoveScore(),
        }),
    });

    return {
        getInitialGameState,
        addScoreEvent,
    }
}



