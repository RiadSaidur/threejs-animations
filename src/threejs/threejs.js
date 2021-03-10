import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three'

export const initializeThree = config => {

  const scene = new Scene()
  const camera = new PerspectiveCamera(60, config.width/config.height, 0.1, 1000)
  camera.position.z = config.cameraPosition

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(config.width, config.height)
  renderer.setClearColor(config?.backgroundColor)
  document.querySelector(`#${config.container}`).appendChild(renderer.domElement)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  const updateWindow = () => {

    const newWidth = window.innerWidth
    const newHeight = window.innerHeight -118
  
    renderer.setSize(newWidth, newHeight)
    camera.aspect = newWidth / newHeight
  
    camera.updateProjectionMatrix()
  
  }

  animate()
  window.addEventListener('resize', updateWindow)

  const clearResizeListener = () => window.removeEventListener('resize', updateWindow)

  return { scene, camera, renderer, clearResizeListener }

}