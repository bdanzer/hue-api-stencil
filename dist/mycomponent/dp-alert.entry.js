/*! Built with http://stenciljs.com */
const { h } = window.mycomponent;

class DpAlert {
    async toasty(text, alert, ms) {
        this.alerted = alert;
        this.text = text;
        this.ms = ms;
        if (alert && ms) {
            setTimeout(() => {
                this.alerted = !this.alerted;
            }, ms);
        }
    }
    render() {
        return (h("div", { class: `dp-alert ${this.alerted ? 'on' : 'off'}` },
            !this.ms ? (h("span", { class: "close-x", onClick: () => { this.alerted = false; } }, "x")) : '',
            h("slot", null, this.text)));
    }
    static get is() { return "dp-alert"; }
    static get properties() { return {
        "alerted": {
            "type": Boolean,
            "attr": "alerted",
            "mutable": true
        },
        "ms": {
            "type": Number,
            "attr": "ms",
            "mutable": true
        },
        "text": {
            "type": String,
            "attr": "text",
            "mutable": true
        },
        "toasty": {
            "method": true
        }
    }; }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.dp-alert {\n  padding: 16px 18px;\n  display: inline-block;\n  -webkit-transition: 0.35s ease-in;\n  transition: 0.35s ease-in;\n  position: fixed;\n  top: 30px;\n  right: 30px;\n  color: white;\n  border-radius: 2px;\n  opacity: 0;\n  visibility: hidden;\n}\n.dp-alert.on {\n  opacity: 1;\n  visibility: visible;\n  background: #49eb8b;\n}\n.dp-alert .close-x {\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  font-size: 12px;\n  padding: 1px 5px;\n}"; }
}

class Range {
    constructor() {
        this.disabled = false;
    }
    render() {
        return (h("input", { type: "range", class: "range", id: "start", name: "volume", min: this.min, max: this.max, onChange: (e) => { this.rangeChagned.emit({ 'data': this.data, 'event': e }); }, onInput: (e) => { this.inputChanged.emit({ 'event': e }); }, value: this.rangeValue, "aria-label": this.ariaLabel, "aria-valuenow": `${this.ariaValueNow} percent`, "aria-valuetext": `${this.ariaValueNow} percent`, step: "1", "aria-valuemin": this.min, "aria-valuemax": this.max, tabIndex: (this.disabled ? -1 : 0), disabled: this.disabled }));
    }
    static get is() { return "dp-range"; }
    static get properties() { return {
        "ariaLabel": {
            "type": String,
            "attr": "aria-label"
        },
        "ariaValueNow": {
            "type": Number,
            "attr": "aria-value-now"
        },
        "data": {
            "type": "Any",
            "attr": "data"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "max": {
            "type": String,
            "attr": "max"
        },
        "min": {
            "type": String,
            "attr": "min"
        },
        "rangeValue": {
            "type": String,
            "attr": "range-value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "rangeChagned",
            "method": "rangeChagned",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.range {\n  -webkit-appearance: none;\n  vertical-align: middle;\n  border: none;\n  padding: 0;\n  background: none;\n}\n\n.range::-webkit-slider-runnable-track {\n  background-color: #d7dbdd;\n  height: 6px;\n  border-radius: 3px;\n  border: 1px solid transparent;\n}\n\n.range[disabled]::-webkit-slider-runnable-track {\n  border: 1px solid #d7dbdd;\n  background-color: transparent;\n  opacity: 0.4;\n}\n\n.range::-moz-range-track {\n  background-color: #d7dbdd;\n  height: 6px;\n  border-radius: 3px;\n  border: none;\n}\n\n.range::-ms-track {\n  color: transparent;\n  border: none;\n  background: none;\n  height: 6px;\n}\n\n.range::-ms-fill-lower {\n  background-color: #d7dbdd;\n  border-radius: 3px;\n}\n\n.range::-ms-fill-upper {\n  background-color: #d7dbdd;\n  border-radius: 3px;\n}\n\n.range::-ms-tooltip {\n  display: none;\n  /* display and visibility only */\n}\n\n.range::-moz-range-thumb {\n  border-radius: 20px;\n  height: 18px;\n  width: 18px;\n  border: none;\n  background: none;\n  background-color: #606670;\n}\n\n.range:active::-moz-range-thumb {\n  outline: none;\n}\n\n.range::-webkit-slider-thumb {\n  -webkit-appearance: none !important;\n  border-radius: 100%;\n  background-color: #606670;\n  height: 18px;\n  width: 18px;\n  margin-top: -7px;\n}\n\n.range[disabled]::-webkit-slider-thumb {\n  background-color: transparent;\n  border: 1px solid #d7dbdd;\n}\n\n.range:active::-webkit-slider-thumb {\n  outline: none;\n}\n\n.range::-ms-thumb {\n  border-radius: 100%;\n  background-color: #606670;\n  height: 18px;\n  width: 18px;\n  border: none;\n}\n\n.range:active::-ms-thumb {\n  border: none;\n}\n\noutput {\n  border: 1px solid #d7dbdd;\n  color: #333;\n  font-family: \"Lato\", sans-serif;\n  font-size: 12px;\n  padding: 0.4em 0.6em;\n  border-radius: 3px;\n}\n\n.container--dark {\n  background-color: #11181d;\n}\n.container--dark h6 {\n  color: #ccc;\n}\n.container--dark .range::-webkit-slider-runnable-track {\n  background-color: #606670;\n}\n.container--dark .range[disabled]::-webkit-slider-runnable-track {\n  border: 1px solid #606670;\n  background-color: transparent;\n}\n.container--dark .range::-moz-range-track {\n  background-color: #606670;\n  border: none;\n}\n.container--dark .range::-ms-fill-lower {\n  background-color: #606670;\n}\n.container--dark .range::-ms-fill-upper {\n  background-color: #606670;\n}\n.container--dark output {\n  border: 1px solid #2b3039;\n  color: #aaa;\n  font-family: \"Lato\", sans-serif;\n  font-size: 12px;\n  padding: 0.4em 0.6em;\n  border-radius: 3px;\n}\n.container--dark .range::-webkit-slider-thumb {\n  background-color: #aaa;\n  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n}\n.container--dark .range[disabled]::-webkit-slider-thumb {\n  background-color: transparent;\n  border: 1px solid #606670;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.container--dark .range::-moz-range-thumb {\n  background-color: #aaa;\n}\n.container--dark .range::-ms-thumb {\n  background-color: #aaa;\n}"; }
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
  var crypt$$1 = crypt,
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

    var m = crypt$$1.bytesToWords(message),
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

    return crypt$$1.endian([a, b, c, d]);
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

    var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt$$1.bytesToHex(digestbytes);
  };

})();
});

var appId = "lightly";
var clientId = "AYhPGWGHG3zxYgQnI9zS3j6z3ySGRUq2";
var clientSecret = "uAdxLAORhyOoowg3";
var authJson = {
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
        let context = await this.haveLocal(), deviceId = false;
        if (context.haveLocal && context.id) {
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
                    "Authorization": `Basic QVloUEdXR0hHM3p4WWdRbkk5elMzajZ6M3lTR1JVcTI6dUFkeExBT1JoeU9vb3dnMw==`,
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
var HueApi$1 = new HueApi();

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
        let context = await HueApi$1.setContext(this.cookies);
        //Check auth if we came back from it
        await this.handlePostAuth();
        /**
         * Basically if we have ever set up local or remote get the lights
         */
        if (context.haveLocal && this.cookies['hueLocalSetup']) {
            HueApi$1.username = this.cookies['username'];
            this.setLights();
        }
        else if (!context.haveLocal && this.cookies['hueRemoteUsername']) {
            HueApi$1.proxyServer = this.proxyServer;
            HueApi$1.username = this.cookies['hueRemoteUsername'];
            HueApi$1.accessToken = this.cookies['hueToken'];
            this.setLights();
        }
    }
    async handleGroupLights() {
        this.loading = true;
        let groupData = await HueApi$1.getLights(HueApi$1.getGroupUrl());
        for (var index in groupData) {
            let group = groupData[index], lightGroup = group.lights, groupName = group.name;
            /**
             * looping a group of lights
             */
            let promises = [];
            for (var i = 0; i < lightGroup.length; i++) {
                promises.push(HueApi$1.getLight(lightGroup[i]));
            }
            let lights = await Promise.all(promises);
            for (var i = 0; i < lights.length; i++) {
                if (this.groups[groupName]) {
                    this.groups[groupName].push(lights[i]);
                }
                else {
                    this.groups[groupName] = [lights[i]];
                }
            }
        }
        this.loading = false;
    }
    async handleLocalSetup() {
        document.cookie = `apiUrl=${HueApi$1.apiUrl};`;
        var response = await HueApi$1.makeNewDev();
        if (response[0].error && response[0].error.type === 101) {
            toasty('Link Button Not Pressed', true, 2000);
        }
        else if (response[0].success) {
            HueApi$1.username = response[0].success.username;
            document.cookie = `username=${HueApi$1.username};`;
            document.cookie = `hueLocalSetup=true;`;
            this.setLights();
            //update cookies with what we just set
            this.cookies = getCookies();
        }
    }
    async setLights() {
        toasty('Connected', true, 4000);
        this.lights = await HueApi$1.getLights(HueApi$1.getLightsUrl());
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
            HueApi$1.postAuthHue = queryParse(window.location.href);
            // await HueApi.digestAuth();
            let { access_token } = await HueApi$1.basicAuth();
            document.cookie = `hueToken=${access_token};`;
            await HueApi$1.createWhiteList(access_token);
            let successData = await HueApi$1.remoteRegisterDevice(access_token);
            document.cookie = `hueRemoteUsername=${successData[0]['success']['username']};`;
            HueApi$1.username = successData[0]['success']['username'];
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
            HueApi$1.startRemote();
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
            (!this.cookies['hueLocalSetup']) ?
                h("div", { class: "danzerpress-two-thirds danzerpress-col-center" },
                    h("div", { class: "danzerpress-box danzerpress-shadow-2" },
                        h("h2", null, "Setup"),
                        h("p", null, "To proceed with this set up push the button on the bridge and recheck."),
                        h("a", { class: "danzerpress-button-modern", onClick: () => this.handleLocalSetup() }, "Re-Check"))) : '',
            (!this.cookies['hueRemoteUsername']) ?
                h("a", { class: "danzerpress-button-modern enable-auth", onClick: (e) => { this.allowRemote(e); } }, "Enable Remote Control") : '',
            h("hue-collection", { class: "danzerpress-flex-row", lights: this.lights, loading: this.loading, group: this.group, groups: this.groups })
        ];
    }
    static get is() { return "hue-app"; }
    static get properties() { return {
        "cards": {
            "state": true
        },
        "cookies": {
            "state": true
        },
        "group": {
            "state": true
        },
        "groups": {
            "state": true
        },
        "lights": {
            "type": "Any",
            "attr": "lights",
            "mutable": true
        },
        "loading": {
            "state": true
        },
        "proxyServer": {
            "type": String,
            "attr": "proxy-server"
        }
    }; }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}"; }
}

class HueCard {
    rangeChagned(data) {
        if (data.detail.data.lightId && this.reachable) {
            var value = parseInt(data.detail.event.target.value);
            HueApi$1.setLightState(data.detail.data.lightId, { 'bri': value });
        }
        this.bri = parseInt(data.detail.event.target.value);
    }
    // @Listen('inputChanged')
    // inputChanged(data) {
    //   if (this.reachable) {
    //   }
    // }
    getPercentage(number) {
        let percentage = ((254 - parseInt(number)) / 254 * 100) - 100;
        let positiveNumber = Math.abs(percentage);
        return Math.floor(positiveNumber);
    }
    switchClicked(_e) {
        if (this.lightId && this.reachable) {
            HueApi$1.setLightState(this.lightId, { 'on': !this.on });
            this.on = !this.on;
        }
    }
    render() {
        return [
            (!this.reachable) ? h("div", { class: "not-reachable-alert danzerpress-shadow-1" }, "Not Reachable") : '',
            h("div", { class: `card-wrap danzerpress-box danzerpress-shadow-2 light-${(this.on) ? 'on' : 'off'} light-reachable-${this.reachable}` },
                h("h2", { class: "light-title" }, this.lightName),
                h("div", { class: "danzerpress-flex-row" },
                    h("div", { class: "danzerpress-col-2" },
                        h("img", { class: "lightbulb", src: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Lighting_and_Fans/standard-light-bulb.png" })),
                    h("div", { class: "danzerpress-col-2" },
                        h("p", null,
                            h("dp-switch", { label: `Light status: ${(this.on) ? 'On' : 'Off'}`, isChecked: this.on, ariaLabel: this.lightName, callback: this.switchClicked.bind(this), disabled: !this.reachable })),
                        h("h4", null,
                            "Light Brightness: ",
                            this.getPercentage(this.bri),
                            "%"),
                        h("dp-range", { min: "1", max: "254", rangeValue: this.bri, data: { 'lightId': this.lightId }, ariaLabel: `Control the light brightness of ${this.lightName}`, ariaValueNow: this.getPercentage(this.bri), disabled: !this.reachable }))))
        ];
    }
    static get is() { return "hue-card"; }
    static get properties() { return {
        "alert": {
            "type": String,
            "attr": "alert"
        },
        "bri": {
            "type": "Any",
            "attr": "bri",
            "mutable": true
        },
        "lightId": {
            "type": String,
            "attr": "light-id"
        },
        "lightName": {
            "type": String,
            "attr": "light-name"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "on": {
            "type": Boolean,
            "attr": "on",
            "mutable": true
        },
        "reachable": {
            "type": Boolean,
            "attr": "reachable"
        }
    }; }
    static get listeners() { return [{
            "name": "rangeChagned",
            "method": "rangeChagned"
        }]; }
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\nhue-card .card-wrap {\n  -webkit-transition: 1s ease-in;\n  transition: 1s ease-in;\n  opacity: 1;\n  background: white;\n}\nhue-card .card-wrap.light-reachable-false {\n  opacity: 0.5;\n}\nhue-card .card-wrap.light-reachable-false span,\nhue-card .card-wrap.light-reachable-false .range {\n  cursor: not-allowed;\n}\nhue-card .card-wrap .light-title {\n  text-align: center;\n}\nhue-card .card-wrap.light-off img {\n  opacity: 0.4;\n}\nhue-card .card-wrap h4 {\n  font-size: 14px;\n  color: #848484;\n}\nhue-card .card-wrap .lightbulb {\n  opacity: 1s;\n  -webkit-transition: 0.8s ease-in;\n  transition: 0.8s ease-in;\n}\nhue-card .not-reachable-alert {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background: #606670;\n  color: white;\n  padding: 14px 18px;\n  z-index: 1;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  background: -webkit-gradient(linear, left top, right top, from(#4A00E0), to(#8E2DE2));\n  background: linear-gradient(to right, #4A00E0, #8E2DE2);\n}"; }
}

class HueCollection {
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
        console.log(this.lights);
        let cards = [];
        for (let room in this.groups) {
            let lights = this.groups[room];
            cards.push((h("div", { class: "danzerpress-col-1" },
                h("h2", null, room))));
            lights.forEach((light) => {
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
    static get style() { return "\@import url(\"https://cdn.jsdelivr.net/gh/bdanzer/danzerpress-layouts\@master/danzerpress-layouts.css\");\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before, *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding-top: 40px;\n}\n\nimg {\n  width: 100%;\n  height: auto;\n}\n\n.danzerpress-modern-button:hover {\n  cursor: pointer;\n}\n\n.lds-ring {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.lds-ring div {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  width: 51px;\n  height: 51px;\n  margin: 6px;\n  border: 6px solid blueviolet;\n  border-radius: 50%;\n  -webkit-animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  border-color: blueviolet transparent transparent transparent;\n}\n\n.lds-ring div:nth-child(1) {\n  -webkit-animation-delay: -0.45s;\n  animation-delay: -0.45s;\n}\n\n.lds-ring div:nth-child(2) {\n  -webkit-animation-delay: -0.3s;\n  animation-delay: -0.3s;\n}\n\n.lds-ring div:nth-child(3) {\n  -webkit-animation-delay: -0.15s;\n  animation-delay: -0.15s;\n}\n\n\@-webkit-keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n\@keyframes lds-ring {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}"; }
}

export { DpAlert, Range as DpRange, HueApp, HueCard, HueCollection };
