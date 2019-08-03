/*! Built with http://stenciljs.com */
const { h } = window.mycomponent;

class Switch {
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
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n/**\n**Button Start\n**/\n.switch {\n  cursor: pointer;\n}\n.switch input {\n  display: none;\n}\n.switch input + span {\n  width: 48px;\n  height: 28px;\n  border-radius: 14px;\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  display: block;\n  position: relative;\n  background: #FF4651;\n  -webkit-box-shadow: 0 8px 16px -1px rgba(255, 70, 81, 0.2);\n  box-shadow: 0 8px 16px -1px rgba(255, 70, 81, 0.2);\n}\n.switch input + span:before, .switch input + span:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n.switch input + span:before {\n  top: 5px;\n  left: 5px;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  border: 5px solid #fff;\n}\n.switch input + span:after {\n  top: 5px;\n  left: 32px;\n  width: 6px;\n  height: 18px;\n  border-radius: 40%;\n  -webkit-transform-origin: 50% 50%;\n  transform-origin: 50% 50%;\n  background: #fff;\n  opacity: 0;\n}\n.switch input + span:active {\n  -webkit-transform: scale(0.92);\n  transform: scale(0.92);\n}\n.switch input:checked + span {\n  background: #48EA8B;\n  -webkit-box-shadow: 0 8px 16px -1px rgba(72, 234, 139, 0.2);\n  box-shadow: 0 8px 16px -1px rgba(72, 234, 139, 0.2);\n}\n.switch input:checked + span:before {\n  width: 0px;\n  border-radius: 3px;\n  margin-left: 27px;\n  border-width: 3px;\n  background: #fff;\n}\n.switch input:checked + span:after {\n  -webkit-animation: blobChecked 0.35s linear forwards 0.2s;\n  animation: blobChecked 0.35s linear forwards 0.2s;\n}\n.switch input:not(:checked) + span:before {\n  -webkit-animation: blob 0.85s linear forwards 0.2s;\n  animation: blob 0.85s linear forwards 0.2s;\n}\n\n\@-webkit-keyframes blob {\n  0%, 100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n  30% {\n    -webkit-transform: scale(1.12, 0.94);\n    transform: scale(1.12, 0.94);\n  }\n  60% {\n    -webkit-transform: scale(0.96, 1.06);\n    transform: scale(0.96, 1.06);\n  }\n}\n\n\@keyframes blob {\n  0%, 100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n  30% {\n    -webkit-transform: scale(1.12, 0.94);\n    transform: scale(1.12, 0.94);\n  }\n  60% {\n    -webkit-transform: scale(0.96, 1.06);\n    transform: scale(0.96, 1.06);\n  }\n}\n\@-webkit-keyframes blobChecked {\n  0% {\n    opacity: 1;\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n  }\n  30% {\n    -webkit-transform: scaleX(1.44);\n    transform: scaleX(1.44);\n  }\n  70% {\n    -webkit-transform: scaleX(1.18);\n    transform: scaleX(1.18);\n  }\n  50%, 99% {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n    opacity: 0;\n  }\n}\n\@keyframes blobChecked {\n  0% {\n    opacity: 1;\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n  }\n  30% {\n    -webkit-transform: scaleX(1.44);\n    transform: scaleX(1.44);\n  }\n  70% {\n    -webkit-transform: scaleX(1.18);\n    transform: scaleX(1.18);\n  }\n  50%, 99% {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n    opacity: 0;\n  }\n}"; }
}

export { Switch as DpSwitch };
