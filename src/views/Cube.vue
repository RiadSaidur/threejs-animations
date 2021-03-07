<template>
  <h1>Nice</h1>
</template>

<script>
import { gsap } from 'gsap'
import init from "@/threejs/threejs"
import {
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  // SpotLight,
  PointLight,
  AmbientLight,
  Raycaster,
  Vector2
} from 'three'

export default {
  name: "Cube",
  setup() {
    let width = window.innerWidth
    let height = window.innerHeight - 118


    const newBoxGeometry = ({ x, y, z}) => {

      const geometry = new BoxGeometry(x, y, z)
      const material = new MeshLambertMaterial({ color: 0x006994 })
      const cube = new Mesh(geometry, material)
      scene.add(cube)

      return cube

    }

    // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
    // const addSpotlight = () => {
      
    //   const spotLight = new SpotLight( 0xffffff );
    //   spotLight.position.set( 50, 100, 100 );

    //   spotLight.castShadow = true;

    //   spotLight.shadow.mapSize.width = 1024;
    //   spotLight.shadow.mapSize.height = 1024;

    //   spotLight.shadow.camera.near = 500;
    //   spotLight.shadow.camera.far = 4000;
    //   spotLight.shadow.camera.fov = 30;

    //   scene.add( spotLight );

    // }

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

    const addIntersect = event => {

      const raycaster = new Raycaster();
      const mouse = new Vector2();

      event.preventDefault()

      mouse.x = (event.clientX / width) * 2 - 1
      mouse.y = - (event.clientY / height) * 2 + 1

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true)
      console.log(intersects[0].object)

      for(let i = 0; i < intersects.length; i++) {

        const tl = gsap.timeline()
        tl.to(intersects[i].object.scale, 1, {x: 2, ease: "elastic"})
        tl.to(intersects[i].object.scale, .5, {x: .5, ease: "back"})
        tl.to(intersects[i].object.position, .5, {x: 2, ease: "elastic"})
        tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: "bounce"}, "=-2")
        tl.to(intersects[i].object.position, 1, {z: -Math.PI*.10, ease: "elastic"}, "=-1.5")
        tl.to(intersects[i].object.rotation, .5, {x: 0, ease: "bounce"}, "=-1.5")
        tl.to(intersects[i].object.rotation, .5, {z: 0, ease: "bounce"}, "=-3")

      }

    }
    
    const { scene, camera } = init(width, height)
    camera.position.z = 10

    for(let i = 0; i < 3; i++) {
      const x = Math.ceil(Math.random()*10)
      const y = Math.ceil(Math.random()*10)
      const z = Math.ceil(Math.random()*10)
      const cube = newBoxGeometry(x, y, z)

      // cube.rotation.x = (Math.random()/2).toFixed(1)
      // cube.rotation.z = (Math.random()/2).toFixed(1)

      cube.position.x += Math.random()*10-Math.random()*20
      cube.position.y += Math.random()*Math.random()
      cube.position.z -= Math.random()*Math.random()
    }

    // addSpotlight()
    addPointLight()
    ambientLight()

    window.addEventListener('mousemove', addIntersect)
  }

}
</script>

<style>

</style>