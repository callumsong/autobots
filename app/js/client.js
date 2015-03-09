'use strict';

require('angular/angular');

var autobots = angular.module('autobots', []);

require('./transformers/controllers/transformerController')(autobots);