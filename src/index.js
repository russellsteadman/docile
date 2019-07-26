/* global arguments */
const docilePrefix = 'data-docile-';
const attrId = `${docilePrefix}id`;
const attrStore = `${docilePrefix}store`;

const error = () => {
    if (typeof console === 'object') {
        let args = Array.prototype.slice.call(arguments);
        let logFunc = Function.prototype.bind.call(console.error, console);
        logFunc.apply(console, ['[Docile] '].concat(args));
    }
};

class Utility {
    #state = {
        ready: false
    };

    constructor () {
        if (!this.ready) window.addEventListener('DOMContentLoaded', () => {
            this.#state.ready = true;
        });
    }

    get ready() {
        let docState = ['loaded', 'interactive', 'complete'].indexOf(document.readyState) !== -1;
        
        return docState || this.#state.ready;
    }

    findNode(node) {
        if (!this.ready) return error('DOM not loaded. Learn more: https://goo.gl/EsYspK') || null;
        if (typeof node === 'string') node = document.getElementById(node);
        if (node) return node;
        error('Unable to resolve node.');
    }

    idFromNode(node) {
        node = this.findNode(node);
        if (!node) return;

        let id = node.getAttribute(attrId);
    
        if (!id) {
            id = Math.random().toString(36).substr(2);
            node.setAttribute(attrId, id);
        }
    
        return id;
    }

    findById(id) {
        return document.querySelector(`[${attrId}="${id}"]`);
    }

    storage(useLinkStore, key, value) {
        let stores = {
            store: {},
            linkStore: {}
        };
        let { head } = document;
        let name = useLinkStore ? 'store' : 'linkStore';
    
        try {
            if (!head.getAttribute(attrStore)) head.setAttribute(attrStore, JSON.stringify(stores));
            stores = JSON.parse(head.getAttribute(attrStore));
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
}

class DocileLink extends Utility {
    constructor(Docile, id) {
        super();

        this.state = {
            id
        };

        this.Docile = Docile;
    }

    set(alias, node) {
        this.storage(true, this.state.id, this.storage(true, this.state.id) || {});
        if (typeof alias === 'string') {
            node = this.findNode(node);
            if (!node) return;
            this.storage(true, this.state.id, {
                ...this.storage(true, this.state.id),
                [alias]: this.Docile.idFromNode(node)
            });
        } else if (typeof alias === 'object') {
            for (let i in alias) {
                this.set(i, alias[i]);
            }
        }
        return this;
    }
    
    get(alias) {
        this.storage(true, this.state.id, this.storage(true, this.state.id) || {});
        if (alias) {
            if (typeof alias !== 'string') return error('Link name must be a string.');
            return this.findById(this.storage(true, this.state.id)[alias]);
        } else {
            let links = this.storage(true, this.state.id);
            for (let i in links) {
                links[i] = this.findById(links[i]);
            }
            return links;
        }
    }
    
    getData(alias) {
        if (alias) {
            return this.Docile.get(this.get(alias));
        } else {
            let data = this.get();
            for (let i in data) {
                data[i] = this.Docile.get(data[i]);
            }
            return data;
        }
    }
}

class Docile extends Utility {
    constructor() {
        super();
    }

    set(node, data) {
        node = this.findNode(node);
        if (!node) return;
        var id = this.idFromNode(node);
        this.storage(false, id, data);
        return this;
    }
    
    get(node) {
        var id = this.idFromNode(node);
        if (!id) return;
        return this.storage(false, id);
    }

    link(node) {
        var id = this.idFromNode(node);
        if (!id) return;
        return new DocileLink(this, id);
    }
}

module.exports = new Docile();