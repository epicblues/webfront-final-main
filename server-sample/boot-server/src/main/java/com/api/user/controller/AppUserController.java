package com.api.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.user.controller.repository.AppUserDao;
import com.api.user.controller.repository.AppUserVo;

@RestController
@RequestMapping("user")
public class AppUserController {
	
	@Autowired
	AppUserDao appUserDao;
	
	@GetMapping({"","/"})
	public List<AppUserVo> getUsers() {
		return appUserDao.getUsers();
	}
	
	
}
