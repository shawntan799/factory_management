import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Customer } from '@/types'
import { Building2, Plus, Download, Upload, Edit, Trash2, MapPin } from 'lucide-react'
import * as XLSX from 'xlsx'
import CustomerModal from './CustomerModal'

// 模拟初始数据
const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "华润置地",
    contactPerson: "张经理",
    phone: "13800138000",
    email: "zhangsan@huarun.com",
    address: "北京市朝阳区",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "万科集团",
    contactPerson: "李总",
    phone: "13900139000",
    email: "lisi@vanke.com",
    address: "深圳市南山区",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01"
  }
]

export default function CustomerBasicInfo() {
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showModal, setShowModal] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  // 搜索客户
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理新增/编辑客户
  const handleSaveCustomer = (customer: Customer) => {
    if (selectedCustomer) {
      // 编辑现有客户
      setCustomers(customers.map(c => 
        c.id === customer.id ? customer : c
      ))
    } else {
      // 新增客户
      setCustomers([...customers, { ...customer, id: Date.now() }])
    }
    setShowModal(false)
    setSelectedCustomer(null)
  }

  // 处理删除客户
  const handleDeleteCustomer = (id: number) => {
    if (window.confirm("确定要删除该客户吗？")) {
      setCustomers(customers.filter(c => c.id !== id))
    }
  }

  // 导出Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(customers)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "客户列表")
    XLSX.writeFile(wb, "客户列表.xlsx")
  }

  // 导入Excel
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        setCustomers([...customers, ...json as Customer[]])
      }
      reader.readAsBinaryString(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">客户基本信息</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-1" />
            新增客户
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            导出Excel
          </Button>
          <Button variant="outline" className="relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".xlsx,.xls"
              onChange={handleImport}
            />
            <Upload className="h-4 w-4 mr-1" />
            导入Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>客户列表</CardTitle>
          <CardDescription>管理所有客户的基本信息</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索客户名称或地址"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户名称</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status === 'active' ? '活跃' : '暂停'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setShowModal(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CustomerModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedCustomer(null)
        }}
        onSave={handleSaveCustomer}
        customer={selectedCustomer}
      />
    </div>
  )
} 