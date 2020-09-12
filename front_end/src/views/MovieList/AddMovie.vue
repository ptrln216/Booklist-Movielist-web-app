<template>
  <div>
    <el-dialog
      title="添加電影"
      :visible="addMovieFormVisible"
      width="40%"
      @close="cancel"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="電影名"
          prop="movieTitle"
          required
          :rules="{required: true, message: '電影名不能为空', trigger: 'blur'}"
        >
          <el-input v-model="form.movieTitle"></el-input>
        </el-form-item>
        <el-form-item
          label="導演"
          prop="director"
        >
          <el-input v-model="form.director"></el-input>
        </el-form-item>
        <el-form-item
          label="添加日期"
          required
          :rules="{required: true, message: '請選擇日期', trigger: 'blur'}"
        >
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="評分"
          prop="rating"
        >
          <el-rate
            v-model="form.rating"
            allow-half
          ></el-rate>
        </el-form-item>
        <el-form-item>

          <el-button
            type="primary"
            @click="handleCreate"
          >確認</el-button>
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
  data() {
    return {
      form: {
        movieTitle: "",
        director: "",
        date: "",
        rating: null
      }
    };
  },
  methods: {
    ...mapActions(["fetchMovieList", "addMovie"]),
    ...mapMutations(["set_addMovieFormVisible", "set_movieListVisible"]),
    async handleCreate(e) {
      e.preventDefault();
      this.set_addMovieFormVisible(false);
      this.set_movieListVisible(true);
      await this.addMovie(this.form);
      this.fetchMovieList();
    },
    cancel() {
      this.set_addMovieFormVisible(false);
      this.$refs["form"].clearValidate();
      this.$refs["form"].resetFields();
    }
  },
  computed: mapGetters(["addMovieFormVisible"])
};
</script>

<style scoped>
</style>