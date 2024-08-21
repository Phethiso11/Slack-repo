"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/crypto";
exports.ids = ["pages/api/crypto"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "(api)/./pages/api/crypto.js":
/*!*****************************!*\
  !*** ./pages/api/crypto.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function handler(req, res) {\n    const { query  } = req;\n    const { ids =\"\" , vs_currencies =\"usd\" , days =\"7\"  } = query;\n    try {\n        const priceResponse = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://api.coingecko.com/api/v3/simple/price`, {\n            params: {\n                ids,\n                vs_currencies,\n                include_market_cap: \"true\",\n                include_24hr_vol: \"true\",\n                include_24hr_change: \"true\"\n            }\n        });\n        const chartResponse = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://api.coingecko.com/api/v3/coins/${ids}/market_chart`, {\n            params: {\n                vs_currency: vs_currencies,\n                days\n            }\n        });\n        res.status(200).json({\n            price: priceResponse.data,\n            chart: chartResponse.data\n        });\n    } catch (error) {\n        res.status(500).json({\n            error: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY3J5cHRvLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUMwQjtBQUVYLGVBQWVDLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDNUMsTUFBTSxFQUFFQyxLQUFLLEdBQUUsR0FBR0YsR0FBRztJQUNyQixNQUFNLEVBQUVHLEdBQUcsRUFBRyxFQUFFLEdBQUVDLGFBQWEsRUFBRyxLQUFLLEdBQUVDLElBQUksRUFBRyxHQUFHLEdBQUUsR0FBR0gsS0FBSztJQUU3RCxJQUFJO1FBQ0EsTUFBTUksYUFBYSxHQUFHLE1BQU1SLGdEQUFTLENBQUMsQ0FBQyw2Q0FBNkMsQ0FBQyxFQUFFO1lBQ25GVSxNQUFNLEVBQUU7Z0JBQ0pMLEdBQUc7Z0JBQ0hDLGFBQWE7Z0JBQ2JLLGtCQUFrQixFQUFFLE1BQU07Z0JBQzFCQyxnQkFBZ0IsRUFBRSxNQUFNO2dCQUN4QkMsbUJBQW1CLEVBQUUsTUFBTTthQUM5QjtTQUNKLENBQUM7UUFFRixNQUFNQyxhQUFhLEdBQUcsTUFBTWQsZ0RBQVMsQ0FBQyxDQUFDLHVDQUF1QyxFQUFFSyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDaEdLLE1BQU0sRUFBRTtnQkFDSkssV0FBVyxFQUFFVCxhQUFhO2dCQUMxQkMsSUFBSTthQUNQO1NBQ0osQ0FBQztRQUVGSixHQUFHLENBQUNhLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQ2pCQyxLQUFLLEVBQUVWLGFBQWEsQ0FBQ1csSUFBSTtZQUN6QkMsS0FBSyxFQUFFTixhQUFhLENBQUNLLElBQUk7U0FDNUIsQ0FBQyxDQUFDO0lBQ1AsRUFBRSxPQUFPRSxLQUFLLEVBQUU7UUFDWmxCLEdBQUcsQ0FBQ2EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUksS0FBSyxFQUFFQSxLQUFLLENBQUNDLE9BQU87U0FBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcnlwdG8tdHJhY2tlci8uL3BhZ2VzL2FwaS9jcnlwdG8uanM/YzJmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgcXVlcnkgfSA9IHJlcTtcclxuICAgIGNvbnN0IHsgaWRzID0gJycsIHZzX2N1cnJlbmNpZXMgPSAndXNkJywgZGF5cyA9ICc3JyB9ID0gcXVlcnk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBwcmljZVJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2FwaS5jb2luZ2Vja28uY29tL2FwaS92My9zaW1wbGUvcHJpY2VgLCB7XHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWRzLFxyXG4gICAgICAgICAgICAgICAgdnNfY3VycmVuY2llcyxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGVfbWFya2V0X2NhcDogJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZV8yNGhyX3ZvbDogJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZV8yNGhyX2NoYW5nZTogJ3RydWUnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjaGFydFJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2FwaS5jb2luZ2Vja28uY29tL2FwaS92My9jb2lucy8ke2lkc30vbWFya2V0X2NoYXJ0YCwge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHZzX2N1cnJlbmN5OiB2c19jdXJyZW5jaWVzLFxyXG4gICAgICAgICAgICAgICAgZGF5cyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBwcmljZTogcHJpY2VSZXNwb25zZS5kYXRhLFxyXG4gICAgICAgICAgICBjaGFydDogY2hhcnRSZXNwb25zZS5kYXRhLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJheGlvcyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJxdWVyeSIsImlkcyIsInZzX2N1cnJlbmNpZXMiLCJkYXlzIiwicHJpY2VSZXNwb25zZSIsImdldCIsInBhcmFtcyIsImluY2x1ZGVfbWFya2V0X2NhcCIsImluY2x1ZGVfMjRocl92b2wiLCJpbmNsdWRlXzI0aHJfY2hhbmdlIiwiY2hhcnRSZXNwb25zZSIsInZzX2N1cnJlbmN5Iiwic3RhdHVzIiwianNvbiIsInByaWNlIiwiZGF0YSIsImNoYXJ0IiwiZXJyb3IiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/crypto.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/crypto.js"));
module.exports = __webpack_exports__;

})();