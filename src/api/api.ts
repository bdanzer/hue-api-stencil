import md5 from 'md5';
import authJson from '../json/auth.json';

class HueApi {
    username: string;  
    apiUrl = 'https://api.meethue.com/bridge';
    groups: string;
    local = false;
    appId = authJson.appId;
    clientId = authJson.clientId;
    clientSecret = authJson.clientSecret;
    deviceId;
    postAuthHue: any;
    accessToken: any = false;
    isRemote: boolean = true;
    proxyServer: string;
    
    constructor() {}
    
    changeApiContext(url) {
        this.isRemote = false;
        this.apiUrl = url;
    }

    async setContext(cookies) {
        let context = await this.haveLocal(),
            deviceId = false,
            testRemote = false;

        if (!testRemote && context.haveLocal && context.id) {
            deviceId = context.id
            this.changeApiContext(`http://${context.internalipaddress}/api`);
        } else {
            context['haveLocal'] = false;
        }

        if (cookies.deviceId && cookies.deviceId !== 'undefined') {
            deviceId = cookies.id;
        }

        document.cookie = `deviceId=${deviceId};`;

        return {
            ...context,
            "deviceId": this.deviceId = deviceId
        };
    }

    getBase64() {
        return btoa(`${this.clientId}:${this.clientSecret}`);
    }

    async startRemote() {
        window.location.replace(`https://api.meethue.com/oauth2/auth?clientid=${this.clientId}&appid=${this.appId}&deviceid=${this.deviceId}&state=testing&response_type=code`)
    }

    async makeNewDev() {
        let url = this.getHueUrl();
        let newDev = await fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "devicetype": "lightly"
            })
        });
        return await newDev.json();
    }

    getHueUrl(addOns = '') {
        return `${this.apiUrl}/${addOns}`
    }

    setGroups() {
        this.groups = `${this.apiUrl}/${this.username}/schedules`
    }

    async digestAuth() {
        const realm = 'oauth2_client@api.meethue.com';
        const URI = '/oauth2/token';
        let nonce = '';
        let digestAuthCode = '';
        let challengeUrl = 'https://api.meethue.com/oauth2/token?code=' + this.postAuthHue['code'] + '&grant_type=authorization_code';

        console.log(challengeUrl);

        let challenge = await fetch(challengeUrl, {
            method: 'post',
        });
        
        console.log(challenge.headers);

        nonce = challenge.headers.get('www-authenticate').split('\"')[3];
        
        let HASH1 = md5(this.clientId + ':' + realm + ':' + this.clientSecret);
        let HASH2 = md5('POST:' + URI);
        digestAuthCode = md5(HASH1 + ':' + nonce + ':' + HASH2);

        console.log(digestAuthCode);

        let accessData = await fetch(challengeUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Digest username=' + '"' + this.clientId + '"' + ', realm=' + '"' + realm + '"' + ', nonce=' + '"' + nonce + '"' + ', uri=' + '"' + URI + '"' + ', response=' + '"' + digestAuthCode + '"'
            }
        });

        accessData = await accessData.json();
    }

    async haveLocal() {
        try {
          let response = await fetch('https://discovery.meethue.com');
    
          if (response.status === 200 || response.status === 302) {
            var data = await response.json();
            this.local = true;
          }

          return {
            ...data[0],
            'haveLocal': true
          };
    
        } catch(e) {
          //we probably don't have a local
          console.log(e);
        }
    }

    lightStateUrl(lightId) {
        return this.getLightsUrl() + `/${lightId}/state`;
    }

    getLightsUrl() {
        return `${this.apiUrl}/${this.username}/lights`;
    }

    async getLight(id) {
        let lightData = await this.getLights(`${this.getLightsUrl()}/${id}`);
        lightData['lightId'] = id
        return lightData;
    }

    getGroupUrl() {
        return `${this.apiUrl}/${this.username}/groups`;
    }

    async basicAuth() {
        try {
            let response = await fetch(this.proxyServer, {
              method: "post",
              headers: {
                "Authorization": `Basic QVloUEdXR0hHM3p4WWdRbkk5elMzajZ6M3lTR1JVcTI6dUFkeExBT1JoeU9vb3dnMw==`,
                "Target-URL": `https://api.meethue.com/oauth2/token?code=${this.postAuthHue['code']}&grant_type=authorization_code`
              }
            });
    
            if (response.status === 200) {
              return await response.json();
            }
          } catch(e) {
            console.log(e);
          }
    }

    async createWhiteList(accessToken) {
        let response = await fetch(this.proxyServer, {
            method: "put",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Target-URL": "https://api.meethue.com/bridge/0/config",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ 
                "linkbutton": true 
            })
        });

        return await response.json();
    }

    async remoteRegisterDevice(accessToken) {
        let response = await fetch(this.proxyServer, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Target-URL": "https://api.meethue.com/bridge/",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "devicetype": "lightly"
            })
        });

        //returns username
        return await response.json();
    }

    async getLights(url) {
        let headers = {};
        let fetchUrl = url;

        if (this.accessToken) {
            fetchUrl = this.proxyServer;

            Object.assign(headers, {
                "Authorization": `Bearer ${this.accessToken}`,
                "Target-Url": url
            });
        }

        try {
            let response = await fetch(fetchUrl, {
                method: 'GET',
                headers: headers
            })
  
            return await response.json();
        } catch(e) {
            console.log('Error Something Went Wrong', e)
        }
    }

    async setLightState(lightId, obj) {
        let fetchUrl = this.lightStateUrl(lightId);
        let headers = {
            "Content-Type": "application/json"
        };

        if (this.accessToken) {
            let targetUrl = fetchUrl;
            fetchUrl = this.proxyServer;

            Object.assign(headers, {
                "Authorization": `Bearer ${this.accessToken}`,
                "Target-Url": targetUrl
            });
        }

        try {
            let response = await fetch(fetchUrl, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: headers
            })
    
            await response.json()
        } catch {
            console.log('Error Something Went Wrong')
        }
    }
}

export default new HueApi()