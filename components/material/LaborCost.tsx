import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, DollarSign, TrendingUp, Users, Wrench } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CostRecord {
  id: number
  type: string
  category: string
  description: string
  plannedCost: number
  actualCost: number
  date: string
  project: string
}

export default function LaborCost() {
  const [records, setRecords] = useState<CostRecord[]>([
    {
      id: 1,
      type: "人工",
      category: "安装工人",
      description: "幕墙安装人工费",
      plannedCost: 50000,
      actualCost: 48000,
      date: "2024-03",
      project: "某大厦幕墙工程"
    },
    {
      id: 2,
      type: "辅材",
      category: "密封胶",
      description: "幕墙安装辅材",
      plannedCost: 20000,
      actualCost: 18000,
      date: "2024-03",
      project: "某大厦幕墙工程"
    }
  ])

  const laborRecords = records.filter(record => record.type === "人工")
  const materialRecords = records.filter(record => record.type === "辅材")

  const calculateCosts = (records: CostRecord[]) => {
    const planned = records.reduce((sum, record) => sum + record.plannedCost, 0)
    const actual = records.reduce((sum, record) => sum + record.actualCost, 0)
    const percentage = (actual / planned) * 100
    return { planned, actual, percentage }
  }

  const laborCosts = calculateCosts(laborRecords)
  const materialCosts = calculateCosts(materialRecords)
  const totalCosts = calculateCosts(records)

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
            <CardTitle className="text-sm font-medium">人工成本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-500 mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(laborCosts.actual)}</div>
              </div>
              <div className="text-sm text-gray-500">
                计划: {formatCurrency(laborCosts.planned)}
              </div>
              <Progress 
                value={laborCosts.percentage} 
                className={laborCosts.percentage > 80 ? "bg-red-200" : ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">辅材成本</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Wrench className="h-4 w-4 text-gray-500 mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(materialCosts.actual)}</div>
              </div>
              <div className="text-sm text-gray-500">
                计划: {formatCurrency(materialCosts.planned)}
              </div>
              <Progress 
                value={materialCosts.percentage}
                className={materialCosts.percentage > 80 ? "bg-red-200" : ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">总成本使用率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                <div className="text-2xl font-bold">{totalCosts.percentage.toFixed(1)}%</div>
                {totalCosts.percentage > 80 && (
                  <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                )}
              </div>
              <Progress 
                value={totalCosts.percentage}
                className={totalCosts.percentage > 80 ? "bg-red-200" : ""}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="labor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="labor">人工成本</TabsTrigger>
          <TabsTrigger value="material">辅材成本</TabsTrigger>
        </TabsList>
        <TabsContent value="labor" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类别</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>计划成本</TableHead>
                  <TableHead>实际成本</TableHead>
                  <TableHead>月份</TableHead>
                  <TableHead>所属项目</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laborRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{formatCurrency(record.plannedCost)}</TableCell>
                    <TableCell className={record.actualCost > record.plannedCost ? "text-red-500" : ""}>
                      {formatCurrency(record.actualCost)}
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.project}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="material" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类别</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>计划成本</TableHead>
                  <TableHead>实际成本</TableHead>
                  <TableHead>月份</TableHead>
                  <TableHead>所属项目</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{formatCurrency(record.plannedCost)}</TableCell>
                    <TableCell className={record.actualCost > record.plannedCost ? "text-red-500" : ""}>
                      {formatCurrency(record.actualCost)}
                    </TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.project}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 