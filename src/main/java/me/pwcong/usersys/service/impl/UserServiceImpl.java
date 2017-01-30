package me.pwcong.usersys.service.impl;

import me.pwcong.usersys.dao.UserMapper;
import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.service.UserGroupService;
import me.pwcong.usersys.service.UserService;
import me.pwcong.usersys.utils.DigestCoder;
import me.pwcong.usersys.utils.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserGroupService userGroupService;

    public User check(User user) throws Exception {

        User _user;

        if(user.getUid()==null)
            throw new Exception("用户名错误");

        _user = userMapper.findByUID(user.getUid());

        if(_user==null)
            throw new Exception("用户不存在");

        if(user.getPwd()==null || !DigestCoder.MD5Encode(user.getPwd() + _user.getPwd_salt()).equals(_user.getPwd()))
            throw new Exception("密码错误");

        return _user;

    }

    public String login(User user, String time) throws Exception {

        check(user);

        return DigestCoder.SHAEncode(user.getUid()+time);
    }

    public void register(User user) throws Exception {

        User _user = userMapper.findByUID(user.getUid());
        if(_user!=null)
            throw new Exception("用户已存在");

        if(user.getUid()==null||user.getUid().length()<6||user.getUid().length()>18)
            throw new Exception("用户名不合法");

        if(user.getPwd()==null||user.getPwd().length()<6||user.getPwd().length()>255)
            throw new Exception("密码不合法");

        User register = new User();
        register.setUid(user.getUid());
        register.setPwd_salt(UUIDUtils.uuid(8));
        register.setPwd(DigestCoder.MD5Encode(user.getPwd()+register.getPwd_salt()));
        register.setCreatedAt(new Date());
        register.setUpdatedAt(new Date());

        userMapper.add(register);

    }

    public void modifyPassword(User who, User target) throws Exception {

        User _user = check(who);

        if(who.getUid().equals(target.getUid())){

            _user.setPwd_salt(UUIDUtils.uuid(8));
            _user.setPwd(DigestCoder.MD5Encode(target.getPwd()+_user.getPwd_salt()));
            userMapper.update(_user);

        }else if (userGroupService.isAdmin(_user)){
                User t = userMapper.findByUID(target.getUid());
                if(t!=null){
                    t.setPwd_salt(UUIDUtils.uuid(8));
                    t.setPwd(DigestCoder.MD5Encode(target.getPwd()+t.getPwd_salt()));
                    t.setUpdatedAt(new Date());
                    userMapper.update(t);
                }else
                    throw new Exception("用户不存在");
            }
        else
            throw new Exception("没有权限");

    }

    public void modifyGroup(User who, User target) throws Exception {

        User _user = check(who);

        if(userGroupService.isRoot(_user)){

            User t = userMapper.findByUID(target.getUid());

            if(t!=null){

                userGroupService.check(target.getGid());

                t.setGid(target.getGid());
                t.setUpdatedAt(new Date());
                userMapper.update(t);

            }else
                throw new Exception("用户不存在");

        }else
            throw new Exception("没有权限");

    }

    public List<String> getAllUsers() throws Exception {

        List<User> userList = userMapper.find();

        List<String> users = new ArrayList<String>();

        for(User user : userList){

            users.add(user.getUid());

        }

        return users;
    }

}