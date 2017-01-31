package me.pwcong.usersys.controller;

import me.pwcong.usersys.service.UserGroupService;
import me.pwcong.usersys.service.UserService;
import me.pwcong.usersys.vo.UserGroupVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Controller
public class UserGroupController extends BaseController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserGroupService userGroupService;
    @Autowired
    UserService userService;

    @CrossOrigin
    @RequestMapping(value="/user_group/query_all.action",method= RequestMethod.GET)
    public @ResponseBody Response queryAll(){

        try {
            return new Response(OK,"获取成功",userGroupService.getAllGroups());
        } catch (Exception e) {
            logger.error("query_all",e);
            return new Response(OK,e.getMessage(),null);
        }

    }

    @CrossOrigin
    @RequestMapping(value="/user_group/query.action",method= RequestMethod.POST)
    public @ResponseBody Response query(@RequestBody UserGroupVo userGroupVo){

        try {
            return new Response(
                    OK,
                    "获取成功",
                    userGroupService.check(userService.getUser(userGroupVo.getUser().getUid()).getGid()));
        } catch (Exception e) {
            logger.error("query",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }
}
