import Panel from './demoPanel.arena.jsx';
import {ArenaPluginDOM} from 'arena-types';

export default class Demo extends ArenaPluginDOM {
  static panel() {
    return new Panel().render();
  }
  
  onMounted() {
    this.dom = document.createElement('p');
    this.dom.style.color = 'red';
    this.$arena.dom.appendChild(this.dom);
    this.propWillUpdate();
  }

  propWillUpdate() {
    console.log(this.$arena.data);
    this.dom.innerText = this.$arena.data.bindDemoInput;
    // setInterval(() => {
    //   this.$events.output('bindVoiceRes', Math.random())
    // }, 1000)
  }

  onResizeEnd() {}
  
  // 新增：编辑状态聚焦
  onFocus() {}
}
