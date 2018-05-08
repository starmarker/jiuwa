const Mock = require("mockjs");
Mock.Random.extend({
  base: () => {
    return {
      avatar_src: "@dataImage('250x250','照片')",
      match_no: "@integer(1,999)",
      user_token: "@guid()",
      user_nickname: "@cname()",
      user_score: "@integer(1,999)"
    };
  }
});
const single = Mock.Random.base();
const mutepuly = {
  "lists|5": [Mock.Random.base()]
};
const user = {
  user_token: "@guid()",
  user_nickname: "@cname()",
  "is_ther|0-1": false,
  "is_singed|0-1": true,
  "is_getpet|1-2": false,
  user_tel: /^1[385][1-9]\d{8}/,
  avatar_src: "@dataImage('250x250','照片')"
};
const rank = {
  "aicao|20": [Mock.Random.base()],
  "jiuwa|20": [Mock.Random.base()]
};
Mock.mock("/api/single", single);
Mock.mock("/api/mutepuly", mutepuly);
Mock.mock("/api/getuser", user);
Mock.mock("/api/rank", rank);
