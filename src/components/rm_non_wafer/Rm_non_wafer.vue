<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="上机标签打印" name="first">
        <el-form :inline="true" class="demo-form-inline" :model="formData">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="formData.startDate"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="formData.endDate"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="formData"
          :rules="rules"
          ref="formData"
        >
          <el-form-item label="到货单编号" prop="entryNumber">
            <el-autocomplete
              class="inline-input"
              v-model="formData.entryNumber"
              :fetch-suggestions="queryEntryNo"
              placeholder="输入或选择"
              @select="handleSelectEntryNo"
              clearable
              @change="handleSelecrEntryChange"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline" :model="formData">
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="printLable">打印</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="dialogVisible = true">单位维护</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="printLableAgain">补打</el-button>
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
          <el-table-column prop="lbl_qty" label="总标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_printed_qty" label="已打印标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_non_printed_qty" label="未打印标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_printing_qty" label="本次打印数量">
            <template slot-scope="scope">
              <el-input size="mini" type="number" v-model="scope.row.lbl_printing_qty"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lbl_print_again_qty" label="补打标签数量">
            <template slot-scope="scope">
              <el-input size="mini" type="number" v-model="scope.row.lbl_print_again_qty"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="维护物料单位数量"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :inline="true"
            class="demo-form-inline"
            :model="formData2"
            :rules="rules"
            ref="formData2"
          >
            <el-form-item label="物料名称" prop="partName">
              <el-input v-model="formData2.partName" placeholder="输入物料名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="料号" prop="partID">
              <el-input v-model="formData2.partID" placeholder="输入料号" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位数量" prop="unitQty">
              <el-input v-model="formData2.unitQty" type="number" placeholder="输入单位数量" clearable></el-input>
            </el-form-item>
          </el-form>

          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setUnitQty">确 定</el-button>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="进料标签打印" name="second">
        <el-form :inline="true" class="demo-form-inline" :model="formData">
          <el-form-item label="开始日期" prop="startDate">
            <el-date-picker
              v-model="formData.startDate"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endDate">
            <el-date-picker
              v-model="formData.endDate"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="formData"
          :rules="rules"
          ref="formData"
        >
          <el-form-item label="采购单编号" prop="poID">
            <el-autocomplete
              class="inline-input"
              v-model="formData3.poID"
              :fetch-suggestions="queryEntryNo"
              placeholder="输入或选择"
              @select="handleSelectEntryNo"
              clearable
              @change="handleSelecrEntryChange"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline" :model="formData">
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="printLable">打印</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="dialogVisible = true">单位维护</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="printLableAgain">补打</el-button>
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
          <el-table-column prop="lbl_qty" label="总标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_printed_qty" label="已打印标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_non_printed_qty" label="未打印标签数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lbl_printing_qty" label="本次打印数量">
            <template slot-scope="scope">
              <el-input size="mini" type="number" v-model="scope.row.lbl_printing_qty"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="lbl_print_again_qty" label="补打标签数量">
            <template slot-scope="scope">
              <el-input size="mini" type="number" v-model="scope.row.lbl_print_again_qty"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="维护物料单位数量"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            :inline="true"
            class="demo-form-inline"
            :model="formData2"
            :rules="rules"
            ref="formData2"
          >
            <el-form-item label="物料名称" prop="partName">
              <el-input v-model="formData2.partName" placeholder="输入物料名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="料号" prop="partID">
              <el-input v-model="formData2.partID" placeholder="输入料号" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位数量" prop="unitQty">
              <el-input v-model="formData2.unitQty" type="number" placeholder="输入单位数量" clearable></el-input>
            </el-form-item>
          </el-form>

          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setUnitQty">确 定</el-button>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          //   return time.getTime() > Date.now() - 100;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      activeName: "first",
      formData: {
        startDate: "",
        endDate: "",
        entryNumber: "",
        entryID: "",
      },
      formData2: {
        partName: "",
        partID: "",
        unitQty: "",
      },
      formData3: {
        htProductID: "",
        poID: "",
        poSubID: "",
      },
      formItemEntryNo: [],
      tableData: [],
      rules: {
        entryNumber: [
          {
            required: true,
            message: "请选择或输入到货单号",
            trigger: "change",
          },
        ],
      },
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    queryEntryNo(queryString, cb) {
      if (
        this.formData.startDate == null ||
        this.formData.startDate == "" ||
        this.formData.endDate == null ||
        this.formData.endDate == ""
      ) {
        return false;
      }

      this.$axios
        .get(this.$Api.globalUrl + "/query_entry_no", {
          params: this.formData,
        })
        .then((res) => {
          let results = [];
          if (res.data.ret_data !== null) {
            for (let i = 0, len = res.data.ret_data.length; i < len; i++) {
              res.data.ret_data[i].value = res.data.ret_data[i].entryNumber;
            }
            this.formItemEntryNo = res.data.ret_data;
            results = queryString
              ? this.formItemEntryNo.filter(this.createFilter(queryString))
              : this.formItemEntryNo;
          }
          cb(results);
        });
    },
    createFilter(queryString, queryArr) {
      return (queryArr) => {
        return (
          queryArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelectEntryNo(item) {
      this.formData.entryID = item.entryID;
    },
    queryData() {
      this.formData2.partName = "";
      this.formData2.partID = "";
      this.formData2.unitQty = "";
      this.$refs.formData.validate((vallid) => {
        if (vallid) {
          this.getTableData();
        }
      });
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
        row["lbl_printing_qty"] = row["lbl_non_printed_qty"];
        row["entry_no"] = this.formData.entryNumber;
        row["user_name"] = localStorage.getItem("userName");
      });
    },
    getRemoteData() {
      return this.$axios
        .get(this.$Api.globalUrl + "/query_entry_data", {
          params: this.formData,
        })
        .then((res) => {
          if (res.data.ret_code != 200) {
            this.$message({
              message: res.data.ret_desc,
              showClose: true,
              type: "warning",
              duration: 0,
            });

            if (res.data.ret_partid != "") {
              this.dialogVisible = true;
              this.formData2.partName = res.data.ret_part_name;
              this.formData2.partID = res.data.ret_part_no;
            }
            return false;
          }

          this.tableData = res.data.ret_data;
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
    handleSelecrEntryChange() {
      this.tableData = [];
    },
    checkPrintingQty(_selectData) {
      let ret = true;
      let print_total_qty = 0;

      _selectData.forEach((row) => {
        let print_qty = parseInt(row["lbl_printing_qty"]);
        let nonPrintQty = row["lbl_non_printed_qty"];

        if (print_qty > nonPrintQty) {
          this.$alert(
            "打印数量不可大于当前未打印数量，请重新修改打印数量",
            "错误提醒",
            {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: "已取消打印",
                });
              },
            }
          );

          ret = false;
          return false;
        }

        print_total_qty = print_total_qty + print_qty;
      });

      if (ret == false) {
        return ret;
      }

      if (print_total_qty > 200) {
        this.$alert("打印数量不可大于200，请重新修改打印数量", "错误提醒", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: "已取消打印",
            });
          },
        });
        return false;
      }

      return true;
    },

    printLable() {
      const _selectData = this.$refs.multipleTable.selection;

      if (_selectData.length === 0) {
        this.$message({
          message: "请先查询出明细，否则无法打印",
          type: "warning",
          duration: 1000,
        });
        return false;
      }
      //   console.log(_selectData);
      if (this.checkPrintingQty(_selectData)) {
        this.$confirm("是否确定现在打印?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post(this.$Api.globalUrl + "/print_label", _selectData)
              .then((res) => {
                console.log(res);
                if (res.data.ret_code === 200) {
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

                this.queryData();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消打印",
            });
          });
      }
    },
    printLableAgain() {
      const _selectData = this.$refs.multipleTable.selection;
      if (_selectData.length === 0) {
        this.$message({
          message: "请先查询出明细，否则无法打印",
          type: "warning",
          duration: 1000,
        });
        return false;
      }

      //   console.log(_selectData);

      this.$prompt("请输入补打原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          _selectData.forEach((row) => {
            row["print_reason"] = value;
          });

          this.$axios
            .post(this.$Api.globalUrl + "/print_label_again", _selectData)
            .then((res) => {
              console.log(res);
              if (res.data.ret_code === 200) {
                this.$message({
                  message: "补打成功",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消补打",
          });
        });
    },

    setUnitQty() {
      this.$axios
        .post(this.$Api.globalUrl + "/set_unit_qty", this.formData2)
        .then((res) => {
          console.log(res);
          if (res.data.ret_code === 200) {
            this.$message({
              message: "维护成功",
              type: "success",
              duration: 800,
            });
          } else {
            this.$message({
              message: "维护失败",
              type: "error",
              duration: 800,
            });
          }
        });

      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
</style>

