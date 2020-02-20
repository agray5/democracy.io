/**
 * Patches config settings from our config dir to a .js object usable by browserify.
 */

var config = require('config');
var gulp = require('gulp');
var fs = require('fs');

var gulpConfig = require('../config');
var version = require('../../package.json').version;

gulp.task('appSettings', function() {
  var appConfig = {
    dioConfig: config.get('WWW')
  };
  appConfig['dioConfig']['MODE'] = config.get('MODE');
  appConfig['dioConfig']['VERSION'] = version;

  if (fs.existsSync(gulpConfig.BUILD_DIR)) return Promise.resolve('Success')
  return fs.promises.mkdir(gulpConfig.BUILD_DIR).then(() => {
    fs.writeFileSync(gulpConfig.BUILD_DIR+'/'+'dio-app-settings.js',
                     'module.exports = '+JSON.stringify(appConfig['dioConfig'])+';')
  })
  /*mkdir(gulpConfig.BUILD_DIR, function() {
    return fs.writeFileSync(gulpConfig.BUILD_DIR+'/'+'dio-app-settings.js',
                     'module.exports = '+JSON.stringify(appConfig['dioConfig'])+';');
  });*/
});
