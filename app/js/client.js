'use strict';

require('angular/angular');
require('angular-file-upload');

var autobots = angular.module('autobots', ['angularFileUpload']);

require('./transformers/controllers/transformController')(autobots);