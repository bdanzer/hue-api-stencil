import { r as registerInstance, h } from './chunk-b8d63b94.js';
import { H as HueApi } from './chunk-0867726e.js';

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
function getCookies() {
    var cookies = document.cookie.split(';');
    var myCookies = {};
    for (var id in cookies) {
        var cookie = cookies[id].split('=');
        myCookies[cookie[0].trim()] = cookie[1];
    }
    return myCookies;
}
function queryParse(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0].replace(`${window.location.origin}/?`, ""));
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        }
        else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        }
        else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}
async function toasty(text, show, ms) {
    const el = document.createElement('dp-alert');
    document.body.appendChild(el);
    await setTimeout(() => {
        el.toasty(text, show, ms);
    }, 100);
    return el;
}

class HueApp {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
                h("div", { class: "danzerpress-two-thirds danzerpress-col-center" }, h("div", { class: "danzerpress-box danzerpress-shadow-2" }, h("h2", null, "Setup"), h("p", null, "To proceed with this set up push the button on the bridge and recheck."), h("a", { class: "danzerpress-button-modern", onClick: () => this.handleLocalSetup() }, "Re-Check"))) : '',
            h("hue-collection", { class: "danzerpress-flex-row", lights: this.lights, loading: this.loading, group: this.group, groups: this.groups })
        ];
    }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  margin: auto;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.hue-app:not(.hydrated) {\n  visibility: hidden;\n}"; }
}

export { HueApp as hue_app };
