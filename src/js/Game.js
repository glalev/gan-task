import { Container, Sprite } from 'pixi.js'
// import manifest from './config/manifest';
import Assets from './Assets';
import Reels from './Reels';

class Game extends Container {
  constructor() {
    super();
    this._background = new Sprite(Assets.images.background);
    const reels = new Reels();
    window.reels = reels;
    this.addChild(this._background, reels);
  }
}

export default Game;
