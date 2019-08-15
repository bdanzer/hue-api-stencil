import { r as registerInstance, c as createEvent, h, H as Host } from './chunk-b8d63b94.js';
import { H as HueApi } from './chunk-0867726e.js';

class HueRowTitle {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.GroupOff = createEvent(this, "GroupOff", 1);
    }
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
        return (h(Host, { class: "danzerpress-col-1" }, h("h2", null, this.title), h("dp-switch", { isChecked: this.any_on, callback: this.handleSwitch.bind(this) })));
    }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  margin: auto;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\nhue-app:not(.hydrated) {\n  visibility: hidden;\n}\n\nhue-row-title {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\nhue-row-title h2 {\n  margin-right: 10px;\n}"; }
}

export { HueRowTitle as hue_row_title };
