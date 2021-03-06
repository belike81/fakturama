var Helpers = require('../helpers'),
    filterAvailable = Helpers.filterAvailableTasks,
    liveReloadPort = parseInt(process.env.PORT || 8000, 10) + 2;

var scripts = '{app,tests,config}/**/*.{js,coffee,em}',
    templates = 'app/templates/**/*.{hbs,handlebars,hjs,emblem}',
    sprites = 'app/sprites/**/*.{png,jpg,jpeg}',
    styles = 'app/styles/**/*.{css,sass,scss,less,styl}',
    indexHTML = 'app/index.html',
    appHTML = 'app/app.html',
    other = '{app,tests,public}/**/*',
    bowerFile = 'bower.json',
    npmFile = 'package.json';

module.exports = {
  scripts: {
    files: [scripts],
    tasks: ['lock', 'buildScripts', 'unlock']
  },
  templates: {
    files: [templates],
    tasks: ['lock', 'buildTemplates:debug', 'unlock']
  },
  sprites: {
    files: [sprites],
    tasks: filterAvailable(['lock', 'fancySprites:create', 'unlock'])
  },
  styles: {
    files: [styles],
    tasks: ['lock', 'buildStyles', 'unlock']
  },
  indexHTML: {
    files: [indexHTML],
    tasks: ['lock', 'buildIndexHTML:debug', 'unlock']
  },
  appHTML: {
    files: [appHTML],
    tasks: ['lock', 'buildAppHTML:debug', 'unlock']
  },
  other: {
    files: [other, '!'+scripts, '!'+templates, '!'+styles, '!'+indexHTML, '!'+appHTML, bowerFile, npmFile],
    tasks: ['lock', 'build:debug', 'unlock']
  },

  options: {
    // No need to debounce
    debounceDelay: 0,
    // When we don't have inotify
    interval: 100,
    livereload: Helpers.isPackageAvailable("connect-livereload") || liveReloadPort
  }
};
