/**
 * 全局store, 在整个App的生命周期生存
 */
import {observable, computed, action} from 'mobx';
import cookie from 'react-cookies';
import $ from 'jquery';
import Config from "@/config";
import intl from 'react-intl-universal';
import jDiwork from './../jDiwork';
import {getLocalMessage} from './../utils/util';

const SUPPOER_LOCALES = ["en_US", "zh_CN", "zh_TW"];

class GlobalStore {
  constructor() {

  };

  @observable localeLanguage = cookie.load('locale');
  @observable currentLocale = SUPPOER_LOCALES.indexOf(this.localeLanguage) > -1 ? this.localeLanguage : 'zh_CN' //'en_US';
  @observable defaultLocale = this.currentLocale;


  //全局缓存对象, 放置科目,参照等信息
  cache = {
    subjectTree: null,
    accSubjectType: [],
    accbookAll: [],
    accBalance: "" //期初余额页面的已选中的账簿
  }

  //设置缓存
  setCache = (key, value) => {
    this.cache[key] = value;
  }

  //获取缓存
  getCache = (key) => {
    return this.cache[key];
  }

  //判断缓存是否存在
  isCache = (key) => {
    return this.cache[key] != undefined;
  }

  //提示信息
  @observable alertMsg = {
    message: '',
    alertVisible: false,
    type: "danger", //"success", "warning", "danger", "info"
    autoClose: false,
  };

  //提示信息
  @observable modelMsg = {
    message: '',
    //bsSize: 'lg',
    modelVisible: false,
    hasCancel: false,
    cancelFn: null,
    sureFn: null
  };

  //提示信息
  @observable fixedMsg = {
    message: '',
    alertVisible: false,
    type: "success", //"success", "warning", "danger", "info"
    autoClose: true,
  };

  @observable showWaiting = {
    show: false,
    text: "加载中..." //getLocalMessage('Loading')
  };

  //用弹窗的方式显示提示信息
  @action showModel(msg) {
    this.modelMsg = Object.assign(this.modelMsg, {
      message: msg,
      modelVisible: true,
      hasCancel: false,
      cancelFn: null,
      sureFn: null
    });
  }

  //用弹窗的方式显示提示信息
  @action showCancelModel(msg, cancelFn, sureFn, cancelBtnText, sureBtnText, title) {
    this.modelMsg = Object.assign(this.modelMsg, {
      message: msg,
      modelVisible: true,
      hasCancel: true,
      cancelFn: cancelFn,
      sureFn: sureFn,
      cancelBtnText: cancelBtnText || getLocalMessage('Cancel'), //"取消",
      sureBtnText: sureBtnText || getLocalMessage('CONFIRM'), //"确认",
      title: title || getLocalMessage('TIPS'), //"提示"
    });
  }

  @action resetModelMsg() {
    this.modelMsg = {
      message: '',
      //bsSize: 'lg',
      modelVisible: false,
      hasCancel: false,
      cancelFn: null,
      sureFn: null
    }
  };

  /**
   * 标准化 提示窗
   * @chenliw 2017-10-10 重构
   * @param msg   消息集合
   * @param bsSize  参考https://react-bootstrap.github.io/components.html#overlays
   * @param cancelFn  如有 取消函数 ,则有取消按钮
   * @param sureFn  确认函数
   * @param timerFn  是否定时关闭，默认是三秒后定时关闭
   * 按需进行扩展 ，原则上不对之前的代码进行修改
   *
   * * 原来的默认3秒关闭的写法是错的，修改代码默认三秒关闭——liuyyg
   */

  @action showTipsModal(msg, bsSize, cancelFn, sureFn, timerFn) {
    this.modelMsg = Object.assign(this.modelMsg, {
      message: msg,
      bsSize: bsSize,
      modelVisible: true,
      hasCancel: typeof cancelFn == "function",
      cancelFn: cancelFn,
      sureFn: sureFn
    });
    //3秒自动关闭
    if (timerFn) {
      setTimeout(() => {
        this.modelMsg = Object.assign(this.modelMsg, {
          message: '',
          //bsSize: 'lg',
          modelVisible: false,
          hasCancel: false,
          cancelFn: null,
          sureFn: null
        });
      }, 3000);
    }
  }

  //显示普通提示信息
  @action showInfo(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'success',
      autoClose: true,
      alertVisible: true
    });
    if (this.alertMsg.autoClose) {
      setTimeout(() => {
        this.alertMsg = Object.assign(this.alertMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }

  // 显示普通提示信息
  @action showWarning(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'info',
      autoClose: true,
      alertVisible: true
    });
    if (this.alertMsg.autoClose) {
      setTimeout(() => {
        this.alertMsg = Object.assign(this.alertMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }

  //显示错误提示信息
  @action showError(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'danger',
      autoClose: false,
      alertVisible: true
    });
  }

  //隐藏提示信息
  @action hideAlert() {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: '',
      alertVisible: false
    });
  }

  //显示不被路由删除的信息
  @action showFixed(msg) {
    this.fixedMsg = Object.assign(this.fixedMsg, {
      message: msg,
      alertVisible: true
    });
    if (this.fixedMsg.autoClose) {
      setTimeout(() => {
        this.fixedMsg = Object.assign(this.fixedMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }

  //隐藏不被路由删除的信息
  @action hideFixed() {
    this.fixedMsg = Object.assign(this.fixedMsg, {
      message: '',
      alertVisible: false
    });
  }

  //显示等待遮罩
  @action showWait() {
    this.showWaiting = Object.assign(this.showWaiting, {
      show: true
    });
    //超时自动关闭
    // setTimeout(() => {
    //     this.showWaiting = Object.assign(this.showWaiting, {show:false});
    // }, 20000);
  }

  //隐藏等待遮罩
  @action hideWait() {
    this.showWaiting = Object.assign(this.showWaiting, {
      show: false
    });
  }

  @action setDiworkLocal(callback) {
    window.jDiwork.getContext((context) => {
      // context = {"tenantid":"s0bsxnz9","userid":"53183563-d0dd-42a1-bdc0-ff5c301d127c","theme":"","username":"","locale":"en_US","timezone":"","appcode":"diwork","profile":"daily","multilist":"[{\"default\":true,\"dislpayName\":\"简体中文\",\"enabled\":true,\"id\":\"bcccef5e-d4c8-46a5-9229-106510e1a6eb\",\"langCode\":\"zh_CN\",\"langSequence\":1},{\"default\":false,\"dislpayName\":\"English\",\"enabled\":true,\"id\":\"a96b502b-8632-45ac-815e-f23982e66888\",\"langCode\":\"en_US\",\"langSequence\":2},{\"default\":false,\"dislpayName\":\"繁体中文\",\"enabled\":true,\"id\":\"9a71e5c1-7321-4580-8cba-65def8064733\",\"langCode\":\"zh_TW\",\"langSequence\":3}]"}
      if (context) {
        const {
          locale,
          multilist
        } = context;
        this.currentLocale = SUPPOER_LOCALES.indexOf(locale) > -1 ? locale : 'zh_CN';
        try {
          let multilistArr = JSON.parse(multilist);
          if (multilistArr.length > 0) {
            let defaultLanguage = multilistArr.find((val, index) => {
              if (val.enabled === true && val.default === true) {
                return true;
              }
              return false;
            });
            if (defaultLanguage && defaultLanguage.langCode) {
              this.defaultLocale = defaultLanguage.langCode;
            } else {
              this.defaultLocale = this.currentLocale
            }
          } else {
            this.defaultLocale = this.currentLocale
          }
        } catch (e) {
          this.defaultLocale = this.currentLocale
        }
      }
      localStorage.setItem('enableLanguage', true);
      localStorage.setItem('defaultLocale', this.defaultLocale);
      localStorage.setItem('currentLocale', this.currentLocale);
      if (typeof callback === 'function') {
        callback(this.currentLocale);
      }
    });
  }

  @observable currentLocaleMapping = [];
  // 查询租户支持的语种列表
  @action getLanguageMapping() {
    let that = this;
    $.ajax({
      type: "POST",
      url: Config.language.findTenantSupportLanguage,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: data => {
        if (Number(data.code) == 0) {
          if (data.data) {
            that.currentLocaleMapping = Object.assign(data.data.map((item, index) => {
              return {
                number: item.id,
                label: item.dislpayName,
                lang: item.langCode
              }
            }));
          }
          localStorage.setItem('currentLocaleMapping', JSON.stringify(that.currentLocaleMapping));
        } else {
          // data = {
          //   "code": "0",
          //   "information": null,
          //   "msg": null,
          //   "detailMsg": null,
          //   "data": [
          //     {
          //       "id": "1",
          //       "dislpayName": "简体中文",
          //       "langCode": "zh_CN",
          //       "langSequence": 0,
          //       "default": true,
          //       "enabled": true
          //     },
          //     {
          //       "id": "2",
          //       "dislpayName": "英文",
          //       "langCode": "en_US",
          //       "langSequence": 1,
          //       "default": false,
          //       "enabled": true
          //     },
          //     {
          //       "id": "3",
          //       "dislpayName": "繁体中文",
          //       "langCode": "zh_TW",
          //       "langSequence": 2,
          //       "default": false,
          //       "enabled": true
          //     }
          //   ]
          // }
          // that.currentLocaleMapping = Object.assign(data.data);
          localStorage.setItem('currentLocaleMapping', JSON.stringify(that.currentLocaleMapping));
        }
      },
      error: (xhr, status, err) => {
        localStorage.setItem('currentLocaleMapping', JSON.stringify(that.currentLocaleMapping));
      }
    });
  }

  // 查询平台支持的语种列表
  @observable platFormSupportLanguage = [];
  @action findPlatFormSupportLanguage() {
    let that = this;
    $.ajax({
      type: "POST",
      url: Config.language.findPlatFormSupportLanguage,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: data => {
        if (Number(data.code) == 0) {
          that.platFormSupportLanguage = Object.assign([], data.data);
        }
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  }

  //查询当前用户使用的语种列表
  @observable currentUserLanguage = '';
  @action findCurrentUserLanguage() {
    let that = this;
    $.ajax({
      type: "POST",
      url: Config.language.findCurrentUserLanguage,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        "loginType": "web"
      }),
      success: data => {
        if (Number(data.code) == 0) {
          that.currentUserLanguage = data.data.langCode;
          localStorage.setItem('defaultLocale', data.data.langCode); //当前租户默认语种
          localStorage.setItem('currentLocale', data.data.langCode); //当前租户显示语种 //'en_US'
        }
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  }

  // 更新当前用户的语种信息
  @action updateCurrentUserLanguage() {
    $.ajax({
      type: "POST",
      url: Config.language.updateCurrentUserLanguage,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        "loginType": "web",
        "languageCode": this.currentUserLanguage
      }),
      success: data => {
        if (Number(data.code) == 0) {
          cookie.save('locale', data.data.langCode, {
            path: '/'
          });
        }
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  }

  @action getLangeName(name, flag) {
    let data = {}
    let currentLocaleMapping = JSON.parse(localStorage.getItem('currentLocaleMapping')) || [];
    let currentLocale = localStorage.getItem('currentLocale')
    let defaultLocale = localStorage.getItem('defaultLocale')
    let local = 'zh_CN'
    if (defaultLocale) {
      local = defaultLocale
    }
    if (currentLocale) {
      local = currentLocale
    }
    currentLocaleMapping.forEach((item) => {
      if (item.lang === local) {
        data = item
      }
    });
    if (data.number == 1) {
      data.name = name
    } else {
      data.name = name + data.number.toString()
    }
    if (flag) {
      return data.name
    }
    return data;
  }

  @action getDefaultLangeName(name, flag) {
    let data = {}
    let currentLocaleMapping = JSON.parse(localStorage.getItem('currentLocaleMapping')) || [];
    let defaultLocale = localStorage.getItem('defaultLocale')
    let local = 'zh_CN'
    if (defaultLocale) {
      local = defaultLocale
    }
    currentLocaleMapping.forEach((item) => {
      if (item.lang === local) {
        data = item
      }
    });
    if (data.number == 1) {
      data.name = name
    } else {
      data.name = name + data.number.toString()
    }
    if (flag) {
      return data.name
    }
    return data;
  }

  @observable curEnv = '';

  // 查询当前环境
  @action getcurenv() {
    let that = this;
    $.ajax({
      url: Config.templatePrint.curEnv,
      type: 'GET',
      success: function(data) {
        that.curEnv = data.curenv;
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

  // 根据url设置语言
  @action setLange(lang) {
    if (SUPPOER_LOCALES.indexOf(lang) > -1) {
      localStorage.setItem('currentLocale', lang);
      intl.init({
        currentLocale: lang,
        locales: {
          [lang]: require(`./../locales/${lang}`)
        }
      })
      cookie.save('locale', lang, {
        path: '/'
      });
    }
  }

  // 查询是否启用多语
  @action findSysConfig() {
    $.ajax({
      url: Config.stdreimburse.findSysConfig,
      type: 'POST',
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      data: 'code=EnableMultiLanguage',
      success: function(data) {
        if (Number(data.code) == 0 && (data.information == null || data.information.value == 'false')) {
          localStorage.setItem('enableLanguage', false);
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
}


export default new GlobalStore();
