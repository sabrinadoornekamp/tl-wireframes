<template>
  <v-navigation-drawer
    :model-value="drawer"
    :rail="isRail"
    :permanent="!isMobile"
    :temporary="isMobile"
    app
    color="white"
    class="wireframe-sidebar"
    :width="isRail ? 80 : 280"
    :rail-width="80"
  >
    <div class="d-flex flex-column justify-space-between h-100 py-4 px-3 wireframe-sidebar-content" style="border-right:1px solid #EFEFEF;">
      <div>
        <div class="d-flex align-center mb-6 px-1 wireframe-profile">
          <div 
            class="wireframe-avatar mr-3" 
            :class="{ 'wireframe-avatar-rail': isRail }"
            style="min-width: 24px;"
          ></div>
          <div v-if="!isRail" class="wireframe-text">
            <div class="wireframe-name">Duck UI</div>
            <div class="wireframe-email">Duckui@demo.com</div>
          </div>
        </div>

        <div class="wireframe-menu">
          <!-- Dashboard -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Dashboard' }"
            @click="handleMenuClick({ title: 'Dashboard', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!isRail" class="wireframe-label">Dashboard</div>
          </div>
          
          <!-- My therapieland -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'My therapieland' }"
            @click="handleMenuClick({ title: 'My therapieland', submenu: true, expanded: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!isRail" class="wireframe-label">My therapieland</div>
            <div v-if="!isRail" class="wireframe-arrow" :class="{ 'wireframe-arrow-open': expandedSubmenu }"></div>
          </div>
          
          <!-- Submenu for My therapieland -->
          <div v-if="!isRail && expandedSubmenu" class="wireframe-submenu">
            <!-- Monitors -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Monitors' }"
              @click="handleSubmenuClick({ title: 'Monitors' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Monitors</div>
            </div>
            
            <!-- Programs & questionnaires -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Programs & questionnaires' }"
              @click="handleSubmenuClick({ title: 'Programs & questionnaires', hasSubmenu: true })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Programs & questionnaires</div>
              <div class="wireframe-arrow" :class="{ 'wireframe-arrow-open': expandedProgramsSubmenu }"></div>
            </div>
            
            <!-- Programs submenu - positioned directly under Programs & questionnaires -->
            <div v-if="expandedProgramsSubmenu" class="wireframe-programs-submenu">
              <div
                v-for="program in programsSubmenu"
                :key="program.title"
                class="wireframe-submenu-item wireframe-program-item"
                :class="{ 'wireframe-active': active === program.title }"
                @click="handleProgramClick(program)"
              >
                <div class="wireframe-submenu-icon" style="min-width: 20px;"></div>
                <div class="wireframe-label">{{ program.title }}</div>
              </div>
            </div>
            
            <!-- Library -->
            <div
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === 'Library' }"
              @click="handleSubmenuClick({ title: 'Library' })"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">Library</div>
            </div>
          </div>
          
          <!-- Chats -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Chats' }"
            @click="handleMenuClick({ title: 'Chats', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!isRail" class="wireframe-label">Chats</div>
          </div>
          
          <!-- Settings -->
          <div
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === 'Settings' }"
            @click="handleMenuClick({ title: 'Settings', submenu: false })"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!isRail" class="wireframe-label">Settings</div>
          </div>
        </div>
      </div>

      <div>
        <div class="wireframe-menu-item wireframe-logout">
          <div class="wireframe-icon" style="min-width: 24px;"></div>
          <div v-if="!isRail" class="wireframe-label">Logout</div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
  
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  drawer: { type: Boolean, required: true },
  rail: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

const router = useRouter()
const route = useRoute()
const isRail = computed(() => props.rail && !props.isMobile)

const items = [
  { title: 'Dashboard', submenu: false },
  { title: 'My therapieland', submenu: true, expanded: false },
  { title: 'Chats', submenu: false },
  { title: 'Settings', submenu: false },
]

const therapielandSubmenu = [
  { title: 'Monitors' },
  { title: 'Programs & questionnaires', hasSubmenu: true },
  { title: 'Library' },
]

const programsSubmenu = [
  { title: 'Cognitive Behavioral Therapy' },
  { title: 'Mindfulness & Stress Reduction' },
  { title: 'Trauma Recovery Program' },
  { title: 'Depression Treatment Program' },
  { title: 'Social Skills Training' },
  { title: 'Anger Management Program' },
]

const active = ref('Dashboard')
const expandedSubmenu = ref(false)
const expandedProgramsSubmenu = ref(false)

// Update active state based on current route
const updateActiveState = () => {
  if (route.path === '/') {
    active.value = 'Dashboard'
    expandedSubmenu.value = false
    expandedProgramsSubmenu.value = false
  } else if (route.path === '/programs-questionnaires') {
    active.value = 'Programs & questionnaires'
    expandedSubmenu.value = true
    // Don't auto-expand programs submenu, let user control it
    expandedProgramsSubmenu.value = false
  }
}

// Watch for route changes
watch(() => route.path, updateActiveState, { immediate: true })

const handleMenuClick = (item) => {
  if (item.submenu) {
    // Toggle submenu
    expandedSubmenu.value = !expandedSubmenu.value
    // Also navigate to the overview page when clicking My therapieland
    if (item.title === 'My therapieland') {
      active.value = item.title
      router.push('/my-therapieland')
    }
  } else {
    // Regular menu item - navigate to route
    active.value = item.title
    // Don't close submenu - keep it open
    // expandedSubmenu.value = false
    
    // Navigate based on menu item
    if (item.title === 'Dashboard') {
      router.push('/')
    } else if (item.title === 'Chats') {
      // Add route for chats when created
      console.log('Chats page not implemented yet')
    } else if (item.title === 'Settings') {
      // Add route for settings when created
      console.log('Settings page not implemented yet')
    }
  }
}

const handleSubmenuClick = (subItem) => {
  if (subItem.hasSubmenu) {
    // Toggle programs submenu
    expandedProgramsSubmenu.value = !expandedProgramsSubmenu.value
    // Also navigate to the programs page when clicking Programs & questionnaires
    if (subItem.title === 'Programs & questionnaires') {
      active.value = subItem.title
      router.push('/programs-questionnaires')
    }
  } else {
    active.value = subItem.title
    // Don't close submenus - keep them open
    // expandedSubmenu.value = false
    // expandedProgramsSubmenu.value = false
    
    // Navigate based on submenu item
    if (subItem.title === 'Programs & questionnaires') {
      router.push('/programs-questionnaires')
    } else {
      // Add routes for other submenu items when created
      console.log(`${subItem.title} page not implemented yet`)
    }
  }
}

const handleProgramClick = (program) => {
  active.value = program.title
  // Don't close submenus - keep them open
  // expandedSubmenu.value = false
  // expandedProgramsSubmenu.value = false
  
  // Navigate to specific program detail page
  const programId = program.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  router.push(`/program/${programId}`)
}
const search = ref('')
const avatarSrc = 'https://s3-alpha-sig.figma.com/img/8242/5855/478e145e1b8ec85651a72ac2891dc900?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cJJcQryNGMT19zTyRiISngKrQx~HXyqZyXTUaMT0xJgIfh49hFR-qhRi0QVZykig-HK~9ofittBgGTllDgbmRmf2Dqyag0WZzBRlbPY9Tn~F3Yq88gvIkQGOmeRTb0YHE0pxELIaSjVFAaJbGd80y-1nUecID6wSvl-ybZQBXR8MerEg0dLcRq9rgaOlgGh6sbQxCgqiAJKkiwJWtOfGH8TQgW77m6X9puGXYRIWWuirYJKTw6T3Xz-ABmEKXzFDcbyvpC-hpGiuZHE~qQHBxhl1HwYKudeUXz56rKuNgP64EP0x3Jlers7R2ewesKI-vHPW1aoI04bpdfABsA2AfQ__'
const logoutIcon = 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/c25c25ba-fa87-413a-a59d-6a35ca63b2a2/figma%3Aasset/2f491662dd6056b10707646d03261ab37ca2d864.svg'

</script>

<style scoped>
/* Wireframe Styles */
.wireframe-sidebar {
  border-right: 2px solid #333 !important;
  transition: width 0.3s ease;
}

.wireframe-sidebar-content {
  min-width: 80px;
  width: 100%;
}

.wireframe-profile {
  border: 2px solid #333;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.wireframe-avatar {
  width: 56px;
  height: 56px;
  border: 2px solid #333;
  border-radius: 8px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.wireframe-avatar-rail {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.wireframe-text {
  margin-left: 12px;
}

.wireframe-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-email {
  color: #666;
  font-size: 14px;
}


.wireframe-menu {
  margin-bottom: 20px;
}

.wireframe-menu-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 4px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 24px;
  width: 100%;
}

.wireframe-menu-item:hover {
  border-color: #666;
  border-width: 2px;
}

.wireframe-active {
  background: #f0f0f0 !important;
  border-color: #333 !important;
  border-width: 2px !important;
}

.wireframe-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.wireframe-label {
  color: #333;
  font-weight: 500;
}

.wireframe-logout {
  margin-bottom: 12px;
}

.wireframe-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
  margin-left: auto;
  transition: transform 0.2s;
}

.wireframe-arrow-open {
  transform: rotate(180deg);
}

.wireframe-submenu {
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.wireframe-submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 2px;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 24px;
  width: 100%;
}

.wireframe-submenu-item:hover {
  border-color: #666;
  border-width: 1px;
}

.wireframe-submenu-item.wireframe-active {
  background: #f0f0f0 !important;
  border-color: #333 !important;
  border-width: 1px !important;
}

.wireframe-submenu-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.wireframe-programs-submenu {
  margin-left: 20px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.wireframe-program-item {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #333;
  border-radius: 3px;
}

.wireframe-program-item:hover {
  border-color: #666;
  border-width: 1px;
}
</style>


