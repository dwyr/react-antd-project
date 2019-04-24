/*
* 后端接口配置统一入口
* dangw@glodon.com
*/
let serverUrl = process.env.SERVER;
let requestHeader = "";

if (window.SERVICESURL != '') {
  serverUrl = window.SERVICESURL
}

if (process.env.NODE_ENV === 'development') {
  serverUrl = 'https://www.baidu.com';                  // develop
  requestHeader = "";         // develop
}
http://xlj-server/metadata_webapp/home/getAllMicroservName
var Config = {
  // 数据定义
  home:{
    getAllMicroservName: serverUrl + ''+ requestHeader, // 登录

  },
}

export default Config;
