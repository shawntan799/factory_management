// 客户类型定义
export interface Customer {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// 供应商类型定义
export interface Supplier {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  businessLicense: string
  taxNumber: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// 材料价格类型定义
export interface MaterialPrice {
  id: number
  supplierId: number
  materialName: string
  specification: string
  unit: string
  price: number
  effectiveDate: string
  expiryDate: string
  remark: string
}

// 交易记录类型定义
export interface Transaction {
  id: number
  customerId: number
  orderNumber: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'cancelled'
  description: string
}

// 员工类型定义
export interface Employee {
  id: number
  name: string
  position: string
  phone: string
  email: string
  department: string
  salary: number
  status: 'active' | 'inactive'
  hireDate: string
  createdAt: string
  updatedAt: string
}

// 导航菜单项类型定义
export interface NavigationItem {
  title: string
  icon: React.ComponentType<any>
  items?: NavigationItem[]
}

// 导航数据类型定义
export interface NavigationSection {
  title: string
  icon: React.ComponentType<any>
  items: NavigationItem[]
} 