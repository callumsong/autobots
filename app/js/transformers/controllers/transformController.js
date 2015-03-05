'use strict';

module.exports = function(app) {
  app.controller('transformController', ['$scope', '$upload', '$http', function($scope, $upload, $http) {
    $scope.autobots = [];
    $scope.model = {};
    $scope.selectedFile = [];
    $scope.uploadProgress = 0;
    $scope.watch = function() {
      $scope.transform($scope.files);
    };

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

    $scope.transform = function () {
      var file = $scope.selectedFile[0];
      $scope.upload = $upload.upload({
        method: 'POST',
        url: '/api/v1/autobots',
        data: angular.toJson($scope.model),
        file : file
      })
      .progress(function (evt) {
        $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
      })
      .success(function (data) {
        console.log('yuss');
      })
      .error(function (data) {
        console.log(data);
      });
    };
    $scope.onFileSelect = function($files) {
      $scope.uploadProgress = 0;
      $scope.selectedFile = $files;
    };
  }]);
};