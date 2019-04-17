module.exports = (grunt) => {
  
  // Load dependencies.
  const path = require('path');
  
  // Configure tasks.
  grunt.initConfig({
    phplint: {
      all: ['**/index.php']
    }
  });
  
  // Load tasks.
  grunt.loadNpmTasks('grunt-plop');
  grunt.loadNpmTasks('grunt-phplint');
  
  // Register tasks.
  grunt.registerTask('default', ['plop']);
  grunt.registerTask('lint', ['phplint']);
  grunt.registerTask('deploy', require(path.resolve('scripts/deploy.js')));
  
};