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

        <div class="mb-6" v-if="!isRail">
          <div class="wireframe-search">
            <div class="wireframe-search-icon" style="min-width: 24px;"></div>
            <div class="wireframe-search-text">Search...</div>
          </div>
        </div>

        <div class="wireframe-menu">
          <div
            v-for="item in items"
            :key="item.title"
            class="wireframe-menu-item"
            :class="{ 'wireframe-active': active === item.title }"
            @click="handleMenuClick(item)"
          >
            <div class="wireframe-icon" style="min-width: 24px;"></div>
            <div v-if="!isRail" class="wireframe-label">{{ item.title }}</div>
            <div v-if="!isRail && item.submenu" class="wireframe-arrow" :class="{ 'wireframe-arrow-open': item.expanded }"></div>
          </div>
          
          <!-- Submenu for My therapieland -->
          <div v-if="!isRail && expandedSubmenu" class="wireframe-submenu">
            <div
              v-for="subItem in therapielandSubmenu"
              :key="subItem.title"
              class="wireframe-submenu-item"
              :class="{ 'wireframe-active': active === subItem.title }"
              @click="active = subItem.title"
            >
              <div class="wireframe-submenu-icon" style="min-width: 24px;"></div>
              <div class="wireframe-label">{{ subItem.title }}</div>
            </div>
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
import { computed, ref } from 'vue'

const props = defineProps({
  drawer: { type: Boolean, required: true },
  rail: { type: Boolean, default: false },
  isMobile: { type: Boolean, default: false },
})

const isRail = computed(() => props.rail && !props.isMobile)

const items = [
  { title: 'Dashboard', submenu: false },
  { title: 'My therapieland', submenu: true, expanded: false },
  { title: 'Chats', submenu: false },
]

const therapielandSubmenu = [
  { title: 'Monitors' },
  { title: 'Programs & questionnaires' },
  { title: 'Library' },
]

const active = ref('Dashboard')
const expandedSubmenu = ref(false)

const handleMenuClick = (item) => {
  if (item.submenu) {
    // Toggle submenu
    item.expanded = !item.expanded
    expandedSubmenu.value = item.expanded
  } else {
    // Regular menu item
    active.value = item.title
    expandedSubmenu.value = false
  }
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

.wireframe-search {
  border: 2px solid #333;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.wireframe-search-icon {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.wireframe-search-text {
  color: #999;
  font-style: italic;
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
  border-width: 3px;
}

.wireframe-active {
  border-color: #4a90e2 !important;
  border-width: 3px !important;
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
  border-width: 2px;
}

.wireframe-submenu-item.wireframe-active {
  border-color: #4a90e2 !important;
  border-width: 2px !important;
}

.wireframe-submenu-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}
</style>


