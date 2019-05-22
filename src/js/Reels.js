import { Container, Graphics } from 'pixi.js'
import Reel from './Reel';

class Reels extends Container {
  constructor(config, data, x, y) {
    super();
    this._reels = Reels.initReels(config, data);
    this.addChild(...this._reels);

    const mask = new Graphics();
    const maskWidth = config.count * config.width + (config.count - 1) * config.padding;
    const maskHeight = config.height;
    mask.beginFill(0);
    mask.drawRect(0, 0, maskWidth, maskHeight);

    this.addChild(mask);
    this.mask = mask;

    this.x = x;
    this.y = y;
  }

  reel(index) {
    return this._reels[index];
  }

  static initReels(config, data) {
    const { count, width, padding } = config;
    return new Array(count).fill(0).map((_, i) => {
      const reel = new Reel(config, data[i]);
      reel.x = i * width + padding * i

      return reel;
    });
  }

  spin(data) {
    if (data.length !== this._reels.length) return console.error('Wrong spin data');
    const promises = data.map((entry, i) => {
      return this._reels[i].spin(entry);
    });

    return Promise.all(promises);
  }
}

export default Reels;
