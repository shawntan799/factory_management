import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Customer } from '@/types'
import { Plus, Edit, Trash2, Phone, Mail, User } from 'lucide-react'
import CustomerContactModal from './CustomerContactModal'

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

export default function CustomerContacts() {
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showModal, setShowModal] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  // 搜索客户
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理新增/编辑客户联系方式
  const handleSaveContact = (customer: Customer) => {
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
    if (window.confirm("确定要删除该客户联系方式吗？")) {
      setCustomers(customers.filter(c => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">客户联系方式</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-1" />
          新增联系方式
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>联系方式列表</CardTitle>
          <CardDescription>管理所有客户的联系人信息</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索客户名称、联系人、电话或邮箱"
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
                <TableHead>联系人</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {customer.contactPerson}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                    </div>
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

      <CustomerContactModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedCustomer(null)
        }}
        onSave={handleSaveContact}
        customer={selectedCustomer}
      />
    </div>
  )
} 