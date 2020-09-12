<template>
  <div>
    <el-dialog
      title="添加書本"
      :visible="addBookFormVisible"
      width="40%"
      @close="cancel"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="書名"
          prop="bookTitle"
          required
          :rules="{required: true, message: '書名不能为空', trigger: 'blur'}"
        >
          <el-input v-model="form.bookTitle"></el-input>
        </el-form-item>
        <el-form-item
          label="作者"
          prop="author"
        >
          <el-input v-model="form.author"></el-input>
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
  name: "AddBook",
  data() {
    return {
      form: {
        bookTitle: "",
        author: "",
        date: "",
        rating: null
      }
    };
  },
  methods: {
    ...mapActions(["fetchBookList", "addBook"]),
    ...mapMutations(["set_addBookFormVisible", "set_bookListVisible"]),
    async handleCreate(e) {
      e.preventDefault();
      this.set_addBookFormVisible(false);
      this.set_bookListVisible(true);
      await this.addBook(this.form);
      this.fetchBookList();
    },
    cancel() {
      this.set_addBookFormVisible(false);
      this.$refs["form"].clearValidate();
      this.$refs["form"].resetFields();
    }
  },
  computed: mapGetters(["addBookFormVisible"])
};
</script>

<style scoped>
</style>