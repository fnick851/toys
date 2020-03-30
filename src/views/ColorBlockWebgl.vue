<template>
  <div>
    <canvas class="w-screen h-screen" ref="root_canvas"></canvas>
  </div>
</template>

<script>
import { mat4 } from 'gl-matrix'

export default {
  data() {
    return {
      numRows: 0,
      numColumns: 0,
      squareEdge: 0.1,
    }
  },
  mounted() {
    const vm = this

    vm.getNumOfRowColumn()
    vm.setupWebgl()
  },
  methods: {
    setupWebgl() {
      const vm = this

      // Initialize the GL context
      const gl = vm.$refs.root_canvas.getContext('webgl')

      // Only continue if WebGL is available and working
      if (gl === null) {
        alert(
          'Unable to initialize WebGL. Your browser or machine may not support it.',
        )
        return
      }

      const vertexSource = `
                attribute vec4 aVertexPosition;

                uniform mat4 uModelViewMatrix;
                uniform mat4 uProjectionMatrix;

                void main() {
                    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                }
            `
      const fragmentSource = `
                precision mediump float;

                uniform vec4 u_color;
                
                void main() {
                    gl_FragColor = u_color;
                }
            `

      //
      // creates a shader of the given type, uploads the source and
      // compiles it.
      //
      function loadShader(gl, type, source) {
        const shader = gl.createShader(type)

        // Send the source to the shader object

        gl.shaderSource(shader, source)

        // Compile the shader program

        gl.compileShader(shader)

        // See if it compiled successfully

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert(
            'An error occurred compiling the shaders: ' +
              gl.getShaderInfoLog(shader),
          )
          gl.deleteShader(shader)
          return null
        }

        return shader
      }

      //
      // Initialize a shader program, so WebGL knows how to draw our data
      //
      function initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

        // Create the shader program

        const shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader)
        gl.attachShader(shaderProgram, fragmentShader)
        gl.linkProgram(shaderProgram)

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert(
            'Unable to initialize the shader program: ' +
              gl.getProgramInfoLog(shaderProgram),
          )
          return null
        }

        return shaderProgram
      }

      const cgProgram = initShaderProgram(gl, vertexSource, fragmentSource)

      const myProgramInfo = {
        program: cgProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(cgProgram, 'aVertexPosition'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(
            cgProgram,
            'uProjectionMatrix',
          ),
          modelViewMatrix: gl.getUniformLocation(cgProgram, 'uModelViewMatrix'),
          colorVector: gl.getUniformLocation(cgProgram, 'u_color'),
        },
      }

      function initBuffers(gl) {
        // Create a buffer for the square's positions.

        const positionBuffer = gl.createBuffer()

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

        // Now create an array of positions for the square.

        const positions = [-3.28, 2.49, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(positions),
          gl.STATIC_DRAW,
        )

        return {
          position: positionBuffer,
        }
      }

      function drawScene(gl, programInfo, buffers) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
        gl.clearDepth(1.0) // Clear everything
        gl.enable(gl.DEPTH_TEST) // Enable depth testing
        gl.depthFunc(gl.LEQUAL) // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // Create a perspective matrix, a special matrix that is
        // used to simulate the distortion of perspective in a camera.
        // Our field of view is 45 degrees, with a width/height
        // ratio that matches the display size of the canvas
        // and we only want to see objects between 0.1 units
        // and 100 units away from the camera.

        const fieldOfView = (45 * Math.PI) / 180 // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        const zNear = 0
        const zFar = 1
        const projectionMatrix = mat4.create()

        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create()

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(
          modelViewMatrix, // destination matrix
          modelViewMatrix, // matrix to translate
          [0.0, 0.0, -6.0],
        ) // amount to translate

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        {
          const numComponents = 2 // pull out 2 values per iteration
          const type = gl.FLOAT // the data in the buffer is 32bit floats
          const normalize = false // don't normalize
          const stride = 0 // how many bytes to get from one set of values to the next
          // 0 = use type and numComponents above
          const offset = 0 // how many bytes inside the buffer to start from
          gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
          gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset,
          )
          gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
        }

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program)

        // Set the shader uniforms

        gl.uniformMatrix4fv(
          programInfo.uniformLocations.projectionMatrix,
          false,
          projectionMatrix,
        )
        gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix,
        )
        gl.uniform4f(
          programInfo.uniformLocations.colorVector,
          Math.random(),
          Math.random(),
          Math.random(),
          1,
        )

        {
          const offset = 0
          const vertexCount = 4
          gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
        }
      }

      drawScene(gl, myProgramInfo, initBuffers(gl))

      // const edgeStep = 2 / vm.numColumns
      // for (let recX = -1 recX < vm.numColumns recX += edgeStep) {
      //     for (let recY = -1 recY < vm.numRows recY += edgeStep) {
      //         setRectangle(gl, recX, recY, vm.squareEdge, vm.squareEdge)

      //         gl.uniform4f(
      //             gl.getUniformLocation(cgProgram, "u_color"),
      //             Math.random(),
      //             Math.random(),
      //             Math.random(),
      //             1
      //         )

      //         gl.drawArrays(gl.TRIANGLES, 0, 6)
      //     }
      // }

      // // Fills the buffer with the values that define a rectangle.
      // function setRectangle(gl, x, y, width, height) {
      //     const x1 = x
      //     const x2 = x + width
      //     const y1 = y
      //     const y2 = y + height

      //     // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
      //     // whatever buffer is bound to the `ARRAY_BUFFER` bind point
      //     // but so far we only have one buffer. If we had more than one
      //     // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

      //     gl.bufferData(
      //         gl.ARRAY_BUFFER,
      //         new Float32Array([
      //             x1,
      //             y1,
      //             x2,
      //             y1,
      //             x1,
      //             y2,
      //             x1,
      //             y2,
      //             x2,
      //             y1,
      //             x2,
      //             y2
      //         ]),
      //         gl.STATIC_DRAW
      //     )
      // }
    },
    getNumOfRowColumn() {
      const vm = this

      const rootWidth = vm.$refs.root_canvas.offsetWidth
      const rootHeight = vm.$refs.root_canvas.offsetHeight

      vm.numColumns = Math.ceil(rootWidth / vm.squareEdge)
      vm.numRows = Math.ceil(rootHeight / vm.squareEdge)
    },
  },
}
</script>
