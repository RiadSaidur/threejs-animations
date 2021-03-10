<template>
  <div class="container">
    <h1>Three Js animations</h1>
    <ProjectList  :projects="projects" />
  </div>
</template>

<script>
import ProjectList from "@/components/Home/ProjectList.vue"

export default {
  name: 'Home',
  components: {
    ProjectList
  },
  setup() {
    const projects = [
      {
        title: "Cube animation",
        link: "/cube-animation"
      },
      {
        title: "Sphere animation",
        link: "/sphere-animation"
      },
      {
        title: "Cloud effect",
        link: "/cloud-effect"
      }
    ]

    return { projects }
  }
}
</script>
