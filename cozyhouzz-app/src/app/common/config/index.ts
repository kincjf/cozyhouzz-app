/**
 * Created by KIMSEONHO on 2016-09-19.
 */

const env = "development";    // 이 부분을 바꿔주자, 대충 쓰자 ^^
//const env = "production";    // 이 부분을 바꿔주자, 대충 쓰자 ^^

export const config = {
    "development": {
        "serverHost": "http://npus.kr:3000",
        "editorImageUploadURL": "api/public/image",
        "debugging": true,
        path: {
            login: "api/login", //01.18 수정됨 - 김호세
            signup: "api/auth/register",
            userInfo: "api/info",
            changeSignup: "api/user",
            changeBizSignup: "api/user/biz",
            consulting: "api/consult",
            buildCase: "api/build-case",
            roomInfo: "api/room",
            bizStore: "api/biz-store"
        }
    },
    "production": {
        "serverHost": "http://api.cozyhouzz.co.kr",
        "editorImageUploadURL": "api/public/image",
        path: {
            login: "api/auth/login",
            signup: "api/auth/register",
            changeSignup: "api/user",
            changeBizSignup: "api/user/biz",
            consulting: "api/consult",
            buildCase: "api/build-case",
            roomInfo: "api/room",
            bizStore: "api/biz-store"
        }
    }
}[env];
