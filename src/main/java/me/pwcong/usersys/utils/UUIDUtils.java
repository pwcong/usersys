package me.pwcong.usersys.utils;

import java.util.UUID;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class UUIDUtils {

    private UUIDUtils(){}

    public static String uuid()
    {
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    public static int uuidHashCode(){
        return UUID.randomUUID().hashCode();
    }

    /**
     * 返回自定义长度UUID
     * @param length int 0<length<33
     * @return String
     */
    public static String uuid(int length){
        return uuid().substring(0,length);
    }
}
