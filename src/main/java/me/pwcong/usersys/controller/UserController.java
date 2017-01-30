package me.pwcong.usersys.controller;

import me.pwcong.usersys.service.UserService;
import me.pwcong.usersys.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Pwcong on 2017/1/30.
 */

@Controller
public class UserController extends BaseController{

    @Autowired
    UserService userService;

    @CrossOrigin
    @RequestMapping(value="/user/login.action",method= RequestMethod.POST)
    public @ResponseBody
    Response login(@RequestBody UserVo userVo){

        try {
            String token = userService.login(userVo.getUser(),userVo.getTime());

            return new Response(OK,"登陆成功",token);

        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ERROR, e.getMessage(), null);
        }
    }

    @CrossOrigin
    @RequestMapping(value="/user/register.action",method=RequestMethod.POST)
    public @ResponseBody Response register(@RequestBody UserVo userVo){

        try {
            userService.register(userVo.getUser());
            return new Response(OK,"注册成功",null);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ERROR,e.getMessage(),null);
        }

    }

    @CrossOrigin
    @RequestMapping(value="/user/modify_password.action",method=RequestMethod.POST)
    public @ResponseBody Response modifyPassword(@RequestBody UserVo userVo){

        try {
            userService.modifyPassword(userVo.getUser(),userVo.getTarget());
            return new Response(OK,"修改成功",null);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ERROR,e.getMessage(),null);
        }
    }

    @CrossOrigin
    @RequestMapping(value="/user/modify_group.action",method=RequestMethod.POST)
    public @ResponseBody Response modifyGroup(@RequestBody UserVo userVo){

        try {
            userService.modifyGroup(userVo.getUser(),userVo.getTarget());
            return new Response(OK,"修改成功",null);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ERROR,e.getMessage(),null);

        }

    }

    @CrossOrigin
    @RequestMapping(value="/user/query.action",method=RequestMethod.GET)
    public @ResponseBody Response query(){

        try {
            List<String> users = userService.getAllUsers();
            return new Response(OK,"获取成功",users);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(ERROR,e.getMessage(),null);
        }

    }


}
