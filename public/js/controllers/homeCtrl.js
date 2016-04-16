app.controller('homeCtrl', function(notesProvider, list, $location){
	scope = this;
	scope.list = list;

	scope.adding = false;

	scope.add = function(){
		notesProvider.create(scope.name).then(function(){
			$location.path(scope.name);
		});
	}
});