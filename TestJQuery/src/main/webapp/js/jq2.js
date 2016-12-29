//NOTE : This js file is similar to jq.js, but functions are grouped & better organized based on 
//		 functionality & bringing in modularity.
// ==========================================> Login <========================================== //
function loadLogin() {
	var lp = $('div#loginPanel');
	var fp = $('div#fgtPanel').hide();

	$(':button#bLogin').click(LOGIN.checkLogin);
	$('a#lFgt').click(function() {
		LOGIN.showFgt(lp,fp);
	});

	$(':button#bFgt').click(FGT.checkFgt);
	$('a#lLogin').click(function() {
		FGT.showLogin(lp,fp)
	});
}

var LOGIN = {
	showFgt: function(loginPanel, fgtPanel) {
		loginPanel.hide();
		$('span#msg2').html('');
		fgtPanel.show();
	},
	checkLogin: function() {
		var form = $("form[name='login']");
		var id = form.find(":input[name='login']").val().trim();
		var pwd = form.find(":input[name='password']").val().trim();

		if(id.length > 0 && pwd.length > 0){
			LOGIN.doLogin(id,pwd);
		} else {
			$('span#msg1').removeClass('msgSuccess').addClass('msgError').html('Some of the fields are blank...');
		}
	},
	doLogin: function(id,pwd) {
		var url = './servlet/access/in';
		$.post(url,$("form[name='login']").serializeArray(),LOGIN.processLoginResp,'json');
	},
	processLoginResp: function(data,status) {
		var msg1 = $('span#msg1').removeClass('msgSuccess msgError');
		if(data.code == 0) {
			msg1.addClass('msgSuccess').html(data.message).fadeOut(2000, function(){
				$("form[name='login']").submit();
			});
		} else {
			msg1.addClass('msgError').html(data.message);
		}
	}
};

var FGT = {
	showLogin: function(loginPanel, fgtPanel) {
		fgtPanel.hide();
		$('span#msg1').html('');
		loginPanel.show();
	},
	checkFgt: function() {
		var id = $("form[name='fgt'] :input[name='login']").val().trim();
		if(id.length > 0){
			FGT.doFgt(id);
		} else {
			$('span#msg2').removeClass('msgSuccess').addClass('msgError').html('Some of the fields are blank...');
		}
	},
	doFgt: function(id) {
		var url = './servlet/access/fgt';
		var input = {login:id};
		$.post(url,input,FGT.processFgtResp,'json');
	},
	processFgtResp: function(data,status) {
		var msg2 = $('span#msg2').removeClass('msgSuccess msgError').html(data.message);
		data.code == 0 ? msg2.addClass('msgSuccess').fadeOut(3000) : msg2.addClass('msgError');
	}
};

//=========================================> Loggedin <========================================= //
function loadLoggedin() {
	$(':input').prop('disabled',true);
	$('span#msg1').addClass('msgSuccess').append(' :: User logged in successfully');

	$('a#lLogout').click(LOGOUT.doLogout);
}

var LOGOUT = {
	doLogout: function() {
		var url = './servlet/access/out';
		$.post(url,{},LOGOUT.processLogoutResp);
	},
	processLogoutResp: function(data,status){
		$("form[name='loggedin']").submit();
	}
};