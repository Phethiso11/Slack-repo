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





external_chart_js_namespaceObject.Chart.register(external_chart_js_namespaceObject.LineElement, external_chart_js_namespaceObject.CategoryScale, external_chart_js_namespaceObject.LinearScale, external_chart_js_namespaceObject.Title, external_chart_js_namespaceObject.PointElement);
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
    },
    homeButton: (isDarkMode)=>({
            ...styles.button(isDarkMode),
            position: "absolute",
            top: "16px",
            left: "16px"
        })
};
const DarkModeToggle = ({ isDarkMode , toggleDarkMode  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        style: styles.button(isDarkMode),
        onClick: toggleDarkMode,
        children: isDarkMode ? "\uD83D\uDD06 Light Mode" : "\uD83C\uDF19 Dark Mode"
    });
};
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
const CryptoCard = ({ crypto  })=>{
    if (!crypto) return null;
    const price = crypto.price?.usd?.toFixed(2) || "N/A";
    const marketCap = crypto.market_cap?.usd?.toLocaleString() || "N/A";
    const volume = crypto.volume?.usd?.toLocaleString() || "N/A";
    const priceChange = crypto.price?.usd_24h_change?.toFixed(2) || "N/A";
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
                    price
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Market Cap: $",
                    marketCap
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "24h Change: ",
                    priceChange,
                    "%"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Volume: $",
                    volume
                ]
            })
        ]
    });
};
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
const PopularCryptos = ({ onSelect  })=>{
    const { 0: popularCryptos , 1: setPopularCryptos  } = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        const fetchPopularCryptos = async ()=>{
            try {
                const response = await external_axios_default().get("http://localhost:5001/api/coins/markets", {
                    params: {
                        vs_currency: "usd",
                        order: "market_cap_desc",
                        per_page: 10,
                        page: 1
                    }
                });
                setPopularCryptos(response.data);
            } catch (error) {
                console.error("Error fetching popular cryptocurrencies:", error.message);
            }
        };
        fetchPopularCryptos();
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "grid grid-cols-1 gap-4",
        children: popularCryptos.map((crypto)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: styles.cryptoCard,
                onClick: ()=>onSelect(crypto.id),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                        children: [
                            crypto.name,
                            " (",
                            crypto.symbol.toUpperCase(),
                            ")"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        children: [
                            "Price: $",
                            crypto.current_price.toFixed(2)
                        ]
                    })
                ]
            }, crypto.id))
    });
};
function Home() {
    const { 0: crypto , 1: setCrypto  } = (0,external_react_.useState)(null);
    const { 0: chartData , 1: setChartData  } = (0,external_react_.useState)(null);
    const { 0: isDarkMode , 1: setIsDarkMode  } = (0,external_react_.useState)(false);
    const { 0: showHome , 1: setShowHome  } = (0,external_react_.useState)(true);
    (0,external_react_.useEffect)(()=>{
        document.body.classList.toggle("dark-mode", isDarkMode);
    }, [
        isDarkMode
    ]);
    const handleSearch = async (query)=>{
        try {
            const response = await external_axios_default().get("http://localhost:5001/api/simple/price", {
                params: {
                    ids: query,
                    vs_currencies: "usd",
                    include_market_cap: "true",
                    include_24hr_vol: "true",
                    include_24hr_change: "true"
                }
            });
            if (!response.data[query]) {
                setCrypto(null);
                setChartData(null);
                alert("Cryptocurrency not found. Please try a different search term.");
                return;
            }
            const chartResponse = await external_axios_default().get(`http://localhost:5001/api/coins/dogecoin/market_chart`, {
                params: {
                    vs_currency: "usd",
                    days: "7"
                }
            });
            setCrypto({
                name: query,
                symbol: query,
                price: response.data[query],
                market_cap: response.data[query],
                volume: response.data[query]
            });
            setChartData(chartResponse.data);
            setShowHome(false);
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            setCrypto(null);
            setChartData(null);
            alert("Error fetching data. Please try again later.");
        }
    };
    const handleHome = ()=>{
        setCrypto(null);
        setChartData(null);
        setShowHome(true);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        style: styles.container(isDarkMode),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(DarkModeToggle, {
                isDarkMode: isDarkMode,
                toggleDarkMode: ()=>setIsDarkMode(!isDarkMode)
            }),
            !showHome && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                style: styles.homeButton(isDarkMode),
                onClick: handleHome,
                children: "Home"
            }),
            showHome ? /*#__PURE__*/ jsx_runtime_.jsx(PopularCryptos, {
                onSelect: handleSearch
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
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