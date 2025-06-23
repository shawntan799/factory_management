"use client"

import * as React from "react"
import {
  Building2,
  Users,
  Factory,
  User,
  FolderOpen,
  Construction,
  Settings,
  BarChart3,
  DollarSign,
  FileText,
  Truck,
  Search,
  Package,
  Wrench,
  GlassWaterIcon as Glass,
  Hammer,
  Phone,
  History,
  Info,
  Calendar,
  TrendingUp,
  ShoppingCart,
  UserCheck,
  Boxes,
  ClipboardList,
  Route,
  Database,
  ChevronRight,
  Home,
  Calculator,
  CreditCard,
  Receipt,
  MoreHorizontal,
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wallet,
  XCircle,
  PieChart,
  ArrowUpDown,
  Scale,
  Plus,
  Edit,
  Trash2,
  Mail,
  MapPin,
  Briefcase,
  Filter,
  HardHat,
  FolderKanban,
  ListTodo,
  FolderPlus,
  AlertTriangle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AddEmployeeModal } from "@/components/AddEmployeeModal"

// 导入客户管理组件
import CustomerBasicInfo from "@/components/customer/CustomerBasicInfo"
import CustomerContacts from "@/components/customer/CustomerContacts"
import CustomerTransactions from "@/components/customer/CustomerTransactions"

// 导入供应商管理组件
import SupplierBasicInfo from "@/components/supplier/SupplierBasicInfo"
import MaterialPriceList from "@/components/supplier/MaterialPriceList"

// 导入物料管理组件
import MaterialList from "@/components/material/MaterialList"
import ShipmentList from "@/components/material/ShipmentList"
import LogisticsTracking from "@/components/material/LogisticsTracking"
import ProcessingQuantity from "@/components/material/ProcessingQuantity"
import DataQuery from "@/components/material/DataQuery"
import ProjectList from "@/components/project/ProjectList"
import ProjectCreate from "@/components/project/ProjectCreate"
import MaterialCost from "@/components/material/MaterialCost"
import LaborCost from "@/components/material/LaborCost"
import CostAlert from "@/components/material/CostAlert"
import "gantt-task-react/dist/index.css"

const navigationData = [
  {
    title: "基础信息管理",
    icon: FolderOpen,
    items: [
      {
        title: "客户管理",
        icon: Users,
        items: [
          { title: "客户名称", icon: User },
          { title: "联系方式", icon: Phone },
          { title: "历史交易记录", icon: History },
        ],
      },
      {
        title: "供应商管理",
        icon: Factory,
        items: [
          { title: "供应商信息", icon: Info },
          { title: "合作材料及价格", icon: DollarSign },
        ],
      },
      {
        title: "人员管理",
        icon: User,
        items: [
          { title: "员工管理", icon: Users },
        ],
      },
    ],
  },
  {
    title: "工程施工管理",
    icon: HardHat,
    items: [
      {
        title: "项目管理",
        icon: FolderKanban,
        items: [
          { title: "项目列表", icon: ListTodo },
          { title: "项目创建", icon: FolderPlus },
        ],
      },
      {
        title: "成本管理",
        icon: DollarSign,
        items: [
          { title: "材料成本", icon: Package },
          { title: "人工成本", icon: Users },
          { title: "成本预警", icon: AlertTriangle },
        ],
      },
    ],
  },
  {
    title: "来料加工管理",
    icon: Package,
    items: [
      {
        title: "物料加工清单",
        icon: ClipboardList,
        items: [
          { title: "物料列表", icon: ClipboardList },
          { title: "加工数量", icon: Calculator },
        ],
      },
      {
        title: "出货管理",
        icon: Truck,
        items: [
          { title: "出货清单", icon: ClipboardList },
          { title: "运输管理", icon: Route },
        ],
      },
      {
        title: "数据查询",
        icon: Search,
        items: [
          { title: "综合查询", icon: Filter },
        ],
      },
    ],
  },
  {
    title: "数据分析系统",
    icon: BarChart3,
    items: [
      {
        title: "成本核算",
        icon: Calculator,
        items: [
          { title: "材料成本", icon: Package },
          { title: "人工成本", icon: Users },
          { title: "税费成本", icon: Receipt },
          { title: "其他成本", icon: MoreHorizontal },
        ],
      },
      {
        title: "结算管理",
        icon: CreditCard,
        items: [
          { title: "结算单", icon: FileText },
          {
            title: "标记结算状态",
            icon: CheckCircle,
            items: [
              { title: "已结清", icon: CheckCircle2 },
              { title: "未结账", icon: Clock },
              { title: "部分结算", icon: AlertCircle },
            ],
          },
          {
            title: "收款记录",
            icon: Wallet,
            items: [
              { title: "已收款", icon: CheckCircle2 },
              { title: "未收款", icon: XCircle },
            ],
          },
        ],
      },
      {
        title: "财务报表",
        icon: PieChart,
        items: [
          { title: "利润表", icon: TrendingUp },
          { title: "现金流量表", icon: ArrowUpDown },
          { title: "资产负债表", icon: Scale },
        ],
      },
      {
        title: "产值统计",
        icon: Calendar,
        items: [
          { title: "自动汇总", icon: Calculator },
          { title: "产品加工", icon: Package },
          { title: "工程施工", icon: Construction },
        ],
      },
    ],
  },
]

// 初始员工数据
const initialEmployeeData = [
  {
    id: 1,
    name: "张三",
    employeeId: "EMP001",
    phone: "13800138000",
    email: "zhangsan@company.com",
    department: "工程部",
    position: "施工员",
    role: "EMPLOYEE",
    status: "在职",
    joinDate: "2023-01-15",
    salary: 8000,
    address: "北京市朝阳区",
  },
  {
    id: 2,
    name: "李四",
    employeeId: "EMP002",
    phone: "13800138001",
    email: "lisi@company.com",
    department: "生产部",
    position: "技术员",
    role: "EMPLOYEE",
    status: "在职",
    joinDate: "2023-03-20",
    salary: 7500,
    address: "北京市海淀区",
  },
  {
    id: 3,
    name: "王五",
    employeeId: "EMP003",
    phone: "13800138002",
    email: "wangwu@company.com",
    department: "工程部",
    position: "安全员",
    role: "EMPLOYEE",
    status: "在职",
    joinDate: "2023-06-10",
    salary: 7000,
    address: "北京市丰台区",
  },
  {
    id: 4,
    name: "赵六",
    employeeId: "EMP004",
    phone: "13800138003",
    email: "zhaoliu@company.com",
    department: "生产部",
    position: "质检员",
    role: "EMPLOYEE",
    status: "离职",
    joinDate: "2022-09-01",
    salary: 6500,
    address: "北京市西城区",
  },
]

const renderPageContent = (
  activeItem: string, 
  employeeData: any[], 
  onAddEmployee: (employee: any) => void, 
  onShowAddModal: () => void,
  onToggleStatus: (id: number) => void,
  onEditEmployee: (employee: any) => void,
  onDeleteEmployee: (id: number) => void,
) => {
  switch (activeItem) {
    case "员工管理":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">员工管理</h1>
            <button 
              onClick={onShowAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              新增员工
            </button>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">总员工数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{employeeData.length}</div>
                <p className="text-xs text-gray-600">较上月 +2</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">在职员工</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {employeeData.filter(emp => emp.status === "在职").length}
                </div>
                <p className="text-xs text-gray-600">
                  在职率 {((employeeData.filter(emp => emp.status === "在职").length / employeeData.length) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">本月新增</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-gray-600">新入职员工</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">平均薪资</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  ¥{(employeeData.reduce((sum, emp) => sum + emp.salary, 0) / employeeData.length).toFixed(0)}
                </div>
                <p className="text-xs text-gray-600">月平均工资</p>
              </CardContent>
            </Card>
          </div>

          {/* 员工列表 */}
          <Card>
            <CardHeader>
              <CardTitle>员工列表</CardTitle>
              <CardDescription>管理所有员工信息，包括基本信息、联系方式、部门职位等</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-gray-600">工号：{employee.employeeId}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Briefcase className="h-3 w-3" />
                            {employee.department} - {employee.position}
                    </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Mail className="h-3 w-3" />
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={employee.status === "在职" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => onToggleStatus(employee.id)}
                      >
                        {employee.status}
                      </Badge>
                      <div className="flex gap-1">
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600"
                          onClick={() => onEditEmployee(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600"
                          onClick={() => onDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 部门分布 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>部门分布</CardTitle>
                <CardDescription>各部门员工数量统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(() => {
                    const deptStats = employeeData.reduce((acc, emp) => {
                      acc[emp.department] = (acc[emp.department] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                    
                    return Object.entries(deptStats).map(([dept, count], index) => {
                      const percentage = ((count as number / employeeData.length) * 100).toFixed(1)
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500']
                      return (
                        <div key={dept} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 ${colors[index % colors.length]} rounded-full`}></div>
                            <span className="text-sm">{dept}</span>
                    </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{(count as number).toString()}人</p>
                            <p className="text-xs text-gray-600">{percentage}%</p>
          </div>
        </div>
      )
                    })
                  })()}
                </div>
              </CardContent>
            </Card>

          <Card>
            <CardHeader>
                <CardTitle>薪资分布</CardTitle>
                <CardDescription>员工薪资水平统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">8000-10000元</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ 
                            width: `${(employeeData.filter(emp => emp.salary >= 8000 && emp.salary <= 10000).length / employeeData.length) * 100}%` 
                          }}
                        ></div>
                    </div>
                      <span className="text-xs text-gray-600">
                        {((employeeData.filter(emp => emp.salary >= 8000 && emp.salary <= 10000).length / employeeData.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">6000-8000元</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ 
                            width: `${(employeeData.filter(emp => emp.salary >= 6000 && emp.salary < 8000).length / employeeData.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {((employeeData.filter(emp => emp.salary >= 6000 && emp.salary < 8000).length / employeeData.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">4000-6000元</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ 
                            width: `${(employeeData.filter(emp => emp.salary >= 4000 && emp.salary < 6000).length / employeeData.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {((employeeData.filter(emp => emp.salary >= 4000 && emp.salary < 6000).length / employeeData.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      )

    case "客户名称":
      return <CustomerBasicInfo />
    
    case "联系方式":
      return <CustomerContacts />
    
    case "历史交易记录":
      return <CustomerTransactions />
    
    case "供应商信息":
      return <SupplierBasicInfo />
    
    case "合作材料及价格":
      return <MaterialPriceList />

    case "项目列表":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">项目列表</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>工程项目列表</CardTitle>
              <CardDescription>查看和管理所有工程项目</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList />
            </CardContent>
          </Card>
        </div>
      )

    case "项目创建":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">创建项目</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>新建工程项目</CardTitle>
              <CardDescription>创建新的工程项目并设置基本信息</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectCreate />
            </CardContent>
          </Card>
        </div>
      )

    case "材料成本":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">材料成本管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>材料采购成本</CardTitle>
              <CardDescription>管理和跟踪材料采购成本</CardDescription>
            </CardHeader>
            <CardContent>
              <MaterialCost />
            </CardContent>
          </Card>
        </div>
      )

    case "人工成本":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">人工成本管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>人工和辅材成本</CardTitle>
              <CardDescription>管理人工和辅材成本支出</CardDescription>
            </CardHeader>
            <CardContent>
              <LaborCost />
            </CardContent>
          </Card>
        </div>
      )

    case "成本预警":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">成本预警设置</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>成本预警管理</CardTitle>
              <CardDescription>设置和管理成本预警规则</CardDescription>
            </CardHeader>
            <CardContent>
              <CostAlert />
            </CardContent>
          </Card>
        </div>
      )

    case "结算单":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">结算单管理</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ 新建结算单</button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>结算单列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "JS2024001",
                    project: "CBD写字楼幕墙",
                    amount: "¥2,350,000",
                    status: "已结清",
                    date: "2024-01-15",
                  },
                  {
                    id: "JS2024002",
                    project: "住宅小区门窗",
                    amount: "¥1,680,000",
                    status: "部分结算",
                    date: "2024-02-20",
                  },
                  {
                    id: "JS2024003",
                    project: "商业综合体",
                    amount: "¥3,200,000",
                    status: "未结账",
                    date: "2024-03-10",
                  },
                ].map((settlement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{settlement.id}</h3>
                      <p className="text-sm text-gray-600">{settlement.project}</p>
                      <p className="text-xs text-gray-500">{settlement.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{settlement.amount}</p>
                      <Badge
                        variant={
                          settlement.status === "已结清"
                            ? "default"
                            : settlement.status === "部分结算"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {settlement.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )

    case "利润表":
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">利润表</h1>
          <Card>
            <CardHeader>
              <CardTitle>2024年度利润表</CardTitle>
              <CardDescription>单位：人民币元</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">营业收入</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>主营业务收入</span>
                        <span>28,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>其他业务收入</span>
                        <span>800,000</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>营业收入合计</span>
                        <span>29,000,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">营业成本</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>材料成本</span>
                        <span>18,850,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>人工成本</span>
                        <span>6,120,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>其他成本</span>
                        <span>1,030,000</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>营业成本合计</span>
                        <span>26,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>净利润</span>
                  <span className="text-green-600">3,000,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )

    case "自动汇总":
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">产值自动汇总</h1>

          {/* 总产值概览 */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>年度总产值</CardTitle>
                <CardDescription>2024年累计产值</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">¥32,580,000</div>
                <p className="text-sm text-gray-600">较去年同期 +18.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>产品加工产值</CardTitle>
                <CardDescription>加工业务产值</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">¥18,350,000</div>
                <p className="text-sm text-gray-600">占总产值 56.3%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>工程施工产值</CardTitle>
                <CardDescription>施工业务产值</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">¥14,230,000</div>
                <p className="text-sm text-gray-600">占总产值 43.7%</p>
              </CardContent>
            </Card>
          </div>

          {/* 月度产值趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>月度产值趋势</CardTitle>
              <CardDescription>2024年各月产值对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: "1月", total: 2350000, processing: 1350000, construction: 1000000 },
                  { month: "2月", total: 2680000, processing: 1580000, construction: 1100000 },
                  { month: "3月", total: 3200000, processing: 1800000, construction: 1400000 },
                  { month: "4月", total: 2890000, processing: 1690000, construction: 1200000 },
                  { month: "5月", total: 3150000, processing: 1850000, construction: 1300000 },
                  { month: "6月", total: 3380000, processing: 1980000, construction: 1400000 },
                ].map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="font-medium w-12">{data.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">加工: ¥{(data.processing / 10000).toFixed(0)}万</span>
                        <span className="text-orange-600">施工: ¥{(data.construction / 10000).toFixed(0)}万</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">¥{(data.total / 10000).toFixed(0)}万</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 季度产值对比 */}
          <Card>
            <CardHeader>
              <CardTitle>季度产值对比</CardTitle>
              <CardDescription>2024年各季度产值统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { quarter: "Q1", total: 8230000, growth: "+15.2%" },
                  { quarter: "Q2", total: 9420000, growth: "+14.5%" },
                  { quarter: "Q3", total: 8950000, growth: "-5.0%" },
                  { quarter: "Q4", total: 5980000, growth: "预测" },
                ].map((data, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <h3 className="font-medium text-lg">{data.quarter}</h3>
                    <p className="text-2xl font-bold text-blue-600">¥{(data.total / 10000).toFixed(0)}万</p>
                    <p
                      className={`text-sm ${data.growth === "预测" ? "text-gray-500" : data.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {data.growth}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )

    case "产品加工":
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">产品加工产值统计</h1>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">本月加工产值</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">¥1,980,000</div>
                <p className="text-xs text-gray-600">+12% 较上月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">加工订单数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">本月完成</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">平均订单价值</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥12,692</div>
                <p className="text-xs text-gray-600">单笔订单</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">加工效率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-gray-600">按时完成率</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>产品加工分类统计</CardTitle>
              <CardDescription>各类产品加工产值分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "铝合金门窗", orders: 68, value: 850000, percentage: 42.9 },
                  { category: "幕墙系统", orders: 32, value: 680000, percentage: 34.3 },
                  { category: "钢结构件", orders: 28, value: 280000, percentage: 14.1 },
                  { category: "装饰构件", orders: 28, value: 170000, percentage: 8.6 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{item.category}</h3>
                      <p className="text-sm text-gray-600">{item.orders} 个订单</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">¥{(item.value / 10000).toFixed(1)}万</p>
                      <p className="text-sm text-gray-600">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )

    case "工程施工":
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">工程施工产值统计</h1>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">本月施工产值</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">¥1,400,000</div>
                <p className="text-xs text-gray-600">+8% 较上月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">在建项目</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-600">个项目</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">完工项目</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-600">本月完成</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">施工进度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.3%</div>
                <p className="text-xs text-gray-600">平均进度</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>重点工程项目</CardTitle>
                <CardDescription>高产值施工项目</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "CBD商业综合体", value: 3200000, progress: 75, status: "进行中" },
                    { name: "高端住宅小区", value: 2800000, progress: 90, status: "即将完工" },
                    { name: "办公楼幕墙工程", value: 2350000, progress: 100, status: "已完工" },
                    { name: "酒店装修工程", value: 1950000, progress: 45, status: "进行中" },
                  ].map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{project.name}</h3>
                        <Badge
                          variant={
                            project.status === "已完工"
                              ? "default"
                              : project.status === "即将完工"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">产值: ¥{(project.value / 10000).toFixed(0)}万</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>施工类型分布</CardTitle>
                <CardDescription>不同施工类型产值占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "幕墙安装", value: 5800000, percentage: 40.7 },
                    { type: "门窗安装", value: 4200000, percentage: 29.5 },
                    { type: "钢结构施工", value: 2800000, percentage: 19.7 },
                    { type: "装饰装修", value: 1430000, percentage: 10.0 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            index === 0
                              ? "bg-orange-500"
                              : index === 1
                                ? "bg-blue-500"
                                : index === 2
                                  ? "bg-green-500"
                                  : "bg-purple-500"
                          }`}
                        ></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">¥{(item.value / 10000).toFixed(0)}万</p>
                        <p className="text-xs text-gray-600">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )

    case "物料列表":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">物料列表管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>物料列表</CardTitle>
              <CardDescription>管理所有物料信息</CardDescription>
            </CardHeader>
            <CardContent>
              <MaterialList />
            </CardContent>
          </Card>
        </div>
      )

    case "出货清单":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">出货清单管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>出货记录</CardTitle>
              <CardDescription>查看所有出货记录</CardDescription>
            </CardHeader>
            <CardContent>
              <ShipmentList />
            </CardContent>
          </Card>
        </div>
      )

    case "运输管理":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">运输管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>运输记录</CardTitle>
              <CardDescription>查看所有运输记录</CardDescription>
            </CardHeader>
            <CardContent>
              <LogisticsTracking />
            </CardContent>
          </Card>
        </div>
      )

    case "加工数量":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">加工数量管理</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>加工数量</CardTitle>
              <CardDescription>管理物料加工数量信息</CardDescription>
            </CardHeader>
            <CardContent>
              <ProcessingQuantity />
            </CardContent>
          </Card>
        </div>
      )

    case "综合查询":
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">综合数据查询</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>多条件查询</CardTitle>
              <CardDescription>按物料类型/客户名称/时间范围查询</CardDescription>
            </CardHeader>
            <CardContent>
              <DataQuery />
            </CardContent>
          </Card>
        </div>
      )

    default:
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">功能开发中</h1>
          <Card>
            <CardHeader>
              <CardTitle>{activeItem}</CardTitle>
              <CardDescription>该功能正在开发中，敬请期待</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">我们正在为您开发 "{activeItem}" 功能，请稍后再试。</p>
            </CardContent>
          </Card>
        </div>
      )
  }
}

export default function ProductionManagementSystem() {
  const [activeItem, setActiveItem] = React.useState("客户名称")
  const [employeeData, setEmployeeData] = React.useState(initialEmployeeData)
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null)

  const handleAddEmployee = (employee: any) => {
    setEmployeeData([...employeeData, employee])
  }

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  // 处理员工状态切换
  const handleToggleStatus = (employeeId: number) => {
    setEmployeeData(employeeData.map(emp => {
      if (emp.id === employeeId) {
        return {
          ...emp,
          status: emp.status === "在职" ? "离职" : "在职"
        }
      }
      return emp
    }))
  }

  // 处理编辑员工
  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee)
    setShowEditModal(true)
  }

  // 处理更新员工信息
  const handleUpdateEmployee = (updatedEmployee: any) => {
    setEmployeeData(employeeData.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ))
    setShowEditModal(false)
    setSelectedEmployee(null)
  }

  // 处理删除员工
  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm("确定要删除该员工吗？")) {
      setEmployeeData(employeeData.filter(emp => emp.id !== employeeId))
    }
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-60 bg-[#F5F7FA]">
        <SidebarHeader className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Construction className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">生产施工管理系统</span>
              <span className="text-xs text-gray-500">v1.0.0 开发者 谭昭阳</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2">
          {navigationData.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel className="text-xs font-medium text-gray-600 px-2 py-1">
                <section.icon className="h-4 w-4 mr-2" />
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between hover:bg-white/50">
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <ChevronRight className="h-3 w-3 transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                {subItem.items && subItem.items.length > 0 ? (
                                  <Collapsible>
                                    <CollapsibleTrigger asChild>
                                      <SidebarMenuSubButton className="w-full justify-between">
                                        <div className="flex items-center gap-2">
                                          <subItem.icon className="h-3 w-3" />
                                          <span className="text-xs">{subItem.title}</span>
                                        </div>
                                        <ChevronRight className="h-2 w-2 transition-transform group-data-[state=open]:rotate-90" />
                                      </SidebarMenuSubButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <div className="ml-4 space-y-1">
                                        {subItem.items.map((thirdLevelItem) => (
                                          <SidebarMenuSubButton
                                            key={thirdLevelItem.title}
                                            onClick={() => setActiveItem(thirdLevelItem.title)}
                                            className={`w-full text-xs ${
                                              activeItem === thirdLevelItem.title
                                                ? "bg-blue-100 text-blue-700"
                                                : "hover:bg-white/50"
                                            }`}
                                          >
                                            <thirdLevelItem.icon className="h-3 w-3 mr-2" />
                                            {thirdLevelItem.title}
                                          </SidebarMenuSubButton>
                                        ))}
                                      </div>
                                    </CollapsibleContent>
                                  </Collapsible>
                                ) : (
                                  <SidebarMenuSubButton
                                    onClick={() => setActiveItem(subItem.title)}
                                    className={`w-full ${
                                      activeItem === subItem.title ? "bg-blue-100 text-blue-700" : "hover:bg-white/50"
                                    }`}
                                  >
                                    <subItem.icon className="h-3 w-3 mr-2" />
                                    <span className="text-xs">{subItem.title}</span>
                                  </SidebarMenuSubButton>
                                )}
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">/</span>
            <span className="text-sm font-medium">{activeItem}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              在线
            </Badge>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6 bg-gray-50">{renderPageContent(activeItem, employeeData, handleAddEmployee, handleShowAddModal, handleToggleStatus, handleEditEmployee, handleDeleteEmployee)}</div>
      </SidebarInset>

      {/* 新增员工弹窗 */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onAdd={handleAddEmployee}
      />

      {/* 编辑员工弹窗 */}
      {selectedEmployee && (
        <AddEmployeeModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedEmployee(null)
          }}
          onAdd={handleUpdateEmployee}
          initialData={selectedEmployee}
          isEdit={true}
        />
      )}
    </SidebarProvider>
  )
}
