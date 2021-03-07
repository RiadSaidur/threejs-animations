<template>
  <h1>Nice</h1>
</template>

<script>
import {
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  SpotLight,
  Raycaster,
  Vector2
} from 'three'

import {
  init,
  updateWindow
} from "@/threejs/threejs"

export default {
  name: "Cube",
  setup() {
    let width = window.innerWidth
    let height = window.innerHeight - 118


    const newBoxGeometry = () => {

      const geometry = new BoxGeometry()
      const material = new MeshLambertMaterial({ color: 0x006994 })
      const cube = new Mesh(geometry, material)
      scene.add(cube)

      return cube

    }

    const addSpotlight = () => {

      const spotLight = new SpotLight( 0xffffff );
      spotLight.position.set( 50, 100, 100 );

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 500;
      spotLight.shadow.camera.far = 4000;
      spotLight.shadow.camera.fov = 30;

      scene.add( spotLight );

    }

    const addIntersect = event => {

      const raycaster = new Raycaster();
      const mouse = new Vector2();

      event.preventDefault()

      mouse.x = (event.clientX / width) * 2 - 1
      mouse.y = - (event.clientY / height) * 2 + 1

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true)

      for(let i = 0; i < intersects.length; i++) {
        intersects[i].object.rotation.x+=0.1
      }

    }
    
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    const changeWindowSize = () => updateWindow({ camera, renderer })

    const { scene, camera, renderer } = init(width, height)
    camera.position.z = 3

    animate()

    newBoxGeometry()
    addSpotlight()

    window.addEventListener('resize', changeWindowSize)
    window.addEventListener('mousemove', addIntersect)
  }

}
</script>

<style>

</style>