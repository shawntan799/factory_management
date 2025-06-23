import React from 'react'
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
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Truck, FileText, MapPin, Phone, Search } from 'lucide-react'

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
  materialId: number
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">出货管理</h1>
        <Button onClick={() => setIsNewDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新建出货单
        </Button>
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
                <TableHead>订单号</TableHead>
                <TableHead>客户名称</TableHead>
                <TableHead>物料数量</TableHead>
                <TableHead>收货信息</TableHead>
                <TableHead>物流单号</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => {
                const customer = customers.find(c => c.id === shipment.customerId)
                return (
                  <TableRow key={shipment.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {shipment.orderNumber}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{customer?.name}</TableCell>
                    <TableCell>{shipment.totalQuantity}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {shipment.deliveryAddress}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {shipment.contactPerson} ({shipment.contactPhone})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {shipment.trackingNumber ? (
                        <Button
                          variant="ghost"
                          className="h-auto p-0 font-normal"
                          onClick={() => handleTrackShipment(shipment.trackingNumber!)}
                        >
                          <Truck className="h-3 w-3 mr-1" />
                          {shipment.trackingNumber}
                        </Button>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{getStatusText(shipment.status)}</TableCell>
                    <TableCell>{shipment.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 新建出货单对话框 */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新建出货单</DialogTitle>
            <DialogDescription>
              创建新的出货记录
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
            </div>

            {selectedCustomerId && (
              <>
                <div className="space-y-2">
                  <Label>物料清单</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    {selectedItems.map((item, index) => {
                      const material = materials.find(m => m.id === item.materialId)
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{material?.name}</p>
                            <p className="text-sm text-gray-500">{material?.specification}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{item.quantity}</span>
                            <span>{item.unit}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedItems(items => items.filter((_, i) => i !== index))}
                          >
                            删除
                          </Button>
                        </div>
                      )
                    })}

                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="materialId">选择物料</Label>
                        <Select name="materialId">
                          <SelectTrigger>
                            <SelectValue placeholder="选择物料" />
                          </SelectTrigger>
                          <SelectContent>
                            {materials.map(material => (
                              <SelectItem key={material.id} value={material.id.toString()}>
                                {material.name} ({material.specification})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-32 space-y-2">
                        <Label htmlFor="quantity">数量</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          const form = event?.target as HTMLFormElement
                          const materialId = Number(form.materialId.value)
                          const quantity = Number(form.quantity.value)
                          if (materialId && quantity) {
                            handleAddItem(materialId, quantity)
                            form.reset()
                          }
                        }}
                      >
                        添加
                      </Button>
                    </div>
                  </div>
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                      取消
                    </Button>
                    <Button type="submit">
                      创建出货单
                    </Button>
                  </div>
                )}
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 