"use strict";function cloneJSON(e){return null==e?e:JSON.parse(JSON.stringify(e))}function tryParseJSON(e,r){var t;try{t=JSON.parse(e)}catch(e){r&&r(e)}return t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.tryParseJSON=exports.cloneJSON=void 0,exports.cloneJSON=cloneJSON,exports.tryParseJSON=tryParseJSON;