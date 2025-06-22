"use client"

import * as React from "react"
import { X, User, Phone, Mail, MapPin, Briefcase, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (employee: any) => void
  initialData?: any
  isEdit?: boolean
}

export function AddEmployeeModal({ isOpen, onClose, onAdd, initialData, isEdit = false }: AddEmployeeModalProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    employeeId: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    address: "",
    joinDate: "",
  })

  // 当initialData改变时更新表单数据
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        employeeId: initialData.employeeId || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        department: initialData.department || "",
        position: initialData.position || "",
        salary: initialData.salary?.toString() || "",
        address: initialData.address || "",
        joinDate: initialData.joinDate || "",
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const employeeData = {
      ...(isEdit ? initialData : {}),
      ...formData,
      id: isEdit ? initialData.id : Date.now(),
      role: "EMPLOYEE",
      status: isEdit ? initialData.status : "在职",
      salary: parseInt(formData.salary),
    }
    onAdd(employeeData)
    setFormData({
      name: "",
      employeeId: "",
      phone: "",
      email: "",
      department: "",
      position: "",
      salary: "",
      address: "",
      joinDate: "",
    })
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{isEdit ? "编辑员工" : "新增员工"}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入员工姓名"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="如：EMP001"
              />
            </div>
          </div>

          {/* 联系方式 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入邮箱地址"
                />
              </div>
            </div>
          </div>

          {/* 工作信息 */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                部门 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择部门</option>
                  <option value="工程部">工程部</option>
                  <option value="生产部">生产部</option>
                  <option value="财务部">财务部</option>
                  <option value="管理部">管理部</option>
                  <option value="人事部">人事部</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                职位 <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择职位</option>
                <option value="员工">员工</option>
                <option value="财务">财务</option>
                <option value="经理">经理</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                薪资 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入月薪"
                />
              </div>
            </div>
          </div>

          {/* 入职信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                入职日期 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                居住地址
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入居住地址"
                />
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEdit ? "确认修改" : "确认添加"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 