module.exports = (plop) => {

  // Load dependencies.
  const helpers = require('handlebars-helpers')();
  
  // Configure environments.
  const env = [
    'development',
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
      
      // Initialize the subdomain.
      let subdomain = data.environment;
      
      // Configure the subdomain based on the environment.
      switch(data.environment) {
        case "development": subdomain = 'dev'; break;
        case "production": subdomain = ''; break;
      }
      
      // Get the domain and folder name.
      const domain = (subdomain !== '' ? `${subdomain}.` : '') + data.site;

      // 1. Create the new index file.
      actions.push({
        type: 'add',
        path: `${domain}/index.php`,
        templateFile: `templates/index.php`,
        data: {
          site: data.site,
          environment: data.environment,
          subdomain,
          domain
        }
      });
      
       // 2. Create the new htaccess file.
      actions.push({
        type: 'add',
        path: `${domain}/.htaccess`,
        templateFile: `templates/.htaccess`,
        data: {
          site: data.site,
          environment: data.environment,
          subdomain,
          domain
        }
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
        message: "What is the site's domain? Do not include environment-specific subdomains."
      }
    ],
    actions(data) {
      
      // Initialize actions.
      const actions = [];
      
      // Build folder structure for all environments.
      env.forEach((environment) => {
        
        // Initialize the subdomain.
      let subdomain = environment;
      
      // Configure the subdomain based on the environment.
      switch(environment) {
        case "development": subdomain = 'dev'; break;
        case "production": subdomain = ''; break;
      }
      
      // Get the domain and folder name.
      const domain = (subdomain !== '' ? `${subdomain}.` : '') + data.site;

        // 1. Create the new index file.
        actions.push({
          type: 'add',
          path: `${domain}/index.php`,
          templateFile: `templates/index.php`,
          data: {
            site: data.site,
            environment,
            subdomain,
            domain
          }
        });

         // 2. Create the new htaccess file.
        actions.push({
          type: 'add',
          path: `${domain}/.htaccess`,
          templateFile: `templates/.htaccess`,
          data: {
            site: data.site,
            environment,
            subdomain,
            domain
          }
        });
      
      });

      // Generate.
      return actions;
      
    }
  });

};
