// Dynamically import all index.js files from subdirectories
const requireModule = require.context( './', true, /^\.\/[^/]+\/index\.js$/ );
requireModule.keys().forEach( requireModule );
