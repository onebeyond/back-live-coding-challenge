module.exports = () => {
    const createGame = ({ player1, player2 }) => ({
        player1,
        player2
    });

    return {
        createGame
    }
}
