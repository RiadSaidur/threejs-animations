<template>
  <ul>
    <li v-for="(project, idx) in projects" :key="idx">
      <router-link :to="project.link">
        {{ project.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProjectList",
  props: ['projects']
}
</script>