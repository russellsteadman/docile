/* global test expect beforeAll page */

require('core-js/stable');
require('regenerator-runtime/runtime');

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
let Docile = '';

beforeAll(async () => {
    await new Promise((res, rej) => webpack(require('../config/webpack.config'), (err, stats) => {
        if (err || stats.hasErrors()) rej(new Error('Could not compile Docile'));

        Docile = fs.readFileSync(path.join(__dirname, '../dist/docile.js')).toString('utf8');
        res();
    }));
}, 10000);

const LANDING_PAGE = 'https://example.com/';

test("Docile has correct types", async () => {
    await page.goto(LANDING_PAGE);
    await page.addScriptTag({content: Docile});
    expect(await page.evaluate(`typeof Docile`)).toBe('object');
    expect(await page.evaluate(`typeof Docile.get`)).toBe('function');
    expect(await page.evaluate(`typeof Docile.set`)).toBe('function');
    expect(await page.evaluate(`typeof Docile.link`)).toBe('function');
});

test("Docile can get and set data", async () => {
    await page.goto(LANDING_PAGE);
    await page.addScriptTag({content: Docile});
    page.on('console', msg => {
        console.log.apply(console.log, msg.args());
    });
    let title = await page.evaluateHandle(`window.title = document.getElementsByTagName('title')[0]`);

    expect(await page.evaluate(`document.readyState`)).toEqual('complete');
    
    await page.evaluate(`Docile.set(title, 'jelly beans')`);
    expect(await page.evaluate(`Docile.get(title)`)).toEqual('jelly beans');

    await page.evaluate(`
        title.setAttribute('id', 'title')
        Docile.set('title', 'caramel')
    `);
    expect(await page.evaluate(`Docile.get(title)`)).toEqual('caramel');

    await page.evaluate(`
        window.titleLink = Docile.link(title);
        window.titleLink.set('thehead', document.head);
    `);
    expect(await page.evaluate(`window.titleLink.get('thehead').nodeName`)).toBe('HEAD');

    await page.evaluate(`
        Docile.set(document.head, 'chocolate');
        titleLink.set('brain', document.head);
    `);
    expect(await page.evaluate(`titleLink.getData('brain')`)).toBe('chocolate');
    expect(await page.evaluate(`titleLink.getData().brain`)).toBe('chocolate');
    title.dispose();
});