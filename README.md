# Ultimate tic tac toe

This is an implementation of ultimate tic tac toe, which is an unsolved game (that is, computers cannot play it perfectly yet).

## Rules

The game board consist of 1 big tic tac toe board, made up of 9 regular small ones. If you win on a small board, you get that tile on the big board. The point of the game is to get 3 in a row on the big board.

Also, when you claim a tile on a small board, the other player *has* to play on the corresponding tile on the big board. For instance, if I play first and I place my first cross in the top left corner of the middle small board, my opponent has to play on the top left small board next. This is represented graphically in this implementation.

