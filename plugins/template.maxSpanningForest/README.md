## maxSpanningForest

template.maxSpanningForest for jiuselu graph analyzer, which is a plugin for graph. This is a collection of fundamental functions, including:
- the style of the nodes and graphs,
- extracting max spanning forest, 
- Force Atlas 2 layout algorithm( with webworker ), 
- interactions
  - extracting subgraph
  - highlight subgraph
  - fisheye lens
  - onclick
  - menu operations

parameter for this plugin:
- layoutCfg: the configuration for layout.
  - max_iteration: the number of iteration for terminating the layout algorithm
  - kg: the gravity parameter for layout. The larger kg, more compact the graph, expecialy for the isolated subgraphs.
  - prev_overlapping: whether preventing the node overlapping
  - onLayoutComplete: a listener for layout completement. When the layout is complete, the loading div and img disappear.
- menuCfg: the configuration for menu
  example: 
    const menuCfg = {
      lists: [{
        html: '来源',
        callBack: 'showSource',
      },
      {
        html: '去向',
        callBack: 'showTargets',
      },
      {
        html: '来源去向',
        callBack: 'showAll',
      },
      {
        html: '查看。。。。',
        callBack: function() {console.log('aaa')},
      }],
    };
    - lists: an array of menu lis
      - html: the html of the li
      - callBack: the onclick listener of the li, could be string or a function. If it is a string, it must be a existing function name in menu.js.

To navigate an item (a node or edge) by id or item, if this item is not in the view, the whole graph will translate a shortest distance to make the node in the view:
  graph.activeItem(item); // item or id
  graph.navigate(item); // item or id

To create the menu which follows the mouse click:
  graph.createMenu(func, container_id); 
    params: 
    - func is the onclick listener for the li '查看单页分析详情'
    - container_id is the DOM id of the menu container.
  
## use

simple use.

```js
const MaxSpanningForestPlugin = G6.Plugins['template.maxSpanningForest'];
//the instances of plugins
const maxSpanningForest = new MaxSpanningForestPlugin({
  layoutCfg: {
    max_iteration: 600,
    kg: 10,
    prev_overlapping: true,
    onLayoutComplete: function () {
      const minimap = document.getElementById('minimap');
      const legend = document.getElementById('legend');
      if (minimap !== undefined) minimap.style.display = 'block';
      if (legend !== undefined) legend.style.display = 'block';
    }
  }
});

      
```