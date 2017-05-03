describe('TestController', function () {
    // Some variables that we will always need access to.
    var $scope,
        deferred,
        TestController;

    var rootScope;

    // Some test users. This is what our API response will look like.
    var testUsers = [{
            id: 1,
            name: 'Dave'
        },
        {
            id: 2,
            name: 'Alice'
        },
        {
            id: 3,
            name: 'Bob'
        }
    ];

    // Executed before each test suite.
    beforeEach(function () {
        // Declare our module. This will give us access to dependencies 
        module('myApp');

        // Injected into each test suite.
        inject(function ($rootScope, $controller, _$q_, _testService_, _$timeout_) {
            // Declare a new scope.
            $scope = $rootScope.$new();
            rootScope = $rootScope;

            // Create a promise object.
            deferred = _$q_.defer();

            // Set up a spy to return our promise when getUsers() is called on our service.
            spyOn(_testService_, 'getUsers').and.returnValue(deferred.promise);

            // Instantiate a new instance of TestController.
            TestController = $controller('TestController', {
                $scope: $scope,
                testService: _testService_
            });
        });
    });

    it('Should exist', function () {
        expect(TestController).toBeDefined();
    });

    it('Should have the appropriate default values', function () {
        expect($scope.users).toEqual([]);
    });

    it('Should be able to retrieve a list of users when requested.', function () {
        // Call our getUsers() function which will result in a promise waiting to be resolved.
        $scope.getUsers();

        //expect($testService.getUsers).toHaveBeenCalled();

        // Resolve our promise and return our test data.
        deferred.resolve(testUsers);

        // Important: we need to call $scope.$apply() so that the digest cycle is triggered and any outstanding promises are resolved/rejected.
        $scope.$apply();

        // At this point, we can make our assertions.
        expect($scope.users).toBeDefined();
        expect($scope.users).toEqual(testUsers);
    });
});