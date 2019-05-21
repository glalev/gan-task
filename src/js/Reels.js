import { Container, Sprite, Graphics } from 'pixi.js'
import Reel from './Reel';
const DEFAULT_CONFIG = {
  reels: {
    count: 4,
    padding: 20,
    width: 168,
    height: 504,
  }
};

class Reels extends Container {
  constructor(config = DEFAULT_CONFIG) {
    super();
    this._reels = Reels.initReels(config.reels);
    this.addChild(...this._reels);

    const mask = new Graphics();
    const maskWidth = config.reels.count * config.reels.width + (config.reels.count - 1) * config.reels.padding;
    const maskHeight = +config.reels.height;
    mask.beginFill(0);
    mask.drawRect(0, 0, maskWidth, maskHeight);

    this.addChild(mask);
    this.mask = mask;

    this.x = 200;
    this.y = 100;
  }

  static initReels({ count, width, padding }) {
    return new Array(count).fill(0).map((_, i) => {
      const reel = new Reel();
      reel.x = i * width + padding * i

      return reel;
    });
  }

  spin(data) {
    
  }
}

export default Reels;
