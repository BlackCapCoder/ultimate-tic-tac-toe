// Plays randomly
AI_RANDOM = _ => {
  let qs = legalBoards()
    , q  = qs[Math.round(Math.random()*(qs.length-1))]
    , ks = legalTiles(board[q])
    , k  = ks[Math.round(Math.random()*(ks.length-1))]
    ;

  setTile(q,k);
  return true;
};

// Makes a winning move, if possible
AI_WIN = (dry = false) => {
  let qs = legalBoards();
  for (let i = 0; i < qs.length; i++) {
    let ks = board[qs[i]]
      , ls = legalTiles(ks);
    for (let x = 0; x < ls.length; x++) {
      let c = ks.slice(0); c[ls[x]] = turn+1;
      if (!checkWin(bin(c, x=>(x===turn+1)*1))) continue;
      let s = score.slice(0); s[qs[i]] = turn+1;
      if (!checkWin(bin(s, x=>(x===turn+1)*1))) continue;
      if (!dry) setTile(qs[i], ls[x]);
      return true;
    }
  }
  return false;
};

// Don't lose
nolose = ai => {
  graphical = false;
  let state = hypotetically();
  ai();
  let move = last_move;
  let lost = AI_WIN();

  restore(state);
  graphical = true;

  if (!lost) setTile(move.q, move.k);
  return !lost;
};

repeatedly = (ai, cnt, fallback) => {
  for (let i = 0; i < cnt; i++)
    if (ai) return true;
  return fallback();
};

AI_MOSTLYRANDOM
  = _ => AI_WIN()
      || repeatedly(nolose(AI_RANDOM), 1000, AI_RANDOM);


legalBoards = _ => {
  let qs = [];
  for (let i = 0; i < 9; i++)
    if ((active == -1 && score[i] === 0) || active == i)
      qs.push(i);
  return qs;
};

legalTiles = q => {
  let ks = [];
  for (let i = 0; i < 9; i++)
    if (q[i] == 0)
      ks.push(i);
  return ks;
};


hypotetically = _ => {
  let old = {
    board: board.map(x => x.slice(0)),
    score: score,
    active: active,
    animIntv: animIntv,
    turn: turn,
    resetPending: resetPending,
  };

  board        = board.slice(0);
  score        = score.slice(0);
  active       = active;
  animIntv     = animIntv;
  turn         = turn;
  resetPending = resetPending;

  return old;
};
restore = old => {
  board        = old.board;
  score        = old.score;
  active       = old.active;
  animIntv     = old.animIntv;
  turn         = old.turn;
  resetPending = old.resetPending;
};
