describe('Testing a Controller that uses a Promise', function () {
    var $scope;
    var $q;
    var deferred;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, _$rootScope_, _$q_, searchService) {
        $q = _$q_;
        $scope = _$rootScope_.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        // Use a Jasmine Spy to return the deferred promise
        spyOn(searchService, 'search').and.returnValue(deferred.promise);

        // Init the controller, passing our spy service instance
        $controller('SearchController', {
            $scope: $scope,
            searchService: searchService
        });
    }));

    it('should resolve promise', function () {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve([{
            id: 1
        }, {
            id: 2
        }]);

        // We have to call apply for this to work
        $scope.$apply();

        // Since we called apply, not we can perform our assertions
        expect($scope.results).not.toBe(undefined);
        expect($scope.error).toBe(undefined);
    });

    it('should reject promise', function () {
        // This will call the .catch function in the controller
        deferred.reject();

        // We have to call apply for this to work
        $scope.$apply();

        // Since we called apply, not we can perform our assertions
        expect($scope.results).toBe(undefined);
        expect($scope.error).toBe('There has been an error!');
    });

});