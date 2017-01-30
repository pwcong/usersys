package me.pwcong.usersys.entity;

import java.util.Date;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class UserInfo extends BaseEntity{

    private String uid;
    private String name;
    private Integer sex;
    private Date birthday;
    private String email;
    private String phone;
    private String signature;

    public UserInfo(){}

    public UserInfo(String uid, String name, Integer sex, Date birthday, String email, String phone, String signature) {
        this.uid = uid;
        this.name = name;
        this.sex = sex;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.signature = signature;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "uid='" + uid + '\'' +
                ", name='" + name + '\'' +
                ", sex=" + sex +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", signature='" + signature + '\'' +
                '}';
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
