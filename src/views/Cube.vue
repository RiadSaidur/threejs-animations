<template>
  <div id="cube-container">
    <h1>Box Geometry - animate on hover</h1>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { initializeThree } from "@/threejs/threejs"
import {
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  Raycaster,
  Vector2
} from 'three'
import { onMounted, onUnmounted } from 'vue'

export default {
  name: "Cube",
  setup() {

    const init = () => {
      // INITIALIZE THREEJS
      const config = {
        width: window.innerWidth,
        height: window.innerHeight - 118,
        cameraPosition: 10,
        backgroundColor: "#e5e5e5",
        container: "cube-container"
      }
      
      const newBoxGeometry = ({ x, y, z}) => {

        const geometry = new BoxGeometry(x, y, z)
        const material = new MeshLambertMaterial({ color: 0x006994 })
        const cube = new Mesh(geometry, material)
        scene.add(cube)

        return cube

      }

      // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
      const addPointLight = () => {

        const light = new PointLight(0xFFFFFF, 2, 1000)
        light.position.set(10,50,25);
        scene.add(light);

      }

      // AmbientLight( color : Integer, intensity : Float )
      const ambientLight = () => {

        const light = new AmbientLight( 0x404040, 1.5 );
        scene.add( light );

      }

      const startAnimating = elements => {

        for(let i = 0; i < elements.length; i++) {

          const tl = gsap.timeline()
          tl.to(elements[i].object.scale, 1, {x: 2, ease: "elastic"})
          tl.to(elements[i].object.scale, .5, {z: .5, ease: "back"})
          tl.to(elements[i].object.position, .5, {x: Math.round(Math.random()*10 - 5) * 2 - 1, ease: "power2"})
          tl.to(elements[i].object.rotation, .5, {y: Math.PI*.5, ease: "bounce"}, "=-2")
          tl.to(elements[i].object.position, 1, {z: Math.random()*.5, ease: "back"}, "=3")
          tl.to(elements[i].object.rotation, .5, {x: 0, ease: "back"}, "=-1.5")
          tl.to(elements[i].object.rotation, .5, {z: 0, ease: "power1"}, "=-3")

        }

      }

      // check if mouse is hoverd on element
      const addIntersect = event => {

        event.preventDefault()

        const mouse = new Vector2();
        mouse.x = (event.clientX / config.width) * 2 - 1
        mouse.y = - (event.clientY / (window.innerHeight + 118)) * 2 + 1

        const raycaster = new Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children)

        startAnimating(intersects)

      }

      const createCube = numberOfCubes => {

        for(let i = 0; i < numberOfCubes; i++) {
          const x = (Math.random() - 0.5) * 10
          const y = (Math.random() - 0.5) * 10
          const z = 1
          const cube = newBoxGeometry(x, y, z)

          cube.position.x = (Math.random() - 0.5) * 10
          cube.position.y = (Math.random() - 0.5) * 10
          cube.position.z = (Math.random() - 0.5) * 10
        }

      }

      const clearListeners = () => {
        window.removeEventListener('mousemove', addIntersect)
        clearResizeListener()
      }
      
      const { scene, camera, clearResizeListener } = initializeThree(config)

      // ADD LIGHTS
      addPointLight()
      ambientLight()

      // CREATE N NUMBER OF CUBES
      const numberOfCubes = 10
      createCube(numberOfCubes)

      // WATCH FOR POINTER INTERSECTING ELEMENTS
      window.addEventListener('mousemove', addIntersect)

      // CLEAR LISTERNERS UNMOUNT
      onUnmounted(clearListeners)
    }

    // MOUNT THREEJS
    onMounted(init)
  }

}
</script>

<style>

</style>