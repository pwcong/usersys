package me.pwcong.usersys.dao;

import me.pwcong.usersys.entity.UserGroup;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */
public interface UserGroupMapper {

    public List<UserGroup> find();
    public UserGroup findById(int id);

}
