import { Host, h } from "@stencil/core";
import HueApi from '../../api/api';
export class HueRowTitle {
    handleSwitch(_e) {
        if (this.groupId && this.groupData) {
            HueApi.setGroupState(this.groupId, { 'on': !this.any_on });
            this.groupData['lights'].forEach(light => {
                this.GroupOff.emit(light.lightId);
            });
            this.toggle();
        }
    }
    toggle() {
        this.any_on = !this.any_on;
    }
    render() {
        return (h(Host, { class: "danzerpress-col-1" },
            h("h2", null, this.title),
            h("dp-switch", { isChecked: this.any_on, callback: this.handleSwitch.bind(this) })));
    }
    static get is() { return "hue-row-title"; }
    static get originalStyleUrls() { return {
        "$": ["hue-row-title.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["hue-row-title.css"]
    }; }
    static get properties() { return {
        "title": {
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
            "attribute": "title",
            "reflect": false
        },
        "groupId": {
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
            "attribute": "group-id",
            "reflect": false
        },
        "reachable": {
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
            "attribute": "reachable",
            "reflect": false
        },
        "any_on": {
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
            "attribute": "any_on",
            "reflect": false
        },
        "groupData": {
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
            "attribute": "group-data",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "GroupOff",
            "name": "GroupOff",
            "bubbles": false,
            "cancelable": true,
            "composed": false,
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
}
