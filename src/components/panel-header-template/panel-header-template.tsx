import React, { useCallback } from 'react'
import {
  PanelHeader,
  PanelHeaderButton,
} from '@vkontakte/vkui'
import { Icon28HomeOutline } from '@vkontakte/icons'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN } from '../../routers'


interface Props {
  title: string,
  children: React.ReactNode,
}


function PanelHeaderTemplate ({
  title,
  children,
}: Props) {
  const router = useRouter()
  const onHomeButtonClick = useCallback(() => router.pushPage(PAGE_MAIN), [])

  return (
    <React.Fragment>
      <PanelHeader left={
        <PanelHeaderButton
          aria-label='Вернуться на главный экран'
          onClick={onHomeButtonClick}
        >
          <Icon28HomeOutline />
        </PanelHeaderButton>
      } >
        {title}
      </PanelHeader>
      { children }
    </React.Fragment>
  )
}


export default PanelHeaderTemplate


