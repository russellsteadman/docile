var error = console.error.bind(this, 'Docile: ');

var domReady = ['loaded', 'interactive', 'complete'].indexOf(document.readyState) >= 0;

var createId = function (node) {
    var id = node.dataset.docileId;
    if (!id) {
        id = Math.random().toString(36).substr(2);
        node.dataset.docileId = id;
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
    return document.querySelector('[data-docile-id="' + id + '"]');
};

var revive = function () {
    var data = {store:{},linkStore:{}};
    if (!document.head.dataset.docileStore) document.head.dataset.docileStore = '{"store":{},"linkStore":{}}';
    try {
        data = JSON.parse(document.head.dataset.docileStore);
    } catch (e) {
        error('Data could not be resumed.');
    }
    return data;
};

var persist = function (storeData, linkStoreData) {
    try {
        document.head.dataset.docileStore = JSON.stringify({store: storeData, linkStore: linkStoreData});
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
        var listLinks = Object.assign({}, main.linkStore[this.id]);
        for (var i in listLinks) {
            listLinks[i] = findById(listLinks[i]);
        }
        return listLinks;
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
    DocileLink.set = setLink.bind(DocileLink, this);
    DocileLink.get = getLink.bind(DocileLink, this);
    DocileLink.getData = getLinkData.bind(DocileLink, this);
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
Docile.get = get.bind(Docile);
/**
 * @param {(string|Object)} node - The DOM node or node id
 * @param {*} data - The data to be stored
 */
Docile.set = set.bind(Docile);
/**
 * @param {(string|Object)} node - The DOM node for accessing a link
 */
Docile.link = link.bind(Docile);

var initialData = revive();
Docile.store = initialData.store || {};
Docile.linkStore = initialData.linkStore || {};

window.addEventListener('DOMContentLoaded', function () {
    domReady = true;
});

module.exports = Docile;