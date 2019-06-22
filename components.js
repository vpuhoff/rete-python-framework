var pipeSocket = new Rete.Socket("Pipe");
var datasourceSocket = new Rete.Socket("DataSource");

class TextControl extends Rete.Control {

    constructor(emitter, key, type = 'text') {
        super();
        this.emitter = emitter;
        this.key = key;
        this.type = type;
        this.template = `<label>${key}</label><input type="${type}" :readonly="readonly" :value="value" @input="change($event)"/>`;

        this.scope = {
            value: null,
            readonly,
            change: this.change.bind(this)
        };
    }

    onChange() {}

    change(e) {
        this.scope.value = this.type === 'number' ? +e.target.value : e.target.value;
        this.update();
        this.onChange();
    }

    update() {
        if (this.key)
            this.putData(this.key, this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData(this.key) || (this.type === 'number' ? 0 : '...');
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
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
        var out1 = new Rete.Output('output', "Number", pipeSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addOutput(out1);
    }
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
        var inp = new Rete.Input('input', "Number", pipeSocket, true);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }
}


class OutputFloatComponent extends Rete.Component {

    constructor() {
        super("Float Output");
        this.module = {
            nodeType: 'output',
            socket: pipeSocket
        }
    }

    builder(node) {
        var inp = new Rete.Input('float', "Float", pipeSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }
}

class NumComponent extends Rete.Component {

    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", pipeSocket);
        var ctrl = new TextControl(this.editor, 'num', false, 'number');

        return node.addControl(ctrl).addOutput(out1);
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
        var inp1 = new Rete.Input('num1', "Number", pipeSocket);
        var inp2 = new Rete.Input('num2', "Number", pipeSocket);
        var out = new Rete.Output('num', "Number", pipeSocket);

        inp1.addControl(new TextControl(this.editor, 'num1', false, 'number'))
        inp2.addControl(new TextControl(this.editor, 'num2', false, 'number'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs, {
        silent
    } = {}) {
        var n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
        var sum = n1 + n2;

        if (!silent)
            this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);

        outputs['num'] = sum;
    }

    created(node) {
        console.log('created', node)
    }

    destroyed(node) {
        console.log('destroyed', node)
    }
}

class PipeComponent extends Rete.Component {

    constructor() {
        super("Pipe");
    }

    builder(node) {
        var output = new Rete.Output('out', "Output", pipeSocket);
        var ctrl = new TextControl(this.editor, 'name', false, 'Name');
        var input = new Rete.Input('in', "Input", pipeSocket, true);
        return node.addControl(ctrl).addOutput(output).addInput(input);
    }
}


class RedisComponent extends Rete.Component {
    constructor() {
        super("Redis");
    }

    builder(node) {
        node.addOutput(new Rete.Output('out', "Connection", pipeSocket));

        node.addControl(new TextControl(this.editor, 'host', false, 'text'));
        node.addControl(new TextControl(this.editor, 'port', false, 'number'));
        node.addControl(new TextControl(this.editor, 'db', false, 'number'));
        node.addControl(new TextControl(this.editor, 'credential', false, 'text'));

        return node;
    }
}

class QueueComponent extends Rete.Component {
    constructor() {
        super("Queue");
    }

    builder(node) {
        node.addInput(new Rete.Input('input', "Source", pipeSocket));

        node.addControl(new TextControl(this.editor, 'queue', false, 'text'));

        node.addOutput(new Rete.Output('out', "Events", pipeSocket));
        return node;
    }
}