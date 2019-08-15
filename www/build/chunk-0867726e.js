var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var crypt = createCommonjsModule(function (module) {
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var md5 = createCommonjsModule(function (module) {
(function(){
  var crypt$1 = crypt,
      utf8 = charenc_1.utf8,
      isBuffer = isBuffer_1,
      bin = charenc_1.bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt$1.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt$1.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt$1.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt$1.bytesToHex(digestbytes);
  };

})();
});

var appId = "lightly";
var clientId = "AYhPGWGHG3zxYgQnI9zS3j6z3ySGRUq2";
var clientSecret = "uAdxLAORhyOoowg3";
const authJson = {
	appId: appId,
	clientId: clientId,
	clientSecret: clientSecret
};

class HueApi {
    constructor() {
        this.apiUrl = 'https://api.meethue.com/bridge';
        this.local = false;
        this.appId = authJson.appId;
        this.clientId = authJson.clientId;
        this.clientSecret = authJson.clientSecret;
        this.accessToken = false;
        this.isRemote = true;
    }
    changeApiContext(url) {
        this.isRemote = false;
        this.apiUrl = url;
    }
    async setContext(cookies) {
        let context = await this.haveLocal(), deviceId = false, testRemote = false;
        if (!testRemote && context.haveLocal && context.id) {
            deviceId = context.id;
            this.changeApiContext(`http://${context.internalipaddress}/api`);
        }
        else {
            context['haveLocal'] = false;
        }
        if (cookies.deviceId && cookies.deviceId !== 'undefined') {
            deviceId = cookies.id;
        }
        document.cookie = `deviceId=${deviceId};`;
        return Object.assign({}, context, { "deviceId": this.deviceId = deviceId });
    }
    getBase64() {
        return btoa(`${this.clientId}:${this.clientSecret}`);
    }
    async startRemote() {
        window.location.replace(`https://api.meethue.com/oauth2/auth?clientid=${this.clientId}&appid=${this.appId}&deviceid=${this.deviceId}&state=testing&response_type=code`);
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
        return `${this.apiUrl}/${addOns}`;
    }
    setGroups() {
        this.groups = `${this.apiUrl}/${this.username}/schedules`;
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
            return Object.assign({}, data[0], { 'haveLocal': true });
        }
        catch (e) {
            //we probably don't have a local
            console.log(e);
        }
    }
    lightStateUrl(lightId) {
        return this.getLightsUrl() + `/${lightId}/state`;
    }
    groupStateUrl(groupId) {
        return `${this.apiUrl}/${this.username}/groups/${groupId}/action`;
    }
    getLightsUrl() {
        return `${this.apiUrl}/${this.username}/lights`;
    }
    async getLight(id) {
        let lightData = await this.getLights(`${this.getLightsUrl()}/${id}`);
        lightData['lightId'] = id;
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
                    "Authorization": `Basic ${this.getBase64()}`,
                    "Target-URL": `https://api.meethue.com/oauth2/token?code=${this.postAuthHue['code']}&grant_type=authorization_code`
                }
            });
            if (response.status === 200) {
                return await response.json();
            }
        }
        catch (e) {
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
            });
            return await response.json();
        }
        catch (e) {
            console.log('Error Something Went Wrong', e);
        }
    }
    async setGroupState(groupId, obj) {
        let fetchUrl = this.groupStateUrl(groupId);
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
            });
            await response.json();
        }
        catch (_a) {
            console.log('Error Something Went Wrong');
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
            });
            await response.json();
        }
        catch (_a) {
            console.log('Error Something Went Wrong');
        }
    }
}
const HueApi$1 = new HueApi();

export { HueApi$1 as H };
