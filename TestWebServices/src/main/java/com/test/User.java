package com.test;

import java.io.Serializable;
import org.apache.commons.lang3.builder.ToStringBuilder;

public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	private String login;
	private String email;
	private String password;
	private int age;
	private boolean authenticated = false;
	
	public User() {
	}
	
	public User(String login, String email, int age) {
		this.login = login;
		this.email = email;
		this.age = age;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
