/**** ./app.jquery.js ****/

var LOGIN = {
	hideAll: function() {
		$('div.sectionDecision').hide();
		//$("span.msgError").html("");
	},
	show: function(p) {
		this.hideAll();
		p.show();
	},
};

function loadLogin() {
	LOGIN.show($('div#loginPanel'));

	$('a#lFgt').click(function() {
		LOGIN.show($('div#fgtPanel'));
	});
	$('a#lLogin, a#lPrev').click(function() {
		LOGIN.show($('div#loginPanel'));
	});
	$('a#lNext').click(function() {
		LOGIN.show($('div#loginPanel2'));
	});
}
