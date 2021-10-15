package com.api.user.controller.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface AppUserDao {
	public List<AppUserVo> getUsers();
	public Integer join(AppUserVo user);
}
