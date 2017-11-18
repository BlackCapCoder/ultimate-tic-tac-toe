(reset = _ => {
  board        = new Array(9).fill().map(_=>new Array(9).fill(0));
  score        = new Array(9).fill(0);
  active       = -1;
  animIntv     = -1;
  turn         = true;
  resetPending = false;
  graphical    = true;

  let els = document.querySelectorAll('.tile');
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove('O');
    els[i].classList.remove('X');
  }
  els = document.querySelectorAll('.board:not(.root)');
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove('X');
    els[i].classList.remove('O');
    els[i].classList.add('active');
  }

  document.querySelector('.root').classList.remove('X');
  document.querySelector('.root').classList.remove('O');
  document.querySelector('#click').classList.add('hidden');
})();

tileClicked = el => {
  if (resetPending) return reset ();

  let q = Number(el.parentElement.getAttribute('data-ix'))
      k = Number(el.getAttribute('data-ix'));

  if ( !isLegal(q,k) ) return;

  setTile (q, k);
  if (AI !== undefined) setTimeout(AI, 600);
};

setTile = (q,k) => {
  if ( resetPending  ) return;
  if ( !isLegal(q,k) ) return;

  last_move = {q: q, k: k};

  if (graphical) {
    el = document.querySelector('.board[data-ix="'+q+'"] > .tile[data-ix="'+k+'"]');
    el.classList.add(turn? 'X': 'O');
  }

  board[q][k] = turn+1;

  let w = checkWin(bin(board[q], x=>(x===turn+1)*1));
  if (graphical && w) {
    document.querySelector('.board[data-ix="'+q+'"]').classList.add(turn? 'X': 'O');
  }

  if ( (score[q] = w
                 ? turn+1
                 : 511===bin(board[q], x=>(x!==0)*1)
                 ? 3: 0)
    && ( checkWin(bin(score, x=>(x===turn+1)*1))
      || 511===bin(score, x=>(x!==0)*1))
     ) return gameWon(score[q]);

  setActive(k);
  swapTurn();
};

swapTurn = _ => {
  turn = !turn;
  if (!graphical) return;

  let s = document.querySelector('#status');
  if (turn) {
    clearInterval(animIntv);
    s.innerText = "Your turn";
  } else {
    s.innerText = ".";
    animIntv = setInterval(_ => {
      s.innerText = s.innerText.length >= 3? '.' : s.innerText + '.' ;
    }, 250);
  }
}

isLegal = (q,k) => !(board[q][k] !== 0 || (active !== q && active !== -1));

bin      = (b, f) => Number('0b'+b.map(f).join(''));
checkWin = n => {
  const arr = [ 0b111000000 , 0b000111000 , 0b000000111
              , 0b100100100 , 0b010010010 , 0b001001001
              , 0b100010001 , 0b001010100 ];

  for (let i in arr) if ((n & arr[i]) === arr[i]) return true;
  return false;
};


setActive = k => {
  active = score[k] === 0 ? k : -1;

  if (graphical) {
    for (let i = 0; i < 9; i++) {
      const el = document.querySelector('.board[data-ix="'+i+'"]');
      if ((active === -1 && score[i] === 0) || i == active) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  }

  return active;
};

gameWon = p => {
  if (!graphical) return;
  resetPending = true;
  clearInterval(animIntv);
  document.querySelector('#status').innerText
    = ['Nobody won!', 'Circle won!', 'Cross won!', "It's a tie!"][p];
  if (p==1 || p==2)
    document.querySelector('.root').classList.add(p==1? 'O': 'X');
  document.querySelector('#click').classList.remove('hidden');
};
