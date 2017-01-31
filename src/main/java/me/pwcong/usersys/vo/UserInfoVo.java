package me.pwcong.usersys.vo;

import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.entity.UserInfo;

/**
 * Created by Pwcong on 2017/1/31.
 */
public class UserInfoVo extends BaseVo {

    private User user;
    private User target;
    private UserInfo userInfo;

    public UserInfoVo(){}

    public UserInfoVo(User user, User target, UserInfo userInfo) {
        this.user = user;
        this.target = target;
        this.userInfo = userInfo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User target) {
        this.target = target;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
