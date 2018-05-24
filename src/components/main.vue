<template>
    <div class="main-body">
        <router-view />
        <global-footer :teacher="is_teacher" :isact="isact"></global-footer>
    </div>
</template>
<script>
import GlobalFooter from "./baseComponents/globalFooter";
import Bus from "../libs/bus.js";
export default {
  name: "mainFrame",
  //   extends: Base,
  components: { GlobalFooter },
  mounted() {
    Bus.$on("isTeacher", is_teacher => {
      this.is_teacher = is_teacher;
      console.log("result :", is_teacher);
    });
    Bus.$on("isSigned", is_teacher => {
      this.isact = is_teacher;
    });
  },
  data() {
    return {
      is_teacher: true,
      isact: true
    };
  }
};
</script>

