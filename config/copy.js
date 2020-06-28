const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.join(__dirname, '../dist/docile.d.ts'), path.join(__dirname, '../dist/docile.node.d.ts'));