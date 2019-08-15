import { h } from "@stencil/core";
export class HueCollection {
    constructor() {
        this.loading = false;
    }
    getCards() {
        let cards = [];
        for (let lightId in this.lights) {
            if (lightId == '0') {
                return (h("div", null, "No Lights Found"));
            }
            var light = this.lights[lightId];
            cards.push((h("hue-card", Object.assign({ class: 'danzerpress-col-3' }, light.state, { lightName: light.name, lightId: lightId }))));
        }
        return cards;
    }
    render() {
        return this.loading ? (h("div", { class: "lds-ring" },
            h("div", null),
            h("div", null),
            h("div", null),
            h("div", null))) : (h("div", { class: "hue-collection danzerpress-flex-row" }, (this.group) ?
            h("hue-light-group", { groups: this.groups }) :
            this.getCards()));
    }
    static get is() { return "hue-collection"; }
    static get originalStyleUrls() { return {
        "$": ["hue-collection.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["hue-collection.css"]
    }; }
    static get properties() { return {
        "loading": {
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
            "attribute": "loading",
            "reflect": false,
            "defaultValue": "false"
        },
        "lights": {
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
            "attribute": "lights",
            "reflect": false
        },
        "group": {
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
            "attribute": "group",
            "reflect": false
        },
        "groups": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "object",
                "resolved": "object",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
}
