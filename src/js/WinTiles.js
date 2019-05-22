import { Container } from 'pixi.js'
import WinTile from './WinTile';

class WinTiles extends Container {
  constructor(reels, x, y) {
    super();
    this._reels = reels;
    this._winTiles = WinTiles.intiWinTiles(reels);

    const sprites  = this._winTiles.reduce((arr, subArr) => arr.concat(subArr), []);
    this.addChild(...sprites);
    this.x = x;
    this.y = y;
  }

  show(lines = [[1,1,0],[0,1,0],[0,1,0],[0,1,0]]) {
    const promises = lines.map((line, i) => {
      const sumPromises = line.map((win, j) => {
        if (!win) return Promise.resolve()
        return this._winTiles[i][j].show()
      });

      return Promise.all(sumPromises);
    });

    return Promise.all(promises);
  }

  hide(){
    const promises = this._winTiles
      .reduce((arr, subArr) => arr.concat(subArr), [])
      .map(winLine => winLine.hide());

    return Promise.all(promises);
  }

  static intiWinTiles(reels) {
    // const grid = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    const grid = new Array(4).fill(0).map(() => new Array(3).fill(0));
    return grid.map((column, i) => {
      return column.map((win, j) => {
        const {x, y} = reels.reel(i).getTilePos(j);

        return new WinTile({x, y});
      });
    });
  }
}

export default WinTiles;
