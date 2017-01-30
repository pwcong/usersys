package me.pwcong.usersys;

import me.pwcong.usersys.utils.DigestCoder;
import me.pwcong.usersys.utils.UUIDUtils;
import org.junit.Test;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class TestToken {

    @Test
    public void test(){
        String pwd = DigestCoder.MD5Encode("123456");
        System.out.println(pwd);
        String salt = UUIDUtils.uuid(8);
        System.out.println(salt);
        System.out.println(DigestCoder.MD5Encode(pwd+salt));

    }

}
