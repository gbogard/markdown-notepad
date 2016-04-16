var app = angular.module('notesApp', ['ngRoute', 'wiz.markdown']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'homeCtrl',
			controllerAs: 'home',
			resolve: {
				list: function(notesProvider){
					return notesProvider.list();
				}
			}
		})
		.when('/:note', {
			templateUrl: 'templates/editor.html',
			controller: 'editorCtrl',
			controllerAs: 'editor',
			resolve: {
				text: function($route, notesProvider){
					return notesProvider.single($route.current.params.note);
				},
				name: function($route){
					return $route.current.params.note;
				}
			}
		})
		.otherwise({redirectTo: '/'});
});

app.run(['$rootScope', '$location',function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function() {
  	$location.path('/');
  });
}]);