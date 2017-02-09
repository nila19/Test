package com.test;

import java.util.Collection;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8020")
@RequestMapping("/users")
public class UserController {

	@RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
	public User get(@PathVariable String id, @RequestParam int age) {
		try {
			System.out.println("Input for get = "+ id + ", "+ age);
			Map<String, User> map = UserList.buildMap();
			return map.get(id);
		} catch (Exception e) {
			System.err.println(e);
			throw e;
		}
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public Collection<User> getAll(@RequestParam Map<String, String> m) {
		try {
			System.out.println("Input for getAll = "+ m);
			Map<String, User> map = UserList.buildMap();
			return map.values();
		} catch (Exception e) {
			System.err.println(e);
			throw e;
		}
	}

	@RequestMapping(value = "/get2", method = RequestMethod.GET)
	public String getAll2(@RequestParam String id, @RequestParam int age) {
		try {
			System.out.println("Input for getAll = "+ id + ", "+ age);
			Map<String, User> map = UserList.buildMap();
			return JsonUtils.toJson(map.values());
		} catch (Exception e) {
			System.err.println(e);
			throw e;
		}
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(@RequestBody User user) {
		try {
			System.out.println("Input for add = " + user);
			Map<String, User> map = UserList.buildMap();
			map.put(user.getLogin(), user);
			System.out.println("ADD - Size of the map ==> "+map.size());
			return JsonUtils.toJson(map.get(user.getLogin()));
		} catch (Exception e) {
			System.err.println(e);
			throw e;
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public String delete(@RequestBody User user) {
		try {
			System.out.println("Input for delete = "+ user);
			Map<String, User> map = UserList.buildMap();
			map.remove(user.getLogin());
			System.out.println("ADD - Size of the map ==> "+map.size());
			return JsonUtils.toJson(user);
		} catch (Exception e) {
			System.err.println(e);
			throw e;
		}
	}
}
