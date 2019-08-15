import { h } from "@stencil/core";
export class DpAlert {
    async toasty(text, alert, ms) {
        this.alerted = alert;
        this.text = text;
        this.ms = ms;
        if (alert && ms) {
            setTimeout(() => {
                this.alerted = !this.alerted;
            }, ms);
        }
    }
    render() {
        return (h("div", { class: `dp-alert ${this.alerted ? 'on' : 'off'}` },
            !this.ms ? (h("span", { class: "close-x", onClick: () => { this.alerted = false; } }, "x")) : '',
            this.text));
    }
    static get is() { return "dp-alert"; }
    static get originalStyleUrls() { return {
        "$": ["dp-alert.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dp-alert.css"]
    }; }
    static get properties() { return {
        "alerted": {
            "type": "boolean",
            "mutable": true,
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
            "attribute": "alerted",
            "reflect": false
        },
        "text": {
            "type": "string",
            "mutable": true,
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
            "attribute": "text",
            "reflect": false
        },
        "ms": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "ms",
            "reflect": false
        }
    }; }
    static get methods() { return {
        "toasty": {
            "complexType": {
                "signature": "(text: any, alert: any, ms: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
