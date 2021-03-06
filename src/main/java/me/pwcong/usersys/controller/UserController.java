package me.pwcong.usersys.controller;

import me.pwcong.usersys.entity.User;
import me.pwcong.usersys.manager.LoginStateManager;
import me.pwcong.usersys.service.UserService;
import me.pwcong.usersys.utils.DateUtils;
import me.pwcong.usersys.vo.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Controller
public class UserController extends BaseController{

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserService userService;

    @RequestMapping(value="/user/login.action",method= RequestMethod.POST)
    public @ResponseBody
    Response login(@RequestBody UserVo userVo){

        try {

            logger.info("login ===> " + userVo);

            String token = userService.login(userVo.getUser(), DateUtils.now().getTime());

            LoginStateManager.getInstance().register(userVo.getUser().getUid(),token);

            return new Response(OK,"登陆成功",token);

        } catch (Exception e) {
            logger.error("login",e);
            return new Response(ERROR, e.getMessage(), null);
        }
    }

    @RequestMapping(value="/user/register.action",method=RequestMethod.POST)
    public @ResponseBody Response register(@RequestBody UserVo userVo){

        try {

            logger.info("register ===> " + userVo);

            userService.register(userVo.getUser());
            return new Response(OK,"注册成功",null);
        } catch (Exception e) {
            logger.error("register",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }

    @RequestMapping(value="/user/modify_password.action",method=RequestMethod.POST)
    public @ResponseBody Response modifyPassword(@RequestBody UserVo userVo){

        try {

            logger.info("modifyPassword ===> " + userVo);

            userService.modifyPassword(userVo.getUser(),userVo.getTarget());
            return new Response(OK,"修改成功",null);
        } catch (Exception e) {
            logger.error("modifyPassword",e);
            return new Response(ERROR,e.getMessage(),null);
        }
    }

    @RequestMapping(value="/user/modify_group.action",method=RequestMethod.POST)
    public @ResponseBody Response modifyGroup(@RequestBody UserVo userVo){

        try {

            logger.info("modifyGroup ===> " + userVo);

            userService.modifyGroup(userVo.getUser(),userVo.getTarget());
            return new Response(OK,"修改成功",null);
        } catch (Exception e) {

            logger.error("modifyGroup",e);
            return new Response(ERROR,e.getMessage(),null);

        }

    }

    @RequestMapping(value="/user/remove.action",method=RequestMethod.POST)
    public @ResponseBody Response remove(@RequestBody UserVo userVo){


        try {

            logger.info("remove ===> " + userVo);

            userService.remove(userVo.getUser(),userVo.getTarget());
            return new Response(OK,"注销成功",null);
        } catch (Exception e) {
            logger.error("remove",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }

    @RequestMapping(value="/user/query_all.action",method=RequestMethod.POST)
    public @ResponseBody Response queryAll(){

        try {

            logger.info("queryAll");

            List<User> users = userService.getAllUsers();
            return new Response(OK,"获取成功",users);
        } catch (Exception e) {
            logger.error("query_all",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }


}
