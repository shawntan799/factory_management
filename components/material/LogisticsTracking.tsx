import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Plus, Edit, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
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
import { storage, STORAGE_KEYS } from '@/lib/utils'

interface TrackingEvent {
  time: string
  location: string
  status: string
  description: string
}

interface LogisticsRecord {
  id: number
  orderNumber: string
  destination: string
  status: string
  estimatedDelivery: string
  actualDelivery?: string
}

const statusMap = {
  pending: { label: '待发货', color: 'bg-yellow-500' },
  in_transit: { label: '运输中', color: 'bg-blue-500' },
  delivered: { label: '已送达', color: 'bg-green-500' },
  exception: { label: '异常', color: 'bg-red-500' }
}

// 模拟数据
const initialRecords: LogisticsRecord[] = [
  {
    id: 1,
    orderNumber: "ORD001",
    destination: "上海",
    status: "运输中",
    estimatedDelivery: "2024-03-20",
  }
]

export default function LogisticsTracking() {
  const [records, setRecords] = useState<LogisticsRecord[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<LogisticsRecord | null>(null)
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null)

  const form = useForm({
    defaultValues: {
      orderNumber: "",
      destination: "",
      status: "",
      estimatedDelivery: "",
      actualDelivery: "",
    }
  })

  // 从本地存储加载数据
  useEffect(() => {
    const savedRecords = storage.get(STORAGE_KEYS.LOGISTICS)
    if (savedRecords) {
      setRecords(savedRecords)
    }
  }, [])

  const onSubmit = (data: any) => {
    let updatedRecords
    if (editingRecord) {
      updatedRecords = records.map(record => 
        record.id === editingRecord.id ? { ...data, id: record.id } : record
      )
    } else {
      updatedRecords = [...records, { ...data, id: records.length + 1 }]
    }
    setRecords(updatedRecords)
    storage.set(STORAGE_KEYS.LOGISTICS, updatedRecords) // 保存到本地存储
    setIsDialogOpen(false)
    form.reset()
    setEditingRecord(null)
  }

  const handleEdit = (record: LogisticsRecord) => {
    setEditingRecord(record)
    form.reset(record)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    const updatedRecords = records.filter(record => record.id !== id)
    setRecords(updatedRecords)
    storage.set(STORAGE_KEYS.LOGISTICS, updatedRecords) // 保存到本地存储
    setRecordToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">运输管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRecord(null)
              form.reset()
            }}>
              <Plus className="mr-2 h-4 w-4" />
              新建运输记录
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? "编辑运输记录" : "新建运输记录"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>订单编号</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>目的地</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>状态</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedDelivery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>预计送达时间</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="actualDelivery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>实际送达时间</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">{editingRecord ? "保存" : "创建"}</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单编号</TableHead>
            <TableHead>目的地</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>预计送达时间</TableHead>
            <TableHead>实际送达时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.orderNumber}</TableCell>
              <TableCell>{record.destination}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{record.estimatedDelivery}</TableCell>
              <TableCell>{record.actualDelivery || "-"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(record)}>
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
                          您确定要删除这条运输记录吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(record.id)}>
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
    </div>
  )
} 