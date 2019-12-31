import { r as registerInstance, h } from './chunk-b8d63b94.js';
import { H as HueApi } from './chunk-0867726e.js';

class HueCard {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
            h("div", { class: `card-wrap danzerpress-box danzerpress-shadow-2 light-${(this.on) ? 'on' : 'off'} light-reachable-${this.reachable}` }, h("h2", { class: "light-title" }, this.lightName), h("div", { class: "danzerpress-flex-row" }, h("div", { class: "danzerpress-col-2" }, h("img", { class: "lightbulb", src: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Lighting_and_Fans/standard-light-bulb.png" })), h("div", { class: "danzerpress-col-2" }, h("p", null, h("dp-switch", { label: `Light status: ${(this.on) ? 'On' : 'Off'}`, isChecked: this.on, ariaLabel: this.lightName, callback: this.switchClicked.bind(this), disabled: !this.reachable })), h("h4", null, "Light Brightness: ", this.getPercentage(this.bri), "%"), h("dp-range", { min: "1", max: "254", rangeValue: this.bri, data: { 'lightId': this.lightId }, ariaLabel: `Control the light brightness of ${this.lightName}`, ariaValueNow: this.getPercentage(this.bri), disabled: !this.reachable }))))
        ];
    }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  margin: auto;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\nhue-app:not(.hydrated) {\n  visibility: hidden;\n}\n\nhue-card .card-wrap {\n  -webkit-transition: 1s ease-in;\n  transition: 1s ease-in;\n  opacity: 1;\n  background: white;\n}\nhue-card .card-wrap.light-reachable-false {\n  opacity: 0.5;\n}\nhue-card .card-wrap.light-reachable-false span,\nhue-card .card-wrap.light-reachable-false .range {\n  cursor: not-allowed;\n}\nhue-card .card-wrap .light-title {\n  text-align: center;\n}\nhue-card .card-wrap.light-off img {\n  opacity: 0.4;\n}\nhue-card .card-wrap h4 {\n  font-size: 14px;\n  color: #848484;\n}\nhue-card .card-wrap .lightbulb {\n  opacity: 1s;\n  -webkit-transition: 0.8s ease-in;\n  transition: 0.8s ease-in;\n}\nhue-card .not-reachable-alert {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background: #606670;\n  color: white;\n  padding: 14px 18px;\n  z-index: 1;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  background: -webkit-gradient(linear, left top, right top, from(#4A00E0), to(#8E2DE2));\n  background: linear-gradient(to right, #4A00E0, #8E2DE2);\n}"; }
}

export { HueCard as hue_card };
