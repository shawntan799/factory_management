import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Supplier } from '@/types'
import { Building2, Plus, Download, Upload, Edit, Trash2, MapPin, FileText } from 'lucide-react'
import * as XLSX from 'xlsx'
import SupplierModal from './SupplierModal'

// 模拟初始数据
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

export default function SupplierBasicInfo() {
  const [suppliers, setSuppliers] = React.useState<Supplier[]>(initialSuppliers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showModal, setShowModal] = React.useState(false)
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null)

  // 搜索供应商
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.businessLicense.includes(searchTerm) ||
    supplier.taxNumber.includes(searchTerm)
  )

  // 处理新增/编辑供应商
  const handleSaveSupplier = (supplier: Supplier) => {
    if (selectedSupplier) {
      // 编辑现有供应商
      setSuppliers(suppliers.map(s => 
        s.id === supplier.id ? supplier : s
      ))
    } else {
      // 新增供应商
      setSuppliers([...suppliers, { ...supplier, id: Date.now() }])
    }
    setShowModal(false)
    setSelectedSupplier(null)
  }

  // 处理删除供应商
  const handleDeleteSupplier = (id: number) => {
    if (window.confirm("确定要删除该供应商吗？")) {
      setSuppliers(suppliers.filter(s => s.id !== id))
    }
  }

  // 导出Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(suppliers)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "供应商列表")
    XLSX.writeFile(wb, "供应商列表.xlsx")
  }

  // 导入Excel
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "binary" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        setSuppliers([...suppliers, ...json as Supplier[]])
      }
      reader.readAsBinaryString(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">供应商基本信息</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4 mr-1" />
            新增供应商
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            导出Excel
          </Button>
          <Button variant="outline" className="relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".xlsx,.xls"
              onChange={handleImport}
            />
            <Upload className="h-4 w-4 mr-1" />
            导入Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>供应商列表</CardTitle>
          <CardDescription>管理所有供应商的基本信息</CardDescription>
          <div className="mt-4">
            <Input
              placeholder="搜索供应商名称、营业执照或税号"
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
                <TableHead>地址</TableHead>
                <TableHead>证照信息</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {supplier.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        营业执照：{supplier.businessLicense}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        税号：{supplier.taxNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                      {supplier.status === 'active' ? '活跃' : '暂停'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSupplier(supplier)
                          setShowModal(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSupplier(supplier.id)}
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

      <SupplierModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedSupplier(null)
        }}
        onSave={handleSaveSupplier}
        supplier={selectedSupplier}
      />
    </div>
  )
}
