import { Page, Router } from '@happysanta/router'


export const PAGE_MAIN = '/'
export const PAGE_TASK = '/task/:id([-\\w]+)'
export const PAGE_FILTERS = '/filters'
export const PAGE_CREATE_TASK = '/create-task'
export const PAGE_EDIT_TASK = '/edit-task/:id([-\\w]+)'

export const PANEL_MAIN = 'panel-main'
export const PANEL_TASK = 'panel-task'
export const PANEL_FILTERS = 'panel-filters'
export const PANEL_CREATE_TASK = 'create-task'
export const PANEL_EDIT_TASK = 'edit-task'

export const VIEW_MAIN = 'view-main'

export const router = new Router({
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
  [PAGE_TASK]: new Page(PANEL_TASK, VIEW_MAIN),
  [PAGE_FILTERS]: new Page(PANEL_FILTERS, VIEW_MAIN),
  [PAGE_CREATE_TASK]: new Page(PANEL_CREATE_TASK, VIEW_MAIN),
  [PAGE_EDIT_TASK]: new Page(PANEL_EDIT_TASK, VIEW_MAIN),
})


router.start()
