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

    public void modify(User who, User target, UserInfo userInfo) throws Exception {

    }

    public void remove(String uid) throws Exception {
        userInfoMapper.deleteByUID(uid);
    }

}
