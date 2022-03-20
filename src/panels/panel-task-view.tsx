import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useRouter } from '@happysanta/router'
import { RootState } from '../store'
import { deleteTask, completeTask } from '../store/slices/tasks-slice'
import { openPopout } from '../store/slices/popout-slice'
import {
  Button,
  CellButton,
  InfoRow,
  Group,
  Header,
  SimpleCell,
} from '@vkontakte/vkui'
import {
  PAGE_MAIN,
  PAGE_EDIT_TASK,
  PAGE_TASK,
} from '../routers'
import { Icon24PenOutline, Icon24DeleteOutline } from '@vkontakte/icons'
import CompactTaskView from '../components/compact-task-view'
import PanelHeaderTemplate from '../components/panel-header-template'
import CustomAlert from '../components/custom-alert '


function PanelTaskView () {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [taskId, setTaskId] = useState(id)
  
  // По хорошему этого тут не должно быть,
  // Я немного не доразобрался с @happysanta/router
  // Потому что документация на https://happysanta.github.io/router/ - мертвая :(
  useEffect(() => {
    router.onEnterPage(PAGE_TASK, (route) => {
      setTaskId(route.params.id)
    })
  }, [router])

  const tasks = useSelector((state: RootState) => state.tasks)
  const selectedTask = tasks.find(t => t.id === taskId)
  const childTasks = tasks.filter(t => t.parentId === selectedTask?.id)

  return (
    <PanelHeaderTemplate title='Экран задачи'>
      <Group>
        <CellButton
          before={<Icon24PenOutline />}
          onClick={() => router.pushPage(PAGE_EDIT_TASK, { id: selectedTask?.id! })}
        >
          Редактировать
        </CellButton>
        <CellButton
          mode='danger'
          before={<Icon24DeleteOutline />}
          onClick={() => {
            dispatch(openPopout(
              <CustomAlert
                title='Удалить задачу'
                text='Вы уверены, что хотите удалить задачу?'
                popoutAction={() => {
                  dispatch(deleteTask(taskId))
                  router.pushPage(PAGE_MAIN)
                }}
              />
            ))
          }}
        >
          Удалить
        </CellButton>
      </Group>

      <Group>
        <Header mode='secondary'>Информация о задаче</Header>
        <SimpleCell multiline>
          <InfoRow header='Название'>{selectedTask?.name}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header='Описание'>{selectedTask?.description || '–'}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header='Дней на выполнение'>{selectedTask?.taskTime}</InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header='Дата создания'>
            {prettifyDate(selectedTask?.creationTime)}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header='Дата завершения'>
            {prettifyDate(selectedTask?.endTime)}
          </InfoRow>
        </SimpleCell>
      </Group>

      {childTasks.length !== 0 && (
        <Group>
          <Header mode='tertiary'>Список подзадач</Header>
          { childTasks.map(task => (
            <CompactTaskView key={task.id} task={task} />
          ) )}
        </Group>
      )}

      {!selectedTask?.endTime && (
        <Group>
          <Button
            size='l'
            stretched
            onClick={() => {
              dispatch(openPopout(
                <CustomAlert
                  title='Завершить задачу'
                  text='Вы уверены, что хотите завершить задачу?'
                  popoutAction={() => dispatch(completeTask(taskId))}
                />
              ))
            }}
          >
            Завершить задачу
          </Button>
        </Group>
      )}

    </PanelHeaderTemplate>
  )
}


function prettifyDate (date: Date | undefined): string {
  if (!date) {
    return '–'
  }

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}


export default PanelTaskView
