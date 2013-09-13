var app = angular.module("gitRepos", ['ngResource', 'ngAnimate']);

app.directive("breakpoint", function () {
    return function (scope, element, attrs) {
        var breakpoint = attrs.breakpoint;
        var mql = window.matchMedia( "(" + breakpoint + ")" );
        var mqlHandler = function (mql) {
            scope.matches = mql.matches;
            if(!scope.$$phase) { //prevents it from unnecessarily calling $scope.$apply when the page first runs
                scope.$apply(); //triggers the digest cycle
            }
        };
        mql.addListener(mqlHandler);
        mqlHandler(mql);
    };
});

// Create and register the new "github" service
app.factory('github', function($resource){
    return {
        fetch: function(callback){
            var api = $resource("http://query.yahooapis.com/v1/public/yql?q=select%20name%2Cowner.login%2C%20owner.html_url%2Chtml_url%2Csize%2Cwatchers%2Cforks%2Copen_issues%20from%20github.repo%20where%20(repo%3D'bootstrap'%20and%20id%3D'twbs')%20OR%20(repo%3D'node'%20and%20id%3D'joyent')%20OR%20(repo%3D'jquery'%20and%20id%3D'jquery')%20%20OR%20(repo%3D'html5-boilerplate'%20and%20id%3D'h5bp')%20OR%20(repo%3D'rails'%20and%20id%3D'rails')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK", null, {
                fetch:{method:'JSONP'}
            });
            api.fetch(function(response){
                // Call the supplied callback function
                callback(response.query.results.json);
            });
        }
    };

});

function gitReposController($scope, github){
    $scope.repos = [];
    $scope.loading = true;
    github.fetch(function(data){
        $scope.repos = data;
        $scope.loading = false;
    });
}