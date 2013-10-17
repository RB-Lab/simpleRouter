function Router (on, off, hashPrefix) {
	
	var lastRoute = [];
	hashPrefix = hashPrefix || '#!';
	var hooks = {
		defaultRoute:{
			on: on || function (route) {
				console.log('Route to: '+route + ' (default hook)');
			},
			off: off || function (route) {
				console.log('Route from: '+ route + ' (default hook)');
			}
		}
	};
	
	function parseHash (str) {
		var route = str.split('/');
		if(route[0] == hashPrefix){
			route.shift();
		}
		return route;
	}
	
	function route (to) {
		var route = [];
		if(to.slice(0,hashPrefix.length) === hashPrefix){
			
			route = parseHash(to);
			
			if (hooks[lastRoute[0]] && typeof hooks[lastRoute[0]].off == 'function') {
				hooks[lastRoute[0]].off(lastRoute);
			}else{
				hooks.defaultRoute.off(lastRoute);
			}
			
			lastRoute = route;
			
			if(hooks[route[0]] && typeof hooks[route[0]].on == 'function') {
				hooks[route[0]].on(route);
			}else{
				hooks.defaultRoute.on(route);
			}
		}
	}
	
	window.onhashchange = function () {
		route(window.location.hash);
	};
	
	if(window.location.hash.slice(0,hashPrefix.length) === hashPrefix){
		lastRoute = parseHash(window.location.hash);
	}
	
	this.setHook = function (action, route, hook) {
		if(action !== 'on' && action !== 'off'){
			throw new Error('Wrong hook action: ' + action + '. Must be "on" or "off"');
		}
		
		if(typeof route != 'string') {
			throw new Error('Route must be string. '+typeof hook+' given.');
		}
		
		if(typeof hook != 'function') {
			throw new Error('Hook must be function. '+typeof hook+' given.');
		}
		
		if(!hooks[route]) hooks[route] = {};
		
		hooks[route][action] = hook;
	};
	
	this.route = function () {
		route(window.location.hash);
	}
}
