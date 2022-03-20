import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
  Input,
  Textarea,
  Select,
  Button,
  FormItem,
  FormLayout,
} from '@vkontakte/vkui'
import { ITask, IUserTaskData } from '../../models/ITask'


interface Props {
  taskId?: string,
  buttonText: string,
  onSubmit: (task: IUserTaskData) => void,
  onRedirect: () => void,
}


function TaskForm ({
  taskId,
  buttonText,
  onSubmit,
  onRedirect,
}: Props) {
  const tasks = useSelector((state: RootState) => state.tasks)
  const task = taskId ? tasks.find(t => t.id === taskId) : null

  const [name, setName] = useState(task?.name)
  const [description, setDescription] = useState(task?.description)
  const [taskTime, setTaskTime] = useState(task?.taskTime)
  const [parentId, setParenId] = useState(task?.parentId)

  return (
    <FormLayout>
      <FormItem
        top='Название'
        status={name ? 'default' : 'error'}
        bottom={name ? '' : 'Пожалуйста, введите название'}
      >
        <Input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormItem>
      <FormItem top='Описание'>
        <Textarea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormItem>
      <FormItem
        top='Оценка по времени в днях'
        status={taskTime ? 'default' : 'error'}
        bottom={taskTime ? '' : 'Пожалуйста, укажите время'}
      >
        <Input
          type='number'
          name='time'
          value={taskTime}
          onChange={(e) => setTaskTime(Number(e.target.value))}
        />
      </FormItem>
      <FormItem top='Родительская задача' value={taskTime} >
        <Select
          name='parent-task'
          value={parentId}
          options={getParentTaskOptions(task!, tasks)}
          onChange={(e) => setParenId(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <Button
          size='l'
          stretched
          onClick={() => {
            onSubmit({
              id: taskId!,
              name: name!,
              description,
              taskTime: taskTime!,
              parentId,
            })
            onRedirect()
          }}
          disabled={!name || !taskTime}
        >
          {buttonText}
        </Button>
      </FormItem>
    </FormLayout>
  )
}


function getParentTaskOptions (task: ITask, tasks: Array<ITask>) {
  return tasks.filter(t => t.id !== task?.id).map(t => ({
    value: t.id,
    label: t.name,
  }))
}


export default TaskForm
