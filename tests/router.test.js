// TODO compose test to run on different hashPrefix (it should do nothing)

describe('Creating router', function () {
	it('Should to create router with it\'s own property "setHook"', function () {
		var router  = new Router();
		
		expect(router).to.be.an('object');
		expect(router).to.have.property('setHook');
		expect(router.setHook).to.be.a('function');
	})
})

describe('Testing hooks.', function(){
	it('Should throw an error on wrong dsata', function(){
		var router  = new Router();
		expect(router.setHook)
			.to.throwException(/Wrong hook action/);
		expect(router.setHook).withArgs('bla', 'bla', 'bla')
			.to.throwException(/Wrong hook action/);
		expect(router.setHook).withArgs('on')
			.to.throwException(/Route must be string/);
		expect(router.setHook).withArgs('on', 'bla', 'bla')
			.to.throwException(/Hook must be function/);
		expect(router.setHook).withArgs('on', 'bla')
			.to.throwException(/Hook must be function/);
		expect(router.setHook).withArgs('on', 'bla', function(){})
			.to.not.throwException();
	});
});

describe('Testing whole routing.', function(){
	it('Hooks in constructor: on...', function (done) {
		function on (route) {
			expect(route).to.be.an(Array);
			expect(route.length).to.eql(3);
			expect(route[0]).to.eql('path');
			expect(route[1]).to.eql('segment');
			expect(route[2]).to.eql('3');
			done();
		}
		var router  = new Router(on);
		window.location.hash = '#!/path/segment/3';
	});
	
	it('Hooks in constructor: off...', function (done) {
		function off (route) {
			expect(route).to.be.an(Array);
			expect(route.length).to.eql(3);
			expect(route[0]).to.eql('path');
			expect(route[1]).to.eql('segment');
			expect(route[2]).to.eql('3');
			done();
		}
		var router  = new Router(null, off, '#!');
		window.location.hash = '#!/no/one'
	});
	
	it('Setting hook on...', function (done) {
		function on (route) {
			expect(route).to.be.an(Array);
			expect(route.length).to.eql(3);
			expect(route[0]).to.eql('path');
			expect(route[1]).to.eql('segment');
			expect(route[2]).to.eql('3');
			done();
		}
		
		var router  = new Router();
		router.setHook('on','path', on);
		window.location.hash = '#!/path/segment/3';
	});
	
	
	it('Setting hook off...', function (done) {
		function on (route) {
			expect(route).to.be.an(Array);
			expect(route.length).to.eql(3);
			expect(route[0]).to.eql('path');
			expect(route[1]).to.eql('segment');
			expect(route[2]).to.eql('3');
			done();
		}
		
		var router  = new Router();
		router.setHook('off','path', on);
		window.location.hash = '#!/no/one';
	});
});