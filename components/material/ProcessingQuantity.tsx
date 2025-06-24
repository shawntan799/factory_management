import React, { useState } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from '@/components/ui/label'
import { Plus, FileText, Edit, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

// 表单验证schema
const processingSchema = z.object({
  materialId: z.string().min(1, '请选择物料'),
  quantity: z.number().min(1, '数量必须大于0'),
  date: z.string().min(1, '请选择日期'),
  operator: z.string().min(2, '请输入操作员姓名'),
  category: z.string().min(1, '请选择加工类别'),
  remarks: z.string().optional()
})

type ProcessingFormData = z.infer<typeof processingSchema>

interface ProcessingRecord {
  id: number
  materialType: string
  materialName: string
  quantity: number
  unit: string
  processingDate: string
  operator: string
  status: string
}

interface Material {
  id: number
  name: string
  specification: string
}

// 加工类别选项
const processingCategories = [
  { value: 'cutting', label: '切割' },
  { value: 'drilling', label: '钻孔' },
  { value: 'welding', label: '焊接' },
  { value: 'assembly', label: '组装' },
  { value: 'painting', label: '喷涂' },
  { value: 'other', label: '其他' }
]

// 模拟数据
const initialRecords: ProcessingRecord[] = [
  {
    id: 1,
    materialType: "型材",
    materialName: "铝合金型材",
    quantity: 100,
    unit: "米",
    processingDate: "2024-03-25",
    operator: "张三",
    status: "已完成"
  }
]

const materials: Material[] = [
  {
    id: 1,
    name: '铝合金型材',
    specification: '100mm*50mm'
  },
  {
    id: 2,
    name: '钢化玻璃',
    specification: '1000mm*2000mm'
  }
]

export default function ProcessingQuantity() {
  const [records, setRecords] = useState<ProcessingRecord[]>(initialRecords)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ProcessingRecord | null>(null)
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null)

  const form = useForm({
    defaultValues: {
      materialType: "",
      materialName: "",
      quantity: 0,
      unit: "",
      processingDate: "",
      operator: "",
      status: ""
    }
  })

  const onSubmit = (data: any) => {
    if (editingRecord) {
      setRecords(records.map(record => 
        record.id === editingRecord.id ? { ...data, id: record.id } : record
      ))
    } else {
      setRecords([...records, { ...data, id: records.length + 1 }])
    }
    setIsDialogOpen(false)
    form.reset()
    setEditingRecord(null)
  }

  const handleEdit = (record: ProcessingRecord) => {
    setEditingRecord(record)
    form.reset(record)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setRecords(records.filter(record => record.id !== id))
    setRecordToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">加工数量管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRecord(null)
              form.reset()
            }}>
              <Plus className="mr-2 h-4 w-4" />
              新建加工记录
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? "编辑加工记录" : "新建加工记录"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="materialType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>物料类型</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择物料类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="型材">型材</SelectItem>
                          <SelectItem value="玻璃">玻璃</SelectItem>
                          <SelectItem value="五金配件">五金配件</SelectItem>
                          <SelectItem value="辅材">辅材</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="materialName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>物料名称</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>数量</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>单位</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择单位" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="米">米</SelectItem>
                          <SelectItem value="平方米">平方米</SelectItem>
                          <SelectItem value="个">个</SelectItem>
                          <SelectItem value="件">件</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="processingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>加工日期</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="operator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>操作员</FormLabel>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择状态" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="待加工">待加工</SelectItem>
                          <SelectItem value="加工中">加工中</SelectItem>
                          <SelectItem value="已完成">已完成</SelectItem>
                          <SelectItem value="已暂停">已暂停</SelectItem>
                        </SelectContent>
                      </Select>
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
            <TableHead>物料类型</TableHead>
            <TableHead>物料名称</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>单位</TableHead>
            <TableHead>加工日期</TableHead>
            <TableHead>操作员</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.materialType}</TableCell>
              <TableCell>{record.materialName}</TableCell>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>{record.unit}</TableCell>
              <TableCell>{record.processingDate}</TableCell>
              <TableCell>{record.operator}</TableCell>
              <TableCell>{record.status}</TableCell>
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
                          您确定要删除这条加工记录吗？此操作无法撤销。
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