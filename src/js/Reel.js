import { Container } from 'pixi.js'
import ReelBuffer from './ReelBuffer';
import Tile from './Tile';

class Reel extends Container {
  constructor(config, data) {
    super();
    this._buffer = new ReelBuffer(config, data);
    this._tiles = Reel.initTiles(config.tiles);
    this._tilesIndexes = [2,1,0,3,4,5,6]; // todo add a function that calculates these
    this._cfg = config;

    this.addChild(...this._tiles);
    this._renderTiles();

    this._buffer.on('update', () => this._renderTiles());
  }

  spin(data) {
    return this._buffer.spin(data);
  }

  getTilePos(offset){
    const baseIndex = this._cfg.tiles.offset;
    const y =  this.y + this._tiles[baseIndex + offset].y;
    const x =  this.x + this._tiles[baseIndex + offset].x;

    return { x, y };
  }

  _renderTiles() {
    const baseIndex = this._cfg.tiles.offset;
    const currentIndex = Math.floor(this._buffer.current);

    this._tilesIndexes.forEach(index => {
      const tile = this._tiles[index];
      const dataIndex = currentIndex + index - baseIndex;
      const id = this._buffer.data[dataIndex];

      tile.to(id);

      if(index < baseIndex) {
        const previous = this._tiles[index + 1];
        tile.y = previous.y - tile.height;
      } else if (index > baseIndex){
        const next = this._tiles[index - 1];
        tile.y = next.y + tile.height;
      }

      const offset = (currentIndex - this._buffer.current) * this._tiles[baseIndex].width;
      this.y = offset;
    });
  }

  static initTiles(config) {
    return new Array(config.count).fill(0).map((_, i) => {
      return new Tile(config);
    });
  }
}

export default Reel;
