package me.pwcong.usersys;

import me.pwcong.usersys.utils.DateUtils;
import org.junit.Test;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class TestDate {

    @Test
    public void test(){
        System.out.println(DateUtils.now().getTime());
    }

}
