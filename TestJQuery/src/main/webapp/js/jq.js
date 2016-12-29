function loadLogin() {
	var divLoginPanel = $("div#loginPanel");
	var divFgtPanel = $("div#fgtPanel").hide();
	
	$("a#lFgt").click(function(){
		divLoginPanel.hide();
		divFgtPanel.show();
	});

	$("a#lLogin").click(function(){
		divFgtPanel.hide();
		divLoginPanel.show();
	});

	$(":button#bLogin").click(checkLogin);
	$(":button#bFgt").click(checkFgt);
}

function checkLogin() {
//	var id = $("form[name='login'] :input[name='login']").val().trim();
//	var pwd = $("form[name='login'] :input[name='password']").val().trim();
	var form = $("form[name='login']");
	var id = form.find(":input[name='login']").val().trim();
	var pwd = form.find(":input[name='password']").val().trim();

	if(id.length > 0 && pwd.length > 0){
		doLogin(id,pwd);
	} else {
		$("span#msg1").removeClass("msgSuccess").addClass("msgError").html("Some of the fields are blank...");
	}
}

function doLogin(id,pwd) {
	var url = "./servlet/access/in";
//	var input = {login:id, password:pwd};
//	$.post(url,input,processLoginResp,"json");
	$.post(url,$("form[name='login']").serializeArray(),processLoginResp,"json");
}

function processLoginResp(data,status) {
	var msg1 = $("span#msg1").removeClass("msgSuccess msgError");
//	if(status == 'success') {
	if(data.code == 0) {
		msg1.addClass("msgSuccess").html(data.message).fadeOut(2000, function(){
			$("form[name='login']").submit();
		});
	} else {
		msg1.addClass("msgError").html(data.message);
	}
}

function checkFgt() {
	var id = $("form[name='fgt'] :input[name='login']").val().trim();

	if(id.length > 0){
		doFgt(id);
	} else {
		$("span#msg2").removeClass("msgSuccess").addClass("msgError").html("Some of the fields are blank...");
	}
}

function doFgt(id) {
	var url = "./servlet/access/fgt";
	var input = {login:id};
	$.post(url,input,processFgtResp,"json");
}

function processFgtResp(data,status) {
	var msg2 = $("span#msg2").removeClass("msgSuccess msgError").html(data.message);
	data.code == 0 ? msg2.addClass("msgSuccess").fadeOut(3000) : msg2.addClass("msgError");
}

function loadLoggedin() {
	$(":input").prop('disabled',true);
	$("span#msg1").addClass("msgSuccess").append(" :: User logged in successfully");

	$("a#lLogout").click(function(){
		doLogout();
	});
}

function doLogout() {
	var url = "./servlet/access/out";
	$.post(url,{},processLogoutResp);
}

function processLogoutResp(data,status) {
	$("form[name='loggedin']").submit();
}