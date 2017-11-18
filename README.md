# Ultimate tic tac toe

This is an implementation of ultimate tic tac toe, which is an unsolved game (that is, computers cannot play it perfectly yet).

[You can play the game here](https://blackcapcoder.github.io/ultimate-tic-tac-toe/index.html)

## Rules

The game board consist of 1 big tic tac toe board, made up of 9 regular small ones. Your goal is to get 3 in a row, in a row. That is, the 9 smaller boards plays normally, and if you win a smaller board you get that tile on the big board.

When a tile is claimed, the other player *has* to play on the corresponding board. For instance, if I play first and I place a cross in the top left corner of the middle small board, my opponent has to play on the top left small board next. This is represented graphically in this implementation.

