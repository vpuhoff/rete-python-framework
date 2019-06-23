(async() => {
    var initialData = () => ({ id: 'demo@0.1.0', nodes: {} });

    var currentModule = {};

    function addModule() {
        result = prompt("Input module name", "");
        if (result) {
            modules[result] = { data: initialData() }
        }
    }

    function save() {
        currentModule.data = editor.toJSON();
        localStorage.setItem("sus", JSON.stringify(modules))
    }


    function remove() {
        if (Object.keys(modules).length >= 2) {
            delete modules[currentmodulename]
            openModule(Object.keys(modules)[0])
        }
    }

    var currentmodulename = "";
    async function openModule(name) {
        if (currentModule.data) {
            currentModule.data = editor.toJSON();
        }
        currentModule = modules[name];
        currentmodulename = name
        await editor.fromJSON(currentModule.data);
    }

    if (localStorage.getItem("sus")) {
        var modules = JSON.parse(localStorage.getItem("sus"))
    } else {
        var modules = {
            ...modulesData
        }
    }
    alight('#app');
    alight('#modules', { modules, addModule, openModule, save, remove, currentmodulename });


    var container = document.querySelector('#rete');
    var components = [
        new InputComponent(),
        new OutputComponent(),
        new ModuleComponent(),
        new PipeComponent(),
        new RedisComponent(),
        new QueueComponent(),
        new ElasticComponent(),
        new FilterComponent(),
        new CloneComponent()
    ];

    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin.default);
    editor.use(VueRenderPlugin.default);
    editor.use(ContextMenuPlugin.default);
    editor.use(AreaPlugin);
    editor.use(CommentPlugin.default);
    editor.use(HistoryPlugin);
    editor.use(ConnectionMasteryPlugin.default);
    editor.use(ModulePlugin, { engine, modules });

    var engine = new Rete.Engine('demo@0.1.0');

    components.map(c => {
        editor.register(c);
        engine.register(c);
    });


    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async() => {
        console.log('process');
        await engine.abort();
        await engine.process(editor.toJSON());
    });
    openModule(Object.keys(modules)[0])
    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
})();