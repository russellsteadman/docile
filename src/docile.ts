/* global arguments */
const docilePrefix = 'data-docile-';
const attrId = `${docilePrefix}id`;
const attrStore = `${docilePrefix}store`;

const error = function (...args: any) {
    if (typeof console === 'object') {
        console.error('[Docile] ', ...args);
    }
};

class Utility {
    get ready() {
        return ['loaded', 'interactive', 'complete'].indexOf(document.readyState) !== -1;
    }

    findNode(node?: string | HTMLElement | null) {
        if (!this.ready) {
            error('DOM not loaded. Learn more: https://goo.gl/EsYspK');
            return;
        }
        if (typeof node === 'string') node = document.getElementById(node);
        if (node) return <HTMLElement>node;
        error('Unable to resolve node.');
    }

    idFromNode(node?: string | HTMLElement) {
        node = this.findNode(node);
        if (!node) return;

        let id = node.getAttribute(attrId);
    
        if (!id) {
            id = Math.random().toString(36).substr(2);
            node.setAttribute(attrId, id);
        }
    
        return id;
    }

    findById(id: string) {
        return document.querySelector(`[${attrId}="${id}"]`);
    }

    storage(useLinkStore: boolean, key: string, value?: any) {
        let stores: {
            store: {[key: string]: any},
            linkStore: {[key: string]: any},
        } = {
            store: {},
            linkStore: {}
        };
        let { head } = document;
        let name: 'store' | 'linkStore' = useLinkStore ? 'store' : 'linkStore';
    
        try {
            if (!head.getAttribute(attrStore)) head.setAttribute(attrStore, JSON.stringify(stores));
            stores = JSON.parse(head.getAttribute(attrStore) ?? '');
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
    state: {
        id: string;
    } = {
        id: '',
    };

    Docile: Docile;

    constructor(Docile: Docile, id: string) {
        super();

        this.state = {
            id
        };

        this.Docile = Docile;
    }

    set(alias: string | {[key: string]: HTMLElement}, node?: HTMLElement) {
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
    
    get(alias?: string) {
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
    
    getData(alias?: string) {
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

    set(node?: string | HTMLElement, data?: any) {
        node = this.findNode(node);
        if (!node) return;
        const id = this.idFromNode(node);
        if (id) this.storage(false, id, data);
        return this;
    }
    
    get(node?: string | HTMLElement) {
        var id = this.idFromNode(node);
        if (!id) return;
        return this.storage(false, id);
    }

    link(node?: string | HTMLElement) {
        var id = this.idFromNode(node);
        if (!id) return;
        return new DocileLink(this, id);
    }
}

export default new Docile();