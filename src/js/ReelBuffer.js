import { Container, Sprite } from 'pixi.js'
import Assets from './Assets';
import { Power1, Power2, TimelineMax } from "gsap/TweenMax";

const DEFAULT_CONFIG = {
  tiles: {
    count: 7,
    visible: 3,
    offset: 2
  },
  spin: {
    speed: 5, // tiles per second
  }
};
const events = {
  UPDATE: 'update'
}
class ReelBuffer extends Container{ // todo extend just event emiter
  constructor(data = [], config = DEFAULT_CONFIG) {
    super();
    this._timeLine = new TimelineMax({ onUpdate: () => this.emit('update') });
    this._cfg = config;
    this.current = data[0].length;
    this.data = data.reduce((arr, subArr) => arr.concat(subArr), []);
  }

  spin(data = [[1,1,1],[9,10,2],[3,3,3]]) {
    const flatten = data.reduce((arr, subArr) => arr.concat(subArr), []);
    const target = data[0].length;
    const end = this.current + this._cfg.tiles.visible + this._cfg.tiles.offset;
    const rest = this.data.slice(0, end);

    this.current = this.current + flatten.length;
    this.data = flatten.concat(rest);

    const distance = this.current - target;
    const time = distance / this._cfg.spin.speed;
    const preTarget = this.current + 0.5;

    this._timeLine
      .to(this, 1, { current: preTarget, ease: Power1.easeOut })
      .to(this, time, { current: target - 0.5, ease: Power1.easeOut })
      .to(this, 0.5, { current: target, ease: Power1.easeIn })
  }

  static get events () {
    return events;
  }
}

export default ReelBuffer;
