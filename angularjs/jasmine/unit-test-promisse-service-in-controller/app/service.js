(function () {
    angular
        .module('myApp')
        .service('testService', testService);

    /* @ngInject */
    function testService($http) {
        var service = {
            getUsers: getUsers
        };

        return service;

        function getUsers() {
            return $http.get('/users');
        }
    }
})();