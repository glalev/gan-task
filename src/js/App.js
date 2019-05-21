import * as PIXI from 'pixi.js'

const init = () => {
  console.log('hello world...');
}

class App {
  constructor(container) {
    init();
  }
}

window.App = App;
