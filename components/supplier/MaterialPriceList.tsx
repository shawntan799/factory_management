import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MaterialPrice, Supplier } from '@/types'
import { Plus, Edit, Trash2, DollarSign, Package } from 'lucide-react'
import MaterialPriceModal from './MaterialPriceModal'

// 模拟初始数据
const initialMaterialPrices: MaterialPrice[] = [
  {
    id: 1,
    supplierId: 1,
    materialName: "钢化玻璃",
    specification: "10mm厚",
    unit: "平方米",
    price: 280,
    effectiveDate: "2024-01-15",
    expiryDate: "2024-12-31",
    remark: "包含运输费用"
  },
  {
    id: 2,
    supplierId: 1,
    materialName: "中空玻璃",
    specification: "6+12A+6mm",
    unit: "平方米",
    price: 320,
    effectiveDate: "2024-01-15",
    expiryDate: "2024-12-31",
    remark: "包含安装费用"
  },
  {
    id: 3,
    supplierId: 2,
    materialName: "铝合金型材",
    specification: "100系列",
    unit: "米",
    price: 85,
    effectiveDate: "2024-02-01",
    expiryDate: "2024-12-31",
    remark: "不含表面处理"
  }
]

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "上海玻璃制品有限公司",
    contactPerson: "王经理",
    phone: "13811111111",
    email: "wang@glass.com",
    address: "上海市浦东新区",
    businessLicense: "91310000123456789X",
    taxNumber: "91310000123456789X",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "广州铝材有限公司",
    contactPerson: "陈总",
    phone: "13922222222",
    email: "chen@alu.com",
    address: "广州市番禺区",
    businessLicense: "91440000987654321X",
    taxNumber: "91440000987654321X",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01"
  }
]

export default function MaterialPriceList() {
  const [materialPrices, setMaterialPrices] = React.useState<MaterialPrice[]>(initialMaterialPrices)
  const [suppliers] = React.useState<Supplier[]>(initialSuppliers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showModal, setShowModal] = React.useState(false)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = React.useState<MaterialPrice | null>(null)

  // 搜索材料价格
  const filteredMaterialPrices = materialPrices.filter(materialPrice => {
    const supplier = suppliers.find(s => s.id === materialPrice.supplierId)
    return (
      supplier?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materialPrice.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materialPrice.specification.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // 处理新增/编辑材料价格
  const handleSaveMaterialPrice = (materialPrice: MaterialPrice) => {
    if (selectedMaterialPrice) {
      // 编辑现有材料价格
      setMaterialPrices(materialPrices.map(m => 
        m.id === materialPrice.id ? materialPrice : m
      ))
    } else {
      // 新增材料价格
      setMaterialPrices([...materialPrices, { ...materialPrice, id: Date.now() }])
    }
    setShowModal(false)
    setSelectedMaterialPrice(null)
  }

  // 处理删除材料价格
  const handleDeleteMaterialPrice = (id: number) => {
    if (window.confirm("确定要删除该材料价格吗？")) {
      setMaterialPrices(materialPrices.filter(m => m.id !== id))
    }
  }

  // 格式化金额
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">材料价格清单</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-1" />
          新增材料价格
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>价格清单</CardTitle>
          <CardDescription>管理所有供应商的材料价格</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索供应商、材料名称或规格"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>供应商</TableHead>
                <TableHead>材料信息</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>有效期</TableHead>
                <TableHead>备注</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterialPrices.map((materialPrice) => {
                const supplier = suppliers.find(s => s.id === materialPrice.supplierId)
                return (
                  <TableRow key={materialPrice.id}>
                    <TableCell className="font-medium">{supplier?.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {materialPrice.materialName}
                        </div>
                        <div className="text-sm text-gray-500">
                          规格：{materialPrice.specification}
                        </div>
                        <div className="text-sm text-gray-500">
                          单位：{materialPrice.unit}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatPrice(materialPrice.price)}/{materialPrice.unit}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm">
                          开始：{materialPrice.effectiveDate}
                        </div>
                        <div className="text-sm">
                          结束：{materialPrice.expiryDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{materialPrice.remark}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedMaterialPrice(materialPrice)
                            setShowModal(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMaterialPrice(materialPrice.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MaterialPriceModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedMaterialPrice(null)
        }}
        onSave={handleSaveMaterialPrice}
        materialPrice={selectedMaterialPrice}
        suppliers={suppliers}
      />
    </div>
  )
} 