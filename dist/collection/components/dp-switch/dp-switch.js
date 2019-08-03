export class Switch {
    constructor() {
        this.disabled = false;
    }
    handleKeys(ev) {
        if (ev.key === 'Enter') {
            this.callback(ev, this.data);
        }
    }
    render() {
        return (h("label", { htmlFor: "checkbox", class: "switch" },
            h("h4", null, this.label),
            h("input", { name: "checkbox", type: "checkbox", checked: this.isChecked, disabled: this.disabled }),
            h("span", { tabIndex: (this.disabled) ? -1 : 0, onClick: (e) => this.callback(e), "aria-label": `Turn off ${this.ariaLabel} light` })));
    }
    static get is() { return "dp-switch"; }
    static get properties() { return {
        "ariaLabel": {
            "type": String,
            "attr": "aria-label"
        },
        "callback": {
            "type": "Any",
            "attr": "callback"
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "isChecked": {
            "type": Boolean,
            "attr": "is-checked"
        },
        "label": {
            "type": String,
            "attr": "label"
        }
    }; }
    static get events() { return [{
            "name": "switchClicked",
            "method": "switchClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeys"
        }]; }
    static get style() { return "/**style-placeholder:dp-switch:**/"; }
}
