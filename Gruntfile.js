module.exports = (grunt) => {
  
  // Load dependencies.
  const path = require('path');
  
  // Configure tasks.
  grunt.initConfig({});
  
  // Load tasks.
  grunt.loadNpmTasks('grunt-plop');
  
  // Register tasks.
  grunt.registerTask('default', ['plop']);
  grunt.registerTask('deploy', require(path.resolve('scripts/deploy.js')));
  
};