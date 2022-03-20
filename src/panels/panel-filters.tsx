import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setFilters } from '../store/slices/filters-slice'
import {
  DateRangeInput,
  FormLayoutGroup,
  FormLayout,
  FormItem,
  Input,
  Select,
  Button,
} from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN } from '../routers'
import PanelHeaderTemplate from '../components/panel-header-template'
import { ITask } from '../models/ITask'
import { TaskStatus } from '../models/IFilters'


function PanelFilter () {
  const filters = useSelector((state: RootState) => state.filters)
  const tasks = useSelector((state: RootState) => state.tasks)

  const dispatch = useDispatch()
  const router = useRouter()

  const [name, setName] = useState(filters.name)
  const [gradeFrom, setGradeFrom] = useState(filters.gradeFrom)
  const [gradeTo, setGradeTo] = useState(filters.gradeTo)
  const [parentId, setParentId] = useState(filters.parentId)
  const [creationTime, setCreationTime] = useState(filters.creationTime)
  const [status, setStatus] = useState(filters.status)

  return (
    <PanelHeaderTemplate title='Фильтры'>
      <FormLayout>
        <FormItem top='Название'>
          <Input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormItem>
        <FormLayoutGroup mode='horizontal'>
          <FormItem top='Оценка от'>
            <Input
              type='number'
              value={gradeFrom}
              onChange={(e) => setGradeFrom(Number(e.target.value))}
            />
          </FormItem>
          <FormItem top='Оценка до'>
            <Input
              type='number'
              value={gradeTo}
              onChange={(e) => setGradeTo(Number(e.target.value))}
            />
          </FormItem>
        </FormLayoutGroup>
        <FormItem top='Родительская задача'>
          <Select
            value={parentId}
            options={getParentOptions(tasks)}
            onChange={(e) => setParentId(e.target.value)}
          />
        </FormItem>
        <FormItem top='Время создания'>
          <DateRangeInput
            disablePast
            disableFuture
            closeOnChange
            value={creationTime}
            onChange={setCreationTime}
          />
        </FormItem>
        <FormItem top='Статус задачи'>
          <Select
            value={status}
            onChange={(e) => setStatus(TaskStatus[e.target.value as TaskStatus])}
            options={getStatusOptions()}
          />
        </FormItem>
        <FormItem>
          <Button
            size='l'
            stretched
            onClick={() => {
              dispatch(setFilters({
                name,
                gradeFrom,
                gradeTo,
                parentId,
                creationTime,
                status,
              }))
              router.pushPage(PAGE_MAIN)
            }}
          >
            Применить фильтры
          </Button>
        </FormItem>
      </FormLayout>
    </PanelHeaderTemplate>
  )
}


function getParentOptions (tasks: Array<ITask>) {
  return tasks.filter(t => !t.parentId).map(t => ({
    value: t.id,
    label: t.name,
  }))
}


function getStatusOptions () {
  return [
    { value: TaskStatus.all, label: 'Все'},
    { value: TaskStatus.done, label: 'Завершенные'},
    { value: TaskStatus.active, label: 'Активные'},
  ]
}


export default PanelFilter
