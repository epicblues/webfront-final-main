package com.api.user.controller.repository;

import java.util.Date;

public class AppUserVo {

	public AppUserVo() {

	}

	public AppUserVo(String name, String email, Date regDate, Long point) {
		super();
		
		this.name = name;
		this.email = email;
		this.regDate = regDate;
		this.point = point;
	}

	
	private String name;
	private String email;
	private Date regDate;
	private Long point; // Grade는 point에 맞춰서

	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	@Override
	public String toString() {
		return "User [ name=" + name + ", email=" + email + ", regDate=" + regDate + ", point=" + point
				+ "]";
	}

}
