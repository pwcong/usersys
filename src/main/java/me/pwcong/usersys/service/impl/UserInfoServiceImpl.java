package me.pwcong.usersys.service.impl;

import me.pwcong.usersys.dao.UserInfoMapper;
import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.entity.UserInfo;
import me.pwcong.usersys.service.UserGroupService;
import me.pwcong.usersys.service.UserInfoService;
import me.pwcong.usersys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Pwcong on 2017/1/31.
 */

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    UserService userService;
    @Autowired
    UserGroupService userGroupService;

    public void initialUserInfo(String uid) throws Exception {

        if(getUserInfo(uid)!=null)
            throw new Exception("用户信息已存在");

        UserInfo userInfo = new UserInfo();
        userInfo.setUid(uid);

        userInfoMapper.add(userInfo);

    }

    public UserInfo getUserInfo(String uid) throws Exception {

        if(uid==null)
            throw new Exception("用户名不合法");

        return userInfoMapper.findByUID(uid);
    }

    public void modify(User who, UserInfo userInfo) throws Exception {

        User _who = userService.check(who);
        User _target = userService.getUser(userInfo.getUid());

        if(_target==null)
            throw new Exception("用户不存在");

        UserInfo _userInfo = userInfoMapper.findByUID(userInfo.getUid());
        if(userInfo.getName()!=null)
            _userInfo.setName(userInfo.getName());
        if(userInfo.getSex()!=null)
            _userInfo.setSex(userInfo.getSex());
        if(userInfo.getBirthday()!=null)
            _userInfo.setBirthday(userInfo.getBirthday());
        if(userInfo.getSignature()!=null)
            _userInfo.setSignature(userInfo.getSignature());
        if(userInfo.getEmail()!=null)
            _userInfo.setEmail(userInfo.getEmail());
        if(userInfo.getPhone()!=null)
            _userInfo.setPhone(userInfo.getPhone());

        if(_who.getUid().equals(_target.getUid()))
            userInfoMapper.update(_userInfo);
        else {

            boolean whoIsAdmin = userGroupService.isAdmin(_who.getGid());
            boolean whoIsRoot = userGroupService.isRoot(_who.getGid());
            boolean targetIsAdmin = userGroupService.isAdmin(_target.getGid());

            if((!targetIsAdmin&&whoIsAdmin) || whoIsRoot){
                userInfoMapper.update(_userInfo);
            }
            else
                throw new Exception("没有权限");

        }


    }

    public void remove(String uid) throws Exception {
        userInfoMapper.deleteByUID(uid);
    }

}
