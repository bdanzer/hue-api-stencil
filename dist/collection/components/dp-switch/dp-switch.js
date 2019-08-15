import { h } from "@stencil/core";
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
    static get originalStyleUrls() { return {
        "$": ["dp-switch.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dp-switch.css"]
    }; }
    static get properties() { return {
        "isChecked": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-checked",
            "reflect": false
        },
        "data": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "data",
            "reflect": false
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false
        },
        "ariaLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "aria-label",
            "reflect": false
        },
        "callback": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Function",
                "resolved": "Function",
                "references": {
                    "Function": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "switchClicked",
            "name": "switchClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeys",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
