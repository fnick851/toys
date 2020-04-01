<template>
  <canvas
    ref="canvas"
    @click="view.handleClick($event)"
    class="cursor-pointer"
  ></canvas>
</template>

<script>
import BufferLoader from '../classes/music-canvas/BufferLoader.js'
import Audio from '../classes/music-canvas/Audio.js'
import View from '../classes/music-canvas/View.js'

export default {
  name: 'MusicCanvas',
  data() {
    return {
      audio: new Audio(),
      view: null,
      displayLoop: null,
    }
  },
  created() {
    new BufferLoader(
      this.audio.audioContext,
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
      bufferList => {
        this.audio.init(bufferList)
        this.view = new View(this.$refs.canvas, this.audio)
        this.displayLoop = setInterval(
          this.view.updateDisplay,
          this.view.frameRate,
        )
      },
    ).load()
  },
  mounted() {
    const setCanvasSize = () => {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.onresize = setCanvasSize
  },
  beforeDestroy() {
    this.view.audioLoop.forEach(audioLoop => clearInterval(audioLoop))
    clearInterval(this.displayLoop)
    window.onresize = null
  },
}
</script>
