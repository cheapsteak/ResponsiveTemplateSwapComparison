var repos = [{"name":"bootstrap","owner":{"html_url":"https://github.com/twbs","login":"twbs"},"html_url":"https://github.com/twbs/bootstrap","size":"64893","forks":"20018","open_issues":"159","watchers":"58229"},{"name":"node","owner":{"html_url":"https://github.com/joyent","login":"joyent"},"html_url":"https://github.com/joyent/node","size":"380079","forks":"4731","open_issues":"633","watchers":"24526"},{"name":"jquery","owner":{"html_url":"https://github.com/jquery","login":"jquery"},"html_url":"https://github.com/jquery/jquery","size":"22400","forks":"4899","open_issues":"7","watchers":"23630"},{"name":"html5-boilerplate","owner":{"html_url":"https://github.com/h5bp","login":"h5bp"},"html_url":"https://github.com/h5bp/html5-boilerplate","size":"73410","forks":"5422","open_issues":"8","watchers":"22283"},{"name":"rails","owner":{"html_url":"https://github.com/rails","login":"rails"},"html_url":"https://github.com/rails/rails","size":"220428","forks":"6557","open_issues":"741","watchers":"19587"}];
//normally you'd create a service here and make a request from the controller

var app = angular.module("gitRepos", ['ngResource', 'ngAnimate']);

app.directive("breakpoint", function () {
    return function (scope, element, attrs) {
        if (window.matchMedia) {
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
        } else {
            scope.matches = false;
        }
    };
});

function gitReposController($scope){
    $scope.repos = repos; //normally you'd use a service to fetch the data
}