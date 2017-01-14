const express = require('express')
const router = express.Router();

const Post = require('../models/post');

//Find all Reddit articles by subredditId category ("austin" or "houston")
router.get('/by-subreddit/:subreddit', (req, res) => {
	let subredditId = req.params.subreddit.toLowerCase();
	subredditId = subredditId.replace(/ /g, '');

	Post.find({
		subredditId: subredditId
	}, (err, results) => {
		res.json(results);
	});
});

router.get('/posts/:id', (req, res) => {
	let redditId = req.params.id;

	//findOne({}) crashes the app
	Post.find({
		_id: redditId
	}, (err, results) => {
		res.json(results);
	});
});

//Save a comment to its given article by _id
router.post('/api/:id', function(req, res) {
	
	Post.findOneAndUpdate({ "_id": req.params.id }, { $push: { "comments": req.body.comments } }, {new: true})
	// Execute the above query
	.exec(function(err, postDoc) {
		// Log any errors
		if (err) {
			console.log(err);
		}
		else {
			// response.redirect('/');
		}
	}).then(
	//Redirect to the selected post after adding comment
	res.redirect('/#/posts/' + req.params.id)
	);
});

router.post('/austin/new', function(req, res) {

	let category = req.body.body.categ;
	let lowerCateg = category.toLowerCase();

	//Check whether a post already has the given title
	Post.count({title: req.body.body.term}, function(err,count) {
		if (err) throw err;
		console.log(count);
		if (count < 1) {

			var newPost = new Post({
				title: req.body.body.term,
				subredditId: lowerCateg,
				content: req.body.body.content,
			});

			newPost.save(function(error, doc) {
				// Log any errors
				if (error) {
				console.log(error);
				}
			});
		}
	}).then(
	//Redirect to the selected post after adding comment
	res.redirect('/#/')
	);
});

module.exports = router;
