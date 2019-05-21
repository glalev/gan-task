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

class Button extends Sprite {
  constructor({ texture = 'spin_button', x, y, click } = {}) {
    super(Assets.images[texture]);

    this.x = x;
    this.y = y;
    this.enable();

    this.mouseover = () => {
      this.tint = 0xffffff;
    }

    this.mouseout = () => {
      this.tint = 0xdddddd;
    }

    this.click = click;
  }

  disable() {
    this.buttonMode = false;
    this.interactive = false;
    this.tint = 0x888888;
  }

  enable() {
    this.buttonMode = true;
    this.interactive = true;
    this.tint = 0xdddddd
  }
}

export default Button;
