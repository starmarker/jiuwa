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
Mock.mock("/api/single", single);
Mock.mock("/api/mutepuly", mutepuly);
