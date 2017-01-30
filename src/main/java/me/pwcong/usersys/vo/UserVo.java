package me.pwcong.usersys.vo;

import me.pwcong.usersys.entity.User;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class UserVo extends BaseVo {

    public String time;
    public User user;
    public User target;

    public UserVo(){}

    public UserVo(String time, User user, User target) {
        this.time = time;
        this.user = user;
        this.target = target;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
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
}
