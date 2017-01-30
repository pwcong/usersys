package me.pwcong.usersys.controller;

/**
 * Created by Pwcong on 2017/1/30.
 */
public abstract class BaseController {

    public static int OK = 200;
    public static int ERROR = 400;

    public class Response{
        private int status;
        private String message;
        private Object result;

        public Response(int status, String message, Object result) {
            this.status = status;
            this.message = message;
            this.result = result;
        }

        public Response(){}

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Object getResult() {
            return result;
        }

        public void setResult(Object result) {
            this.result = result;
        }
    }

}
