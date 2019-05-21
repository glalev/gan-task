import * as PIXI from 'pixi.js'
import manifest from './config/manifest';
import Assets from './Assets';
import Game from './Game';
import Tile from './Tile';
import Reel from './Reel';
// import LoadingScreen from './LoadingScreen'

class App {
  constructor(container) {
    this._stage = new PIXI.Container();
    this._renderer = PIXI.autoDetectRenderer({ width: 1710, height: 801 });
    this._game = null;
    container.appendChild(this._renderer.view);
    PIXI.Ticker.shared.add(() => this._renderer.render(this._stage));

    window.app = this; //todo delete
    window.PIXI = PIXI; //todo delete
    window.Assets = Assets; //todo delete
    window.Tile = Tile; //todo delete
    window.Reel = Reel; //todo delete
  }

  init() {
    this._game = new Game();
    this._stage.addChild(this._game);
  }

  load() {
    return new Promise(resolve => {
      const loader = new PIXI.Loader();

      manifest.spriteSheets.forEach(({id, src})  => loader.add(id, src));
      loader.load((loader, resources) => {
        manifest.spriteSheets.forEach(({id}) => {
          const spriteSheet = resources[id];
          Object.keys(spriteSheet.textures).forEach((frame) => {
            const [name] = frame.split('.');
            Assets.images[name] = spriteSheet.textures[frame];
          });
        });
        resolve();
      });
    });
  }
}

window.App = App;
