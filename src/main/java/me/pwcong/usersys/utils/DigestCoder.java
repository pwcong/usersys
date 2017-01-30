package me.pwcong.usersys.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class DigestCoder {
    private DigestCoder(){}

    /**
     * MD5加密
     * @param data byte[]
     * @return byte[]
     */
    public static byte[] MD5Encode(byte[] data){

        MessageDigest messageDigest;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
            byte[] digest = messageDigest.digest(data);
            return digest;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * MD5加密
     * @param data String
     * @return String
     */
    public static String MD5Encode(String data){

        MessageDigest messageDigest;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
            byte[] digest = messageDigest.digest(data.getBytes());
            return byte2HexStr(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }

    }


    /**
     * SHA-1加密
     * @param data byte[]
     * @return byte[]
     */
    public static byte[] SHAEncode(byte[] data){
        MessageDigest messageDigest;
        try {
            messageDigest = MessageDigest.getInstance("SHA-1");
            byte[] digest = messageDigest.digest(data);
            return digest;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * SHA-1加密
     * @param data String
     * @return String
     */
    public static String SHAEncode(String data){
        MessageDigest messageDigest;
        try {
            messageDigest = MessageDigest.getInstance("SHA-1");
            byte[] digest = messageDigest.digest(data.getBytes());
            return byte2HexStr(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }


    private static String byte2HexStr(byte[] b)
    {
        String stmp="";
        StringBuilder sb = new StringBuilder("");
        for (int n=0;n<b.length;n++)
        {
            stmp = Integer.toHexString(b[n] & 0xFF);
            sb.append((stmp.length()==1)? "0"+stmp : stmp);
            //sb.append(" ");
        }
        return sb.toString();
    }
}
