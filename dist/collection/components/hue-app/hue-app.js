import { h } from "@stencil/core";
import HueApi from '../../api/api';
import { getCookies } from '../../utils/utils';
import { queryParse } from '../../utils/utils';
import { toasty } from '../../utils/utils';
export class HueApp {
    constructor() {
        this.group = false;
        this.groups = {};
    }
    componentWillLoad() {
        this.cookies = getCookies();
    }
    componentDidLoad() {
        /**
         * 1. Confirm we have device id
         * 2. Find if we are on local or remote
         * 3. Find if we have stored cookies
         * 4. If we find stored cookies make a fetch to the correct env for data
         * 5. If we don't have stored cookies start set up process for env
         */
        this.loading = true;
        this.controller();
    }
    componentDidUpdate() {
        // this.cards = this.checkForCards();
        // console.log(this.cards);
    }
    async controller() {
        /**
         * Check if we have stored device id
         */
        let context = await HueApi.setContext(this.cookies);
        //Check auth if we came back from it
        await this.handlePostAuth();
        /**
         * Basically if we have ever set up local or remote get the lights
         */
        if (context.haveLocal && this.cookies['hueLocalSetup']) {
            HueApi.username = this.cookies['username'];
            this.setLights();
        }
        else if (!context.haveLocal && this.cookies['hueRemoteUsername']) {
            HueApi.proxyServer = this.proxyServer;
            HueApi.username = this.cookies['hueRemoteUsername'];
            HueApi.accessToken = this.cookies['hueToken'];
            this.setLights();
        }
    }
    async handleGroupLights() {
        this.loading = true;
        let groupData = await HueApi.getLights(HueApi.getGroupUrl());
        console.log('groupData', groupData);
        for (var groupId in groupData) {
            let group = groupData[groupId], lightGroup = group.lights, groupName = group.name;
            /**
             * looping a group of lights
             */
            let promises = [];
            for (var i = 0; i < lightGroup.length; i++) {
                promises.push(HueApi.getLight(lightGroup[i]));
            }
            let lights = await Promise.all(promises);
            for (var i = 0; i < lights.length; i++) {
                if (this.groups[groupName]) {
                    this.groups[groupName]['lights'].push(lights[i]);
                }
                else {
                    Object.assign(this.groups, {
                        [groupName]: {
                            'lights': [lights[i]],
                            'groupId': groupId,
                            'state': group.state
                        }
                    });
                }
            }
        }
        this.loading = false;
    }
    async handleLocalSetup() {
        document.cookie = `apiUrl=${HueApi.apiUrl};`;
        var response = await HueApi.makeNewDev();
        if (response[0].error && response[0].error.type === 101) {
            toasty('Link Button Not Pressed', true, 2000);
        }
        else if (response[0].success) {
            HueApi.username = response[0].success.username;
            document.cookie = `username=${HueApi.username};`;
            document.cookie = `hueLocalSetup=true;`;
            this.setLights();
            //update cookies with what we just set
            this.cookies = getCookies();
        }
    }
    async setLights() {
        toasty('Connected', true, 4000);
        this.lights = await HueApi.getLights(HueApi.getLightsUrl());
        this.loading = false;
        // setInterval(async () => {
        //   //Let's check for updates every 5 seconds
        //   this.lights = await HueApi.getLights(HueApi.getLightsUrl());
        // }, 5000);
    }
    async handlePostAuth() {
        if (-1 !== window.location.href.indexOf('?code')) {
            if (this.cookies['hueRemoteSetup']) {
                return; //return since we already set this up
            }
            HueApi.postAuthHue = queryParse(window.location.href);
            // await HueApi.digestAuth();
            let { access_token } = await HueApi.basicAuth();
            document.cookie = `hueToken=${access_token};`;
            await HueApi.createWhiteList(access_token);
            let successData = await HueApi.remoteRegisterDevice(access_token);
            document.cookie = `hueRemoteUsername=${successData[0]['success']['username']};`;
            HueApi.username = successData[0]['success']['username'];
            /**
             * Update cookies
             */
            this.cookies = getCookies();
            document.cookie = `hueRemoteSetup=true;`;
        }
    }
    allowRemote(e) {
        e.preventDefault();
        if (this.cookies['hueLocalSetup']) {
            HueApi.startRemote();
        }
        else {
            alert('You first need to register the device at home.');
        }
    }
    handleGroups(_e) {
        if (Object.entries(this.groups).length === 0) {
            this.handleGroupLights();
        }
        this.group = !this.group;
    }
    render() {
        return [
            h("dp-switch", { label: "Sort by Groups", isChecked: this.group, callback: this.handleGroups.bind(this) }),
            (!this.cookies['hueRemoteUsername']) ?
                h("a", { class: "danzerpress-button-modern enable-auth", onClick: (e) => { this.allowRemote(e); } }, "Enable Remote Control") : '',
            (!this.cookies['hueLocalSetup']) ?
                h("div", { class: "danzerpress-two-thirds danzerpress-col-center" },
                    h("div", { class: "danzerpress-box danzerpress-shadow-2" },
                        h("h2", null, "Setup"),
                        h("p", null, "To proceed with this set up push the button on the bridge and recheck."),
                        h("a", { class: "danzerpress-button-modern", onClick: () => this.handleLocalSetup() }, "Re-Check"))) : '',
            h("hue-collection", { class: "danzerpress-flex-row", lights: this.lights, loading: this.loading, group: this.group, groups: this.groups })
        ];
    }
    static get is() { return "hue-app"; }
    static get originalStyleUrls() { return {
        "$": ["hue-app.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["hue-app.css"]
    }; }
    static get properties() { return {
        "lights": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "object",
                "resolved": "object",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "proxyServer": {
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
            "attribute": "proxy-server",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cards": {},
        "cookies": {},
        "loading": {},
        "group": {},
        "groups": {}
    }; }
}
