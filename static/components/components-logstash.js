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

class CloneComponent extends Rete.Component {
    constructor() {
        super("Clone");
    }

    builder(node) {
        node.addOutput(new Rete.Output('out1', "Output1", pipeSocket));
        node.addOutput(new Rete.Output('out2', "Output2", pipeSocket));
        node.addInput(new Rete.Input('input', "Input", pipeSocket, true));
        node.addControl(new TextControl(this.editor, 'name'));
        return node;
    }

    worker(node, inputs, outputs) {}
}