var notesProvider = app.provider('notesProvider', function(){
	this.$get = function(){
		return {
			list: function(){
				return new Promise(function(resolve, reject){
					$.get('/notes', function(data){
						resolve(data);
					}).fail(function(){
						reject();
					});
				});
			},
			single: function(name){
				return new Promise(function(resolve, reject){
					$.get('/notes/'+name, function(data){
						resolve(data);
					}).fail(function(){
						reject();
					});
				});

			},
			save: function(name, content){
				return new Promise(function(resolve, reject){
					$.ajax({
					  url: '/notes/'+name,
					  type: 'PUT',
					  data: {content: content},
					  success: function(data) {
					    resolve(data);
					  },
					  error: function(){
					  	reject();
					  }
					});
				});
			},
			create: function(name){
				return new Promise(function(resolve, reject){
					$.ajax({
					  url: '/notes',
					  type: 'POST',
					  data: {name: name, content: 'New note'},
					  success: function(data) {
					    resolve(data);
					  },
					  error: function(){
					  	reject();
					  }
					});
				});
			},
			rename: function(name, newName){
				return new Promise(function(resolve, reject){
					$.ajax({
					  url: '/notes/'+name,
					  type: 'PUT',
					  data: {name: newName},
					  success: function(data) {
					    resolve(data);
					  },
					  error: function(){
					  	reject();
					  }
					});
				});
			},
			delete: function(name){
				return new Promise(function(resolve, reject){
					$.ajax({
					  url: '/notes/'+name,
					  type: 'DELETE',
					  success: function(data) {
					    resolve(data);
					  },
					  error: function(){
					  	reject();
					  }
					});
				});
			}
		}
	}
});