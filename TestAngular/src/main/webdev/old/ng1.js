(function(angular){
	'use strict';
	angular.module('alpha',[]).factory('alphamapper', function(){
		var map = {a:1,b:2,c:3,d:4,e:1,f:2,g:3,h:4,i:1,j:2,k:3,l:4,m:1,n:2,o:3,p:4,q:1,r:2,s:3,t:4,u:1,v:2,w:3,x:4,y:1,z:2};

		var getnumeric = function(a){
			var tot = 0;
			for(var i=0;i<a.length;i++){
				tot+= map[a[i]];
			}
			return tot;
		};
		
		return {
			getnumeric: getnumeric
		};
	});
})(window.angular);

(function(angular){
	'use strict';
	angular.module('alpha2',['alpha']).controller('LoginController',['alphamapper',function LoginController(alphamapper){
		this.uid = '';
		this.pwd = '';
		
		this.value = function value() {
			var v_uid = alphamapper.getnumeric(this.uid);
			var v_pwd = alphamapper.getnumeric(this.pwd);
			return v_uid * v_pwd;
		}

		this.submit = function submit() {
			window.alert('OK....');
			//Do nothing...
		}
	}]);
})(window.angular);
