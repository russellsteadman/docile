# Docile

Docile makes it easy to store and retrieve data about DOM nodes.

## Installation

With NPM

```bash
$ npm i -S docile
```

With Yarn

```bash
$ yarn add docile
```

With a CDN

```html
<script src="https://unpkg.com/docile@latest/dist/docile.js"></script>
```

With Bower

```bash
$ bower install -S docile
```

## Example Usage

```html
<body>
  <div id="foo">Foo</div>
</body>
```

```js
var Docile = require("docile");

Docile.set(document.body, { example: ["a", "b"] }); // set data for DOM node (body)
Docile.get(document.body); // get data for DOM node (body)
// -> {example: ['a', 'b']}

Docile.set("foo", { bar: true }); // set data for DOM node with ID 'foo'
Docile.get(document.getElementById("foo")); // get data for DOM node (foo)
// -> {bar: true}

var fooLink = Docile.link("foo"); // get linkInstance for DOM node with ID 'foo'

fooLink.set("baz", document.body); // have baz link to DOM node (body) for DOM node (foo)
fooLink.set({ yum: document.body }); // have yum link to DOM node (body) for DOM node (foo)

fooLink.get("yum"); // get the yum link for DOM node (foo)
// -> DOM Node (body)
fooLink.get(); // get all links for DOM node (foo)
// -> {baz: DOM Node (body), yum: DOM Node (body)}

fooLink.getData("yum"); // get the data for the yum link for DOM node (foo)
// -> {example: ['a', 'b']}
fooLink.getData(); // get the data for all links for DOM node (foo)
// -> {baz: {example: ['a', 'b']}, yum: {example: ['a', 'b']}}
```

## Documentation

Docile is super simple to use.

### Methods

#### Docile.set

Purpose: to store information about a node

The set method accepts two parameters: a node and the data to be stored. The node can either be a DOM node, or it can be an ID to a DOM Node.

```js
Docile.set(node, data);
```

#### Docile.get

Purpose: to retrieve information about a node

The get method accepts one parameter: a node. The node can either be a DOM node, or it can be an ID to a DOM Node. This method returns the value stored with the set method.

```js
Docile.get(node);
```

#### Docile.link

Purpose: to create a linkInstance for a node

The link method accepts one parameter: a node. The node can either be a DOM node, or it can be an ID to a DOM Node. This method returns a link instance.

```js
var linkInstance = Docile.link(node);
```

##### linkInstance.set

Purpose: to "link" a given node to other nodes

The set method accepts two parameters: an alias string and a node. The node can either be a DOM node, or it can be an ID to a DOM Node. To set multiple links at one time, the set method also accepts an object with aliases mapped to nodes.

```js
linkInstance.set(alias, node);
// OR
linkInstance.set(aliasToNodeObject);
```

##### linkInstance.get

Purpose: to retrieve "links"

The get method accepts one parameter: an alias. It returns a DOM node. If no alias is passed, then an object with aliases mapped to nodes will be returned.

```js
linkInstance.get(alias);
// OR
linkInstance.get();
```

##### linkInstance.getData

Purpose: to retrieve data from "links"

The getData method accepts one parameter: an alias. It returns the data from the corresponding link. If no alias is passed, then an object with aliases mapped to data will be returned.

```js
linkInstance.getData(alias);
// OR
linkInstance.getData();
```

## Testing

Docile is tested using Jasmine. The test of the minified packages is available [here](https://docile.js.org/test/index.html) and the webpack package [here](https://docile.js.org/test/webpack.html).

### Big Thanks

[![Sauce Labs](https://docile.js.org/test/sauce/saucelabs.png)](https://saucelabs.com/)

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com/)!

## License

MIT (C) [Russell Steadman](https://russellsteadman.github.io/contact). Learn more in the [LICENSE](https://github.com/russellsteadman/docile/blob/master/LICENSE) file.

## Support Me

Like this project? Buy me a [cup of coffee](https://www.paypal.me/RussellSteadman/3). &#x2615; Here are more of my [projects](https://russellsteadman.github.io/).
