import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three'

export const init = (width, height) => {

  const scene = new Scene()
  const camera = new PerspectiveCamera(60, width/height, 0.1, 1000)

  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor("#e5e5e5")
  document.body.appendChild(renderer.domElement)

  return { scene, camera, renderer }

}

export const updateWindow = ({ camera, renderer }) => {

  const width = window.innerWidth
  const height = window.innerHeight -118
  console.log('ran');

  renderer.setSize(width, height)
  camera.aspect = width / height

  camera.updateProjectionMatrix()

}