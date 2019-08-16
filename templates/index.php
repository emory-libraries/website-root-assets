<?php

// Set site globals.
define('DOMAIN', '{{domain}}');
define('ENVIRONMENT', '{{environment}}');
define('SITE', '{{site}}');

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

// Load the templating engine.
require ENGINE_ROOT."/php/engine.php";

?>
