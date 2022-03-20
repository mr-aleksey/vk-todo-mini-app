import React, { useCallback } from 'react'
import { Group } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { useParams, useRouter } from '@happysanta/router'
import { PAGE_TASK } from '../routers'
import { editTask } from '../store/slices/tasks-slice'
import TaskForm from '../components/task-form'
import PanelHeaderTemplate from '../components/panel-header-template'
import { IUserTaskData } from '../models/ITask'


function PanelEditTask () {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch()

  const onCreateTaskClick = useCallback((task: IUserTaskData) => dispatch(editTask(task)), [])

  return (
    <PanelHeaderTemplate title='Редактировать задачу'>
      <Group>
        <TaskForm
          taskId={id}
          onRedirect={() => router.pushPage(PAGE_TASK, { id })}
          onSubmit={onCreateTaskClick}
          buttonText='Сохранить'
        />
      </Group>
    </PanelHeaderTemplate>
  )
}


export default PanelEditTask
