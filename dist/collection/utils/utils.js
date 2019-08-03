export function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
export function getCookies() {
    var cookies = document.cookie.split(';');
    var myCookies = {};
    for (var id in cookies) {
        var cookie = cookies[id].split('=');
        myCookies[cookie[0].trim()] = cookie[1];
    }
    return myCookies;
}
export function queryParse(query) {
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
export async function toasty(text, show, ms) {
    const el = document.createElement('dp-alert');
    document.body.appendChild(el);
    await setTimeout(() => {
        el.toasty(text, show, ms);
    }, 100);
    return el;
}
