(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Docile = __webpack_require__(1);

window.Docile = Docile;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/** @module docile */
module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var domReady = ['loaded', 'interactive', 'complete'].indexOf(document.readyState) >= 0;

var attrId = 'data-docile-id';
var attrStore = 'data-docile-store';

var nativeBind = Function.prototype.bind;
var slice = Array.prototype.slice;

var bindTo = function (func, context) {
    if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice.call(arguments, 1));
    }
    var args = slice.call(arguments, 2);
    return function () {
        return func.apply(context, args.concat(slice.call(arguments)));
    };
};

var error = function () {
    if (console && console.error) {
        bindTo(console.error, this, 'Docile: ')(arguments);
    }
};

var createId = function (node) {
    var id = node.getAttribute(attrId);
    if (!id) {
        id = Math.random().toString(36).substr(2);
        node.setAttribute(attrId, id);
        return id;
    }
    return id;
};

var findNode = function (node) {
    if (!domReady) {
        error('DOM not loaded. Learn more: https://goo.gl/EsYspK');
        return null;
    }
    if (typeof node === 'object') {
        return node;
    } else if (typeof node === 'string') {
        node = document.getElementById(node);
        if (node) return node;
    }
    error('Unable to resolve node.');
};

var findById = function (id) {
    return document.querySelector('[' + attrId + '="' + id + '"]');
};

var revive = function () {
    var data = {store:{},linkStore:{}};
    if (!document.head.getAttribute(attrStore)) document.head.setAttribute(attrStore, '{"store":{},"linkStore":{}}');
    try {
        data = JSON.parse(document.head.getAttribute(attrStore));
    } catch (e) {
        error('Data could not be resumed.');
    }
    return data;
};

var persist = function (storeData, linkStoreData) {
    try {
        document.head.setAttribute(attrStore, JSON.stringify({store: storeData, linkStore: linkStoreData}));
    } catch (e) {
        error('Data could not be saved.');
    }
};

var set = function (node, data) {
    node = findNode(node);
    if (!node) return;
    var id = createId(node);
    this.store[id] = data;
    persist(this.store, this.linkStore);
    return this;
};

var get = function (node) {
    node = findNode(node);
    if (!node) return;
    var id = createId(node);
    return this.store[id];
};

var setLink = function (main, alias, node) {
    main.linkStore[this.id] = main.linkStore[this.id] || {};
    if (typeof alias === 'string') {
        node = findNode(node);
        if (!node) return;
        main.linkStore[this.id][alias] = createId(node);
    } else if (typeof alias === 'object') {
        for (var i in alias) {
            this.set(i, alias[i]);
        }
    }
    persist(main.store, main.linkStore);
    return this;
};

var getLink = function (main, alias) {
    main.linkStore[this.id] = main.linkStore[this.id] || {};
    if (alias) {
        if (typeof alias !== 'string') return error('Link name must be a string.');
        return findById(main.linkStore[this.id][alias]);
    } else {
        var links = {};
        for (var i in main.linkStore[this.id]) {
            links[i] = findById(main.linkStore[this.id][i]);
        }
        return links;
    }
};

var getLinkData = function (main, alias) {
    if (alias) {
        return main.get(this.get(alias));
    } else {
        var listLinks = this.get();
        for (var i in listLinks) {
            listLinks[i] = main.get(listLinks[i]);
        }
        return listLinks;
    }
};

var link = function (node) {
    node = findNode(node);
    if (!node) return;
    var id = createId(node);
    var DocileLink = new Object();
    DocileLink.id = id;
    DocileLink.set = bindTo(setLink, DocileLink, this);
    DocileLink.get = bindTo(getLink, DocileLink, this);
    DocileLink.getData = bindTo(getLinkData, DocileLink, this);
    return DocileLink;
};

/**
 * Stores data about DOM nodes.
 * @property {function} set - Set data
 * @property {function} get - Get data
 * @property {function} link - Links nodes
 */
var Docile = new Object();
/**
 * @param {(string|Object)} node - The DOM node or node id
 */
Docile.get = bindTo(get, Docile);
/**
 * @param {(string|Object)} node - The DOM node or node id
 * @param {*} data - The data to be stored
 */
Docile.set = bindTo(set, Docile);
/**
 * @param {(string|Object)} node - The DOM node for accessing a link
 */
Docile.link = bindTo(link, Docile);

var initialData = revive();
Docile.store = initialData.store || {};
Docile.linkStore = initialData.linkStore || {};

window.addEventListener('DOMContentLoaded', function () {
    domReady = true;
});

module.exports = Docile;

/***/ })
/******/ ]);
});