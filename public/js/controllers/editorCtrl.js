app.controller('editorCtrl', function(notesProvider, text, name, $timeout, $scope, $location){
	that = this;

	var _timeout;

	this.saved = false;
	this.text = text;
	this.name = name;
	this.newName = name;
	this.renaming = false;

	this.save = function(){
		that.saved = false;

		if(_timeout){
		    $timeout.cancel(_timeout);
		}
		_timeout = $timeout(function(){
			notesProvider.save(name, that.text).then(function(){
				that.saved = true;
				$scope.$apply();
			});
		},1100);
	}

	this.showRenameForm = function(){
		that.renaming = true;
	}

	this.rename = function(){
		notesProvider.rename(name, that.newName).then(function(){
			$location.path(that.newName).replace();
			that.name = that.newName;
			that.editing= false;
			$scope.$apply();
		});
	}

	this.home = function(){
		$location.path('/');
	}
});