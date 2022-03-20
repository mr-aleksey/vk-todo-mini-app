import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from '@happysanta/router'
import { RootState } from '../store'
import { ITask } from '../models/ITask'
import { IFilters } from '../models/IFilters'
import {
  Group,
  Header,
  CellButton,
  PanelHeader,
} from '@vkontakte/vkui'
import { Icon24Add, Icon24Filter } from '@vkontakte/icons'
import { PAGE_FILTERS, PAGE_CREATE_TASK } from '../routers'
import CompactTaskView from '../components/compact-task-view'
import { TaskStatus } from '../models/IFilters'


function PanelMain () {
  const router = useRouter()
  
  const onCreateTaskClick = useCallback(() => router.pushPage(PAGE_CREATE_TASK), [router])
  const onEditTaskClick = useCallback(() => router.pushPage(PAGE_FILTERS), [router])

  const tasks = useSelector((state: RootState) => state.tasks)
  const filters = useSelector((state: RootState) => state.filters)
  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters)
  }, [tasks, filters])

  return (
    <React.Fragment>
      <PanelHeader>Главный экран</PanelHeader>
      <Group>
        <CellButton
          before={<Icon24Add />}
          onClick={onCreateTaskClick}
        >
          Создать задачу
        </CellButton>
        <CellButton
          before={<Icon24Filter />}
          onClick={onEditTaskClick}
        >
          Фильтры
        </CellButton>
      </Group>
      <Group>
        <Header mode='tertiary'>Список задач</Header>
        { filteredTasks.map(task => (
          <CompactTaskView key={task.id} task={task} />
        ) )}
      </Group>
    </React.Fragment>
  )
}


function filterTasks (tasks: Array<ITask>, filters: IFilters): Array<ITask> {
  return tasks.filter(task => {
    let matchesFilters  = true

    if (filters.name) {
      matchesFilters = task.name.includes(filters.name)
    }
    if (filters.gradeFrom) {
      matchesFilters = task.taskTime >= filters.gradeFrom
    }
    if (filters.gradeTo) {
      matchesFilters = task.taskTime <= filters.gradeTo
    }
    if (filters.parentId) {
      matchesFilters = task.parentId === filters.parentId
    }
    if (filters.creationTime && filters.creationTime[0]) {
      matchesFilters = task.creationTime >= filters.creationTime[0]
    }
    if (filters.creationTime && filters.creationTime[1]) {
      matchesFilters = task.creationTime <= filters.creationTime[1]
    }
    if (filters.status === TaskStatus.active) {
      matchesFilters = !task.endTime
    }
    if (filters.status === TaskStatus.done) {
      matchesFilters = !!task.endTime
    }

    return matchesFilters 
  })
}


export default PanelMain
