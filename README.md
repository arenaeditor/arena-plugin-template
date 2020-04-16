### 插件基础

+ ArenaPluginDOM

```javascript
export default class Base extends ArenaPluginDOM {
  onMounted() {}

  propWillUpdate() {}

  // 新增：主题改变
  onThemeChange() {
    // console.log(this.$arena.theme);
  }

  // 新增：编辑状态聚焦
  onFocus() {}

  onResizeEnd() {}
}
```

+ index.js

```javascript
import baseBar from './charts/bar/baseBar/index';

export {
  // 柱形图
  baseBar,
}
```

+ pliugin.json

```javascript
{
  "name": "", // 插件名称
  "pluginId": "", // 插件id
  "author": "", // 插件作者
  "description": "" // 插件描述
  "version": "0.0.1", // 插件版本
  "main": "app/index.js", // 插件入口文件
  "target": 3, // 插件版本（过度完成将废弃）
  "category": "charts", // 可选，为插件注册分类
  "plugins": [ // 插件内容
    {
      "name": "基础柱形图",
      "export": "baseBar",
      "icon": "app/static/icon/barChart.png",
      "type": "bar",
      "thumb": "app/static/thumb/baseBar.png"
    },
  ],
}
```

### 插件调用配置面板jsx语法说明

#### 支持类式组件和函数式组件

+ 类式组件

⚠️举例：state做数据管理，props接收父组件传参

```javascript
export default class DemoChart {
  constructor(props) {
    this.props = props;
    this.state = {
      schema: {
        type: 'number',
        minimum: 0,
        maximum: 100,
      },
      value: 50,
      unit: '%',
    };
  }
  render() {
    const { schema, unit, value } = this.state;
    const { bindRadius } = this.props;
    return (
      // 根组件需要有一个div作为根容器包裹，根据id来标识面板页号，目前最多支持两页，id如下
        <div 
          id="demo" 
        >
          <div id="ac-element"> // 面板分页1
            <layout
              title="示例输入
            >
              <input
                bind="bindDemoInput"
                value={value}
                schema={schema}
              />
            </layout>
          </div>
          <div id="ac-interactive"> // 面板分页2
             <layout
                title="半径"
              >
                <input
                  bind="bindRadius"
                  value={value}
                  schema={schema}
                  unit={unit}
                  label="123"
                />
              </layout>
          </div>
        <div>
    );
  }
}
```

⚠️面板调用方式：

```javascript
import DemoChart from '../panel.arena.jsx';

export default class Chart extends ArenaPluginDOM {
  static panel() {
    return new DemoChart().render();
  }
}
```

+ 函数式组件

举例：

```javascript
export default function demoChart(props) {
    const state = {
      schema: {
        type: 'number',
        minimum: 0,
        maximum: 100,
      },
      value: 50,
      unit: '%',
    };
    return (
      <div 
        id="demo"
      >
        <div id="ac-element">
          <layout
            title="半径"
          >
            <input
              bind={bindRadius + "a"}
              value={state.value}
              schema={state.schema}
              unit={state.unit}
              label="123"
            />
          </layout>
        </div>
      <div>
    );
}
```

⚠️面板调用方式：

```javascript
import demoChart from '../panel.jsx';

export default class Chart extends ArenaPluginDOM {
  static panel() {
    return demoChart();
  }
  onMounted() {}

  propWillUpdate() {}

  // 新增：编辑状态聚焦
  onfocus() {}

  onResizeEnd() {}
}
```

#### 可用编辑器组件：
⚠️注意：编辑器组件标签名小写

+ input：输入框组件

```javascript
<input
  bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
  value="123" // 组件默认值
  schema={{ // schema
    type: 'number',
    minimum: 0,
    maximum: 100,
  }}
  unit="px" // 单位
  label="123" // 组件下方小标签，若无可不写此参数
/>
```

+ selector：下拉列表组件

```javascript
<selector
  bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
  value="polygon" // 组件默认选中值
  options={[ // 选项列表
    {
      name: 'polygon',
      value: 'polygon',
    },
    {
      name: 'circle',
      value: 'circle',
    },
  ]}
  label="边框" // 组件下方小标签，若无可不写此参数
/>
```

+ panel：颜色面板组件

```javascript
<panel
  bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
  value={{
    texture: {　
      type: 'color',
      color: 'rgba(0, 0, 0, 1)',
      value: 'rgba(0, 0, 0, 1)'
    }
  }}
  label="边框" // 组件下方小标签，若无可不写此参数
/>
```

+ radio：单选组件

```javascript
<radio 
    bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
    type="radio" // 显示类型，默认radio，可选button，thumb
    value="multiple" // 组件默认选中值
    options={[  // 选项列表
      {
        name: '单选模式',
        value: 'single'
      },
      {
        name: '多选模式',
        value: 'multiple'
      }
    ]}
/>
```

+ bindinput：组合input组件

```javascript
<bindinput
  bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
  value="20px 30px 20px 30px" // 组件默认值
  hints={['上', '右', '下', '左']} // 指定方向
/>
```

+ layout：单行布局组件

```javascript
<layout
  title="半径" // 单行前方标题，若不需要可写title=""，若需要占位可写title=" "
  col={[1,2]} // 调整内部元素占比，默认为1，非必需
>
</layout>
```
+ switch ：开关组件
```javascript
<switch bind="bindname" value={true}/>  //值为布尔值
```

**⚠️注意：以下所有折叠面板里均要配置控件,不可为空**

tip：内部的任意类型折叠面板可以添加`isChildren={true}`实现缩进

+ collapse：普通折叠面板组件

```javascript
<collapse
  name="柱图" // 折叠面板标题
>
  {/* ...配置 */}
</collapse>
```

+ switchcollapse：带开关状态的折叠面板组件

```javascript
<switchcollapse
  title="刻度" // 折叠面板标题
  bind="bindname" // 必填，绑定状态变量名称，数据改变时可在$arena.data中取得
  value={true} // 状态默认值
>
  {/* ...配置 */}
</switchcollapse>
```

+ tabcollapse：内容为tab页的折叠面板组件

```javascript
<tabcollapse
  title="折线样式" // 折叠面板标题
  bind="chartSeries" // 必填，名称固定为chartSeries，数据改变时可在$arena.data中取得
>
  <tab
    type="bar" // 图表的类型
    label="柱图" // 图表的中文
  >
    <input
      key="barWidth"
      value="123"
      schema={state.schemaZero}
    />
  </tab>
  <tab>
   <input
      key="barWidth"
      value="123"
      schema={state.schemaZero}
    />
  </tab>
</tabcollapse>
```
> 特殊说明: 如果图表中的图类型大于一,可以使用下面的方式

> 编辑器会把所有tab的type类型去重，如果大于等于2的话，添加系列(点击+号)会出现下拉，可以选择想要添加的图类型,下拉的内容就是去重后的type类型

```javascript
<tabcollapse
  title="折线样式" 
  bind="bindname"
>
  <tab
    type="bar" 
    label="柱图"
  >
    {/* ...配置 */}
  </tab>
  <tab
    type="line"
    label="折线"
  >
    {/* ...配置 */}
  </tab>
</tabcollapse>
```

+ checkboxcollapse：内容为checkbox的折叠面板组件

```javascript
<checkboxcollapse
  title="区域" // 折叠面板标题
  bind="bindname" // 必填，绑定变量名称，数据改变时可在$arena.data中取得
  value={{
      chechList: 3, // 初始勾选项目数量
      checkboxCount: 5 // 全部可选项目数量
  }}
>
  {/* ...配置 */}
</checkboxcollapse>
```

#### jsx中的条件判断

+ 使用三目运算符

```javascript

render:function(){
  return <div className={
      this.state.isComplete ? "isComplete" : ""
  }>...</div>
}

```

+ 使用变量

```javascript

getIsComplete:function(){
  return this.state.isComplete ? "isComplete" : "";
},
render:function(){
  var isComplete = this.getIsComplete();
  return <div className={isComplete}>...</div>
}

```

+ 使用函数

```javascript

getIsComplete:function(){
  return this.state.isComplete ? "isComplete" : "";
},
render:function(){
  return <div className={this.getIsComplete()}>...</div>
}

```

+ 使用&&运算符

```javascript

render:function(){
  return <div className={this.state.isComplete && "isComplete"}>...</div>
}

```

#### 支持自由组合组件的导入导出
⚠️注意：自由组件名称大写

```javascript
import BasePanel from './base/panel.arena.jsx';

...
render() {
  return (
    <div>
      <BasePanel
        a="123" // 自定义传参,在BasePanel的props中可接收到
        b="123"
      >
      </BasePanel>
    </div>
  )
}
...

```

#### 支持插槽

组件接收的props中可以接收到children参数

```javascript
...
export default class BasePanel {
  constructor(props) {
    this.props = props;
  }
  render() {
    const { 
      children 
    } = this.props;    
    return (
      <div 
      >
        {/* grid */}
        {grid && <Grid theme={theme}/>}

        {/* 提供插槽 */}
        { children }
      </div>
    );
  }
...
}
```

```javascript
import BasePanel from '../base/panel.arena.jsx';

...
render() {
  return (
    <div>
      <BasePanel>
        <input
          key="barWidth"
          value="123"
          schema={state.schemaZero}
        />
        <input
          key="barWidth"
          value="123"
          schema={state.schemaZero}
        />
        <input
          key="barWidth"
          value="123"
          schema={state.schemaZero}
        />
      </BasePanel>
    </div>
  )
}
...
```

这样，三个input会被渲染到BasePanel组件的‘children位置'


#### arena-jsx事件

为插件面板调用的所有组件提供onChange事件，拥有bind属性的组件状态发生改变时触发，可接收到一个对象格式的参数

```javascript
{ 
  $val, // 组件当前值
  $changeProps, // 函数，可改变所有拥有bind属性的组件的任意props
  $changeVal // 函数，可改变所有拥有bind属性的组件的value
}
```

⚠️注意：tabcollapse组件内部组件暂不支持事件

示例：

```javascript
...
constructor() {
  this.state = {
    schema: {
      type: 'string',
    }, 
    value: 'test',
  };
}
demoHandle({ $val, $changeProps, $changeVal }) {
  if ($val === 'circle') {
    $changeProps({
      bindDemoInput: {
        acVisible: false
      },
      }
    })
    $changeVal({
      bindDemoInput: 'none'
    })
  } else {
    $changeProps({
      bindDemoInput: {
        acVisible: true
      }
    })
    $changeVal({
      bindDemoInput: $val
    })
    
  }
}
render() {
  const { schema, value } = this.state;
  const { demoHandle } = this;

  return (
    <div id="arena-demo-plugin">
      <layout
        title="示例输入"
      >
        <selector
          bind="bindSelector"
          value="circle"
          options={[
            {
              name: 'polygon',
              value: 'polygon',
            },
            {
              name: 'circle',
              value: 'circle',
            },
            {
              name: 'rect',
              value: 'rect'
            }
          ]}
          onChange={demoHandle}
        />
        <input
          bind="bindDemoInput"
          value={value}
          schema={schema}
          toFixed="auto"
        />
      </layout>
    </div>
  )
}
...
```