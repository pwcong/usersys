package me.pwcong.usersys.controller;

import me.pwcong.usersys.service.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Controller
public class UserGroupController extends BaseController {

    @Autowired
    UserGroupService userGroupService;

    @CrossOrigin
    @RequestMapping(value="/user_group/query.action",method= RequestMethod.GET)
    public @ResponseBody Response query(){

        try {
            return new Response(OK,"获取成功",userGroupService.getAllGroups());
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(OK,e.getMessage(),null);
        }

    }

}
