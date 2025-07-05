import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash } from 'lucide-react'
import CustomerModal from './CustomerModal'
import { Customer } from '@/types'
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

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // 从本地存储加载数据
  useEffect(() => {
    const savedCustomers = storage.get(STORAGE_KEYS.CUSTOMERS)
    if (savedCustomers) {
      setCustomers(savedCustomers)
    }
  }, [])

  const handleSave = (customer: Customer) => {
    let updatedCustomers
    if (selectedCustomer) {
      // 更新现有客户
      updatedCustomers = customers.map(c => 
        c.id === selectedCustomer.id ? customer : c
      )
    } else {
      // 添加新客户
      updatedCustomers = [...customers, customer]
    }
    setCustomers(updatedCustomers)
    storage.set(STORAGE_KEYS.CUSTOMERS, updatedCustomers) // 保存到本地存储
    setIsModalOpen(false)
    setSelectedCustomer(null)
  }

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id)
    setCustomers(updatedCustomers)
    storage.set(STORAGE_KEYS.CUSTOMERS, updatedCustomers) // 保存到本地存储
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">客户管理</h2>
        <Button onClick={() => {
          setSelectedCustomer(null)
          setIsModalOpen(true)
        }}>
          <Plus className="mr-2 h-4 w-4" />
          新增客户
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>客户名称</TableHead>
            <TableHead>联系人</TableHead>
            <TableHead>电话</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>地址</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.contactPerson}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.status === 'active' ? '活跃' : '暂停'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(customer)}>
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
                          您确定要删除这个客户吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(customer.id)}>
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

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCustomer(null)
        }}
        onSave={handleSave}
        customer={selectedCustomer}
      />
    </div>
  )
}

