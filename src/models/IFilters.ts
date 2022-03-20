import { TaskId } from './ITask'


export interface IFilters {
  name: string,
  gradeFrom: number | '',
  gradeTo: number | '',
  parentId: TaskId,
  creationTime: Array<Date | null> | undefined,
  status: TaskStatus,
}


export enum TaskStatus {
  all = 'all',
  done = 'done',
  active = 'active',
}
