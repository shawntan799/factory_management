import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Customer, Transaction } from '@/types'
import { History, FileText, DollarSign, Edit, Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// 模拟初始数据
const initialTransactions: Transaction[] = [
  {
    id: 1,
    customerId: 1,
    orderNumber: "DD20240115001",
    amount: 1500000,
    date: "2024-01-15",
    status: "completed",
    description: "幕墙工程项目"
  },
  {
    id: 2,
    customerId: 1,
    orderNumber: "DD20240120002",
    amount: 800000,
    date: "2024-01-20",
    status: "pending",
    description: "门窗安装项目"
  },
  {
    id: 3,
    customerId: 2,
    orderNumber: "DD20240201001",
    amount: 2000000,
    date: "2024-02-01",
    status: "completed",
    description: "玻璃幕墙工程"
  }
]

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

export default function CustomerTransactions() {
  const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions)
  const [customers] = React.useState<Customer[]>(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isNewDialogOpen, setIsNewDialogOpen] = React.useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<number | null>(null)

  // 搜索交易记录
  const filteredTransactions = transactions.filter(transaction => {
    const customer = customers.find(c => c.id === transaction.customerId)
    return (
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // 获取交易状态对应的Badge样式和文本
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { variant: 'default' as const, text: '已完成' }
      case 'pending':
        return { variant: 'secondary' as const, text: '进行中' }
      case 'cancelled':
        return { variant: 'destructive' as const, text: '已取消' }
      default:
        return { variant: 'outline' as const, text: '未知' }
    }
  }

  // 处理状态切换
  const handleStatusChange = (transactionId: number, newStatus: 'completed' | 'pending' | 'cancelled') => {
    setTransactions(transactions.map(transaction =>
      transaction.id === transactionId
        ? { ...transaction, status: newStatus }
        : transaction
    ))
  }

  // 格式化金额
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  // 处理编辑按钮点击
  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsEditDialogOpen(true)
  }

  // 处理编辑保存
  const handleEditSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingTransaction) return

    const formData = new FormData(event.currentTarget)
    const updatedTransaction = {
      ...editingTransaction,
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
    }

    setTransactions(transactions.map(t =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    ))
    setIsEditDialogOpen(false)
    setEditingTransaction(null)
  }

  // 处理新建保存
  const handleNewSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const newTransaction: Transaction = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      customerId: Number(formData.get('customerId')),
      orderNumber: `DD${new Date().getTime()}`,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      status: 'pending',
      description: formData.get('description') as string
    }

    setTransactions([...transactions, newTransaction])
    setIsNewDialogOpen(false)
    setSelectedCustomerId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">历史交易记录</h1>
        <Button onClick={() => setIsNewDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新建交易
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>交易记录列表</CardTitle>
          <CardDescription>查看所有客户的历史交易记录</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索客户名称、订单号或项目描述"
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
                <TableHead>订单号</TableHead>
                <TableHead>项目描述</TableHead>
                <TableHead>交易金额</TableHead>
                <TableHead>交易日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const customer = customers.find(c => c.id === transaction.customerId)
                const status = getStatusBadge(transaction.status)
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{customer?.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {transaction.orderNumber}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatAmount(transaction.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <History className="h-3 w-3" />
                        {transaction.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={transaction.status}
                        onValueChange={(value: 'completed' | 'pending' | 'cancelled') =>
                          handleStatusChange(transaction.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">进行中</SelectItem>
                          <SelectItem value="completed">已完成</SelectItem>
                          <SelectItem value="cancelled">已取消</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditClick(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 新建交易对话框 */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建交易记录</DialogTitle>
            <DialogDescription>
              创建新的交易记录
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerId">选择客户</Label>
              <Select
                value={selectedCustomerId?.toString()}
                onValueChange={(value) => setSelectedCustomerId(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择客户" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="customerId" value={selectedCustomerId || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">项目描述</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="请输入项目描述"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">交易金额</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="请输入交易金额"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">交易日期</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit" disabled={!selectedCustomerId}>
                保存
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑交易记录</DialogTitle>
            <DialogDescription>
              修改交易记录的详细信息
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">项目描述</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingTransaction?.description}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">交易金额</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue={editingTransaction?.amount}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">交易日期</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={editingTransaction?.date}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                取消
              </Button>
              <Button type="submit">
                保存
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 