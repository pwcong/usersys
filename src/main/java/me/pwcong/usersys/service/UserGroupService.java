package me.pwcong.usersys.service;

import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.entity.UserGroup;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */
public interface UserGroupService {

    public UserGroup check(int id) throws Exception;
    public List<UserGroup> getAllGroups() throws Exception;
    public boolean isAdmin(User user) throws Exception;
    public boolean isRoot(User user) throws Exception;

}
