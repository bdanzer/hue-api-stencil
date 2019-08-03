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
    
    constructor() {
        //url changes 
    }
    
    changeApiContext(url) {
        this.apiUrl = url
        console.log(this.apiUrl);
    }

    async getContext(cookies) {
        let context = await this.haveLocal(),
            deviceId = false;

        if (context.isLocal && context.id)
            deviceId = context
            this.changeApiContext(`http://${context.internalipaddress}`);
        if (cookies.deviceId) {
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
                "devicetype":"lightly"
            })
        });
        return await newDev.json();
    }

    getHueUrl(addOns = '') {
        return `${this.apiUrl}/api/${addOns}`
    }

    setGroups() {
        this.groups = `${this.apiUrl}/api/${this.username}/schedules`
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

        console.log(accessData);
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

    async setLightState(lightId, obj) {
        try {
            let response = await fetch(this.lightStateUrl(lightId), {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                  "Access-Control-Request-Method": "POST",
                  "Access-Control-Request-Headers": "Content-Type"
                } 
            })
    
            await response.json()
        } catch {
            console.log('Error Something Went Wrong')
        }
      }

    lightStateUrl(lightId) {
        return this.getLightsUrl() + `/${lightId}/state`
    }

    getLightsUrl() {
        return `${this.apiUrl}/api/${this.username}/lights`
    }

    getLight(id) {
        return this.getLights(`${this.getLightsUrl()}/${id}`)
    }

    getGroupUrl() {
        return `${this.apiUrl}/api/${this.username}/groups`;
    }

    async basicAuth() {
        try {
            let response = await fetch(`https://api.meethue.com/oauth2/token?code=${this.postAuthHue['code']}&grant_type=authorization_code`, {
              method: "post",
              headers: {
                "Authorization": `Basic ${this.getBase64()}`,
              }
            });
    
            if (response.status === 200) {
              console.log(response);
    
              let data = await response.json();
    
              console.log(data);
            }
          } catch(e) {
            console.log(e);
          }
    }

    async getLights(url) {
        try {
            let response = await fetch(url, {
                method: 'GET'
            })
  
            return await response.json();
        } catch(e) {
            console.log('Error Something Went Wrong', e)
        }
    }
}

export default new HueApi()