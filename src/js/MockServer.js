const DEFAULT_CONFIG = {
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
  tiles: {
    count: 7,
    visible: 3,
    offset: 2,
    ids: [1,2,3,4,5,6,7,8,9,10],
    width: 168,
    height: 168,
  },
  reels: {
    count: 4,
    padding: 20,
    width: 168,
    height: 504,
  }
}
class MockServer {
  constructor(config = DEFAULT_CONFIG) {
    this._cfg = config;
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
    console.log(win);
    const lines = win ? MockServer.sampleFrom(this._cfg.lines) : this._cfg.losingLine;
    const winningTile = win ? MockServer.sampleFrom(this._cfg.tiles.ids) : 0;
    const ids = this._cfg.tiles.ids.filter(id => id !== winningTile);
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
