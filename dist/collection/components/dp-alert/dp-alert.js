export class DpAlert {
    componentDidLoad() {
    }
    componentWillUpdate() {
        console.log('alerted', this.alerted);
    }
    async test() {
        console.log('works');
    }
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
        console.log('this alerted render', this.alerted, this.text);
        return (h("div", { class: `dp-alert ${this.alerted ? 'on' : 'off'}` },
            !this.ms ? (h("span", { class: "close-x", onClick: () => { this.alerted = false; } }, "x")) : '',
            h("slot", null, this.text)));
    }
    static get is() { return "dp-alert"; }
    static get properties() { return {
        "alerted": {
            "type": Boolean,
            "attr": "alerted",
            "mutable": true
        },
        "ms": {
            "type": Number,
            "attr": "ms",
            "mutable": true
        },
        "test": {
            "method": true
        },
        "text": {
            "type": String,
            "attr": "text",
            "mutable": true
        },
        "toasty": {
            "method": true
        }
    }; }
    static get style() { return "/**style-placeholder:dp-alert:**/"; }
}
