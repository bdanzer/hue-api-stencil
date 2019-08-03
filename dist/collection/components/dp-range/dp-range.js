export class Range {
    constructor() {
        this.disabled = false;
    }
    render() {
        return (h("input", { type: "range", class: "range", id: "start", name: "volume", min: this.min, max: this.max, onChange: (e) => { this.rangeChagned.emit({ 'data': this.data, 'event': e }); }, onInput: (e) => { this.inputChanged.emit({ 'event': e }); }, value: this.rangeValue, "aria-label": this.ariaLabel, "aria-valuenow": `${this.ariaValueNow} percent`, "aria-valuetext": `${this.ariaValueNow} percent`, step: "1", "aria-valuemin": this.min, "aria-valuemax": this.max, tabIndex: (this.disabled ? -1 : 0), disabled: this.disabled }));
    }
    static get is() { return "dp-range"; }
    static get properties() { return {
        "ariaLabel": {
            "type": String,
            "attr": "aria-label"
        },
        "ariaValueNow": {
            "type": Number,
            "attr": "aria-value-now"
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "max": {
            "type": String,
            "attr": "max"
        },
        "min": {
            "type": String,
            "attr": "min"
        },
        "rangeValue": {
            "type": String,
            "attr": "range-value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "rangeChagned",
            "method": "rangeChagned",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:dp-range:**/"; }
}
