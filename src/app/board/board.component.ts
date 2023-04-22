import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: false,
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string | null;
  xScore: number;
  oScore: number;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
    this.xScore = 0;
    this.oScore = 0;
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();

    if (this.winner) {
      setTimeout(() => {
        alert('Player ' + this.winner + ' won!');
        if (this.winner === 'X') {
          this.xScore++;
        } else {
          this.oScore++;
        }
        if (this.xScore >= 3) {
          alert('X won the game!');
          this.xScore = 0;
          this.oScore = 0;
        } else if (this.oScore >= 3) {
          alert('O won the game!');
          this.xScore = 0;
          this.oScore = 0;
        } else {
          this.newGame();
        }
      }, 250);
      return;
    }

    if (this.isBoardFull()) {
      setTimeout(() => {
        alert('Draw!');
        // this.xScore++; // 1 score each
        // this.oScore++;
        this.newGame();
      }, 250);
    }

    if (this.winner) {
      setTimeout(() => {
        alert('Player ' + this.winner + ' won!, New Game?');
        this.newGame();
      }, 250);
      return;
    }
  }

  isBoardFull(): boolean {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i] == null) {
        return false;
      }
    }
    return true;
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
