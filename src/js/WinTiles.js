import { Container, Sprite, Graphics } from 'pixi.js'
import Assets from './Assets';
import WinTile from './WinTile';

const DEFAULT_CONFIG = {
  tiles: {
    count: 7,
    visible: 3,
    offset: 2
  },
};
const MOCK_DATA = [
  [[1,1,1],[9,10,2],[3,3,3]],
  [[1,3,10],[10,10,1],[3,3,3]],
  [[1,3,2],[5,10,4],[3,3,3]],
  [[1,5,1],[4,10,2],[3,3,3]],
];


class WinTiles extends Container {
  constructor(reels, config = DEFAULT_CONFIG) {
    super();
    this._reels = reels;
    this._winTiles = WinTiles.intiWinTiles(reels);

    const sprites  = this._winTiles.reduce((arr, subArr) => arr.concat(subArr), []);
    this.addChild(...sprites);
    this.x = 200;
    this.y = 100;
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
