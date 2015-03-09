'use strict';

module.exports = function(app) {
  app.controller('transformController', ['$scope', '$http', function($scope, $http) {
    $scope.autobots = [];
    $scope.unite = function() {
      $http({
        method: 'GET',
        url: '/api/v1/autobots'
      })
      .success(function (data) {
        $scope.autobots = data;
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.create = function (autobot) {
      $http({
        method: 'POST',
        url: '/api/v1/autobots',
        data : autobot
      })
      .success(function (data) {
        $scope.autobots.push(data);
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.transform = function(autobot) {
      $http({
        method: 'PUT',
        url: '/api/v1/autobots/' + autobot._id,
        data: autobot
      })
      .success(function() {
        autobot.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.terminate = function(autobot) {
      $http({
        method: 'DELETE',
        url: '/api/v1/autobots/' + autobot._id
      })
      .success(function() {
        $scope.autobots.splice($scope.autobots.indexOf(autobot), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(autobot) {
      if(autobot.editing) {
        autobot.autobotName = autobot.oldName;
        autobot.editing = false;
      } else {
        autobot.oldName = autobot.autobotName;
        autobot.editing = true;
      }
    };
  }]);
};