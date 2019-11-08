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
            bind="series" 
            value={[
              ['类目1', 100],
              ['类目2', 80],
              ['类目3', 60],
              ['类目4', 40],
              ['类目5', 20],
            ]}
          />
        </div>
      </div>
    );
  }
}
