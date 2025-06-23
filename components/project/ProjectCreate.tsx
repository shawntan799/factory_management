import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gantt, Task, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"

interface ProjectForm {
  name: string
  customer: string
  contractAmount: number
  startDate: string
  endDate: string
  tasks: Task[]
}

export default function ProjectCreate() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      start: new Date(2024, 2, 1),
      end: new Date(2024, 2, 15),
      name: '前期准备',
      id: '1',
      type: 'task',
      progress: 45,
      isDisabled: false,
      styles: { progressColor: '#0088CC', progressSelectedColor: '#0088CC' }
    },
    {
      start: new Date(2024, 2, 10),
      end: new Date(2024, 3, 10),
      name: '材料采购',
      id: '2',
      type: 'task',
      progress: 30,
      isDisabled: false,
      styles: { progressColor: '#0088CC', progressSelectedColor: '#0088CC' }
    },
    {
      start: new Date(2024, 3, 1),
      end: new Date(2024, 4, 15),
      name: '施工安装',
      id: '3',
      type: 'task',
      progress: 0,
      isDisabled: false,
      styles: { progressColor: '#0088CC', progressSelectedColor: '#0088CC' }
    },
    {
      start: new Date(2024, 4, 15),
      end: new Date(2024, 4, 30),
      name: '验收交付',
      id: '4',
      type: 'task',
      progress: 0,
      isDisabled: false,
      styles: { progressColor: '#0088CC', progressSelectedColor: '#0088CC' }
    }
  ])

  const form = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      customer: "",
      contractAmount: 0,
      startDate: "",
      endDate: "",
      tasks: tasks
    }
  })

  const onSubmit = (data: ProjectForm) => {
    console.log(data)
    // 在这里处理项目创建逻辑
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="输入项目名称" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客户名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="输入客户名称" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contractAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>合同金额</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="输入合同金额" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>开始日期</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束日期</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">项目进度计划</h3>
            <div className="border rounded-lg p-4">
              <Gantt
                tasks={tasks}
                viewMode={ViewMode.Month}
                onDateChange={(task: Task) => {
                  const newTasks = tasks.map(t => (t.id === task.id ? task : t))
                  setTasks(newTasks)
                }}
                onProgressChange={(task: Task) => {
                  const newTasks = tasks.map(t => (t.id === task.id ? task : t))
                  setTasks(newTasks)
                }}
                onTaskDelete={(taskId: string) => {
                  const newTasks = tasks.filter(t => t.id !== taskId)
                  setTasks(newTasks)
                }}
                onTaskClick={task => console.log(task)}
                listCellWidth=""
                ganttHeight={300}
                locale="zh-CN"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">创建项目</Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 