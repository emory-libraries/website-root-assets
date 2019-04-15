module.exports = (plop) => {

  // Load dependencies.
  const helpers = require('handlebars-helpers')();
  
  // Configure environments.
  const env = [
    'dev',
    'qa',
    'staging',
    'production'
  ];
  
  // Load handlebars helpers.
  Object.keys(helpers).forEach((helper) => plop.addHelper(helper, helpers[helper]));

  // Create website root assets for a specific environment of a new site.
  plop.setGenerator('site', {
    description: 'Create root assets for a single environment of a new site',
    prompts: [
      {
        type: 'list',
        name: 'environment',
        message: "What is the site environment?",
        choices: env
      },
      {
        type: 'input',
        name: 'site',
        message: "What is the site's domain? Do not include environment-specific subdomains.",
      }
    ],
    actions(data) {
      
      // Initialize actions.
      const actions = [];
      
      // Determine the folder name.
      const folder = data.environment == 'production' ? data.site : `${data.environment}.${data.site}`;

      // 1. Create the new index file.
      actions.push({
        type: 'add',
        path: `${folder}/index.php`,
        templateFile: `templates/index.php`,
        data
      });
      
       // 2. Create the new htaccess file.
      actions.push({
        type: 'add',
        path: `${folder}/.htaccess`,
        templateFile: `templates/.htaccess`,
        data
      });

      // Generate.
      return actions;

    }
  });
  
  // Create website root assets for all environments of a new site.
  plop.setGenerator('suite', {
    description: 'Create root assets for all environments of a new site',
    prompts: [
      {
        type: 'input',
        name: 'site',
        message: "What is the site's domain? Do not include environment-specific subdomains.",
      }
    ],
    actions(data) {
      
      // Initialize actions.
      const actions = [];
      
      // Build folder structure for all environments.
      env.forEach((environment) => {
        
        // Save the environment.
        data.environment = environment;
      
        // Determine the folder name.
        const folder = data.environment == 'production' ? data.site : `${data.environment}.${data.site}`;

        // 1. Create the new index file.
        actions.push({
          type: 'add',
          path: `${folder}/index.php`,
          templateFile: `templates/index.php`,
          data
        });

         // 2. Create the new htaccess file.
        actions.push({
          type: 'add',
          path: `${folder}/.htaccess`,
          templateFile: `templates/.htaccess`,
          data
        });
      
      });

      // Generate.
      return actions;
      
    }
  });

};
