class NumControl extends Rete.Control {

    constructor(emitter, key, readonly) {
        super(key);
        this.component = VueNumControl;
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}

class TextControl extends Rete.Control {
    constructor(emitter, key) {
        super(key);
        this.component = VueTextControl;
        this.props = { emitter, ikey: key };
    }
    setValue(val) {
        this.vueContext.value = val;
    }

}