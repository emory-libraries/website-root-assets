<?php

// Set site globals.
define('DOMAIN', 'dev.libraries.emory.edu');
define('ENVIRONMENT', 'development');
define('SITE', 'libraries.emory.edu');

// Set path globals.
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('SITE_ROOT', __DIR__);
define('SERVER_ROOT', dirname(__DIR__)); 
define('SERVER_PATH', str_replace(DOCUMENT_ROOT.'/', '', SERVER_ROOT));
define('DATA_ROOT', SERVER_ROOT.'/data/'.ENVIRONMENT);
define('PATTERNS_ROOT', SERVER_ROOT.'/patterns/'.ENVIRONMENT);
define('ENGINE_ROOT', SERVER_ROOT.'/engine/'.ENVIRONMENT);
define('CACHE_ROOT', SERVER_ROOT.'/engine/'.ENVIRONMENT.'/php/cache');
define('SITE_DATA', DATA_ROOT.'/'.SITE);
  
// Load the templating engine.
require ENGINE_ROOT."/php/engine.php";

?>