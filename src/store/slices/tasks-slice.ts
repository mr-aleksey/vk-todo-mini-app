import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { TaskId, ITask, IUserTaskData } from '../../models/ITask'


const initialState: Array<ITask> = [...getMockTasks()]


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    completeTask: (state, action: PayloadAction<TaskId>) => {
      const completedTask = state.find(task => task.id === action.payload)
      completedTask!.endTime = new Date()
    },
    createTask: (state, action) => {
      const { parentId, name, description, taskTime } = action.payload
      state.push({
        id: nanoid(5),
        parentId,
        name,
        description,
        taskTime,
        creationTime: new Date(),
      })
    },
    editTask: (state, action: PayloadAction<IUserTaskData>) => {
      const { id, parentId, name, description, taskTime } = action.payload
      const editableTask = state.find(t => t.id === id)

      editableTask!.parentId = parentId
      editableTask!.name = name
      editableTask!.description = description
      editableTask!.taskTime = taskTime
    },
    deleteTask: (state, action: PayloadAction<TaskId>) => {
      const deletedTaskIndex = state.findIndex(task => task.id === action.payload)
      state.splice(deletedTaskIndex, 1)
    },
  },
})


export const { 
  completeTask,
  createTask,
  editTask,
  deleteTask,
 } = tasksSlice.actions


export default tasksSlice.reducer


function getMockTasks (): Array<ITask> {
  return [
    {
      id: 'FybTc',
      name: 'Сделать техническое задание для vk',
      taskTime: 7,
      creationTime: new Date('Thu Mar 12 2022 22:33:19 GMT+0300 (Moscow Standard Time)')
    },
    {
      id: nanoid(5),
      parentId: 'FybTc',
      name: 'Изучить vkui',
      taskTime: 1,
      creationTime: new Date('Thu Mar 12 2022 22:33:19 GMT+0300 (Moscow Standard Time)'),
      endTime: new Date('Thu Mar 13 2022 22:33:19 GMT+0300 (Moscow Standard Time)'),
    },
    {
      id: nanoid(5),
      parentId: 'FybTc',
      name: 'Понять как работает роутинг мини-приложений',
      taskTime: 1,
      creationTime: new Date('Thu Mar 12 2022 22:33:19 GMT+0300 (Moscow Standard Time)'),
      endTime: new Date('Thu Mar 14 2022 22:33:19 GMT+0300 (Moscow Standard Time)'),
    },
    {
      id: '7WVai',
      name: 'Победить дракона',
      taskTime: 3,
      creationTime: new Date('Thu Mar 11 2022 22:33:19 GMT+0300 (Moscow Standard Time)')
    },
    {
      id: nanoid(5),
      parentId: '7WVai',
      name: 'Узнать где живет дракон',
      taskTime: 10,
      creationTime: new Date('Thu Mar 10 2022 22:33:19 GMT+0300 (Moscow Standard Time)')
    },
    {
      id: nanoid(5),
      parentId: '7WVai',
      name: 'Попробовать договориться с драконом',
      taskTime: 60,
      creationTime: new Date('Thu Mar 13 2022 22:33:19 GMT+0300 (Moscow Standard Time)')
    },
  ]
}

