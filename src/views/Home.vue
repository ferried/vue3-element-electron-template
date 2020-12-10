<!--
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-12-10 11:21:49
 * @LastEditTime: 2020-12-10 16:32:15
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /nebula-iot-helper/src/views/Home.vue
 * @LICENSE: Apache-2.0
-->
<template>
  <div class="home">
    <el-button type="primary" @click="notifaction()">主要按钮</el-button>
    <br />
    <el-input v-model="filepath" placeholder="输入一个文件把"></el-input>
    <el-button type="primary" @click="readfile()">读取文件内容</el-button>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ fileinfo }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      filepath: "/Users/ferried/server.md",
      fileinfo: null,
    };
  },
  mounted() {},
  methods: {
    notifaction() {
      new window.Notification("这是一条原生通知哦", {
        body: "这是通知内容哦吼吼",
      });
    },
    readfile() {
      const fs = window.require("fs");
      fs.readFile(this.filepath, "utf8", (err, data) => {
        this.fileinfo = data;
      });
    },
  },
};
</script>
