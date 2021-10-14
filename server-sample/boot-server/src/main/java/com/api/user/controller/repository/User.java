package com.api.user.controller.repository;

import java.util.Date;

public class User {

	public User() {

	}

	public User(String id, String name, String email) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.regDate = new Date();
		this.point = 0L;
	}

	private String id;
	private String name;
	private String email;
	private Date regDate;
	private Long point; // Grade는 point에 맞춰서

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", regDate=" + regDate + ", point=" + point
				+ "]";
	}

}
