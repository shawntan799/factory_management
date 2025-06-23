import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash } from "lucide-react"

interface AlertRule {
  id: number
  name: string
  type: string
  threshold: number
  status: string
}

export default function CostAlert() {
  const [rules, setRules] = useState<AlertRule[]>([
    {
      id: 1,
      name: "材料成本预警",
      type: "材料成本",
      threshold: 80,
      status: "启用"
    },
    {
      id: 2,
      name: "人工成本预警",
      type: "人工成本",
      threshold: 85,
      status: "启用"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null)

  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      threshold: 80,
      status: "启用"
    }
  })

  const onSubmit = (data: any) => {
    if (editingRule) {
      setRules(rules.map(rule => 
        rule.id === editingRule.id ? { ...data, id: rule.id } : rule
      ))
    } else {
      setRules([...rules, { ...data, id: rules.length + 1 }])
    }
    setIsDialogOpen(false)
    form.reset()
    setEditingRule(null)
  }

  const handleEdit = (rule: AlertRule) => {
    setEditingRule(rule)
    form.reset(rule)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">成本预警规则</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRule(null)
              form.reset()
            }}>
              <Plus className="mr-2 h-4 w-4" />
              新建预警规则
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRule ? "编辑预警规则" : "新建预警规则"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>规则名称</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="输入规则名称" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>成本类型</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择成本类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="材料成本">材料成本</SelectItem>
                          <SelectItem value="人工成本">人工成本</SelectItem>
                          <SelectItem value="辅材成本">辅材成本</SelectItem>
                          <SelectItem value="总成本">总成本</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>预警阈值(%)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" max="100" />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择状态" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="启用">启用</SelectItem>
                          <SelectItem value="禁用">禁用</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">
                    {editingRule ? "保存" : "创建"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>规则名称</TableHead>
            <TableHead>成本类型</TableHead>
            <TableHead>预警阈值</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.name}</TableCell>
              <TableCell>{rule.type}</TableCell>
              <TableCell>{rule.threshold}%</TableCell>
              <TableCell>{rule.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(rule)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(rule.id)}>
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