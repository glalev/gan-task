import { Container, Sprite } from 'pixi.js'
import Assets from './Assets';

const IDS_MAP = {
  1: 'symbol_9',
  2: 'symbol_10',
  3: 'symbol_jack',
  4: 'symbol_queen',
  5: 'symbol_king',
  6: 'symbol_ace',
  7: 'symbol_axe',
  8: 'symbol_brain',
  9: 'symbol_crow',
  10: 'symbol_rifle',
}

class Tile extends Container {
  constructor(config) {
    super();
    this._sprites = Tile.initSpites(config)
  }

  to(id) {
    this.removeChildren();
    this.addChild(this._sprites[id]);
  }

  static initSpites({ ids, width = 168, height = 168} = {}) {
    return ids.reduce((sprites, id) => {
      const texture = Assets.images[IDS_MAP[id]];
      const sprite = new Sprite(texture);

      sprite.x = (width - sprite.width) / 2;
      sprite.y = (height - sprite.height) / 2;
      sprites[id] = sprite;

      return sprites;
    }, {});
  }
}

export default Tile;
