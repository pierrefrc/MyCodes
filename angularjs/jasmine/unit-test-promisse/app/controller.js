'use strict';

angular
    .module('app')
    .controller('SearchController', function ($scope, searchService) {
    // The search service returns a promise API
    searchService.search($scope.query)
        .then(function (data) {
            // This is set when the promise is resolved.
            $scope.results = data;
        })
        .catch(function () {
            // This is set in the event of an error.
            $scope.error = 'There has been an error!';
        });
});