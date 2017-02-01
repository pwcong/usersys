package me.pwcong.usersys.manager;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Pwcong on 2017/2/1.
 */
public class LoginStateManager {

    private static LoginStateManager instance = null;
    private ConcurrentHashMap<String,String> map;

    public synchronized static LoginStateManager getInstance(){

        if(instance==null)
            instance = new LoginStateManager();

        return instance;

    }

    private LoginStateManager(){
        map = new ConcurrentHashMap<String, String>();
    }

    public boolean check(String token) {

        return token != null && map.contains(token);

    }

    public void register(String uid,String token){

        if(uid==null||token==null)
            return;

        map.put(uid,token);

    }



}
