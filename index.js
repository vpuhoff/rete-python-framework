var container = document.querySelector('#rete');
var editor = null;
var initialData = () => ({id: 'demo@0.1.0', nodes: {}});
if (localStorage.getItem("sus")) {
    var modules = JSON.parse(localStorage.getItem("sus"))
}else{
    var modules = {
        ...modulesData
    }
}

var currentModule = {};

function addModule() {
    result = prompt("Input module name", "");
    if (result ){
        modules[result] = { data: initialData() }
    }
}

function save() {
    localStorage.setItem("sus", JSON.stringify(modules))
}

async function openModule(name) {
    currentModule.data = editor.toJSON();
    
    currentModule = modules[name];
    await editor.fromJSON(currentModule.data);
}


alight('#modules', { modules, addModule, openModule, save });


var editor = new Rete.NodeEditor("demo@0.1.0", container);
editor.use(ConnectionPlugin, { curvature: 0.4 });
editor.use(AlightRenderPlugin);
editor.use(ContextMenuPlugin, {
    searchBar: true, // true by default
    rename(component) {
        return component.name;
    },
    clone: true,
    items: {
        'Click me'(){ console.log('Works!') }
    }
});

var engine = new Rete.Engine("demo@0.1.0");

editor.use(ModulePlugin, { engine, modules });

[
    new NumComponent, 
    new AddComponent, 
    new InputComponent, 
    new ModuleComponent, 
    new OutputComponent, 
    new OutputFloatComponent, 
    new PipeComponent,
    new RedisComponent,
    new QueueComponent
].map(c => {
    editor.register(c);
    engine.register(c);
});


editor.on("process connectioncreated connectionremoved", () => {
    requestAnimationFrame(async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });
});

editor.view.resize();

openModule('index.rete')