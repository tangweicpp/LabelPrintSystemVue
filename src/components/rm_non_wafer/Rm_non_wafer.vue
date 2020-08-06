<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="上机标签打印" name="first">
        <el-form :inline="true" class="demo-form-inline" :model="formData">
          <el-form-item label="入库单编号" prop="entryNumber">
            <el-input clearable placeholder="请输入内容" v-model="formData.entryNumber"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="printLable">打印</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning">补打</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info">单位用量维护</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="font-size: 10px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="part_no" label="料号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="part_name" label="物料名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lot_id" label="到货批号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="total_qty" label="总数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unit_qty" label="单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_qty" label="标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_printed_qty" label="已打印标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_non_printed_qty" label="未标签数量" show-overflow-tooltip></el-table-column>

          <el-table-column prop="lbl_printing_qty" label="本次打印数量">
            <template slot-scope="scope">
              <el-input size="mini" type="number" v-model="scope.row.lbl_printing_qty"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lbl_printing_qty: "",
      activeName: "first",
      formData: {
        entryNumber: "",
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    let userName = localStorage.getItem("userName");
    if (userName == null || userName == "" || userName == undefined) {
      this.$router.push("/login");
      return false;
    }
  },
  methods: {
    queryData() {
      if (this.formData.entryNumber === "") {
        this.$message({
          message: "请输入查询条件",
          type: "error",
          duration: 500,
        });
        return false;
      }
      this.getTableData();
    },
    async getTableData() {
      try {
        await this.getRemoteData();
      } catch (err) {
        console.log(err);
      }

      this.tableData.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
        row["lbl_qty"] = parseInt(row["lbl_qty"]);
        row["lbl_printed_qty"] = parseInt(row["lbl_printed_qty"]);
        row["lbl_non_printed_qty"] = parseInt(row["lbl_non_printed_qty"]);
        row["lbl_printing_qty"] = row["lbl_qty"];
      });
    },
    getRemoteData() {
      return this.$axios
        .get(this.$Api.globalUrl + "/query_entry_no", {
          params: this.formData,
        })
        .then((res) => {
          this.tableData = res.data.info;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    printLable() {
      const _selectData = this.$refs.multipleTable.selection;
      let printData = { selectData: _selectData };

      console.log(_selectData);
      this.$axios
        .post(this.$Api.globalUrl + "/print_label", _selectData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              message: "打印成功",
              type: "success",
              duration: 800,
            });
          } else {
            this.$message({
              message: "打印失败",
              type: "error",
              duration: 800,
            });
          }
        });
    },
  },
};
</script>

<style scoped>
</style>

