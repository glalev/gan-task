import { Container, autoDetectRenderer, Ticker, Loader } from 'pixi.js'
import manifest from './config/manifest';
import Assets from './Assets';
import Game from './Game';
import Tile from './Tile';
import Reel from './Reel';

class App {
  constructor(container) {
    this._stage = new Container();
    this._renderer = autoDetectRenderer({ width: 1710, height: 801 });
    this._game = null;

    container.appendChild(this._renderer.view);
    Ticker.shared.add(() => this._renderer.render(this._stage));
  }

  init() {
    this._game = new Game();
    this._stage.addChild(this._game);
  }

  load() {
    return new Promise(resolve => {
      const loader = new Loader();

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
