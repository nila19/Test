package com.test;

import java.util.Arrays;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.User;

@Controller
@RequestMapping("/access")
public class LoginController {

	@RequestMapping(value = "/in", method = RequestMethod.POST)
	@ResponseBody
//	public String login(@ModelAttribute("user") User user, Model model, HttpSession session) {
	public String login(@RequestBody User user, Model model, HttpSession session) {
		try {
			boolean validlogin = true;
			if (validlogin) {
				user.setAuthenticated(true);
				session.setAttribute("login_user", user);
				return JsonUtils.toJson(new AjaxBean(Errors.OK, "Successfully logged in..."));
			} else {
				model.addAttribute("message", "Login Error.. There is some problem");
				model.addAttribute("error", "Y");
				return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Login Error.. There is some problem..."));
			}
		} catch (Exception e) {
			model.addAttribute("error", "Y");
			return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Exception... There is some problem..."));
		}
	}

	@RequestMapping(value = "/fgt", method = RequestMethod.POST)
	@ResponseBody
	public String fgt(@ModelAttribute("user") User user, Model model, HttpSession session) {
		try {
			return JsonUtils.toJson(new AjaxBean(Errors.OK, "Password emailed..."));
		} catch (Exception e) {
			model.addAttribute("error", "Y");
			return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Exception... There is some problem..."));
		}
	}

	@RequestMapping(value = "/out", method = RequestMethod.POST)
	@ResponseBody
	public String out(Model model, HttpSession session) {
		try {
			session.invalidate();
			return JsonUtils.toJson(new AjaxBean(Errors.OK, "Logged out..."));
		} catch (Exception e) {
			model.addAttribute("error", "Y");
			return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Exception... There is some problem..."));
		}
	}

	@RequestMapping(value = "/checkName", method = RequestMethod.POST)
	@ResponseBody
	public String checkName(@RequestBody User user, Model model, HttpSession session) {
		try {
			String[] names = {"Bala", "Senthan", "Jill", "Jackie"};
			if(Arrays.asList(names).contains(user.getLogin())) {
				return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Sorry, name already taken..."));
			}
			return JsonUtils.toJson(new AjaxBean(Errors.OK, "Hurray, your name is fine!!.."));
		} catch (Exception e) {
			model.addAttribute("error", "Y");
			return JsonUtils.toJson(new AjaxBean(Errors.PROCESS, "Exception... There is some problem..."));
		}
	}
}
