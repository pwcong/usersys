package me.pwcong.usersys.utils;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class DateUtils {
    private DateUtils(){}

    public static final String DATE_FORMAT_PATTERN="yyyy-MM-dd HH:mm:ss";

    public static Date now(){
        return Calendar.getInstance().getTime();
    }
}
