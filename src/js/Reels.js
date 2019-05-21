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
const MOCK_DATA = [
  [[1,1,1],[9,10,2],[3,3,3]],
  [[1,3,10],[10,10,1],[3,3,3]],
  [[1,3,2],[5,10,4],[3,3,3]],
  [[1,5,1],[4,10,2],[3,3,3]],
];


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

  reel(index) {
    return this._reels[index];
  }

  static initReels({ count, width, padding }) {
    return new Array(count).fill(0).map((_, i) => {
      const reel = new Reel();
      reel.x = i * width + padding * i

      return reel;
    });
  }

  spin(data = MOCK_DATA) {
    if (data.length !== this._reels.length) return console.error('Wrong spin data');
    const promises = data.map((entry, i) => {
      return this._reels[i].spin(entry);
    });

    return Promise.all(promises);
  }
}

export default Reels;
