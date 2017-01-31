package me.pwcong.usersys.service.impl;

import me.pwcong.usersys.dao.UserGroupMapper;
import me.pwcong.usersys.entity.UserGroup;
import me.pwcong.usersys.service.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Service
public class UserGroupServiceImpl implements UserGroupService {

    @Autowired
    UserGroupMapper userGroupMapper;

    public UserGroup check(Integer id) throws Exception {

        if(id==null)
            throw new Exception("用户组不合法");

        return userGroupMapper.findById(id);

    }

    public List<UserGroup> getAllGroups() throws Exception {
        return userGroupMapper.find();
    }

    public boolean isAdmin(Integer id) throws Exception {

        UserGroup _userGroup = check(id);

        if(_userGroup==null)
            throw new Exception("用户组不存在");

        return _userGroup.getWrite();
    }

    public boolean isRoot(Integer id) throws Exception {

        UserGroup _userGroup = check(id);

        if(_userGroup==null)
            throw new Exception("用户组不存在");

        return _userGroup.getRoot();
    }
}
