import React from 'react'
import { SimpleCell } from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { PAGE_TASK } from '../../routers'
import { ITask } from '../../models/ITask'


interface Props {
  task: ITask,
}


function CompactTaskView ({
  task,
}: Props) {
  const router = useRouter()

  return (
    <SimpleCell
      expandable
      indicator={getTimeStatus(task)}
      onClick={() => router.pushPage(PAGE_TASK, { id: task.id})}
    >
      {task.name}
    </SimpleCell>
  )
}

function getTimeStatus (task: ITask): string {
  if (task.endTime) {
    return `завершена ${task.endTime.toLocaleString('ru-RU', { day: 'numeric', month: 'long' })}`
  }

  const dateNow = Number(new Date())
  const dateCreateTask = Number(task.creationTime)
  const difference = Math.floor((dateNow - dateCreateTask) / 1000 / 60 / 60 / 24)
  const daysLeft = task.taskTime - difference <= 0 ? 0 : task.taskTime - difference
  return wordCorrectEnding(daysLeft)
}


function wordCorrectEnding(num: number):string {
  if (!num && num !== 0) { return '' }

  const lastDigit = Number(num.toString().split('').pop())
  let type = 'other'
  if (lastDigit === 1 && num !== 11) {
    type = 'one'
  }
  if (
    (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
    (num < 5 || num > 20)
  ) {
    type = 'few'
  }
  return ({
    one: `остался ${num} день`,
    few: `осталось ${num} дня`,
    other: `осталось ${num} дней`,
  })[type]!
}


export default CompactTaskView
