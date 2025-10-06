<template>
  <v-app-bar app flat class="wireframe-app-bar">
    <v-btn icon class="mr-2" @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title>Therapieland</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
defineEmits(['toggle-drawer'])
</script>

<style scoped>
.wireframe-app-bar {
  border-bottom: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
  border-right: 2px solid #333 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 15 !important; /* Higher than sidebar */
  width: 100% !important;
  background: white !important; /* Ensure solid background */
}

/* Ensure borders are always visible */
.v-app-bar.wireframe-app-bar {
  border-bottom: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
  border-right: 2px solid #333 !important;
}
</style>


