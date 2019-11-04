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
          <collapse
            name="数据类型" // 折叠面板标题
          >
            <input
              bind="bindDemoInput"
              value={value}
              schema={schema}
            />
          </collapse>
        </div>
      </div>
    );
  }
}
