module.exports = (grunt) => {
  
  // Configure tasks.
  grunt.initConfig({});
  
  // Load tasks.
  grunt.loadNpmTasks('grunt-plop');
  
  // Register tasks.
  grunt.registerTask('default', ['plop']);
  
};