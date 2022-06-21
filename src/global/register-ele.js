// import 'element-plus/lib/theme-chalk/base.css'
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  Link,
  Carousel,
  CarouselItem,
  Image,
  Row,
  Col,
  Card,
  Steps,
  Step,
  Table,
  TableColumn,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Select,
  Option,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Checkbox,
  // Message,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  PageHeader,
  Avatar,
  Upload,
  Dialog,
  Loading,
  Drawer,
  Descriptions,
  DescriptionsItem,
} from 'element-ui'

const components = [
  Button,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  Link,
  Carousel,
  CarouselItem,
  Image,
  Row,
  Col,
  Card,
  Steps,
  Step,
  Table,
  TableColumn,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Select,
  Option,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Checkbox,
  // Message,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  PageHeader,
  Avatar,
  Upload,
  Dialog,
  Loading,
  Drawer,
  Descriptions,
  DescriptionsItem,
]

function install(Vue) {
  components.forEach(component => {
    Vue.use(component)
  })
}

export default {
  install,
}

// export default function (app) {
//   for (const component of components) {
//     app.component(component.name, component)
//   }
// }
