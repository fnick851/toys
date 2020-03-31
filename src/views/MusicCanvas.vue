<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import BufferLoader from '../classes/music-canvas/BufferLoader.js'
import Audio from '../classes/music-canvas/Audio.js'
import View from '../classes/music-canvas/View.js'

export default {
  name: 'MusicCanvas',
  mounted() {
    const setCanvasSize = () => {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.onresize = setCanvasSize

    const audio = new Audio()

    const finishedLoading = bufferList => {
      audio.init(bufferList)
      const view = new View(this.$refs.canvas, audio)
      this.$refs.canvas.addEventListener(
        'mousedown',
        view.handleClick.bind(view),
        false,
      )
      setInterval(view.updateDisplay.bind(view), view.frameRate)
    }

    const bufferLoader = new BufferLoader(
      audio.audioContext,
      [
        'A4.mp3',
        'A5.mp3',
        'C4.mp3',
        'C5.mp3',
        'D4.mp3',
        'D5.mp3',
        'E4.mp3',
        'E5.mp3',
        'G4.mp3',
        'G5.mp3',
      ],
      finishedLoading,
    )
    bufferLoader.load()
  },
}
</script>
