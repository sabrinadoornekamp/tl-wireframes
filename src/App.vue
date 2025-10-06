<template>
  <v-app>
    <AppHeader @toggle-drawer="toggleDrawer" />
    <SidebarNav :drawer="drawer" :rail="rail" :is-mobile="isMobile" />
    <v-main>
      <BreadcrumbNav />
      <router-view />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SidebarNav from '@/components/SidebarNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

const drawer = ref(true)
const rail = ref(false)
const isMobile = ref(false)

function handleResize () {
  isMobile.value = window.innerWidth < 960
  if (isMobile.value) {
    rail.value = false
    drawer.value = false
  } else {
    drawer.value = true
  }
}

function toggleDrawer () {
  if (isMobile.value) {
    drawer.value = !drawer.value
  } else {
    rail.value = !rail.value
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
