package me.pwcong.usersys;

import org.junit.Test;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Pwcong on 2017/2/1.
 */
public class TestHashMap {

    @Test
    public void test(){

        ConcurrentHashMap<String,String> map = new ConcurrentHashMap<String, String>();
        map.put("a","1");
        map.put("a","2");
        map.put("a","3");
        map.put("a","4");

        Collection<String> strings = map.values();
        for (String str:strings){
            System.out.println(str);
        }

    }
}
