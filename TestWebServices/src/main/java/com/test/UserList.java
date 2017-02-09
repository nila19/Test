package com.test;

import java.util.HashMap;
import java.util.Map;

public class UserList {
	public static Map<String, User> buildMap() {
		int size = 5;
		
		Map<String, User> m = new HashMap<String,User>();
		for (int i = 0; i < size; i++) {
			User user = new User("User_"+i, "yahoo_"+i, i);
			m.put(user.getLogin(), user);
		}
		
		return m;
	}
}
