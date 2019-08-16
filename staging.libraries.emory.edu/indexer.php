<?php

// Set site globals.
define('DOMAIN', 'staging.libraries.emory.edu');
define('ENVIRONMENT', 'staging');
define('SITE', 'libraries.emory.edu');

// Set environment directories.
$environment = [
  'development' => 'dev',
  'qa'          => 'qa',
  'staging'     => 'staging',
  'production'  => 'prod'
];

// Set path globals.
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('SITE_ROOT', __DIR__);
define('SERVER_ROOT', dirname(__DIR__));
define('SERVER_PATH', str_replace(DOCUMENT_ROOT.'/', '', SERVER_ROOT));
define('DATA_ROOT', SERVER_ROOT.'/data/'.$environment[ENVIRONMENT]);
define('PATTERNS_ROOT', SERVER_ROOT.'/patterns/'.$environment[ENVIRONMENT]);
define('ENGINE_ROOT', SERVER_ROOT.'/engine/'.$environment[ENVIRONMENT]);
define('CACHE_ROOT', SERVER_ROOT.'/engine/'.$environment[ENVIRONMENT].'/php/cache');
define('SITE_DATA', DATA_ROOT.'/'.SITE);

// Set cross domain globals.
define('ORIGIN', (isset($_SERVER['HTTP_ORIGIN']) ? preg_replace('/^https?\:\/\/', '', $_SERVER['HTTP_ORIGIN']) : $_SERVER['HTTP_HOST']));
define('PERMITTED_ORIGINS', [
  'staging.libraries.emory.edu',
  
  'cascade.emory.edu',
  'template.library.emory.edu',
  'localhost'
]);
define('CROSSDOMAIN', in_array(ORIGIN, PERMITTED_ORIGINS));

// Enables CORS for triggering the indexer
if( CROSSDOMAIN ) header('Access-Control-Allow-Origin: '.(isset($_SERVER['HTTPS']) ? 'https://' : 'http://').ORIGIN);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Request-Method: POST");
header('Access-Control-Allow-Headers: authorization, cache-control, origin, content-type, accept-encoding, accept-language');

// Load the indexer.
require ENGINE_ROOT."/php/index.php";

?>
