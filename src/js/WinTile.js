import { Container, Sprite, Graphics } from 'pixi.js'
import Assets from './Assets';
import { Power1, Power2, TweenMax } from "gsap/TweenMax";

const DEFAULT_CONFIG = {
  tiles: {
    count: 7,
    visible: 3,
    offset: 2
  },
};

class WinTile extends Sprite {
  constructor({ texture = 'winframe', x, y } = {}) {
    super(Assets.images[texture]);

    this.x = x + this.width / 2;
    this.y = y + this.height / 2;
    this.anchor.x = this.anchor.y = 0.5;
    this.scale.x = this.scale.y = 1.5;
    this.alpha = 0;
  }

  show(){
    return this._to({alpha: 1, scale: 1, duration: 0.5, ease: Power2.easeOut});
  }

  hide() {
    return this._to({alpha: 0, scale: 1.5, duration: 0.5, ease: Power2.easeOut});
  }

  _to({ alpha, scale, duration, ease }){
    if(this.alpha === alpha) return Promise.resolve();

    return new Promise((resolve) => {
      const scaleObj = { value: this.scale.x };
      this.scale.x = this.scale.y = scaleObj.value;

      TweenMax.to(scaleObj, duration, { value: scale, ease, onUpdate: () => {
        this.scale.x = this.scale.y = scaleObj.value;
      }});
      TweenMax.to(this, duration, { alpha, ease, onComplete: resolve });
    });
  }
}

export default WinTile;
