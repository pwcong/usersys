package me.pwcong.usersys.vo;

import me.pwcong.usersys.entity.User;

/**
 * Created by Pwcong on 2017/1/31.
 */
public class UserGroupVo extends BaseVo {

    private User user;

    public UserGroupVo(User user) {
        this.user = user;
    }

    public UserGroupVo(){}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserGroupVo{" +
                "user=" + user +
                '}';
    }
}
