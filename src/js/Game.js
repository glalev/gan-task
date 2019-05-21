import { Container, Sprite } from 'pixi.js'
// import manifest from './config/manifest';
import Assets from './Assets';
import Reels from './Reels';
import WinTiles from './WinTiles';
import Button from './Button';
import MockServer from './MockServer';

class Game extends Container {
  constructor() {
    super();
    this._background = new Sprite(Assets.images.background);
    this._reels = new Reels();
    this._winTiles = new WinTiles(this._reels);
    this._spinButton = new Button({ x: 1000, y: 300, click: ()=> this._spin() });
    this._server = new MockServer();

    window.reels = this._reels;
    window.winTiles = this._winTiles;
    window.button = this._spinButton;
    window.server = this._server;

    this.addChild(this._background, this._reels, this._winTiles, this._spinButton);
  }

  async _spin() {
    this._spinButton.disable();

    const { lines, data } = await this._server.spin();
    await this._winTiles.hide();
    await this._reels.spin(data);
    await this._winTiles.show(lines);

    this._spinButton.enable();
  }
}

export default Game;
