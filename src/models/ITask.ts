export type TaskId = string


export interface IUserTaskData {
  id: TaskId,
  parentId?: TaskId,
  name: string,
  description?: string,
  taskTime: number,
}


export interface ITask extends IUserTaskData {
  creationTime: Date,
  endTime?: Date,
}
