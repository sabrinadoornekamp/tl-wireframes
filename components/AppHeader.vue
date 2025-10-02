<template>
  <v-app-bar app flat>
    <v-btn icon class="mr-2" @click="$emit('toggle-drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title>My Dashboard</v-toolbar-title>
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


