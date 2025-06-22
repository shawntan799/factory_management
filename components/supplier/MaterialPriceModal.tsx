import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MaterialPrice, Supplier } from '@/types'

interface MaterialPriceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (materialPrice: MaterialPrice) => void
  materialPrice: MaterialPrice | null
  suppliers: Supplier[]
}

export default function MaterialPriceModal({ isOpen, onClose, onSave, materialPrice, suppliers }: MaterialPriceModalProps) {
  const [formData, setFormData] = React.useState<Partial<MaterialPrice>>({
    materialName: '',
    specification: '',
    unit: '',
    price: 0,
    effectiveDate: '',
    expiryDate: '',
    remark: '',
    supplierId: 0
  })

  React.useEffect(() => {
    if (materialPrice) {
      setFormData({
        materialName: materialPrice.materialName,
        specification: materialPrice.specification,
        unit: materialPrice.unit,
        price: materialPrice.price,
        effectiveDate: materialPrice.effectiveDate,
        expiryDate: materialPrice.expiryDate,
        remark: materialPrice.remark,
        supplierId: materialPrice.supplierId
      })
    } else {
      setFormData({
        materialName: '',
        specification: '',
        unit: '',
        price: 0,
        effectiveDate: '',
        expiryDate: '',
        remark: '',
        supplierId: 0
      })
    }
  }, [materialPrice])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: materialPrice?.id || Date.now(),
      ...formData,
    } as MaterialPrice)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{materialPrice ? '编辑材料价格' : '新增材料价格'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="supplierId">供应商</Label>
              <Select
                value={formData.supplierId?.toString()}
                onValueChange={(value) => setFormData({ ...formData, supplierId: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择供应商" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="materialName">材料名称</Label>
              <Input
                id="materialName"
                value={formData.materialName}
                onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specification">规格</Label>
              <Input
                id="specification"
                value={formData.specification}
                onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">单位</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">单价</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">生效日期</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">失效日期</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remark">备注</Label>
              <Input
                id="remark"
                value={formData.remark}
                onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 