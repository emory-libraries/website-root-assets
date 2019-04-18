module.exports = async function () {
  
  // Load dependencies.
  const inquirer = require('inquirer');
  const chalk = require('chalk');
  const path = require('path');
  const glob = require('glob').sync;
  const fs = require('fs-extra');
  const {createClient} = require('webdav');
  
  // Make the task asynchronous.
  const done = this.async();
  
  // Get a list of all sites that can be deployed.
  const sites = fs.readdirSync(path.resolve('.')).filter((directory) => {
    
    // Filter out anything that begins with a dot.
    if( directory.indexOf('.') === 0 ) return false;
    
    // Filter out non-directories.
    if( !fs.statSync(path.resolve(directory)).isDirectory() ) return false;
    
    // Also, filter out non-site directories.
    if( ['scripts', 'templates', 'node_modules'].includes(directory) ) return false;
    
    // Otherwise, assume we've found a site directory.
    return true;
    
  });
  
  // Initialize prompts.
  const answers = await inquirer.prompt([
    {
      name: 'site',
      type: 'list',
      message: 'Which site do you wish to deploy?',
      choices: sites
    },
    {
      name: 'username',
      type: 'input',
      message: 'Enter your WebDAV username.',
      validate(username) {
        
        // Verify that a username has been given.
        if( username !== null && username !== undefined && username !== '' ) return true;
        
        // Otherwise, indicate the username is required.
        return 'Username is required.';
        
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your WebDAV password.',
      mask: '*',
      validate(password) {
        
        // Verify that a password has been given.
        if( password !== null && password !== undefined && password !== '' ) return true;
        
        // Otherwise, indicate the password is required.
        return 'Password is required.';
        
      }
    },
    {
      name: 'continue',
      type: 'confirm',
      message: (answers) => chalk`You are about to deploy files to {cyan ${answers.site}}.\n  {bold Do you wish to continue?}`,
      default: false
    }
  ]);
    
  // Verify that the user wishes to continue.
  if( answers.continue ) {
      
    // Try to deploy files to the remote server.
    try {
      
      // Get the contents of the local site's directory.
      const files = glob(path.resolve(answers.site, '*'), {dot: true}).map((file) => {
        
        // Get the file's contents and file name.
        return {
          file,
          name: path.basename(file),
          path: file.replace(path.resolve('.'), '').replace(answers.site, ''),
          contents: fs.readFileSync(file, 'utf8')
        };
        
      }); 
    
      // Create a webdav client.
      const client = createClient('https://files.web.emory.edu/site/LibraryWeb/', {
        username: answers.username,
        password: answers.password
      });
      
      // Write the files to the remove server.
      for( let file of files ) {
        
        // Get the file's remote path.
        const remote = path.join(answers.site, file.path);
        
        // Push the file to the remote server.
        await client.putFileContents(remote, file.contents);
        
      }
        
      // Report success.
      console.log(chalk`\nFiles were successfully deployed to {green.bold ${answers.site}}.\n`);
        
      // Done.
      done();
        
    }
      
    // Otherwise, report errors.
    catch(error) {
        
      // Report errors.
      console.error(chalk`\nAn error occurred while trying to deploy files to {red.bold ${answers.site}}:\n\n${error}\n`);
      
      // Done.
      done();
        
    }
      
  }
    
  // Otherwise, done.
  else done();
  
};