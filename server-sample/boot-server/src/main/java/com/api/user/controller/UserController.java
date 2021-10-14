package com.api.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.user.controller.repository.User;

@RestController
@RequestMapping("user")
public class UserController {
	
	@GetMapping({"","/"})
	public List<User> getUsers() {
		System.out.println("getUser Activated");
		return List.of(new User("epicblue", "kms", "epicblue@hanmail.net"),
				new User("epicblueha", "kmsoo", "korean@hanmail.net"));
	}
}
