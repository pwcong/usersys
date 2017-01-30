package me.pwcong.usersys.dao;

import me.pwcong.usersys.entity.User;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */
public interface UserMapper {

    public void add(User user);
    public void deleteByUID(String uid);
    public List<User> find();
    public User findByUID(String uid);
    public User findByPhone(String phone);
    public User findByEmail(String email);
    public void update(User user);

}
