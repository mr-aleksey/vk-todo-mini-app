import React, { useCallback } from 'react'
import { Group } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN } from '../routers'
import { createTask } from '../store/slices/tasks-slice'
import TaskForm from '../components/task-form'
import PanelHeaderTemplate from '../components/panel-header-template'
import { IUserTaskData } from '../models/ITask'


function PanelCreateTask () {
  const router = useRouter()
  const dispatch = useDispatch()
  
  const onCreateTaskClick = useCallback((task: IUserTaskData) => dispatch(createTask(task)), [])

  return (
    <PanelHeaderTemplate title='Новая задача'>
      <Group>
        <TaskForm
          onRedirect={() => router.pushPage(PAGE_MAIN)}
          onSubmit={onCreateTaskClick}
          buttonText='Cоздать'
        />
      </Group>
    </PanelHeaderTemplate>
  )
}


export default PanelCreateTask
