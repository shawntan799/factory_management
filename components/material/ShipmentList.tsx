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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Truck, FileText, MapPin, Phone, Search, Eye, Edit, Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"

interface Shipment {
  id: number
  orderNumber: string
  customerId: number
  items: ShipmentItem[]
  totalQuantity: number
  status: 'pending' | 'shipped' | 'delivered'
  trackingNumber?: string
  deliveryAddress: string
  contactPerson: string
  contactPhone: string
  createdAt: string
  updatedAt: string
}

interface ShipmentItem {
  id: number
  materialId: number
  materialType: string
  materialName: string
  quantity: number
  unit: string
}

interface Customer {
  id: number
  name: string
  contactPerson: string
  phone: string
  address: string
}

interface Material {
  id: number
  name: string
  specification: string
  unit: string
}

interface ShipmentRecord {
  id: number
  shipmentNo: string
  customerName: string
  shipmentDate: string
  status: string
  items: ShipmentItem[]
  address: string
  contact: string
  phone: string
  remarks: string
}

// 模拟数据
const initialShipments: Shipment[] = [
  {
    id: 1,
    orderNumber: "CK20240115001",
    customerId: 1,
    items: [
      { materialId: 1, quantity: 100, unit: '米' }
    ],
    totalQuantity: 100,
    status: 'shipped',
    trackingNumber: 'SF1234567890',
    deliveryAddress: '北京市朝阳区',
    contactPerson: '张经理',
    contactPhone: '13800138000',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
]

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: '华润置地',
    contactPerson: '张经理',
    phone: '13800138000',
    address: '北京市朝阳区'
  }
]

const initialMaterials: Material[] = [
  {
    id: 1,
    name: '铝合金型材',
    specification: '100mm*50mm',
    unit: '米'
  }
]

export default function ShipmentList() {
  const [shipments, setShipments] = React.useState<Shipment[]>(initialShipments)
  const [customers] = React.useState<Customer[]>(initialCustomers)
  const [materials] = React.useState<Material[]>(initialMaterials)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isNewDialogOpen, setIsNewDialogOpen] = React.useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<number | null>(null)
  const [selectedItems, setSelectedItems] = React.useState<ShipmentItem[]>([])
  const [records, setRecords] = useState<ShipmentRecord[]>([
    {
      id: 1,
      shipmentNo: "SH2024032501",
      customerName: "张三公司",
      shipmentDate: "2024-03-25",
      status: "待发货",
      items: [
        {
          id: 1,
          materialType: "型材",
          materialName: "铝合金型材",
          quantity: 100,
          unit: "米"
        },
        {
          id: 2,
          materialType: "玻璃",
          materialName: "钢化玻璃",
          quantity: 50,
          unit: "平方米"
        }
      ],
      address: "上海市浦东新区XX路XX号",
      contact: "张三",
      phone: "13800138000",
      remarks: "请在工作日送货"
    }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ShipmentRecord | null>(null)
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null)

  const form = useForm({
    defaultValues: {
      shipmentNo: "",
      customerName: "",
      shipmentDate: "",
      status: "",
      address: "",
      contact: "",
      phone: "",
      remarks: ""
    }
  })

  // 搜索出货记录
  const filteredShipments = shipments.filter(shipment => {
    const customer = customers.find(c => c.id === shipment.customerId)
    return (
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待发货'
      case 'shipped': return '已发货'
      case 'delivered': return '已送达'
      default: return '未知'
    }
  }

  // 处理新建保存
  const handleNewSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const customer = customers.find(c => c.id === selectedCustomerId)
    if (!customer) return

    const newShipment: Shipment = {
      id: Math.max(...shipments.map(s => s.id)) + 1,
      orderNumber: `CK${new Date().getTime()}`,
      customerId: selectedCustomerId!,
      items: selectedItems,
      totalQuantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
      status: 'pending',
      deliveryAddress: customer.address,
      contactPerson: customer.contactPerson,
      contactPhone: customer.phone,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setShipments([...shipments, newShipment])
    setIsNewDialogOpen(false)
    setSelectedCustomerId(null)
    setSelectedItems([])
  }

  // 处理添加物料
  const handleAddItem = (materialId: number, quantity: number) => {
    const material = materials.find(m => m.id === materialId)
    if (!material) return

    setSelectedItems([
      ...selectedItems,
      { materialId, quantity, unit: material.unit }
    ])
  }

  // 处理物流追踪
  const handleTrackShipment = async (trackingNumber: string) => {
    try {
      // 这里应该调用快递100 API
      // const trackingInfo = await trackShipment(trackingNumber)
      // 显示物流信息
      console.log('Tracking shipment:', trackingNumber)
    } catch (error) {
      console.error('Failed to track shipment:', error)
    }
  }

  const onSubmit = (data: any) => {
    if (editingRecord) {
      setRecords(records.map(record => 
        record.id === editingRecord.id ? { ...record, ...data } : record
      ))
    } else {
      setRecords([...records, { ...data, id: records.length + 1, items: [] }])
    }
    setIsDialogOpen(false)
    form.reset()
    setEditingRecord(null)
    setIsViewMode(false)
  }

  const handleView = (record: ShipmentRecord) => {
    setEditingRecord(record)
    form.reset(record)
    setIsViewMode(true)
    setIsDialogOpen(true)
  }

  const handleEdit = (record: ShipmentRecord) => {
    setEditingRecord(record)
    form.reset(record)
    setIsViewMode(false)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setRecords(records.filter(record => record.id !== id))
    setRecordToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">出货管理</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setIsViewMode(false)
            setEditingRecord(null)
            form.reset()
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRecord(null)
              setIsViewMode(false)
              form.reset()
            }}>
              <Plus className="h-4 w-4 mr-2" />
              新建出货单
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isViewMode ? "查看出货单" : editingRecord ? "编辑出货单" : "新建出货单"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="shipmentNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>出货单号</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isViewMode} />
                        </FormControl>
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
                          <Input {...field} disabled={isViewMode} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>出货日期</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} disabled={isViewMode} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isViewMode}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="选择状态" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="待发货">待发货</SelectItem>
                            <SelectItem value="已发货">已发货</SelectItem>
                            <SelectItem value="已签收">已签收</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>送货地址</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isViewMode} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>联系人</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isViewMode} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>联系电话</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isViewMode} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>备注</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isViewMode} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {editingRecord && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">出货物料明细</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>物料类型</TableHead>
                          <TableHead>物料名称</TableHead>
                          <TableHead>数量</TableHead>
                          <TableHead>单位</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editingRecord.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.materialType}</TableCell>
                            <TableCell>{item.materialName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {!isViewMode && (
                  <div className="flex justify-end">
                    <Button type="submit">{editingRecord ? "保存" : "创建"}</Button>
                  </div>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>出货单列表</CardTitle>
          <CardDescription>管理所有出货记录</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索客户名称、订单号或物流单号"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>出货单号</TableHead>
                <TableHead>客户名称</TableHead>
                <TableHead>出货日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>联系人</TableHead>
                <TableHead>联系电话</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.shipmentNo}</TableCell>
                  <TableCell>{record.customerName}</TableCell>
                  <TableCell>{record.shipmentDate}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.contact}</TableCell>
                  <TableCell>{record.phone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleView(record)}>
                        <Eye className="h-4 w-4" />
                      </Button>
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
                              您确定要删除这条出货记录吗？此操作无法撤销。
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
        </CardContent>
      </Card>
    </div>
  )
} 