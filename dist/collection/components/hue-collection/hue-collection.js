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
    getGroups() {
        let cards = [];
        for (let room in this.groups) {
            console.log(room);
            let lights = this.groups[room];
            cards.push((h("div", { class: "danzerpress-col-1" },
                h("h2", null, room))));
            lights.forEach(light => {
                cards.push((h("hue-card", Object.assign({ class: 'danzerpress-col-3' }, light.state, { lightName: light.name, lightId: light.lightId }))));
            });
        }
        return cards;
    }
    render() {
        return this.loading ? (h("div", { class: "lds-ring" },
            h("div", null),
            h("div", null),
            h("div", null),
            h("div", null))) : (h("div", { class: "hue-collection danzerpress-flex-row" }, (this.group) ? this.getGroups() : this.getCards()));
    }
    static get is() { return "hue-collection"; }
    static get properties() { return {
        "group": {
            "type": Boolean,
            "attr": "group"
        },
        "groups": {
            "type": "Any",
            "attr": "groups"
        },
        "lights": {
            "type": "Any",
            "attr": "lights"
        },
        "loading": {
            "type": Boolean,
            "attr": "loading"
        }
    }; }
    static get style() { return "/**style-placeholder:hue-collection:**/"; }
}
