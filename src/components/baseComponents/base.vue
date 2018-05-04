<template>
  
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getData(name, obj) {
      return new Promise((resolve, reject) => {
        this.$api({
          name: name,
          params: obj,
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
    }
  }
};
</script>

