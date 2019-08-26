<?php

// Set site globals.
define('ENVIRONMENT', 'production');
define('SITE', 'libraries.emory.edu');

// Configure site subdomains.
$subdomains = [
  'development' => 'dev',
  'qa' => 'qa',
  'staging' => 'staging',
  'production' => ''
];

// Build additional site globals.
define('PREVIEW', explode('.', $_SERVER['HTTP_HOST'])[0] === 'preview');
define('SUBDOMAIN', PREVIEW ? 'preview' : $subdomains[ENVIRONMENT]);
define('DOMAIN', SUBDOMAIN === '' ? SITE : SUBDOMAIN.'.'.SITE);

// Configure environment directories for data, patterns, engine, and cache.
$environment = [
  'development' => [
    'data' => 'dev',
    'engine' => 'dev',
    'patterns' => 'dev',
    'cache' => 'dev'
  ],
  'qa' => [
    'data' => 'qa',
    'engine' => 'qa',
    'patterns' => 'qa',
    'cache' => 'qa'
  ],
  'staging' => [
    'data' => 'staging',
    'engine' => 'prod',
    'patterns' => 'prod',
    'cache' => 'staging'
  ],
  'production' => [
    'data' => 'prod',
    'engine' => 'prod',
    'patterns' => 'prod',
    'cache' => 'prod'
  ]
];

// Set path globals.
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('SITE_ROOT', __DIR__);
define('SERVER_ROOT', dirname(__DIR__));
define('SERVER_PATH', str_replace(DOCUMENT_ROOT.'/', '', SERVER_ROOT));
define('DATA_ROOT', SERVER_ROOT.'/data/'.$environment[ENVIRONMENT]['data']);
define('PATTERNS_ROOT', SERVER_ROOT.'/patterns/'.$environment[ENVIRONMENT]['patterns']);
define('ENGINE_ROOT', SERVER_ROOT.'/engine/'.$environment[ENVIRONMENT]['engine']);
define('CACHE_ROOT', SERVER_ROOT.'/engine/'.$environment[ENVIRONMENT]['cache'].'/php/cache');
define('SITE_DATA', DATA_ROOT.'/'.SITE);

// Set cross domain globals.
define('ORIGIN', (isset($_SERVER['HTTP_ORIGIN']) ? preg_replace('/^https?\:\/\/', '', $_SERVER['HTTP_ORIGIN']) : $_SERVER['HTTP_HOST']));
define('PERMITTED_ORIGINS', [
  'libraries.emory.edu',
  'preview.libraries.emory.edu',
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
