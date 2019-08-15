import { h } from "@stencil/core";
export class HueLightGroup {
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
    static get is() { return "hue-light-group"; }
    static get originalStyleUrls() { return {
        "$": ["hue-light-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["hue-light-group.css"]
    }; }
    static get properties() { return {
        "groups": {
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
            "attribute": "groups",
            "reflect": false
        }
    }; }
}
