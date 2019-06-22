class TestComponent extends Rete.Component {

    constructor() {
        super("Test");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);

        return node.addControl(new TextControl(this.editor, 'name')).addOutput(out1);
    }

    worker(node, inputs, outputs) {}
}