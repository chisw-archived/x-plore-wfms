import { Button, Classes, Popover } from '@blueprintjs/core'
import { LogoGithub16, Wifi16 } from '@carbon/icons-react'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import useFetch from '../hooks/useFetch'
import { getRootInfo } from '../utils/api'
import { rootInfoConverter } from '../utils/converters'
import { rootInfoState } from '../utils/state'


export default function TopBar() {

  const [timeStr, setTimerStr] = useState('')
  const [rootInfo, setRootInfo] = useRecoilState(rootInfoState)

  const { fetch, loading, data } = useFetch(getRootInfo)

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    if (data) {
      setRootInfo(rootInfoConverter(data))
    }
  }, [data, setRootInfo])

  useEffect(() => {
    const tick = () => {
      const now = DateTime.local()
      const str = now.toFormat('yyyy 年 M 月 d 日 周几 HH:mm')
      const day = '一二三四五六日'[+now.toFormat('c') - 1]
      setTimerStr(str.replace('周几', `周${day}`))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  const buttonList = useMemo(() => {
    return [
      {
        text: '关于',
        onClick: () => {},
      },
      {
        text: '偏好设置',
        onClick: () => { },
      },
      {
        text: '进入全屏',
        onClick: () => document.querySelector('html')?.requestFullscreen(),
      },
      {
        text: '刷新',
        onClick: fetch,
      },
      {
        text: '回到原版',
        onClick: () => window.location.href = window.location.host,
      },
      {
        text: '退出',
        onClick: () => { },
      },
    ]
  }, [fetch])
 
  return (
    <>
      <div className="fixed z-20 top-0 right-0 left-0 h-6 bg-black-300 bg-hazy-100 shadow-md text-xs text-white flex justify-between items-center select-none">
        <Popover
          minimal
          position="bottom-left"
          className="h-full"
          targetTagName="div"
          targetClassName="h-full"
          popoverClassName="bg-red-500 force-outline-none"
          target={(
            <div className="flex items-center mx-2 px-2 h-full cursor-pointer hover:bg-white-700 hover:text-black active:bg-white-500">
              <Wifi16 />&nbsp;&nbsp;
              <span className="">{loading ? '系统加载中' : `${rootInfo.deviceName} 已连接`}</span>
            </div>
          )}
          content={(
            <div className="w-48 p-2">
              {buttonList.map(({ text, onClick }, buttonIndex) => (
                <Button
                  key={buttonIndex}
                  small
                  minimal
                  alignText="left"
                  className={`mb-1 w-full ${Classes.POPOVER_DISMISS}`}
                  onClick={onClick}
                >
                  {text}
                </Button>
              ))}
              <Button
                small
                minimal
                alignText="left"
                className="hidden w-full"
                icon={<LogoGithub16 />}
                onClick={() => window.open('https://github.com/Chisw/x-plore-web')}
              >
                GitHub
              </Button>
            </div>
          )}
        />
        <div className="px-2 font-din">
          <span>{timeStr}</span>
        </div>
      </div>
    </>
  )
}