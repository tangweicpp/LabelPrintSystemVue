// 引入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Home from '../components/home/Home.vue'
import Login from '../components/login/Login.vue'
import Users from '../components/users/Users.vue'
import Po_uploads from '../components/po_uploads/Po_uploads.vue'
import Rm_non_wafer from '../components/rm_non_wafer/Rm_non_wafer.vue'
import Rm_wafer from '../components/rm_wafer/Rm_wafer.vue'


// 在模块化工程中use
Vue.use(VueRouter)

// 实例化
const router = new VueRouter(
  {
    routes: [
      { path: "/", redirect: "/login" },
      { path: "/login", name: "login", component: Login },
      { path: "/users", name: "users", component: Users },
      {
        path: "/home", name: "home", component: Home, children: [
          { path: "/rm_non_wafer", name: "rm_non_wafer", component: Rm_non_wafer },
          { path: "/rm_wafer", name: "rm_wafer", component: Rm_wafer },
        ]
      },
    ]
  }
)

// 导出
export default router