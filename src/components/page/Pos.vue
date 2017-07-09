<template>
  <div calss="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table border :data="tableData" style="width: 100%;">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template scope='scope'>
                  <el-button type="text" size="small" @click="del_Single_Goods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div id="total-div">
              <small>数量：</small> {{ total_Count }}
              <small>金额：</small> {{ total_Money }}元
            </div>
            <div class="btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="del_All_Goods">删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>

          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="17">
        <div class="often-goods">
          <div class="title">热门商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in often_Goods" @click="addOrderList(goods)">
                <span>{{ goods.goodsName }}</span>
                <span class="o-price">{{ goods.price }}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type_0_Goods" @click="addOrderList(goods)">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{ goods.goodsName }}</span>
                      <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type_1_Goods" @click="addOrderList(goods)">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{ goods.goodsName }}</span>
                      <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type_2_Goods" @click="addOrderList(goods)">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{ goods.goodsName }}</span>
                      <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type_3_Goods" @click="addOrderList(goods)">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{ goods.goodsName }}</span>
                      <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'pos',
  data() {
    return {
      tableData: [],
      often_Goods: [],
      type_0_Goods: [],
      type_1_Goods: [],
      type_2_Goods: [],
      type_3_Goods: [],
      total_Count: 0,
      total_Money: 0
    }
  },
  created() {
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response => {
      console.log(response);
      this.often_Goods = response.data;
    })
    .catch(error => {
      alert('网络错误，访问失败！')
      console.log(error);
    });

    axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response => {
      console.log(response);
      this.type_0_Goods = response.data[0];
      this.type_1_Goods = response.data[1];
      this.type_2_Goods = response.data[2];
      this.type_3_Goods = response.data[3];
    })
    .catch(error => {
      alert('网络错误，访问失败！')
      console.log(error);
    })
  },
  // 生命周期钩子函数 | 挂载完成执行
  mounted() {
    // 在页面上返回内容的可视高度
    var orderHeight = document.body.clientHeight;
    // 使用 js 改变元素的样式
    document.getElementById('order-list').style.height = orderHeight + 'px';
  },
  methods: {
    addOrderList(goods) {
      console.log(goods);
      // 先清零
      this.total_Count = 0;
      this.total_Money = 0;
      // 商品是否已经存在于订单列表中
      let is_Have = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          // 存在
          is_Have = true;
        }
      }

      // 根据判断的值写业务逻辑
      if (is_Have) {
        // 存在就添加数量
        let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
        arr[0].count++;
        this._getAll();
      } else {
        // 不存在就添加到数组中
        let new_Goods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        // 向数组的末尾添加一个或更多元素
        this.tableData.push(new_Goods);
        this._getAll();
      }
    },

    //删除单个商品
    del_Single_Goods(goods) {
      this.tableData = this.tableData.filter(b => b.goodsId != goods.goodsId);
      this._getAll();
    },
    // 删除所有商品
    del_All_Goods() {
      this.tableData = [];
      this.total_Count = 0;
      this.total_Money = 0;
    },
    // 模拟结账
    checkout() {
      if (this.total_Count != 0) {
        this.tableData = [];
        this.total_Count = 0;
        this.total_Money = 0;
        this.$message({
          message: '支付成功！',
          type: 'success',
          showClose: true,
          duration: 1000
        });
      } else {
        this.$message({
          message: '请先点餐！',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
      }
    },
    _getAll() {
      // 先清零
      this.total_Count = 0;
      this.total_Money = 0;
      if (this.tableData) {
        // 进行数量 和价格的汇总计算
        this.tableData.forEach(element => {
          this.total_Count += element.count;
          this.total_Money = this.total_Money + (element.price * element.count);
        })
      }
    }
  }
}
</script>

<style scoped>
.pos-order {
  background: #F9FAFC;
  border-right: 1px solid #C0CCDA;
}
#total-div {
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #D3dce6;
}
.btn {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #D3dce6;
  background: #F9FAFC;
  padding: 10px;
  text-align: left;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #E5E9F2;
  padding: 10px;
  margin: 5px;
  background: #fff;
  cursor: pointer;
}
.o-price {
  color: #58B7FF;
}
.goods-type {
  clear: both;
}
.cookList li{
  list-style: none;
  width: 23%;
  border: 1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 16px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
