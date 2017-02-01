package me.pwcong.usersys.vo;

import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.entity.UserInfo;

/**
 * Created by Pwcong on 2017/1/31.
 */
public class UserInfoVo extends BaseVo {

    private User user;
    private UserInfo userInfo;

    public UserInfoVo(){}

    public UserInfoVo(User user, UserInfo userInfo) {
        this.user = user;
        this.userInfo = userInfo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
