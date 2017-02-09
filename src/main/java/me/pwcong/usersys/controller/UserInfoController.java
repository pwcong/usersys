package me.pwcong.usersys.controller;

import me.pwcong.usersys.entity.UserInfo;
import me.pwcong.usersys.service.UserInfoService;
import me.pwcong.usersys.vo.UserInfoVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Pwcong on 2017/1/31.
 */

@Controller
public class UserInfoController extends BaseController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserInfoService userInfoService;

    @RequestMapping(value="/user_info/query.action",method= RequestMethod.POST)
    public @ResponseBody
    Response query(@RequestBody UserInfoVo userInfoVo){

        try {

            logger.info("query ===> " + userInfoVo);

            UserInfo userInfo = userInfoService.getUserInfo(userInfoVo.getUser().getUid());

            if(userInfo!=null)
                return new Response( OK, "获取成功",userInfo );
            else
                return new Response(ERROR,"用户信息不存在",null);

        } catch (Exception e) {
            logger.error("query",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }

    @RequestMapping(value="/user_info/modify.action",method= RequestMethod.POST)
    public @ResponseBody
    Response modify(@RequestBody UserInfoVo userInfoVo){

        try {

            logger.info("modify ===> " + userInfoVo);

            userInfoService.modify(userInfoVo.getUser(),userInfoVo.getUserInfo());
            return new Response(OK,"修改成功",null);
        } catch (Exception e) {
            logger.error("query",e);
            return new Response(ERROR,e.getMessage(),null);
        }

    }

}
