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
        <layout
          title="示例输入"
        >
          <input
            bind="bindDemoInput"
            value={value}
            schema={schema}
          ></input>
        </layout>
      </div>
    );
  }
}
