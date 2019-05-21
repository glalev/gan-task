import { Container, Sprite } from 'pixi.js'
// import manifest from './config/manifest';
import Assets from './Assets';
import Reels from './Reels';
import WinTiles from './WinTiles';

class Game extends Container {
  constructor() {
    super();
    this._background = new Sprite(Assets.images.background);
    const reels = new Reels();
    const winTiles = new WinTiles(reels);
    window.reels = reels;
    window.winTiles = winTiles;

    this.addChild(this._background, reels, winTiles);
  }
}

export default Game;
