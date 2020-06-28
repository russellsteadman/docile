declare class Utility {
    get ready(): boolean;
    findNode(node?: string | HTMLElement | null): HTMLElement | undefined;
    idFromNode(node?: string | HTMLElement): string | undefined;
    findById(id: string): Element | null;
    storage(useLinkStore: boolean, key: string, value?: any): any;
}
declare class DocileLink extends Utility {
    state: {
        id: string;
    };
    Docile: Docile;
    constructor(Docile: Docile, id: string);
    set(alias: string | {
        [key: string]: HTMLElement;
    }, node?: HTMLElement): this | undefined;
    get(alias?: string): any;
    getData(alias?: string): any;
}
declare class Docile extends Utility {
    constructor();
    set(node?: string | HTMLElement, data?: any): this | undefined;
    get(node?: string | HTMLElement): any;
    link(node?: string | HTMLElement): DocileLink | undefined;
}
declare const _default: Docile;
export default _default;
