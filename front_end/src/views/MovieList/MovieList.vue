<template>
  <div>
    <v-btn
      color="blue"
      class="ma-5"
      fab
      dark
      @click="showAddMovieForm"
    >
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>

    <el-table
      :data="allMovies"
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
        label="電影名"
      >
      </el-table-column>
      <el-table-column
        prop="director"
        label="導演"
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

    <AddMovie></AddMovie>
    <EditMovie
      :editInfo="editForm"
      :editIndex="editIndex"
    ></EditMovie>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";

export default {
  name: "MovieList",
  data() {
    return {
      editForm: {
        date: "",
        title: "",
        director: "",
        rating: ""
      },
      editIndex: null
    };
  },
  components: { AddMovie, EditMovie },
  methods: {
    ...mapActions(["fetchMovieList", "addMovie", "deleteMovie"]),
    ...mapMutations([
      "set_addMovieFormVisible",
      "set_movieListVisible",
      "set_editMovieVisible"
    ]),

    async handleDelete(movieId) {
      await this.deleteMovie(movieId);
      this.fetchMovieList();
    },
    showAddMovieForm() {
      this.set_movieListVisible(false);
      this.set_addMovieFormVisible(true);
    },
    handleEdit(index, formRow) {
      this.set_editMovieVisible(true);
      this.editForm = Object.assign({}, formRow);
      this.editIndex = index;
    }
  },
  computed: mapGetters(["allMovies"]),
  created() {
    this.fetchMovieList();
  }
};
</script>

<style scoped>
.addMovieBtn {
  margin-bottom: 20px;
  float: left;
}

.el-table {
  height: 100%;
}
</style>
