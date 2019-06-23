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

class InputComponent extends Rete.Component {
    constructor() {
        super("Input");
        this.module = {
            nodeType: 'input',
            socket: pipeSocket
        }
    }

    builder(node) {
        var out1 = new Rete.Output('output', "Output", pipeSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {}
}

class ModuleComponent extends Rete.Component {

    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
    }

    builder(node) {
        var ctrl = new TextControl(this.editor, 'module');
        ctrl.onChange = () => {
            console.log(this)
            this.updateModuleSockets(node);
            node._alight.scan();
        }
        return node.addControl(ctrl);
    }

    change(node, item) {
        node.data.module = item;
        this.editor.trigger('process');
    }
}


class OutputComponent extends Rete.Component {

    constructor() {
        super("Output");
        this.module = {
            nodeType: 'output',
            socket: pipeSocket
        }
    }

    builder(node) {
        var inp = new Rete.Input('input', "Input", pipeSocket, true);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }

    worker(node, inputs, outputs) {}
}