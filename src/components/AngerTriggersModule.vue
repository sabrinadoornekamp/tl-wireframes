<template>
  <div class="wireframe-module-detail-page">
    <!-- Header with Navigation -->
    <div class="wireframe-module-header">
      <div class="wireframe-header-nav">
        <button class="wireframe-back-button" @click="navigateToProgram">
          ← Back to Anger Management Program
        </button>
        <div class="wireframe-module-progress">
          <div class="wireframe-progress-bar">
            <div class="wireframe-progress-fill" style="width: 100%"></div>
          </div>
          <div class="wireframe-progress-text">100% Complete</div>
        </div>
      </div>
      
      <div class="wireframe-module-title-section">
        <div class="wireframe-program-title">Anger Management Program</div>
        <div class="wireframe-module-title">{{ currentModuleData.title }}</div>
        <div class="wireframe-module-subtitle">{{ currentModuleData.description }}</div>
        <div class="wireframe-program-objective">
          <strong>Program Objective:</strong> Understand anger management, learn healthy expression techniques, and develop practical tools for managing anger triggers and improving emotional regulation.
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="wireframe-module-layout">
      <!-- Sidebar Navigation -->
      <div class="wireframe-module-sidebar">
        <div class="wireframe-sidebar-header">
          <div class="wireframe-sidebar-title">Anger Management Modules</div>
          <div class="wireframe-sidebar-progress">2/3</div>
        </div>
        
              <div class="wireframe-sidebar-sections">
                <div class="wireframe-sidebar-item wireframe-sidebar-completed" @click="navigateToModule('understanding-anger')">
                  <div class="wireframe-sidebar-icon">✓</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Understanding Anger</div>
                    <div class="wireframe-sidebar-duration">30 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item wireframe-sidebar-active" @click="navigateToModule('anger-triggers')">
                  <div class="wireframe-sidebar-icon">2</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Anger Triggers</div>
                    <div class="wireframe-sidebar-duration">25 min</div>
                  </div>
                </div>
                <div class="wireframe-sidebar-item" @click="navigateToModule('relaxation-techniques')">
                  <div class="wireframe-sidebar-icon">3</div>
                  <div class="wireframe-sidebar-content">
                    <div class="wireframe-sidebar-title">Relaxation Techniques</div>
                    <div class="wireframe-sidebar-duration">35 min</div>
                  </div>
                </div>
              </div>
        
        <!-- Module Navigation -->
        <div class="wireframe-module-nav">
          <button class="wireframe-nav-button wireframe-nav-prev" @click="goToPreviousModule">
            ← Previous Module
          </button>
          <button class="wireframe-nav-button wireframe-nav-next" @click="goToNextModule">
            Next Module →
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="wireframe-module-content">
        <div class="wireframe-content-section">
          <div class="wireframe-section-content">
            <div class="wireframe-learning-content">
              <div class="wireframe-content-text">
                <h3>Identifying Anger Triggers</h3>
                <p>Understanding your personal anger triggers is a crucial step in managing anger effectively. This module will help you identify the specific situations, thoughts, and circumstances that tend to provoke anger responses in you.</p>
                
                <h3>Common Anger Triggers</h3>
                <p>Anger triggers can be categorized into several types. External triggers include situations like traffic jams, long lines, criticism from others, or unexpected changes in plans. Internal triggers involve thoughts, memories, or physical sensations that activate anger responses.</p>
                
                <h3>Personal Trigger Assessment</h3>
                <p>Each person has unique anger triggers based on their personal history, values, and experiences. Some people become angry when they feel disrespected, while others react to perceived unfairness or injustice. Understanding your specific triggers helps you prepare for and manage these situations more effectively.</p>
                
                <h3>Warning Signs and Early Detection</h3>
                <p>Learning to recognize the early warning signs of anger is essential for effective management. Physical signs might include increased heart rate, muscle tension, or feeling hot. Emotional signs could involve irritability, frustration, or feeling overwhelmed. Behavioral signs might include clenching fists, raising voice, or becoming argumentative.</p>
                
                <h3>Trigger Response Strategies</h3>
                <p>Once you've identified your triggers, you can develop specific strategies for managing them. This might include avoiding certain situations when possible, preparing mentally for known triggers, or practicing relaxation techniques before entering potentially triggering environments.</p>
                
                <h3>Building Awareness and Prevention</h3>
                <p>Regular self-reflection and awareness-building exercises help you stay attuned to your emotional state and potential triggers. Keeping a trigger journal can help you identify patterns and develop more effective coping strategies over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentModuleData = ref({
  title: 'Anger Triggers',
  description: 'Identify personal anger triggers and warning signs',
  duration: '25 minutes',
  progress: 100
})

const navigateToProgram = () => {
  router.push('/program/anger-management-program')
}

const navigateToModule = (moduleSlug) => {
  console.log('Anger Management: Navigating to module:', moduleSlug)
  const moduleRoutes = {
    'understanding-anger': '/program/anger-management-program/module/understanding-anger',
    'anger-triggers': '/program/anger-management-program/module/anger-triggers',
    'relaxation-techniques': '/program/anger-management-program/module/relaxation-techniques'
  }
  
  const route = moduleRoutes[moduleSlug]
  console.log('Anger Management: Route found:', route)
  if (route) {
    router.push(route)
  } else {
    console.error('Anger Management: No route found for module:', moduleSlug)
  }
}

const goToPreviousModule = () => {
  router.push('/program/anger-management-program/module/understanding-anger')
}

const goToNextModule = () => {
  router.push('/program/anger-management-program/module/relaxation-techniques')
}

// Hide main app elements when module is open
onMounted(() => {
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  
  if (sidebar) {
    sidebar.style.display = 'none'
    sidebar.style.visibility = 'hidden'
  }
  if (appBar) {
    appBar.style.display = 'none'
    appBar.style.visibility = 'hidden'
  }
})

onUnmounted(() => {
  try {
    const sidebar = document.querySelector('.v-navigation-drawer')
    const appBar = document.querySelector('.v-app-bar')
    
    if (sidebar) {
      sidebar.style.display = ''
      sidebar.style.visibility = ''
    }
    if (appBar) {
      appBar.style.display = ''
      appBar.style.visibility = ''
    }
  } catch (error) {
    console.error('Error restoring app elements:', error)
  }
})
</script>

<style scoped>
/* Wireframe Module Detail Page Styles */
.wireframe-module-detail-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  z-index: 9999;
  overflow-y: auto;
  background: white;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  color: black;
  font-weight: 600;
}

.wireframe-module-header {
  border-bottom: 2px solid #333;
  padding: 24px;
  background: white;
}

.wireframe-header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.wireframe-back-button {
  background: white;
  border: 2px solid #333;
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  color: black;
  transition: all 0.2s;
}

.wireframe-back-button:hover {
  background: #f0f0f0;
}

.wireframe-module-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wireframe-progress-bar {
  width: 120px;
  height: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  overflow: hidden;
}

.wireframe-progress-fill {
  height: 100%;
  background: #333;
  transition: width 0.3s ease;
}

.wireframe-progress-text {
  font-size: 14px;
  font-weight: 600;
  color: black;
}

.wireframe-module-title-section {
  text-align: left;
}

.wireframe-program-title {
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}

.wireframe-module-title {
  font-size: 28px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}

.wireframe-module-subtitle {
  font-size: 16px;
  color: black;
  margin-bottom: 16px;
}

.wireframe-program-objective {
  font-size: 14px;
  color: black;
  background: #f0f0f0;
  padding: 12px;
  border: 2px solid #333;
  border-radius: 4px;
  max-width: 600px;
  margin: 0 auto;
}

.wireframe-module-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  height: calc(100vh - 140px);
  padding: 24px;
}

.wireframe-module-sidebar {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  background: white;
  overflow-y: auto;
}

.wireframe-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
}

.wireframe-sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: black;
}

.wireframe-sidebar-progress {
  font-size: 14px;
  color: black;
  background: #f0f0f0;
  padding: 4px 8px;
  border: 1px solid #333;
  border-radius: 4px;
}

.wireframe-sidebar-sections {
  margin-bottom: 20px;
}

.wireframe-sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.wireframe-sidebar-item:hover {
  background: #f0f0f0;
}

.wireframe-sidebar-item.wireframe-sidebar-active {
  background: #d0d0d0;
  border-color: #666;
}

.wireframe-sidebar-item.wireframe-sidebar-completed {
  background: #f0f0f0;
}

.wireframe-sidebar-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: black;
  background: white;
}

.wireframe-sidebar-content {
  flex: 1;
}

.wireframe-sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin-bottom: 4px;
}

.wireframe-sidebar-duration {
  font-size: 12px;
  color: black;
}

.wireframe-module-nav {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.wireframe-nav-button {
  flex: 1;
  padding: 12px;
  border: 2px solid #333;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-weight: 600;
  color: black;
  transition: all 0.2s;
}

.wireframe-nav-button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wireframe-nav-button:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.6;
}

.wireframe-module-content {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 24px;
  background: white;
  overflow-y: auto;
}

.wireframe-content-section {
  margin-bottom: 24px;
}

.wireframe-section-content {
  margin-bottom: 20px;
}

.wireframe-learning-content {
  margin-bottom: 24px;
}

.wireframe-content-text {
  line-height: 1.6;
  color: black;
}

.wireframe-content-text h3 {
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

.wireframe-content-text p {
  font-size: 14px;
  color: black;
  margin-bottom: 16px;
  line-height: 1.6;
}

.wireframe-content-text ul {
  margin: 16px 0;
  padding-left: 0;
}

.wireframe-content-text li {
  font-size: 14px;
  color: black;
  margin-bottom: 8px;
  list-style: none;
  padding-left: 20px;
  position: relative;
}

.wireframe-content-text li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: black;
  font-weight: 600;
}
</style>
