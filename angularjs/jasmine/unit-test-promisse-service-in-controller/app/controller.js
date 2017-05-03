(function () {
    angular
        .module('myApp')
        .controller('TestController', TestController);

    /* @ngInject */
    function TestController($scope, testService) {
        /**
         * Sets up our controller for use.
         */
        $scope.activate = function () {
            $scope.users = [];
        }

        /**
         * Gets a list of all users.
         */
        $scope.getUsers = function () {
            testService.getUsers()
                .then(function (response) {
                    $scope.users = response;
                });
        }

        $scope.activate();
    }
})();