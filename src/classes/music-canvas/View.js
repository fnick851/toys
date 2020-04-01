class View {
  constructor(canvas, audio) {
    this.canvas = canvas
    this.audio = audio
    this.clicks = []
    this.frameRate = 1000 / 30
    this.loopRate = 4000
    this.maxRadius = 80
    this.audioLoop = []
  }

  handleClick(event) {
    const x = event.offsetX
    const y = event.offsetY
    const pos = this.clicks.push({ x: x, y: y, radius: 0 })
    this.audio.play(x % 10)
    this.audioLoop.push(
      setInterval(() => {
        this.clicks[pos - 1].radius = 0
        this.audio.play(x % 10)
      }, this.loopRate),
    )
  }

  updateDisplay() {
    const context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    context.fillStyle = 'black'
    context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.clicks.length; i++) {
      const circle = this.clicks[i]
      if (circle.radius > this.maxRadius) continue
      circle.radius += 1
      let alpha = 0.7
      if (circle.radius > this.maxRadius - 15)
        alpha = (this.maxRadius - circle.radius) / 10
      this.drawCircle(context, circle.x, circle.y, circle.radius, alpha)
    }
  }

  drawCircle(context, x, y, radius, alpha) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fillStyle =
      'rgba(' +
      (x % 256) +
      ', ' +
      (y % 256) +
      ', ' +
      ((x * y) % 256) +
      ' ,' +
      alpha +
      ')'
    context.fill()
  }
}

export default View
