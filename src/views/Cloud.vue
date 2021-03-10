<template>
  <div id="rain-container">
    <h1>Realistic cloud effect</h1>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { initializeThree } from '@/threejs/threejs'
import { AmbientLight, DirectionalLight, FogExp2, Mesh, MeshLambertMaterial, PlaneBufferGeometry, PointLight, TextureLoader } from 'three'
import { gsap } from 'gsap'
export default {
  name: "Cloud",
  setup() {

    const init = () => {

      const config = {
        width: window.innerWidth,
        height: window.innerHeight - 118,
        cameraPosition: 20,
        container: "rain-container"
      }

      const { camera, scene, renderer, clearResizeListener } = initializeThree(config)

      camera.position.x = 1.16
      camera.position.y = -0.12
      camera.position.z = 1
      camera.rotation.z = 0.27

      const streetLight = new AmbientLight(0x555555)
      scene.add(streetLight)

      const moonLight = new DirectionalLight(0xffeedd)
      moonLight.position.set(0, 0, 1)
      scene.add(moonLight)

      scene.fog = new FogExp2(0x000000, 0.002)
      renderer.setClearColor(scene.fog.color)

      const cloudParticles = []

      const createClouds = texture => {
        const cloudGeometry = new PlaneBufferGeometry(500, 500)
        const cloudMaterial = new MeshLambertMaterial({ map: texture, transparent: true })

        for(let i = 0; i < 25; i++) {
          const cloud = new Mesh(cloudGeometry, cloudMaterial)
        
          cloud.position.set(
            Math.random()*800 - 400,
            50,
            Math.random()*500 - 450
          )

          cloud.rotation.x = 1.16
          cloud.rotation.y = -0.12
          cloud.rotation.z = Math.random()*360
          cloud.material.opacity = 0.4

          cloudParticles.push(cloud)

          scene.add(cloud)
        }
        animate()
      }

      const createLighting = () => {
        const flash = new PointLight(0xffffee, 30, 500, 2)
        flash.position.set(-10, -50, 10)
        scene.add(flash)
        return flash
      }

      const lighting = createLighting()

      const textureLoader = new TextureLoader()
      textureLoader.load(require("@/assets/smoke-min.png"), createClouds)

      const animate = () => {
        cloudParticles.forEach(cloudParticle => {
          const tl = new gsap.timeline({ repeat: -1 })
          tl.to(cloudParticle.rotation, 4000, { z: 1 })
        })

        const lightingTimeline = new gsap.timeline({ repeat: -1, yoyo: true })
        lightingTimeline.to(lighting.position, .5, { x: Math.random()*10 - 20, y: Math.random()*100 - 100, z: 10 })        // lightingTimeline.to(lighting, .5, { power: Math.random()*500 - 300 })
        lightingTimeline.to(lighting, 2, { power: Math.random()*500 - 200 })
        lightingTimeline.to(lighting, .1, { power: Math.random()*500 - 300 }, "-=1")
        lightingTimeline.to(lighting, 2, { power: Math.random()*500 - 200 })

      }

      onUnmounted(clearResizeListener)
    }

    onMounted(init)

  }
}
</script>