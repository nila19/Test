<html>
<head>
    <meta charset="utf-8">
    <title>Login</title>
	<link type="text/css" rel="stylesheet/less" href="./css/expense.less">
	<script src="./lib/jquery/dist/jquery.min.js"></script>
	<script src="./js/lib/less-2.7.1.min.js"></script>
	<script src="./js/jq2.js"></script>
	<script>
		//Invoked after page load. 'loader' is the callback method.
		$(loadLogin);
	</script>
</head>
<body>
<form name="login" method="post" action="jqLoggedin.jsp">
	<div id="loginPanel" class="sectionDecision" style="position: relative; top: 20px; left: 400px; width: 500px; height: 220px;">
		<table class="tableDecision" cellspacing='1' cellpadding='3' style="position: relative; top: 0px; left: 0px; width: 500px;">
			<tr style="height: 40px" valign="middle">
				<td align="right" width="30%">User Id :&nbsp;</td>
				<td align="left" width="70%">
					<input type="text" name="login" class="dashboardTxt" style="width: 200px;"/>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="right">Password :&nbsp;</td>
				<td align="left">
					<input type="password" name="password" class="dashboardTxt" style="width: 200px;"/>
				</td>
			</tr>
			<tr style="height: 50px" valign="bottom">
				<td align="center" colspan="2">
					<input id="bLogin" type="button" class="dashboardTxt" style="width: 150px; height: 40px" value="Login"/>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<a href="#" id="lFgt">Forgot Password ?</a>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<span id="msg1" class="msgError"></span>
				</td>
			</tr>
		</table>
	</div>
</form>
<form name="fgt" method="post">
	<div id="fgtPanel" class="sectionDecision" style="position: relative; top: 20px; left: 400px; width: 500px; height: 220px;">
		<table class="tableDecision" cellspacing='1' cellpadding='3' style="position: relative; top: 0px; left: 0px; width: 500px;">
			<tr style="height: 40px" valign="middle">
				<td align="right" width="30%">User Id :&nbsp;</td>
				<td align="left" width="70%">
					<input type="text" name="login" class="dashboardTxt" style="width: 200px;"/>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<input id="bFgt" type="button" class="dashboardTxt" style="width: 150px; height: 40px" value="Send Pwd"/>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<a href="#" id="lLogin">Back</a>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<span id="msg2" class="msgError"></span>
				</td>
			</tr>
		</table>
	</div>
</form>
	
</form>
</body>
</html>