import { Loader, Textrue, Sprite } from 'pixi.js'
import manifest from './config/manifest';
import Assets from './Assets';

class LoadingScreen {
  constructor(manifest) {
    this._loader = new Loader
    this._bar = new Sprite(Texture.WHITE);
    this._bar.width = 0;
    this._bar.height = 0;
  }

  load(){

  }
}

export default LoadingScreen;
