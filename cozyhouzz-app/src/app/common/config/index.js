/**
 * Created by KIMSEONHO on 2016-09-19.
 */
"use strict";
var env = "development"; // 이 부분을 바꿔주자, 대충 쓰자 ^^
//const env = "production";    // 이 부분을 바꿔주자, 대충 쓰자 ^^
exports.config = {
    "development": {
        "serverHost": "http://npus.kr:3000",
        "editorImageUploadURL": "api/public/image",
        "debugging": true,
        path: {
            login: "api/login",
            signup: "api/auth/register",
            signout: "api/quit",
            notice: "api/notice",
            userInfoModify: "api/modifyInfo",
            userInfo: "api/info",
            changeSignup: "api/user",
            changeBizSignup: "api/user/biz",
            consulting: "api/consult",
            buildCase: "api/build-case",
            roomInfo: "api/posts",
            roomDetailInfo: "api/room",
            bizStore: "api/biz-store"
        }
    },
    "production": {
        "serverHost": "http://api.cozyhouzz.co.kr",
        "editorImageUploadURL": "api/public/image",
        path: {
            login: "api/auth/login",
            signup: "api/auth/register",
            signout: "api/quit",
            notice: "api/notice",
            userInfoModify: "api/modifyInfo",
            changeSignup: "api/user",
            changeBizSignup: "api/user/biz",
            consulting: "api/consult",
            buildCase: "api/build-case",
            roomInfo: "api/room",
            bizStore: "api/biz-store"
        }
    },
    "localhost": {
        "serverHost": "localhost:3000",
        "editorImageUploadURL": "api/public/image",
        path: {
            login: "api/auth/login",
            signup: "api/auth/register",
            signout: "api/quit",
            notice: "api/notice",
            userInfoModify: "api/modifyInfo",
            changeSignup: "api/user",
            changeBizSignup: "api/user/biz",
            consulting: "api/consult",
            buildCase: "api/build-case",
            roomInfo: "api/room",
            bizStore: "api/biz-store"
        }
    }
}[env];
