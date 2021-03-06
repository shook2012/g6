/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;
const Fisheye = require('./tool');
class Plugin {
  constructor(options) {
    Util.mix(this, {
      ori_xs: [],
      ori_ys: []
    }, options);
  }
  init() {
    const graph = this.graph;
    graph.on('beforeinit', () => {
      const fisheye = new Fisheye({
        graph,
        ...this.options
      });
      graph.on('mousemove', Util.throttle(ev => {
        const nodes = graph.getNodes();
        const size = nodes.length;
        if (this.ori_xs.length !== size) return;
        for (let i = 0; i < size; i += 1) {
          nodes[i].getModel().x = this.ori_xs[i];
          nodes[i].getModel().y = this.ori_ys[i];
        }
        fisheye.zoom(ev.x, ev.y);
        graph.updateNodePosition();
      }, 10)
    );
    });
    const cacheLocation = Util.debounce(ev => {
      const nodes = graph.getNodes();
      const size = nodes.length;
      if (ev === undefined || ev.item === undefined) {
        for (let i = 0; i < size; i++) {
          if (nodes[i].getModel().x === undefined) return;
          this.ori_xs[i] = nodes[i].getModel().x;
          this.ori_ys[i] = nodes[i].getModel().y;
        }
      } else if (ev.item.type !== 'node' || (!ev.updateModel.x && !ev.updateModel.y)) return;
      else {
        const item = graph.find(ev.originModel.id);
        for (let i = 0; i < size; i++) {
          if (nodes[i].getModel().id === item.id) {
            this.ori_x[i] = ev.updateModel.x;
            this.ori_y[i] = ev.updateModel.y;
          }
        }
      }
    }, 16);
    // record the layout positions, in order to restore the positions after fisheye zooming
    graph.on('afterchange', cacheLocation);
    graph.on('afterlayout', cacheLocation);
  }
}

G6.Plugins['tool.fisheye'] = Plugin;

module.exports = Plugin;
