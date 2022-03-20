import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useLocation } from '@happysanta/router'
import {
  AppRoot,
  View,
  Panel,
  SplitLayout,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import {
  PANEL_MAIN,
  PANEL_TASK,
  PANEL_FILTERS,
  PANEL_CREATE_TASK,
  PANEL_EDIT_TASK,
  VIEW_MAIN,
} from '../routers'
import {
  PanelMain,
  PanelTaskView,
  PanelFilter,
  PanelCreateTask,
  PanelEditTask,
} from '../panels'




function App () {
  const location = useLocation()
  const { popout } = useSelector((state: RootState) => state.popout)

  return (
    <AppRoot>
      <SplitLayout popout={popout}>
        <View activePanel={location.getViewActivePanel(VIEW_MAIN)!}>
          <Panel id={PANEL_MAIN}>
            <PanelMain />
          </Panel>
          <Panel id={PANEL_TASK}>
            <PanelTaskView />
          </Panel>
          <Panel id={PANEL_FILTERS}>
            <PanelFilter />
          </Panel>
          <Panel id={PANEL_CREATE_TASK}>
            <PanelCreateTask />
          </Panel>
          <Panel id={PANEL_EDIT_TASK}>
            <PanelEditTask />
          </Panel>
        </View>
      </SplitLayout>
    </AppRoot>
  )
}


export default App
