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
  avatar_src: "@dataImage('250x250','照片')",
  shop_token: "@guid()",
  shop_name: "@csentence(5,12)"
};
const rank = {
  "aicao|20": [Mock.Random.base()],
  "jiuwa|20": [Mock.Random.base()]
};
const info = {
  pick_score: 40,
  order_score: 900,
  match_no: "@integer(1,999)",
  total_score: 940,
  current_rank: 2,
  less_score: 1920
};
const jiujiu = {
  aicao_number: "@integer(1,999)",
  name: "@cword()",
  status: "3",
  cur_expre: "@integer(100,999)",
  levelup_expre: 999,
  cur_level: 2,
  img_url: "@dataImage('120x240','照片')",
  ill_name: "腹泻"
};
Mock.mock("/api/single", single);
Mock.mock("/api/mutepuly", mutepuly);
Mock.mock("/api/getuser", user);
Mock.mock("/api/rank", rank);
Mock.mock("/api/info", info);
Mock.mock("/api/jiujiu", jiujiu);
