package me.pwcong.usersys.dao;

import me.pwcong.usersys.entity.UserInfo;

/**
 * Created by Pwcong on 2017/1/31.
 */
public interface UserInfoMapper {

    public void add(UserInfo userInfo);
    public void deleteByUID(String uid);
    public UserInfo findByUID(String uid);
    public void update(UserInfo userInfo);

}
