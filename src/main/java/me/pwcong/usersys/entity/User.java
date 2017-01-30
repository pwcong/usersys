package me.pwcong.usersys.entity;

import java.util.Date;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class User extends BaseEntity {

    private Integer id;
    private Integer gid;
    private String uid;
    private String pwd;
    private String pwd_salt;
    private Date createdAt;
    private Date updatedAt;

    public User(){}

    public User(Integer id, Integer gid, String uid, String pwd, String pwd_salt, Date createdAt, Date updatedAt) {
        this.id = id;
        this.gid = gid;
        this.uid = uid;
        this.pwd = pwd;
        this.pwd_salt = pwd_salt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getPwd_salt() {
        return pwd_salt;
    }

    public void setPwd_salt(String pwd_salt) {
        this.pwd_salt = pwd_salt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", gid=" + gid +
                ", uid='" + uid + '\'' +
                ", pwd='" + pwd + '\'' +
                ", pwd_salt='" + pwd_salt + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
