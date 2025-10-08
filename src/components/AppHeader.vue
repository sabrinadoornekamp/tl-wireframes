<template>
  <v-app-bar app flat color="grey-lighten-4" style="border-bottom: 2px solid #333;">
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


