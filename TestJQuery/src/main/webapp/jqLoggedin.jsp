<html>
<head>
	<%@page import="com.test.User"%>
    <meta charset="utf-8">
    <title>Login</title>
	<link type="text/css" rel="stylesheet/less" href="./css/expense.less">
	<script src="./lib/jquery/dist/jquery.min.js"></script>
	<script src="./js/lib/less-2.7.1.min.js"></script>
	<script src="./js/jq2.js"></script>
	<script>
		//Invoked after page load. 'loader' is the callback method.
		$(loadLoggedin);
	</script>
</head>
<%
	User usr = (User)session.getAttribute("login_user");
%>
<body>
<form name="loggedin" method="post" action="jqLogin.jsp">
	<div id="loggedinPanel" class="sectionDecision" style="position: relative; top: 20px; left: 400px; width: 500px; height: 220px;">
		<table class="tableDecision" cellspacing='1' cellpadding='3' style="position: relative; top: 0px; left: 0px; width: 500px;">
			<tr style="height: 40px" valign="middle">
				<td align="right" width="30%">User Id :&nbsp;</td>
				<td align="left" width="70%">
					<input type="text" name="login" class="dashboardTxt" style="width: 200px;" value="<%= usr.getLogin() %>"/>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<a href="#" id="lLogout">Logout</a>
				</td>
			</tr>
			<tr style="height: 40px" valign="middle">
				<td align="center" colspan="2">
					<span id="msg1"><%= usr.isAuthenticated() %></span>
				</td>
			</tr>
		</table>
	</div>
</form>
</body>
</html>