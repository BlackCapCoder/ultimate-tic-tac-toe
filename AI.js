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
AI_WIN = _ => {
  let qs = legalBoards();
  for (let i = 0; i < qs.length; i++) {
    let ks = board[qs[i]]
      , ls = legalTiles(ks);
    for (let x = 0; x < ls.length; x++) {
      let c = ks.slice(0); c[ls[x]] = turn+1;
      if (!checkWin(bin(c, x=>(x===turn+1)*1))) continue;
      let s = score.slice(0); s[qs[i]] = turn+1;
      if (!checkWin(bin(s, x=>(x===turn+1)*1))) continue;
      setTile(qs[i], ls[x]);
      return true;
    }
  }
  return false;
};

AI_MOSTLYRANDOM = _ => AI_WIN() || AI_RANDOM();


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
}
