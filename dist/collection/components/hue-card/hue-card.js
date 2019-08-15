import { h } from "@stencil/core";
import HueApi from '../../api/api';
export class HueCard {
    rangeChagned(data) {
        if (data.detail.data.lightId && this.reachable) {
            var value = parseInt(data.detail.event.target.value);
            HueApi.setLightState(data.detail.data.lightId, { 'bri': value });
        }
        this.bri = parseInt(data.detail.event.target.value);
    }
    handleLightOff(lightId) {
        console.log(lightId);
        if (parseInt(this.lightId) === parseInt(lightId)) {
            this.toggle();
        }
    }
    // @Listen('inputChanged')
    // inputChanged(data) {
    //   if (this.reachable) {
    //   }
    // }
    toggle() {
        this.on = !this.on;
    }
    getPercentage(number) {
        let percentage = ((254 - parseInt(number)) / 254 * 100) - 100;
        let positiveNumber = Math.abs(percentage);
        return Math.floor(positiveNumber);
    }
    switchClicked(_e) {
        if (this.lightId && this.reachable) {
            HueApi.setLightState(this.lightId, { 'on': !this.on });
            this.toggle();
        }
    }
    render() {
        return [
            (!this.reachable) ? h("div", { class: "not-reachable-alert danzerpress-shadow-1" }, "Not Reachable") : '',
            h("div", { class: `card-wrap danzerpress-box danzerpress-shadow-2 light-${(this.on) ? 'on' : 'off'} light-reachable-${this.reachable}` },
                h("h2", { class: "light-title" }, this.lightName),
                h("div", { class: "danzerpress-flex-row" },
                    h("div", { class: "danzerpress-col-2" },
                        h("img", { class: "lightbulb", src: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Lighting_and_Fans/standard-light-bulb.png" })),
                    h("div", { class: "danzerpress-col-2" },
                        h("p", null,
                            h("dp-switch", { label: `Light status: ${(this.on) ? 'On' : 'Off'}`, isChecked: this.on, ariaLabel: this.lightName, callback: this.switchClicked.bind(this), disabled: !this.reachable })),
                        h("h4", null,
                            "Light Brightness: ",
                            this.getPercentage(this.bri),
                            "%"),
                        h("dp-range", { min: "1", max: "254", rangeValue: this.bri, data: { 'lightId': this.lightId }, ariaLabel: `Control the light brightness of ${this.lightName}`, ariaValueNow: this.getPercentage(this.bri), disabled: !this.reachable }))))
        ];
    }
    static get is() { return "hue-card"; }
    static get originalStyleUrls() { return {
        "$": ["hue-card.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["hue-card.css"]
    }; }
    static get properties() { return {
        "bri": {
            "type": "any",
            "mutable": true,
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
            "attribute": "bri",
            "reflect": false
        },
        "on": {
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
            "attribute": "on",
            "reflect": false
        },
        "mode": {
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
            "attribute": "mode",
            "reflect": false
        },
        "alert": {
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
            "attribute": "alert",
            "reflect": false
        },
        "reachable": {
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
            "attribute": "reachable",
            "reflect": false
        },
        "lightName": {
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
            "attribute": "light-name",
            "reflect": false
        },
        "lightId": {
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
            "attribute": "light-id",
            "reflect": false
        }
    }; }
    static get listeners() { return [{
            "name": "rangeChagned",
            "method": "rangeChagned",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "GroupOff",
            "method": "handleLightOff",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
