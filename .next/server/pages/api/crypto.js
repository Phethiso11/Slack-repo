"use strict";
(() => {
var exports = {};
exports.id = 939;
exports.ids = [939];
exports.modules = {

/***/ 349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/crypto.js

async function handler(req, res) {
    const { query  } = req;
    const { ids ="" , vs_currencies ="usd" , days ="7"  } = query;
    try {
        const priceResponse = await external_axios_default().get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids,
                vs_currencies,
                include_market_cap: "true",
                include_24hr_vol: "true",
                include_24hr_change: "true"
            }
        });
        const chartResponse = await external_axios_default().get(`https://api.coingecko.com/api/v3/coins/${ids}/market_chart`, {
            params: {
                vs_currency: vs_currencies,
                days
            }
        });
        res.status(200).json({
            price: priceResponse.data,
            chart: chartResponse.data
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(349));
module.exports = __webpack_exports__;

})();