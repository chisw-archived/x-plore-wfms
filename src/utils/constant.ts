import { IApp } from './types'
import iconFileExplorer from '../img/icons/app-file-explorer.png'
import iconTextEditor from '../img/icons/app-text-editor.png'
import iconPhotoGallery from '../img/icons/app-photo-gallery.png'
import iconMusicPlayer from '../img/icons/app-music-player.png'
import iconVideoPlayer from '../img/icons/app-video-player.png'
import iconSettings from '../img/icons/app-settings.png'
import bgMusic from '../img/bg-music.jpg'
import FileExplorer from '../apps/FileExplorer'
import TextEditor from '../apps/TextEditor'
import PhotoGallery from '../apps/PhotoGallery'
import MusicPlayer from '../apps/MusicPlayer'
import VideoPlayer from '../apps/VideoPlayer'
import Settings from '../apps/Settings'

export const APP_LIST: IApp[] = [
  {
    id: 'file-explorer',
    runningId: 0,
    title: '文件管理器',
    icon: iconFileExplorer,
    defaultSize: {
      width: 960,
      height: 640,
    },
    AppComponent: FileExplorer,
  },
  {
    id: 'text-editor',
    runningId: 0,
    title: '文本编辑器',
    icon: iconTextEditor,
    defaultSize: {
      width: 640,
      height: 480,
    },
    AppComponent: TextEditor,
  },
  {
    id: 'image-previewer',
    runningId: 0,
    title: '图片查看器',
    icon: iconPhotoGallery,
    defaultSize: {
      width: 640,
      height: 480,
    },
    AppComponent: PhotoGallery,
  },
  {
    id: 'music-player',
    runningId: 0,
    title: '音乐播放器',
    icon: iconMusicPlayer,
    bgImg: bgMusic,
    defaultSize: {
      width: 400,
      height: 200,
    },
    AppComponent: MusicPlayer,
  },
  {
    id: 'video-player',
    runningId: 0,
    title: '视频播放器',
    icon: iconVideoPlayer,
    defaultSize: {
      width: 400,
      height: 320,
    },
    AppComponent: VideoPlayer,
  },
  {
    id: 'settings',
    runningId: 0,
    title: '系统设置',
    icon: iconSettings,
    defaultSize: {
      width: 500,
      height: 500,
    },
    AppComponent: Settings,
  },
]