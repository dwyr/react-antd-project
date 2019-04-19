let serverUrl = process.env.SERVER;
let requestHeader = "";

if (window.SERVICESURL != '') {
  serverUrl = window.SERVICESURL
 }

if (process.env.NODE_ENV === 'development') {
  serverUrl = 'https://www.baidu.com';                  // develop
  requestHeader = "";         // develop
}

var Config = {
  // 登录
  login:{
    login: serverUrl + '/type'+ requestHeader, // 登录

  },
}

export default Config;
