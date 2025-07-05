import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Edit, Phone, Mail, MapPin, Plus, Trash } from 'lucide-react'
import SupplierModal from './SupplierModal'
import { Supplier } from '@/types'
import { storage, STORAGE_KEYS } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Supplier {
  id: number
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  businessLicense: string
  taxNumber: string
}

// 模拟初始数据
const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "福耀玻璃",
    contactPerson: "王经理",
    phone: "13800138001",
    email: "wang@fuyao.com",
    address: "福建省福清市",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    businessLicense: "123456789012345",
    taxNumber: "123456789"
  },
  {
    id: 2,
    name: "旭格铝业",
    contactPerson: "李总",
    phone: "13900139001",
    email: "li@xuge.com",
    address: "广东省佛山市",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
    businessLicense: "123456789012345",
    taxNumber: "123456789"
  }
]

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // 从本地存储加载数据
  useEffect(() => {
    const savedSuppliers = storage.get(STORAGE_KEYS.SUPPLIERS)
    if (savedSuppliers) {
      setSuppliers(savedSuppliers)
    }
  }, [])

  const handleSave = (supplier: Supplier) => {
    let updatedSuppliers
    if (selectedSupplier) {
      // 更新现有供应商
      updatedSuppliers = suppliers.map(s => 
        s.id === selectedSupplier.id ? supplier : s
      )
    } else {
      // 添加新供应商
      updatedSuppliers = [...suppliers, supplier]
    }
    setSuppliers(updatedSuppliers)
    storage.set(STORAGE_KEYS.SUPPLIERS, updatedSuppliers) // 保存到本地存储
    setIsModalOpen(false)
    setSelectedSupplier(null)
  }

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id)
    setSuppliers(updatedSuppliers)
    storage.set(STORAGE_KEYS.SUPPLIERS, updatedSuppliers) // 保存到本地存储
  }

  // 搜索供应商
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理状态变更
  const handleStatusChange = (supplierId: number, newStatus: 'active' | 'inactive') => {
    setSuppliers(suppliers.map(supplier =>
      supplier.id === supplierId
        ? { ...supplier, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : supplier
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">供应商管理</h1>
        <Button onClick={() => {
          setSelectedSupplier(null)
          setIsModalOpen(true)
        }}>
          <Plus className="mr-2 h-4 w-4" />
          新增供应商
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>供应商列表</CardTitle>
          <CardDescription>管理所有供应商信息</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索供应商名称或联系人"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>供应商名称</TableHead>
                <TableHead>联系人</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>营业执照号</TableHead>
                <TableHead>税号</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {supplier.address}
                    </div>
                  </TableCell>
                  <TableCell>{supplier.businessLicense}</TableCell>
                  <TableCell>{supplier.taxNumber}</TableCell>
                  <TableCell>
                    <Select
                      value={supplier.status}
                      onValueChange={(value: 'active' | 'inactive') =>
                        handleStatusChange(supplier.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">正常</SelectItem>
                        <SelectItem value="inactive">停用</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{supplier.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(supplier)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除</AlertDialogTitle>
                            <AlertDialogDescription>
                              您确定要删除这个供应商吗？此操作无法撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(supplier.id)}>
                              确认删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSupplier(null)
        }}
        onSave={handleSave}
        supplier={selectedSupplier}
      />
    </div>
  )
}

