app.controller('listItemCtrl', function($scope, notesProvider){
	remove = function(array, index){
    	array.splice(index, 1);
	}	

	$scope.loading = true;

	notesProvider.single($scope.note).then(function(content){
		$scope.content = content.substr(0,140)+'...';
		$scope.loading = false;
		$scope.$apply();
	});

	$scope.deleting = false;

	$scope.delete = function(array, index){
		notesProvider.delete($scope.note).then(function(){
			remove(array,index);
			$scope.$apply();
		});
	}
});