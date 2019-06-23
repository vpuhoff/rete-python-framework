class RedisComponent extends Rete.Component {
    constructor() {
        super("Redis");
    }

    builder(node) {
        node.addOutput(new Rete.Output('out', "Connection", pipeSocket));
        node.addInput(new Rete.Input('in', "Connection", pipeSocket, true));
        node.addControl(new TextControl(this.editor, 'host'));
        node.addControl(new TextControl(this.editor, 'port'));
        node.addControl(new TextControl(this.editor, 'db'));
        node.addControl(new TextControl(this.editor, 'credential'));

        return node;
    }

    worker(node, inputs, outputs) {}
}


class ElasticComponent extends Rete.Component {
    constructor() {
        super("Elastic");
    }

    builder(node) {
        node.addInput(new Rete.Input('input', "Connection", pipeSocket, true));

        node.addControl(new TextControl(this.editor, 'host'));
        node.addControl(new TextControl(this.editor, 'port'));
        node.addControl(new TextControl(this.editor, 'db'));
        node.addControl(new TextControl(this.editor, 'credential'));
        node.addControl(new TextControl(this.editor, 'index-pattern'));
        return node;
    }

    worker(node, inputs, outputs) {}
}

class QueueComponent extends Rete.Component {
    constructor() {
        super("Queue");
    }

    builder(node) {
        node.addInput(new Rete.Input('input', "Source", pipeSocket));

        node.addControl(new TextControl(this.editor, 'queue'));

        node.addOutput(new Rete.Output('out', "Events", pipeSocket));
        return node;
    }

    worker(node, inputs, outputs) {}
}

class SyslogComponent extends Rete.Component {
    constructor() {
        super("Syslog");
    }

    builder(node) {
        node.addInput(new Rete.Input('input', "Connection", pipeSocket, true));

        node.addControl(new TextControl(this.editor, 'host'));
        node.addControl(new TextControl(this.editor, 'port'));
        return node;
    }

    worker(node, inputs, outputs) {}
}