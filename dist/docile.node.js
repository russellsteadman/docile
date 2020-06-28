module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global arguments */

var docilePrefix = 'data-docile-';
var attrId = "".concat(docilePrefix, "id");
var attrStore = "".concat(docilePrefix, "store");

var error = function error() {
  if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object') {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).error.apply(_console, ['[Docile] '].concat(args));
  }
};

var Utility = /*#__PURE__*/function () {
  function Utility() {
    _classCallCheck(this, Utility);
  }

  _createClass(Utility, [{
    key: "findNode",
    value: function findNode(node) {
      if (!this.ready) {
        error('DOM not loaded. Learn more: https://goo.gl/EsYspK');
        return;
      }

      if (typeof node === 'string') node = document.getElementById(node);
      if (node) return node;
      error('Unable to resolve node.');
    }
  }, {
    key: "idFromNode",
    value: function idFromNode(node) {
      node = this.findNode(node);
      if (!node) return;
      var id = node.getAttribute(attrId);

      if (!id) {
        id = Math.random().toString(36).substr(2);
        node.setAttribute(attrId, id);
      }

      return id;
    }
  }, {
    key: "findById",
    value: function findById(id) {
      return document.querySelector("[".concat(attrId, "=\"").concat(id, "\"]"));
    }
  }, {
    key: "storage",
    value: function storage(useLinkStore, key, value) {
      var stores = {
        store: {},
        linkStore: {}
      };
      var _document = document,
          head = _document.head;
      var name = useLinkStore ? 'store' : 'linkStore';

      try {
        var _head$getAttribute;

        if (!head.getAttribute(attrStore)) head.setAttribute(attrStore, JSON.stringify(stores));
        stores = JSON.parse((_head$getAttribute = head.getAttribute(attrStore)) !== null && _head$getAttribute !== void 0 ? _head$getAttribute : '');
      } catch (e) {
        error('Data could not be resumed.');
      }

      if (typeof value === 'undefined') {
        return stores[name][key];
      } else {
        stores[name][key] = value;

        try {
          head.setAttribute(attrStore, JSON.stringify(stores));
        } catch (e) {
          error('Data could not be saved.');
        }
      }
    }
  }, {
    key: "ready",
    get: function get() {
      return ['loaded', 'interactive', 'complete'].indexOf(document.readyState) !== -1;
    }
  }]);

  return Utility;
}();

var DocileLink = /*#__PURE__*/function (_Utility) {
  _inherits(DocileLink, _Utility);

  var _super = _createSuper(DocileLink);

  function DocileLink(Docile, id) {
    var _this;

    _classCallCheck(this, DocileLink);

    _this = _super.call(this);
    _this.state = {
      id: ''
    };
    _this.state = {
      id: id
    };
    _this.Docile = Docile;
    return _this;
  }

  _createClass(DocileLink, [{
    key: "set",
    value: function set(alias, node) {
      this.storage(true, this.state.id, this.storage(true, this.state.id) || {});

      if (typeof alias === 'string') {
        node = this.findNode(node);
        if (!node) return;
        this.storage(true, this.state.id, _objectSpread(_objectSpread({}, this.storage(true, this.state.id)), {}, _defineProperty({}, alias, this.Docile.idFromNode(node))));
      } else if (_typeof(alias) === 'object') {
        for (var i in alias) {
          this.set(i, alias[i]);
        }
      }

      return this;
    }
  }, {
    key: "get",
    value: function get(alias) {
      this.storage(true, this.state.id, this.storage(true, this.state.id) || {});

      if (alias) {
        if (typeof alias !== 'string') return error('Link name must be a string.');
        return this.findById(this.storage(true, this.state.id)[alias]);
      } else {
        var links = this.storage(true, this.state.id);

        for (var i in links) {
          links[i] = this.findById(links[i]);
        }

        return links;
      }
    }
  }, {
    key: "getData",
    value: function getData(alias) {
      if (alias) {
        return this.Docile.get(this.get(alias));
      } else {
        var data = this.get();

        for (var i in data) {
          data[i] = this.Docile.get(data[i]);
        }

        return data;
      }
    }
  }]);

  return DocileLink;
}(Utility);

var Docile = /*#__PURE__*/function (_Utility2) {
  _inherits(Docile, _Utility2);

  var _super2 = _createSuper(Docile);

  function Docile() {
    _classCallCheck(this, Docile);

    return _super2.call(this);
  }

  _createClass(Docile, [{
    key: "set",
    value: function set(node, data) {
      node = this.findNode(node);
      if (!node) return;
      var id = this.idFromNode(node);
      if (id) this.storage(false, id, data);
      return this;
    }
  }, {
    key: "get",
    value: function get(node) {
      var id = this.idFromNode(node);
      if (!id) return;
      return this.storage(false, id);
    }
  }, {
    key: "link",
    value: function link(node) {
      var id = this.idFromNode(node);
      if (!id) return;
      return new DocileLink(this, id);
    }
  }]);

  return Docile;
}(Utility);

exports.default = new Docile();

/***/ })
/******/ ]);