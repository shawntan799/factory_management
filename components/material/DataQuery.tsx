import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"

interface QueryRecord {
  id: number
  materialType: string
  materialName: string
  customerName: string
  quantity: number
  unit: string
  date: string
  status: string
}

export default function DataQuery() {
  const [records, setRecords] = useState<QueryRecord[]>([
    {
      id: 1,
      materialType: "型材",
      materialName: "铝合金型材",
      customerName: "张三公司",
      quantity: 100,
      unit: "米",
      date: "2024-03-25",
      status: "已完成"
    }
  ])

  const form = useForm({
    defaultValues: {
      materialType: "",
      customerName: "",
      startDate: "",
      endDate: "",
    }
  })

  const onSubmit = (data: any) => {
    // 在实际应用中，这里应该调用API进行查询
    // 这里只是模拟筛选功能
    const filteredRecords = records.filter(record => {
      const matchesMaterialType = !data.materialType || record.materialType === data.materialType
      const matchesCustomer = !data.customerName || record.customerName.includes(data.customerName)
      const matchesDateRange = (!data.startDate || record.date >= data.startDate) &&
                             (!data.endDate || record.date <= data.endDate)
      return matchesMaterialType && matchesCustomer && matchesDateRange
    })
    setRecords(filteredRecords)
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="">全部</SelectItem>
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
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客户名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="输入客户名称" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">查询</Button>
          </div>
        </form>
      </Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>物料类型</TableHead>
            <TableHead>物料名称</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>单位</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.materialType}</TableCell>
              <TableCell>{record.materialName}</TableCell>
              <TableCell>{record.customerName}</TableCell>
              <TableCell>{record.quantity}</TableCell>
              <TableCell>{record.unit}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 