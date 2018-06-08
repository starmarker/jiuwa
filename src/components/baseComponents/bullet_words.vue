<template>
    <div class="bullet-container" style="{height:maxheight+'px'}">
        <div class="lines" v-for="(item1,index1) in lineContent" :key="index1">
            <div class="word" :style="curStyle" v-for="item in item1.list" :key="item.key" @animationend="checkPosition($event,index1,item)" @webkitAnimationEnd="checkPosition($event,index1,item)">{{item.content}}</div>
        </div>
    </div>
</template>
<script>
export default {
  name: "bullet",
  props: {
    lines: {
      type: Number,
      default: 5 //弹幕行数，默认5行
    },
    maxheight: {
      type: Number,
      default: 100 //容器高度比例，默认100%
    },
    speed: {
      type: Number,
      default: 30 //弹幕速度，默认100px/s
    }
  },
  data() {
    return {
      ws_url: "ws://test.z9168.com:7272",
      lineContent: [],
      count: 0,
      words: []
    };
  },
  created() {},
  computed: {
    ws() {
      if (window.WebScoket) {
        return new WebSoceket(this_url);
      } else {
        return null;
      }
    },
    duration() {
      let cwidth = document.body.clientWidth;
      let wordMaxWidth = cwidth * 2;
      return wordMaxWidth / this.speed;
    },
    curStyle() {
      // return { animationDuration: this.duration + "s" };
      return {};
    }
  },
  async mounted() {
    await this.getBullet();
    this.$nextTick(() => {
      let i = 0;
      setInterval(() => {
        if (i > this.words.length - 1) {
          i = 0;
        }
        if (this.words[i]) {
          this.joinWord(this.words[i]);
        }
        i++;
      }, 3000);
    });
    //this.create_link();
  },
  beforeCreate() {},
  // deactivated() {
  //   // this.$destroy(true);
  //   this.lineContent = [];
  // },
  // activeted() {
  //   this.getBullet();
  // },
  created() {
    let arr = [];
    for (let i = 0; i < this.lines; i++) {
      arr.push({
        addable: true,
        list: []
      });
    }
    this.lineContent = arr;
    // console.log("this.lineContent :", this.lineContent);
  },
  methods: {
    getData(name, obj) {
      let activity_token =
        this.activity_token || "263764d167ee33343036fb1510a58503";
      let obj1 = Object.assign({}, obj, {
        activity_token
      });
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj1,
          callback: res => {
            resolve(res);
          },
          errcallback: rej => {
            reject(rej);
          },
          catchcallback: rej => {
            reject(rej);
          }
        });
      });
    },
    create_link() {
      if (this.ws) {
        this.ws.onmessage = message => {
          let data = JSON.parse(message.data);
          let client_id = data.client_id;
          let user_token = this.$login_info().user_token,
            obj = {};
          switch (data.type) {
            case "init":
              obj = {
                type: "bindUser",
                client_id,
                user_token
              };
              this.bindUser(client_id, obj);
          }
        };
      }
    },
    bindUser(client_id, obj) {
      this.ws.send(JSON.stringify(obj));
    },
    checkPosition(e, n, item) {
      //   e.target.removeNode()
      let parent = e.target.parentNode;
      parent.removeChild(e.target);
      let i = this.lineContent[n].list.indexOf(item);
      this.lineContent[n].list.splice(i, 1);
      item = null;
    },
    joinWord(content) {
      if (this.count > this.lineContent.length - 1) {
        this.count = 0;
      }
      let cur = this.lineContent[this.count];
      let key = Symbol();
      let obj = {
        content,
        key
      };
      cur.list.push(obj);
      this.count++;
      //   cur.addable = false;
      //   //   Array.push.call(cur.list, content);
      //   console.log("cur :", cur);
    },
    getBullet() {
      let module_token = this.$api_urls["bullet"];
      this.getData("com_manage", { module_token }).then(res => {
        if (res.data.code == 1 && res.data.data.length > 0) {
          this.words = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bullet-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  .lines {
    width: 100%;
    position: relative;
    min-height: 25px;
    .word {
      display: table;
      position: absolute;
      right: 0;
      box-sizing: border-box;
      color: #ca0e33;
      padding: 3px 8px;
      background-color: rgba(255, 255, 255, 0.3);
      font-size: 16px;
      white-space: nowrap;
      text-overflow: clip;
      animation: mymove 15s;
    }
    @-webkit-keyframes mymove {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-110%);
      }
    }
    @keyframes mymove {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-110%);
      }
    }
  }
}
</style>



