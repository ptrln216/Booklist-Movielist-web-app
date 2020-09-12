<template>
  <div>
    <el-dialog
      title="修改内容"
      :visible="editMovieVisible"
      width="40%"
      @close="cancel"
    >
      <el-form
        :model="editInfo"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item
          label="電影名"
          required
          :rules="{required: true, message: '電影名不能为空', trigger: 'blur'}"
        >
          <el-input v-model="editInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="導演">
          <el-input v-model="editInfo.director"></el-input>
        </el-form-item>
        <el-form-item
          label="添加日期"
          required
          :rules="{required: true, message: '請選擇日期', trigger: 'blur'}"
        >
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="editInfo.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="評分">
          <el-rate
            v-model="editInfo.rating"
            allow-half
          ></el-rate>
        </el-form-item>
        <el-form-item>

          <el-button
            type="primary"
            @click="handleEdit"
          >保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "AddMovie",
  props: ["editInfo", "editIndex"],
  methods: {
    ...mapActions(["fetchMovieList", "addMovie", "updateMovie"]),
    ...mapMutations(["set_editMovieVisible", "set_movieListVisible"]),
    async handleEdit(e) {
      e.preventDefault();
      this.set_editMovieVisible(false);
      this.set_movieListVisible(true);
      await this.updateMovie({
        index: this.editIndex,
        info: this.editInfo
      });
      await this.fetchMovieList();
    },
    cancel() {
      this.set_editMovieVisible(false);
      this.$refs["editForm"].clearValidate();
      this.$refs["editForm"].resetFields();
    }
  },
  computed: mapGetters(["editMovieVisible"])
};
</script>

<style scoped>
</style>