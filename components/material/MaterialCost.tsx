import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

interface MaterialCostRecord {
  id: number
  materialType: string
  materialName: string
  plannedCost: number
  actualCost: number
  supplier: string
  purchaseDate: string
  project: string
}

export default function MaterialCost() {
  const [records, setRecords] = useState<MaterialCostRecord[]>([
    {
      id: 1,
      materialType: "型材",
      materialName: "铝合金型材",
      plannedCost: 100000,
      actualCost: 85000,
      supplier: "某某铝业有限公司",
      purchaseDate: "2024-03-20",
      project: "某大厦幕墙工程"
    },
    {
      id: 2,
      materialType: "玻璃",
      materialName: "钢化玻璃",
      plannedCost: 80000,
      actualCost: 75000,
      supplier: "某某玻璃制品公司",
      purchaseDate: "2024-03-22",
      project: "某大厦幕墙工程"
    }
  ])

  const totalPlannedCost = records.reduce((sum, record) => sum + record.plannedCost, 0)
  const totalActualCost = records.reduce((sum, record) => sum + record.actualCost, 0)
  const costUsagePercentage = (totalActualCost / totalPlannedCost) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">计划成本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">{formatCurrency(totalPlannedCost)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">实际成本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">{formatCurrency(totalActualCost)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">成本使用率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                <div className="text-2xl font-bold">{costUsagePercentage.toFixed(1)}%</div>
                {costUsagePercentage > 80 && (
                  <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                )}
              </div>
              <Progress 
                value={costUsagePercentage} 
                className={costUsagePercentage > 80 ? "bg-red-200" : ""}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>物料类型</TableHead>
              <TableHead>物料名称</TableHead>
              <TableHead>计划成本</TableHead>
              <TableHead>实际成本</TableHead>
              <TableHead>供应商</TableHead>
              <TableHead>采购日期</TableHead>
              <TableHead>所属项目</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.materialType}</TableCell>
                <TableCell>{record.materialName}</TableCell>
                <TableCell>{formatCurrency(record.plannedCost)}</TableCell>
                <TableCell className={record.actualCost > record.plannedCost ? "text-red-500" : ""}>
                  {formatCurrency(record.actualCost)}
                </TableCell>
                <TableCell>{record.supplier}</TableCell>
                <TableCell>{record.purchaseDate}</TableCell>
                <TableCell>{record.project}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 