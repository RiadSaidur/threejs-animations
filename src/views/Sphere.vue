<template>
  <div id="sphere-container">
    <h1>Sphere - timeline animation</h1>
  </div>
</template>

<script>
import { initializeThree } from "@/threejs/threejs"
import {
  SphereGeometry,
  Mesh,
  MeshLambertMaterial,
  PointLight,
  AmbientLight,
} from "three"
import { onMounted } from 'vue'
import { gsap } from 'gsap'
export default {
  name: "Sphere",
  setup() {

    const init = () => {
      // INITIALIZE THREEJS
      const config = {
        width: window.innerWidth,
        height: window.innerHeight - 118,
        cameraPosition: 100,
        container: "sphere-container"
      }

      const addSpheres = config => {

        const geometry = new SphereGeometry(config.x, config.y, config.z)
        const material = new MeshLambertMaterial({ color: config.color })

        const newSphere = new Mesh(geometry, material)
        scene.add(newSphere)

        return newSphere

      }

      const animateSphere = ({ sphere }) => {

        const timeline = gsap.timeline({ repeat: -1 }).delay(2)

        timeline
          .to(sphere.position, 4, { x: -100, z: 0, ease: "sine" })
          .to(sphere.position, 4, { x: 0, z: -40, ease: "sine"  }, "-=2")
          .to(sphere.position, 4, { x: 100, z: 0, ease: "sine" }, "-=2")
          .to(sphere.position, 3.5, { x: 0, z: 40, ease: "sine" }, "-=2")
      }

      const addPointLight = (x = 0, y = 0, z = -50) => {
        const pointLight = new PointLight(0xffffff, 2, 1000)
        pointLight.position.set(x, y, z)
        scene.add(pointLight)

        return pointLight
      }

      const addAmbientLight = () => {
        const ambientLight = new AmbientLight(0xffffff, .5, 1000)
        scene.add(ambientLight)
      }

      const { scene, clearResizeListener } = initializeThree(config)

      const sphereConfig = {
        x: 20, y: 20, z: 1000, color: 0x5533ff
      }
      const sphere = addSpheres(sphereConfig)
      sphere.position.z = 40

      const sunConfig = {
        x: 10, y: 10, z: 100, color: 0xff9966
      }
      addSpheres(sunConfig)
      
      const pointLight = addPointLight()
      addAmbientLight()

      animateSphere({ sphere, pointLight })

      onMounted(clearResizeListener)

    }

    onMounted(init)

  }
}
</script>