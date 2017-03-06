var expect = require('chai').expect;
var api = require('../../support/api');
var user = require('../../support/users');
var Post = require('../../../../models/post');

describe('controllers.api.posts', function() {
	beforeEach(function(done) {
		Post.remove({}, done);
	});
	describe('GET /api/posts', function() {
		beforeEach(function(done) {
			var posts = [{
				body: 'post1',
				username: '@poster1'
			}, {
				body: 'post2',
				username: '@poster1'
			}, {
				body: 'post3',
				username: '@poster1'
			}];
			Post.create(posts, done);
		});
		it('has 3 posts', function(done) {
			api.get('/api/posts')
				.expect(200)
				.expect(function(response) {
					expect(response.body).to.have.length(3);
				})
				.end(done);
		});
	});
	describe('POST /api/posts', function() {
		var token;

		beforeEach(function(done) {
			user.create('@poster1', 'pass', function(err, user) {
				token = user.token;
				done(err);
			});
		});

		beforeEach(function(done) {
			api.post('/api/posts')
				.send({
					body: 'new post'
				})
				.set('X-Auth', token)
				.expect(201)
				.end(done);
		});

		it('added 1 new post', function(done) {
			Post.findOne(function(err, post) {
				expect(post.body).to.equal('new post');
				done(err);
			});
		});
	});
});