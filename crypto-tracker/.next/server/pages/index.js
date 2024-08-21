"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "react-chartjs-2"
const external_react_chartjs_2_namespaceObject = require("react-chartjs-2");
;// CONCATENATED MODULE: external "chart.js"
const external_chart_js_namespaceObject = require("chart.js");
;// CONCATENATED MODULE: ./pages/index.js





// Register Chart.js components
external_chart_js_namespaceObject.Chart.register(external_chart_js_namespaceObject.LineElement, external_chart_js_namespaceObject.CategoryScale, external_chart_js_namespaceObject.LinearScale, external_chart_js_namespaceObject.Title, external_chart_js_namespaceObject.PointElement);
// Inline CSS styles
const styles = {
    container: (isDarkMode)=>({
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            backgroundColor: isDarkMode ? "#1a202c" : "#ffffff",
            color: isDarkMode ? "#edf2f7" : "#1a202c",
            transition: "background-color 0.3s, color 0.3s"
        }),
    button: (isDarkMode)=>({
            padding: "8px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#4a5568" : "#e2e8f0",
            color: isDarkMode ? "#edf2f7" : "#1a202c",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s"
        }),
    input: {
        padding: "8px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        outline: "none",
        transition: "border-color 0.3s, box-shadow 0.3s"
    },
    searchButton: {
        padding: "8px 16px",
        backgroundColor: "#3182ce",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s"
    },
    cryptoCard: {
        padding: "16px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        marginBottom: "16px",
        maxWidth: "500px",
        width: "100%"
    },
    chartContainer: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto"
    }
};
// Component for Dark Mode Toggle
const DarkModeToggle = ({ isDarkMode , toggleDarkMode  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        style: styles.button(isDarkMode),
        onClick: toggleDarkMode,
        children: isDarkMode ? "\uD83D\uDD06Light Mode" : "\uD83C\uDF19Dark Mode"
    });
};
// Component for Search Bar
const SearchBar = ({ onSearch  })=>{
    const { 0: query , 1: setQuery  } = (0,external_react_.useState)("");
    const handleSearch = ()=>{
        if (query.trim()) {
            onSearch(query.toLowerCase());
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex items-center space-x-2 mb-4",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                type: "text",
                placeholder: "Search cryptocurrency...",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                style: styles.input
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: handleSearch,
                style: styles.searchButton,
                children: "Search"
            })
        ]
    });
};
// Component for Crypto Card
const CryptoCard = ({ crypto  })=>{
    if (!crypto) return null;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: styles.cryptoCard,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                className: "text-xl font-semibold",
                children: [
                    crypto.name,
                    " (",
                    crypto.symbol.toUpperCase(),
                    ")"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "mt-2",
                children: [
                    "Price: $",
                    crypto.price.usd
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Market Cap: $",
                    crypto.market_cap.usd
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "24h Change: ",
                    crypto.price.usd_24h_change,
                    "%"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Volume: $",
                    crypto.volume.usd
                ]
            })
        ]
    });
};
// Component for Price Chart
const PriceChart = ({ chartData  })=>{
    if (!chartData) return null;
    const data = {
        labels: chartData.prices.map((point)=>new Date(point[0]).toLocaleDateString()),
        datasets: [
            {
                label: "Price",
                data: chartData.prices.map((point)=>point[1]),
                borderColor: "rgb(75,192,192)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: styles.chartContainer,
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_chartjs_2_namespaceObject.Line, {
            data: data,
            options: options
        })
    });
};
function Home() {
    const { 0: crypto , 1: setCrypto  } = (0,external_react_.useState)(null);
    const { 0: chartData , 1: setChartData  } = (0,external_react_.useState)(null);
    const { 0: isDarkMode , 1: setIsDarkMode  } = (0,external_react_.useState)(false);
    // Toggle dark mode on client-side only
    (0,external_react_.useEffect)(()=>{
        document.body.classList.toggle("dark-mode", isDarkMode);
    }, [
        isDarkMode
    ]);
    // Handle search and fetch data
    const handleSearch = async (query)=>{
        try {
            // Fetch price data
            const priceResponse = await external_axios_default().get("https://api.coingecko.com/api/v3/simple/price", {
                params: {
                    ids: query,
                    vs_currencies: "usd",
                    include_market_cap: "true",
                    include_24hr_vol: "true",
                    include_24hr_change: "true"
                }
            });
            // Check if the cryptocurrency exists
            if (!priceResponse.data[query]) {
                setCrypto(null);
                setChartData(null);
                alert("Cryptocurrency not found. Please try a different search term.");
                return;
            }
            // Fetch chart data
            const chartResponse = await external_axios_default().get(`https://api.coingecko.com/api/v3/coins/${query}/market_chart`, {
                params: {
                    vs_currency: "usd",
                    days: "7"
                }
            });
            // Update state with fetched data
            setCrypto({
                name: query,
                symbol: query,
                price: priceResponse.data[query],
                market_cap: priceResponse.data[query],
                volume: priceResponse.data[query]
            });
            setChartData(chartResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            setCrypto(null);
            setChartData(null);
            alert("Error fetching data. Please try again later.");
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: styles.container(isDarkMode),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(DarkModeToggle, {
                isDarkMode: isDarkMode,
                toggleDarkMode: ()=>setIsDarkMode(!isDarkMode)
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(SearchBar, {
                onSearch: handleSearch
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(CryptoCard, {
                crypto: crypto
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(PriceChart, {
                chartData: chartData
            })
        ]
    });
}


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(223));
module.exports = __webpack_exports__;

})();