'use strict';

angular
    .module('app')
    .service('searchService', function ($q, $http) {
    var service = {};

    service.search = function search(query) {
        // We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();

        $http.get('http://localhost/v1?=q' + query)
            .success(function (data) {
                // The promise is resolved once the HTTP call is successful.
                deferred.resolve(data);
            })
            .error(function () {
                // The promise is rejected if there is an error with the HTTP call.
                deferred.reject();
            });

        // The promise is returned to the caller
        return deferred.promise;
    };

    return service;
});