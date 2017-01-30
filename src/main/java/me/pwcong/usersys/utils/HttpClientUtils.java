package me.pwcong.usersys.utils;

import com.google.gson.Gson;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

/**
 * Created by Pwcong on 2017/1/30.
 */
public class HttpClientUtils {

    static Gson gson;
    static{
        gson=new Gson();
    }

    public static String postJsonEntity(String url,Object object){

        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost post=new HttpPost(url);

        post.addHeader(HTTP.CONTENT_TYPE, "application/json");

        String json = gson.toJson(object);

        try {
            StringEntity stringEntity=new StringEntity(json,"UTF-8");
            post.setEntity(stringEntity);
            CloseableHttpResponse response = httpClient.execute(post);
            String result = EntityUtils.toString(response.getEntity());
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;

    }
}
