import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Card,
  Carousel,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Form,
  FormItem,
  Button,
  Input,
  Radio,
  Upload,
  Message,
  MessageBox,
  Select,
  Option,
  Pagination,
  Dialog,
  Divider
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Card)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Divider)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
