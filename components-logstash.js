class FilterComponent extends Rete.Component {
    constructor() {
        super("Filter");
    }

    builder(node) {
        node.addOutput(new Rete.Output('out', "Output", pipeSocket));
        node.addInput(new Rete.Input('input', "Input", pipeSocket, true));
        node.addControl(new TextControl(this.editor, 'filter-template'));

        return node;
    }

    worker(node, inputs, outputs) {}
}