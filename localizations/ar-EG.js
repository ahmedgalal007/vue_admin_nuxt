function loadLocaleMessages() {
    const locales = require.context('./ar', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
    return messages;
}

// function jsonConcat(o1, o2) {
//     for (const key in o2) {
//      o1[key] = o2[key];
//     }
//     return o1;
// }

// let output = {};

// output = jsonConcat(output, require("./ar/navbar.json"));

export default async (context, locale) => {
    return await Promise.resolve(loadLocaleMessages());
};