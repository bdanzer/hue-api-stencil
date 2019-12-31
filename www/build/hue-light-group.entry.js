import { r as registerInstance, h } from './chunk-b8d63b94.js';

class HueLightGroup {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    getGroups() {
        let cards = [];
        console.log('groups in get groups', this.groups);
        for (let room in this.groups) {
            let groupedRoom = this.groups[room];
            console.log('group room', this.groups[room]);
            cards.push((h("hue-row-title", Object.assign({}, groupedRoom['state'], { groupData: groupedRoom, groupId: groupedRoom.groupId, title: room }))));
            groupedRoom['lights'].forEach((light) => {
                cards.push((h("hue-card", Object.assign({ class: 'danzerpress-col-3' }, light.state, { lightName: light.name, lightId: light.lightId }))));
            });
        }
        return cards;
    }
    render() {
        return (h("div", { class: "hue-collection danzerpress-flex-row" }, this.getGroups()));
    }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  margin: auto;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\nhue-app:not(.hydrated) {\n  visibility: hidden;\n}"; }
}

export { HueLightGroup as hue_light_group };
