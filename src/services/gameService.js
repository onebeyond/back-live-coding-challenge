const { createLoveScore } = require('../factories/scoreFactory')();
const { createPlayer } = require('../factories/playerFactory')();
const { createGame } = require('../factories/gameFactory')();

module.exports = () => {

    const addScoreEvent = (_game) => (playerId) => {
        const handlePlayerScored = (_player, _playerId, _opponentScore) => _player.id === _playerId
            ? createPlayer({
                ..._player,
                score: _player.score.winBall(_opponentScore),
            }) : createPlayer(_player);

        const handleOpponentPlayerScore = (_player, _playerId, _opponentScore) => _player.id !== _playerId
            ? createPlayer({
                ..._player,
                score: _player.score.loseBall(_opponentScore),
            }) : createPlayer(_player);

        let game = { ..._game };

        game = createGame({
            player1: handlePlayerScored(game.player1, playerId, game.player2.score.name),
            player2: handlePlayerScored(game.player2, playerId, game.player1.score.name),
        });

        game = createGame({
            player1: handleOpponentPlayerScore(game.player1, playerId, game.player2.score.name),
            player2: handleOpponentPlayerScore(game.player2, playerId, game.player1.score.name),
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
        createGame,
        createPlayer,
    }
}



