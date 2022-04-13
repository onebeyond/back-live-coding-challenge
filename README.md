# Back Live Coding

## Business Logic

From http://codingdojo.org/kata/Tennis/

Tennis

This Kata is about implementing a simple tennis game. I came up with it while thinking about Wii tennis, where they have simplified tennis, so each set is one game.
The scoring system is rather simple:

1. Each player can have either of these points in one game 0 15 30 40
   
2. If you have 40 and you win the ball you win the game, however there are special rules.
   
3. If both have 40 the players are deuce. a. If the game is in deuce, the winner of a ball will have advantage and game ball. b. If the player with advantage wins the ball he wins the game c. If the player without advantage wins they are back at deuce.

===== Alternate description of the rules per Wikipedia ( http://en.wikipedia.org/wiki/Tennis#Scoring ):

1. A game is won by the first player to have won at least four points in total and at least two points more than the opponent.

2. The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.

3. If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.

4. If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.

## Business Logic implementation
La lógica de negocio está repartida en 2 servicios:  `gameService` y `scoreService`. A continuación, se explica la lógica de ambos:

### scoreService

Este servicio gestiona la lógica para gestionar los cambios de estado del score de los players. Para ello, implementa el patrón de diseño State siguiendo un paradigma funcional.

Básicamente, tenemos una función por cada tipo de estado que pueda tomar score (Love, Thirteen, etc). Todos estas funciones devuelven un objeto con la misma interfaz, pero diferente comportamiento ([aquí](#score) para ver interfaz):

- name: Nombre identificativo del score
- winBall: método que devuelve el score resultado de marcar un punto. Como entrada, espera recibir el score del rival.
- loseBall: método que devuelve el score resultado de que el rival marque un punto. Como entrada, espera recibir el score del rival.

### gameService

Este servicio se encarga de gestionar el estado de un game cada vez que se marca un punto.
Recibe como entrada el estado actual de un game y el id del jugador que ha marcado punto. Entonces, actualiza el score del jugador ganador y el del jugador perdedor, haciendo uso de la interfaz común de los score.

## Architecture

La app es una API Rest creada con el framework Express, la cual está conectada a una base de datos MongoDB para persistir los datos de la aplicación.

### Rutas

- **GET /game** Devuelve el estado actual de un game
- **POST /game** Guarda un nuevo evento de tipo `new_game` en base de datos
- **POST /game** Guarda un nuevo evento de tipo `game_point` en base de datos

Más información en el swagger (http://localhost:400/api-docs)

### MongoDB

La base de datos solo tiene una colección `game_events` en donde se guardan los events de los juegos. Más info [aquí](#game-events).

## Entities

### Game Events

- New Game Event

```json
{
  "type": "new_game",
  "id": 1,
  "player1Id": 1,
  "player2Id": 2,
  "timestamp": "1970-01-01T00:00:00Z"
}
```

- Game Point Event

```json
{
  "type": "game-point",
  "id": 1,
  "playerId": 1,
  "timestamp": "1970-01-01T00:00:00Z"
}
```

### Score: 
```json
{
  "name": "Love",
  "winBall": (opponentPlayerScore) => {},
  "loseBall": (opponentPlayerScore) => {}
}
```

### Player:
```json
{
  "id": 1,
  "score": {}
}
```
### Game:

```json
{
  "id": 1,
  "player1": {},
  "player2": {}
}
```

## Project Structure

Toda la lógica de negocio se encuentra en la carpeta `src`, dividida en componentes. Los principales componentes son:

- App: Configuración de express.
- Constants: constantes de la aplicación.
- Errors: custom errors de la aplicación.
- Factories: funciones para crear las entidades de la aplicación.
- MongoDB: configuración de mongodb.
- Routes: rutas de la API.
- Services: servicios con la lógica de negocio.
- Storage: funciones para persistir los datos.

