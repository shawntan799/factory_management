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
import { Image as ImageIcon, Upload, Edit, Trash, Search, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type MaterialType = 'profile' | 'glass' | 'hardware' | 'auxiliary'

interface Material {
  id: number
  name: string
  type: MaterialType
  specification: string
  unit: string
  price: number
  supplierId: number
  imageUrl?: string
  description?: string
  createdAt: string
  updatedAt: string
}

const materialTypes: Record<MaterialType, string> = {
  profile: '型材',
  glass: '玻璃',
  hardware: '五金',
  auxiliary: '辅材'
}

// 表单验证schema
const materialSchema = z.object({
  name: z.string().min(2, '名称至少2个字符'),
  type: z.enum(['profile', 'glass', 'hardware', 'auxiliary']),
  specification: z.string().min(1, '请输入规格'),
  unit: z.string().min(1, '请输入单位'),
  price: z.number().min(0.01, '价格必须大于0'),
  supplierId: z.string().min(1, '请选择供应商'),
  description: z.string().optional()
})

type MaterialFormData = z.infer<typeof materialSchema>

// 模拟数据
const initialMaterials: Material[] = [
  {
    id: 1,
    name: '铝合金型材',
    type: 'profile',
    specification: '100mm*50mm',
    unit: '米',
    price: 45.5,
    supplierId: 1,
    imageUrl: '/placeholder.jpg',
    description: '高品质铝合金型材',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    name: '钢化玻璃',
    type: 'glass',
    specification: '1000mm*2000mm',
    unit: '平方米',
    price: 180,
    supplierId: 1,
    imageUrl: '/placeholder.jpg',
    description: '高强度钢化玻璃',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 3,
    name: '门窗五金件',
    type: 'hardware',
    specification: '标准型号',
    unit: '套',
    price: 120,
    supplierId: 2,
    imageUrl: '/placeholder.jpg',
    description: '优质门窗配件',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 4,
    name: '密封胶条',
    type: 'auxiliary',
    specification: '10mm',
    unit: '米',
    price: 8.5,
    supplierId: 2,
    imageUrl: '/placeholder.jpg',
    description: '防水密封胶条',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
]

const suppliers = [
  { id: 1, name: '福耀玻璃' },
  { id: 2, name: '旭格铝业' }
]

export default function MaterialList() {
  const [materials, setMaterials] = React.useState<Material[]>(initialMaterials)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedType, setSelectedType] = React.useState<'all' | MaterialType>('all')
  const [isNewDialogOpen, setIsNewDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [editingMaterial, setEditingMaterial] = React.useState<Material | null>(null)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string>('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema)
  })

  // 搜索和筛选物料
  const filteredMaterials = materials.filter(material =>
    (selectedType === 'all' || material.type === selectedType) &&
    (material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.specification.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // 处理图片上传
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理新建保存
  const handleNewSave = async (data: MaterialFormData) => {
    let imageUrl = '/placeholder.jpg'
    if (imageFile) {
      // 这里应该调用后端API上传图片
      // imageUrl = await uploadImage(imageFile)
      imageUrl = imagePreview // 临时使用预览图片
    }

    const newMaterial: Material = {
      id: Math.max(...materials.map(m => m.id)) + 1,
      ...data,
      type: data.type as MaterialType,
      supplierId: parseInt(data.supplierId),
      imageUrl,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setMaterials([...materials, newMaterial])
    setIsNewDialogOpen(false)
    setImageFile(null)
    setImagePreview('')
    reset()
  }

  // 处理编辑
  const handleEdit = (material: Material) => {
    setEditingMaterial(material)
    setImagePreview(material.imageUrl || '')
    Object.entries(material).forEach(([key, value]) => {
      setValue(key as keyof MaterialFormData, value)
    })
    setIsEditDialogOpen(true)
  }

  // 处理编辑保存
  const handleEditSave = async (data: MaterialFormData) => {
    if (!editingMaterial) return

    let imageUrl = editingMaterial.imageUrl
    if (imageFile) {
      // 这里应该调用后端API上传图片
      // imageUrl = await uploadImage(imageFile)
      imageUrl = imagePreview // 临时使用预览图片
    }

    const updatedMaterial: Material = {
      ...editingMaterial,
      ...data,
      type: data.type as MaterialType,
      supplierId: parseInt(data.supplierId),
      imageUrl,
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setMaterials(materials.map(m => m.id === editingMaterial.id ? updatedMaterial : m))
    setIsEditDialogOpen(false)
    setEditingMaterial(null)
    setImageFile(null)
    setImagePreview('')
    reset()
  }

  // 处理删除
  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个物料吗？')) {
      setMaterials(materials.filter(m => m.id !== id))
    }
  }

  // 渲染表单
  const renderForm = (onSubmit: (data: MaterialFormData) => void) => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">物料名称</Label>
          <Input
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">物料类型</Label>
          <Select
            onValueChange={(value) => setValue('type', value as MaterialType)}
            defaultValue={editingMaterial?.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择物料类型" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(materialTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="specification">规格</Label>
          <Input
            id="specification"
            {...register('specification')}
          />
          {errors.specification && (
            <p className="text-sm text-red-500">{errors.specification.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">单位</Label>
          <Input
            id="unit"
            {...register('unit')}
          />
          {errors.unit && (
            <p className="text-sm text-red-500">{errors.unit.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">单价</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplierId">供应商</Label>
          <Select
            onValueChange={(value) => setValue('supplierId', value)}
            defaultValue={editingMaterial?.supplierId.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.supplierId && (
            <p className="text-sm text-red-500">{errors.supplierId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">描述</Label>
        <Textarea
          id="description"
          {...register('description')}
        />
      </div>

      <div className="space-y-2">
        <Label>物料图片</Label>
        <div className="flex items-center space-x-4">
          <div className="relative h-32 w-32 border rounded flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover h-full w-full"
              />
            ) : (
              <ImageIcon className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            上传图片
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsNewDialogOpen(false)
            setIsEditDialogOpen(false)
            setImageFile(null)
            setImagePreview('')
            reset()
          }}
        >
          取消
        </Button>
        <Button type="submit">
          保存
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索物料名称或规格"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as 'all' | MaterialType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择物料类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {Object.entries(materialTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsNewDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新建物料
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>图片</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>规格</TableHead>
            <TableHead>单位</TableHead>
            <TableHead>单价</TableHead>
            <TableHead>供应商</TableHead>
            <TableHead>更新时间</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMaterials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>
                <div className="relative h-10 w-10">
                  <img
                    src={material.imageUrl}
                    alt={material.name}
                    className="rounded object-cover h-full w-full"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {material.name}
                {material.description && (
                  <p className="text-sm text-gray-500">{material.description}</p>
                )}
              </TableCell>
              <TableCell>{materialTypes[material.type]}</TableCell>
              <TableCell>{material.specification}</TableCell>
              <TableCell>{material.unit}</TableCell>
              <TableCell>¥{material.price.toFixed(2)}</TableCell>
              <TableCell>
                {suppliers.find(s => s.id === material.supplierId)?.name}
              </TableCell>
              <TableCell>{material.updatedAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(material)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(material.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 新建物料对话框 */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新建物料</DialogTitle>
            <DialogDescription>
              创建新的物料记录
            </DialogDescription>
          </DialogHeader>
          {renderForm(handleNewSave)}
        </DialogContent>
      </Dialog>

      {/* 编辑物料对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑物料</DialogTitle>
            <DialogDescription>
              修改物料信息
            </DialogDescription>
          </DialogHeader>
          {renderForm(handleEditSave)}
        </DialogContent>
      </Dialog>
    </div>
  )
} 