<template>
  <div class="wireframe-breadcrumb">
    <div class="wireframe-breadcrumb-item" @click="navigateTo('/')">
      <div class="wireframe-breadcrumb-icon">🏠</div>
      <div class="wireframe-breadcrumb-text">Dashboard</div>
    </div>
    
    <div v-if="breadcrumbs.length > 0" class="wireframe-breadcrumb-separator">›</div>
    
    <div 
      v-for="(breadcrumb, index) in breadcrumbs" 
      :key="index"
      class="wireframe-breadcrumb-item"
      :class="{ 'wireframe-breadcrumb-current': index === breadcrumbs.length - 1 }"
      @click="navigateToBreadcrumb(breadcrumb, index)"
    >
      <div class="wireframe-breadcrumb-icon" v-if="breadcrumb.icon">{{ breadcrumb.icon }}</div>
      <div class="wireframe-breadcrumb-text">{{ breadcrumb.text }}</div>
    </div>
    
    <!-- Debug info -->
    <div style="margin-left: auto; font-size: 12px; color: #666;">
      Route: {{ route.path }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const crumbs = []
  
  // Debug: log current route
  console.log('Current route:', route.path)
  
  // Add Programs & Questionnaires if we're on that page or a sub-page
  if (route.path.includes('/programs-questionnaires') || route.path.includes('/program/') || route.path.includes('/questionnaire/')) {
    crumbs.push({
      text: 'Programs & Questionnaires',
      path: '/programs-questionnaires',
      icon: '📋'
    })
  }
  
  // Add specific program/questionnaire if we're on a detail page
  if (route.path.includes('/program/')) {
    const programId = route.params.id
    const programName = getProgramName(programId)
    crumbs.push({
      text: programName,
      path: route.path,
      icon: '🎯'
    })
  }
  
  if (route.path.includes('/questionnaire/')) {
    const questionnaireId = route.params.id
    const questionnaireName = getQuestionnaireName(questionnaireId)
    crumbs.push({
      text: questionnaireName,
      path: route.path,
      icon: '📝'
    })
  }
  
  console.log('Breadcrumbs:', crumbs)
  return crumbs
})

const getProgramName = (programId) => {
  const programNames = {
    'cognitive-behavioral-therapy': 'Cognitive Behavioral Therapy',
    'mindfulness-stress-reduction': 'Mindfulness & Stress Reduction',
    'trauma-recovery-program': 'Trauma Recovery Program',
    'depression-treatment-program': 'Depression Treatment Program',
    'social-skills-training': 'Social Skills Training',
    'anger-management-program': 'Anger Management Program'
  }
  return programNames[programId] || 'Program'
}

const getQuestionnaireName = (questionnaireId) => {
  const questionnaireNames = {
    'phq-9-depression-scale': 'PHQ-9 Depression Scale',
    'gad-7-anxiety-scale': 'GAD-7 Anxiety Scale',
    'daily-mood-check-in': 'Daily Mood Check-in',
    'sleep-quality-assessment': 'Sleep Quality Assessment'
  }
  return questionnaireNames[questionnaireId] || 'Questionnaire'
}

const navigateTo = (path) => {
  router.push(path)
}

const navigateToBreadcrumb = (breadcrumb, index) => {
  // Don't navigate if it's the current page (last breadcrumb)
  if (index === breadcrumbs.value.length - 1) return
  
  router.push(breadcrumb.path)
}
</script>

<style scoped>
.wireframe-breadcrumb {
  display: flex !important;
  align-items: center !important;
  padding: 12px 24px !important;
  border-bottom: 2px solid #333 !important;
  background: #f8f8f8 !important;
  gap: 8px !important;
  position: relative !important;
  z-index: 5 !important;
  width: 100% !important;
  min-height: 48px !important;
  margin: 0 !important;
}

.wireframe-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-breadcrumb-item:hover {
  border-color: #666;
  background: #f0f0f0;
}

.wireframe-breadcrumb-item.wireframe-breadcrumb-current {
  background: #f0f0f0;
  cursor: default;
}

.wireframe-breadcrumb-item.wireframe-breadcrumb-current:hover {
  border-color: #333;
  background: #f0f0f0;
}

.wireframe-breadcrumb-icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.wireframe-breadcrumb-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.wireframe-breadcrumb-separator {
  font-size: 16px;
  color: #666;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-breadcrumb {
    padding: 8px 16px;
    flex-wrap: wrap;
  }
  
  .wireframe-breadcrumb-item {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  .wireframe-breadcrumb-text {
    font-size: 12px;
  }
}
</style>
