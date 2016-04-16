var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET notes listing */
router.get('/', function(req, res, next) {
	var output = [];

	fs.readdir(path.resolve(appRoot, 'data'), function(err, files){
		if(err) {
			res.status(500).send(err);
			return false;
		}

		// we get rid of the file extension
		files.forEach(function(file){
			output.push(file.substring(0, file.length - 3));
		});

		res.json(output);
	});
});

/* GET a specifi file (download) */
router.get('/:name/download', function(req, res, next){
	fs.readFile(path.resolve(appRoot, 'data', req.params.name+'.md'), function(err, data){
	  if(err) {
			res.status(500).send(err);
			return false;
		}
	  res.send(data);
	});
});

/* GET content of specific file */
router.get('/:name', function(req, res, next){
	fs.readFile(path.resolve(appRoot, 'data', req.params.name+'.md'), 'utf8', function(err, data){
	  if(err) {
			res.status(500).send(err);
			return false;
		}
	  res.send(data);
	});
});

/* POST new note */
router.post('/', function(req, res, next){
	fs.writeFile(path.resolve(appRoot, 'data', req.body.name+'.md'), req.body.content, (err) => {
	 	if(err) {
			res.status(500).send('Error');
			return false;
		}	
	  res.send(req.body.content);
	});
});


/* PUT (edit) an existing note */
router.put('/:name', function(req, res, next){
	var name = '';

	// First, we check if the file needs to be renamed and we rename it
	var renamePromise = new Promise(function(resolve, reject){
		// We check if the name variable is set in the request's body
		if(req.body.name){
			// Then we perform the renaming
			fs.rename(path.resolve(appRoot, 'data', req.params.name+'.md'), path.resolve(appRoot, 'data', req.body.name+'.md'), function(err){
				if(err) reject(err);
				name = req.body.name;
				resolve('renamed');
			})
		}
		else{
			name = req.params.name;
			resolve('no need to rename');
		}
	});

	renamePromise.then(function(){
		if(req.body.content || req.body.content == ''){
			// Content is set : we write the content to the file
			fs.writeFile(path.resolve(appRoot, 'data', name+'.md'), req.body.content, (err) => {
			if(err) {
				res.status(500).send(err);
				return false;
			}
			  res.send(req.body.content)
			});
		}
		else{
			// Content is not set, file has been renamed
			res.send('ok');
		}
	}, function(err){
		res.status(500).send(err);
		return false;
	})
});

/* DELETE a note */
router.delete('/:name', function(req, res, next){

	fs.unlink(path.resolve(appRoot, 'data', req.params.name+'.md'), function(err){
	  if(err) {
		res.status(500).send(err);
		return false;
	}
	  res.send('ok');
	});
});

module.exports = router;
