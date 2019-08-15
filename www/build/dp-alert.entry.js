import { r as registerInstance, h } from './chunk-b8d63b94.js';

class DpAlert {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { class: `dp-alert ${this.alerted ? 'on' : 'off'}` }, !this.ms ? (h("span", { class: "close-x", onClick: () => { this.alerted = false; } }, "x")) : '', this.text));
    }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  margin: auto;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.hue-app:not(.hydrated) {\n  visibility: hidden;\n}\n\n.dp-alert {\n  padding: 16px 18px;\n  display: inline-block;\n  -webkit-transition: 0.35s ease-in;\n  transition: 0.35s ease-in;\n  position: fixed;\n  top: 30px;\n  right: 30px;\n  color: white;\n  border-radius: 2px;\n  opacity: 0;\n  visibility: hidden;\n}\n.dp-alert.on {\n  opacity: 1;\n  visibility: visible;\n  background: #49eb8b;\n}\n.dp-alert .close-x {\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  font-size: 12px;\n  padding: 1px 5px;\n}"; }
}

export { DpAlert as dp_alert };
