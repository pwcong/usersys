package me.pwcong.usersys.service;

import me.pwcong.usersys.entity.User;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */
public interface UserService {

    public User check(User user) throws Exception;
    public String login(User user, String time) throws Exception;
    public void register(User user) throws Exception;
    public void modifyPassword(User who,User target) throws Exception;
    public void modifyGroup(User who,User target) throws Exception;
    public List<String> getAllUsers() throws Exception;
}
