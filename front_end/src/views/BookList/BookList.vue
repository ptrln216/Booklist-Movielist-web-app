<template>
  <div>

    <v-btn
      class="ma-5"
      fab
      dark
      color="blue"
      @click="showAddBookForm"
    >
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>

    <el-table
      :data="allBooks"
      border
      style="width: 100%"
      stripe
      highlight-current-row
      class="mx-5"
    >
      <el-table-column
        prop="date"
        label="添加日期"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="書名"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
      >
      </el-table-column>
      <el-table-column
        prop="rating"
        label="評分"
      >
        <template slot-scope="scope">
          <el-rate
            disabled
            v-model="scope.row.rating"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click='handleEdit(scope.$index, scope.row)'
            size="small"
            icon="el-icon-edit"
          ></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            hideIcon
            title="確認刪除嗎？"
            @onConfirm="handleDelete(scope.row._id)"
          >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <AddBook></AddBook>
    <EditBook
      :editInfo="editForm"
      :editIndex="editIndex"
    ></EditBook>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddBook from "./AddBook";
import EditBook from "./EditBook";

export default {
  name: "BookList",
  data() {
    return {
      editForm: {
        date: "",
        title: "",
        author: "",
        rating: ""
      },
      editIndex: null
    };
  },
  components: { AddBook, EditBook },
  methods: {
    ...mapActions(["fetchBookList", "addBook", "deleteBook"]),
    ...mapMutations([
      "set_addBookFormVisible",
      "set_bookListVisible",
      "set_editBookVisible"
    ]),

    async handleDelete(bookId) {
      await this.deleteBook(bookId);
      this.fetchBookList();
    },
    showAddBookForm() {
      this.set_bookListVisible(false);
      this.set_addBookFormVisible(true);
    },
    handleEdit(index, formRow) {
      this.set_editBookVisible(true);
      this.editForm = Object.assign({}, formRow);
      this.editIndex = index;
    }
  },
  computed: mapGetters(["allBooks"]),
  created() {
    this.fetchBookList();
  }
};
</script>

<style scoped>
.addBookBtn {
  margin-bottom: 20px;
  float: left;
}

.el-table {
  height: 100%;
}
</style>
