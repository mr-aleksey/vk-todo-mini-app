import React from 'react'
import { useDispatch } from 'react-redux'
import { Alert } from '@vkontakte/vkui'
import { closePopout } from '../../store/slices/popout-slice'


interface Props {
  title: string,
  text: string,
  popoutAction: () => void,
}


function CustomAlert ({
  title,
  text,
  popoutAction,
}: Props) {
  const dispatch = useDispatch()

  return (
    <Alert
      actions={[
        {
          title,
          mode: 'destructive',
          autoclose: true,
          action: popoutAction
        },
        {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel',
        },
      ]}
      actionsLayout='vertical'
      onClose={() => dispatch(closePopout())}
      header='Подтвердите действие'
      text={text}
    />
  )
}


export default CustomAlert
