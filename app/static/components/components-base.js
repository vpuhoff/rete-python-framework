class NumComponent extends Rete.Component {

    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);

        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

class AddComponent extends Rete.Component {
    constructor() {
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input('num1', "Number", numSocket);
        var inp2 = new Rete.Input('num2', "Number2", numSocket);
        var out = new Rete.Output('num', "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, 'num1'))
        inp2.addControl(new NumControl(this.editor, 'num2'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
        var sum = n1 + n2;

        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}

class PipeComponent extends Rete.Component {

    constructor() {
        super("Pipe");
    }

    builder(node) {
        node.addOutput(new Rete.Output('out', "Output", pipeSocket));
        node.addControl(new TextControl(this.editor, 'name', false, 'Name'));
        node.addControl(new TextControl(this.editor, 'workers', false, 'Workers'));
        node.addControl(new TextControl(this.editor, 'filter', false, 'FilterTemplate'));
        node.addInput(new Rete.Input('in', "Input", pipeSocket, true));
        return node;
    }
}