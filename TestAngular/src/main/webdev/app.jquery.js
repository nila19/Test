/**** ./app.jquery.js ****/

var LOGINF = {
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
	LOGINF.show($('div#loginPanel'));

	$('a#lFgt').click(function() {
		LOGINF.show($('div#fgtPanel'));
	});
	$('a#lLogin, a#lPrev').click(function() {
		LOGINF.show($('div#loginPanel'));
	});
	$('a#lNext').click(function() {
		LOGINF.show($('div#loginPanel2'));
	});
}

toastr.options.preventDuplicates = true;
