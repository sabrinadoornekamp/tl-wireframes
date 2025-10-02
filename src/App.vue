<template>
  <v-app>
    <AppHeader @toggle-drawer="toggleDrawer" />
    <SidebarNav :drawer="drawer" :rail="rail" :is-mobile="isMobile" />
    <v-main>
      <DashboardContent />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SidebarNav from '@/components/SidebarNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import DashboardContent from '@/components/DashboardContent.vue'
import AppFooter from '@/components/AppFooter.vue'

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
