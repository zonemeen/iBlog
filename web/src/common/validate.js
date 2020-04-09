import reg from "./reg";

//验证手机号码
export const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'));
  } else if (!reg.phone.test(value)) {
    callback(new Error('手机号格式不对'));
  } else {
    callback();
  }
};
export const validateQQEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入QQ邮箱'))
  } else if (!reg.qqEmail.test(value)) {
    callback(new Error('@qq.com'));
  } else {
    callback();
  }
}
//验证电话号码(座机和手机号)
export const validateTell = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'));
  } else if (!reg.tell.test(value) && !reg.phone.test(value)) {
    callback(new Error('电话号码格式不对'));
  } else {
    callback();
  }
};
//验证验证码
export const validateCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'));
  } else {
    callback();
  }
};
//验证身份证号码
export const validateIdCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入身份证号码"));
  } else if (!reg.idNumber.test(value)) {
    callback(new Error("请输入正确的身份证号码"));
  } else {
    callback();
  }
};
//银行卡号验证
export const validateBankCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入账户号码"));
  } else if (!reg.bankCardNumber.test(value)) {
    callback(new Error("账户号码格式错误"));
  } else {
    callback();
  }
};
//银行卡号验证(非必填)
export const validateBankCardNo = (rule, value, callback) => {
  if (value && !reg.bankCardNumber.test(value)) {
    callback(new Error('账户号码格式错误'))
  } else {
    callback()
  }
};
//统一信用代码验证
export const validateUniformCreditCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入统一信用代码"));
  } else if (!reg.uniformCreditCode.test(value)) {
    callback(new Error("统一信用代码格式错误"));
  } else {
    callback();
  }
};
//图片上传验证
export const validateUploadImg = (rule, value, callback) => {
  if (value.length > 0) {
    callback();
  } else {
    callback(new Error());
  }
};
//金额验证
export const validateMoney = (rule, value, callback) => {
  if (!value) {
    callback(new Error("必填"));
    return;
  }
  if (!reg.numberFloatTwo.test(value)) {
    callback(new Error("只能为正数，且最多两位小数"));
    return;
  }
  let str = value.toString();
  let strFl = str.substring(0, str.indexOf("."));
  if (strFl.length >= 2 && strFl.substring(0, 1) == "0") {
    callback(new Error("小数点前二位以上，则首位不能为0"));
    return;
  }
  if (str.length > 12) {
    callback(new Error("最多只能输入12位"));
    return;
  }
  callback();
};
//注册资本验证(非必填)
export const validateMoneyNo = (rule, value, callback) => {
  if (value) {
    if (!reg.numberFloatTwo.test(value)) {
      callback(new Error('只能为正数，且最多两位小数'));
      return
    }
    let str = value.toString();
    let strFl = str.substring(0, str.indexOf('.'));
    if (strFl.length >= 2 && strFl.substring(0, 1) == '0') {
      callback(new Error('小数点前二位以上，则首位不能为0'));
      return
    }
    if (str.length > 12) {
      callback(new Error('最多只能输入12位'));
      return
    }
  }
  callback()
};
//邮箱验证
export const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱"));
  } else if (!reg.email.test(value)) {
    callback(new Error("邮箱格式错误"));
  } else {
    callback();
  }
};
export const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入网址"));
  } else if (!reg.url.test(value)) {
    callback(new Error("以http/https开头的完整正确格式"));
  } else {
    callback();
  }
};
//邮政编码验证(非必填)
export const validateZipCode = (rule, value, callback) => {
  if (value && !reg.vCode6.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
};
//供货标签验证
export const validateTagIds = (rule, value, callback) => {
  if (value && value.length > 15) {
    callback(new Error("最多只能选择15个标签"));
    return
  }
  callback();
};
//公司名称长度验证
export const validateCompanyName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写公司名称'))
  } else if (value.length < 6) {
    callback(new Error('公司名称长度需大于6位'))
  } else {
    callback()
  }
};
//姓名长度验证
export const validateName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写姓名'))
  } else if (value && value.length < 2) {
    callback(new Error('姓名长度需大于2位'))
  } else {
    callback()
  }
};

export const validatePassword = (rele, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('请输入6位以上的密码'))
  } else {
    callback()
  }
};