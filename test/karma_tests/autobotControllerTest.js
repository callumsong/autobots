'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('autobots controller', function() {
  var $ControllerConstructor,
      $httpBackend,
      $scope;

  beforeEach(angular.mock.module('autobots'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var transformController = $ControllerConstructor('transformController', {$scope: $scope});
    expect(typeof transformController).toBe('object');
    expect(Array.isArray($scope.autobots)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a unite function', function() {
      $httpBackend.expectGET('/api/v1/autobots').respond(200, [{autobotName: 'le test'}]);
      var transformController = $ControllerConstructor('transformController', {$scope: $scope});
      $scope.unite();
      $httpBackend.flush();

      expect($scope.autobots[0].autobotName).toBe('le test');
    });

    it('should be able to create a new autobot', function() {
      $httpBackend.expectPOST('/api/v1/autobots').respond(200, {_id: 23, autobotName: 'Testimus'});
      var transformController = $ControllerConstructor('transformController', {$scope: $scope});
      $scope.create({autobotName: 'Testimus'});
      $httpBackend.flush();
      expect($scope.autobots[0]._id).toBe(23);
    });

    it('should be able to transform', function() {
      $httpBackend.expectPUT('/api/v1/autobots/23').respond(200);
      var transformController = $ControllerConstructor('transformController', {$scope: $scope});
      var autobot = {autobotName: 'Bumbletest', _id: 23, editing: true};
      $scope.transform(autobot);
      $httpBackend.flush();
      expect(autobot.editing).toBe(false);
    });

    it('should terminate an autobot', function() {
      $httpBackend.expectDELETE('/api/v1/autobots/23').respond(200);
      $ControllerConstructor('transformController', {$scope: $scope});
      var autobot = {autobotName: 'Testimus', _id: 23, editing: true};
      $scope.autobots.push(autobot);
      $scope.terminate(autobot);
      $httpBackend.flush();
      expect($scope.autobots.length).toBe(0);
    });
  });
});