package com.api.user.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.api.user.controller.repository.AppUserDao;
import com.api.user.controller.repository.AppUserVo;

@Controller
@RequestMapping("user")
public class AppUserController {
	
	@Autowired
	AppUserDao appUserDao;
	
	
	@ResponseBody
	@GetMapping({"","/"})
	public List<AppUserVo> getUsers() {
		
		return appUserDao.getUsers();
	}
	
	@GetMapping("/main") 
	@ResponseBody
	public String mainPage(HttpSession session) {
		AppUserVo loggedUser = (AppUserVo)session.getAttribute("authUser");
		if(loggedUser == null) {
			return "redirect:/user/join";
		}
		return "<h2>" + loggedUser.getName() + "님 환영합니다!" + "<h2>";
	}
	
	@GetMapping("/join") 
	public ModelAndView join(ModelAndView mav) {
		mav.setViewName("/views/join.html");
	
		return mav;
	}
	
	@PostMapping("/join")
	public String joinForm(@ModelAttribute AppUserVo userVo, HttpSession session) {
		System.out.println(appUserDao.join(userVo));
		session.setAttribute("authUser", userVo);
		return "redirect:/user/main";
	}
}
