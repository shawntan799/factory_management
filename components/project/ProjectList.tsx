import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  name: string
  customer: string
  contractAmount: number
  startDate: string
  endDate: string
  status: string
  progress: number
  costUsage: number
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "某大厦幕墙工程",
      customer: "张三建设有限公司",
      contractAmount: 2000000,
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      status: "进行中",
      progress: 35,
      costUsage: 40
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "未开始":
        return "bg-gray-500"
      case "进行中":
        return "bg-blue-500"
      case "已完成":
        return "bg-green-500"
      case "已暂停":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>项目名称</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>合同金额</TableHead>
            <TableHead>开始日期</TableHead>
            <TableHead>结束日期</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>项目进度</TableHead>
            <TableHead>成本使用</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.customer}</TableCell>
              <TableCell>{formatCurrency(project.contractAmount)}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Progress value={project.progress} />
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Progress value={project.costUsage} className={project.costUsage > 80 ? "bg-red-200" : ""} />
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">{project.costUsage}%</span>
                    {project.costUsage > 80 && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 