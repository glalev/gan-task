import Config from './config/Config';
const DEFAULT_CONFIG = Object.assign({}, Config, {
  winChance: 50,
  lines: [
    [[1,0,0],[1,0,0],[1,0,0],[1,0,0]],
    [[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
    [[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
    [[1,0,0],[0,1,0],[1,0,0],[0,1,0]],
    [[0,0,1],[0,1,0],[0,0,1],[0,1,0]],
  ],
  losingLine: [[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
  visible: 3,
  pre: 5,
  post: 5,
});

class MockServer {
  constructor(config = DEFAULT_CONFIG) {
    this._cfg = config;
  }

  settings(){
    return this._getData(false).data;
  }

  spin() {
    const isWinning = this._isWinning();
    const data = this._getData(isWinning);

    return Promise.resolve(data);
  }

  _isWinning() {
    return Math.random() > (this._cfg.winChance / 100);
  }

  _getData(win) {
    const tileIds = this._cfg.reels.tiles.ids;
    const lines = win ? MockServer.sampleFrom(this._cfg.lines) : this._cfg.losingLine;
    const winningTile = win ? MockServer.sampleFrom(tileIds) : 0;
    const ids = tileIds.filter(id => id !== winningTile);
    const data = new Array(this._cfg.reels.count).fill(0).map((_, i)=>{
      const visible = lines[i].map((win) => win ? winningTile : MockServer.sampleFrom(ids));
      const pre = new Array(this._cfg.pre).fill(0).map(() => MockServer.sampleFrom(ids));
      const post = new Array(this._cfg.post).fill(0).map(() => MockServer.sampleFrom(ids));
      const buffer = [pre, visible, post];
      return buffer;
    });

    return { lines, data };
  }

  static sampleFrom(data){
    return data.sort(() => Math.random() - 0.5)[0];
  }
}

export default MockServer;
