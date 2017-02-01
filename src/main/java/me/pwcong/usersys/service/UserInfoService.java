package me.pwcong.usersys.service;

import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.entity.UserInfo;

/**
 * Created by Pwcong on 2017/1/31.
 */
public interface UserInfoService {

    public void initialUserInfo(String uid) throws Exception;
    public UserInfo getUserInfo(String uid) throws Exception;
    public void modify(User who,UserInfo userInfo) throws Exception;
    public void remove(String uid) throws Exception;

}
