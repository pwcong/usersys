package me.pwcong.usersys.entity;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class UserGroup extends BaseEntity{

    private Integer id;
    private String name;
    private Boolean read;
    private Boolean write;
    private Boolean root;

    public UserGroup(Integer id, String name, Boolean read, Boolean write, Boolean root) {
        this.id = id;
        this.name = name;
        this.read = read;
        this.write = write;
        this.root = root;
    }

    public UserGroup(){}

    @Override
    public String toString() {
        return "UserGroup{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", read=" + read +
                ", write=" + write +
                ", root=" + root +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Boolean getWrite() {
        return write;
    }

    public void setWrite(Boolean write) {
        this.write = write;
    }

    public Boolean getRoot() {
        return root;
    }

    public void setRoot(Boolean root) {
        this.root = root;
    }
}
