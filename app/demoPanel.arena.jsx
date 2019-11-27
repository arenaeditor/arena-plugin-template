export default class DemoPanel {
    constructor() {
      this.state = {
        schema: {
          type: 'string',
        },
        value: "示例内容"
      };
    }
  
    render() {
      const { schema, value } = this.state;
      return (
        <div id="arena-demo-plugin">
          <div id="ac-element">
            <layout
              title="示例输入"
            >
              <input
                bind="bindDemoInput"
                value={value}
                schema={schema}
              />
            </layout>
          </div>
          <div id="ac-interactive">
            <datacollapse 
              name="组件数据" 
              bind="chartData" 
              value={[
                ['类目1', 100],
                ['类目2', 80],
                ['类目3', 60],
              ]}
            />
            <collapse
              name="返回值绑定"
            >
              <layout>
                <bindselector
                  name="bindVoiceRes"
                />
              </layout>
            </collapse>
            <events 
              name="组件数据" 
              eventOption={[
                {
                  label: '组件数据',
                  options: [
                    'onValChange',
                    'onCompMounted',
                    'onCompDestroyed',
                  ],
                },
                {
                  label: '键盘事件',
                  options: [
                    'onKeyDown',
                    'onKeyUp',
                  ],
                },
                {
                  label: '组件事件',
                  options: [
                    'onBlur',
                    'onFocus',
                    'onToggle',
                    'onSelectDel',
                  ],
                },
              ]}
            />
            <layout title="时间限制">
              <code
                bind="round"
                value="function round (date) {}"
                title="时间限制" // 可选，代码弹窗标题，默认组件编程
              />
            </layout>
  
            <bindborder
              bind="aa"
              value={{
                top: {
                  width: 1,
                  style: 'solid',
                  color: '#d5d5d5',
                  widthName: '上线宽',
                },
                right: {
                  width: 1,
                  style: 'solid',
                  color: '#d5d5d5',
                  widthName: '右线宽',
                },
                bottom: {
                  width: 1,
                  style: 'solid',
                  color: '#d5d5d5',
                  widthName: '下线宽',
                },
                left: {
                  width: 1,
                  style: 'solid',
                  color: '#d5d5d5',
                  widthName: '左线宽',
                },
                all: {
                  width: 1,
                  style: 'solid',
                  color: '#d5d5d5',
                  widthName: '线宽',
                },
                isBind: true,
              }}
            />
            
          </div>
        </div>
      );
    }
  }

  // 样式调好
  // 确定一下值
  // 能不能只有all