import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three'

export default (width, height, cameraPosition, container) => {

  const scene = new Scene()
  const camera = new PerspectiveCamera(60, width/height, 0.1, 1000)
  camera.position.z = cameraPosition

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor("#e5e5e5")
  document.querySelector(`#${container}`).appendChild(renderer.domElement)

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

  return { scene, camera, clearResizeListener }

}