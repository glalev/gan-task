import { Container, Sprite } from 'pixi.js'
import Assets from './Assets';
import Reels from './Reels';
import WinTiles from './WinTiles';
import Button from './Button';
import MockServer from './MockServer';
import Config from './config/Config';

class Game extends Container {
  constructor() {
    super();
    this._server = new MockServer();
    this._background = new Sprite(Assets.images.background);
    this._reels = new Reels(Config.reels, this._server.settings());
    this._winTiles = new WinTiles(this._reels);
    this._spinButton = new Button({ x: 1000, y: 300, click: ()=> this._spin() });


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
