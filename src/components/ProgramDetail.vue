<template>
  <div class="wireframe-program-detail">
    <div class="wireframe-header">
      <div class="wireframe-title">{{ program.title }}</div>
      <div class="wireframe-subtitle">{{ program.description }}</div>
    </div>
    
    <div class="wireframe-content">
      <!-- Program Overview -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Program Overview</div>
          <div class="wireframe-program-status-badge" :class="program.status">
            {{ getStatusText(program.status) }}
          </div>
        </div>
        
        <div class="wireframe-overview-grid">
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Progress</div>
            <div class="wireframe-progress-container">
              <div class="wireframe-progress-bar">
                <div class="wireframe-progress-fill" :style="{ width: program.progress + '%' }"></div>
              </div>
              <div class="wireframe-progress-text">{{ program.progress }}% Complete</div>
            </div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Duration</div>
            <div class="wireframe-overview-value">{{ program.duration }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Next Session</div>
            <div class="wireframe-overview-value">{{ program.nextSession }}</div>
          </div>
          
          <div class="wireframe-overview-item">
            <div class="wireframe-overview-label">Care Organization</div>
            <div class="wireframe-overview-value">{{ program.careOrganization }}</div>
          </div>
        </div>
      </div>

      <!-- Program Modules -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Program Modules</div>
        </div>
        
        <div class="wireframe-modules-list">
          <div 
            v-for="(module, index) in program.modules" 
            :key="index"
            class="wireframe-module-item"
            :class="{ 'wireframe-module-completed': module.completed, 'wireframe-module-current': module.current }"
          >
            <div class="wireframe-module-icon">
              <div v-if="module.completed" class="wireframe-checkmark">✓</div>
              <div v-else-if="module.current" class="wireframe-current">→</div>
              <div v-else class="wireframe-pending">○</div>
            </div>
            <div class="wireframe-module-content">
              <div class="wireframe-module-title">{{ module.title }}</div>
              <div class="wireframe-module-description">{{ module.description }}</div>
              <div class="wireframe-module-duration">{{ module.duration }}</div>
            </div>
            <div class="wireframe-module-actions">
              <div v-if="module.completed" class="wireframe-button wireframe-button-small wireframe-button-secondary">Review</div>
              <div v-else-if="module.current" class="wireframe-button wireframe-button-small">Continue</div>
              <div v-else class="wireframe-button wireframe-button-small wireframe-button-disabled">Locked</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Resources -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Resources & Materials</div>
        </div>
        
        <div class="wireframe-resources-grid">
          <div class="wireframe-resource-card" v-for="(resource, index) in program.resources" :key="index">
            <div class="wireframe-resource-icon"></div>
            <div class="wireframe-resource-content">
              <div class="wireframe-resource-title">{{ resource.title }}</div>
              <div class="wireframe-resource-type">{{ resource.type }}</div>
              <div class="wireframe-resource-description">{{ resource.description }}</div>
            </div>
            <div class="wireframe-resource-actions">
              <div class="wireframe-button wireframe-button-small">Download</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Actions -->
      <div class="wireframe-section">
        <div class="wireframe-section-header">
          <div class="wireframe-section-title">Actions</div>
        </div>
        
        <div class="wireframe-actions-grid">
          <div class="wireframe-button wireframe-button-primary" v-if="program.status === 'not-started'">Start Program</div>
          <div class="wireframe-button wireframe-button-primary" v-else-if="program.status === 'active'">Continue Program</div>
          <div class="wireframe-button wireframe-button-secondary">View Progress Report</div>
          <div class="wireframe-button wireframe-button-secondary">Contact Care Provider</div>
          <div class="wireframe-button wireframe-button-secondary">Program Settings</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Get program data based on route parameter
const programId = computed(() => route.params.id)

const program = computed(() => {
  // This would normally fetch from an API or store
  // For now, return mock data based on programId
  const programs = {
    'cognitive-behavioral-therapy': {
      title: 'Cognitive Behavioral Therapy',
      description: '8-week program focusing on thought patterns and behavior modification',
      progress: 65,
      duration: '8 weeks',
      nextSession: 'Tomorrow 2:00 PM',
      status: 'active',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          title: 'Introduction to CBT',
          description: 'Understanding the basics of cognitive behavioral therapy',
          duration: '45 min',
          completed: true,
          current: false
        },
        {
          title: 'Identifying Negative Thoughts',
          description: 'Learning to recognize and challenge negative thought patterns',
          duration: '60 min',
          completed: true,
          current: false
        },
        {
          title: 'Thought Challenging Techniques',
          description: 'Practical exercises for challenging unhelpful thoughts',
          duration: '50 min',
          completed: false,
          current: true
        },
        {
          title: 'Behavioral Experiments',
          description: 'Testing new behaviors and thought patterns',
          duration: '55 min',
          completed: false,
          current: false
        },
        {
          title: 'Relapse Prevention',
          description: 'Strategies for maintaining progress and preventing setbacks',
          duration: '40 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'CBT Workbook',
          type: 'PDF',
          description: 'Complete workbook with exercises and worksheets'
        },
        {
          title: 'Thought Record Template',
          type: 'PDF',
          description: 'Template for recording and analyzing thoughts'
        },
        {
          title: 'Relaxation Techniques Guide',
          type: 'PDF',
          description: 'Step-by-step guide to relaxation exercises'
        }
      ]
    },
    'mindfulness-stress-reduction': {
      title: 'Mindfulness & Stress Reduction',
      description: '6-week mindfulness-based stress reduction program',
      progress: 0,
      duration: '6 weeks',
      nextSession: 'Start anytime',
      status: 'not-started',
      careOrganization: 'Mental Health Center Amsterdam',
      organizationType: 'Specialized Clinic',
      modules: [
        {
          title: 'Introduction to Mindfulness',
          description: 'Understanding mindfulness and its benefits',
          duration: '30 min',
          completed: false,
          current: false
        },
        {
          title: 'Body Scan Meditation',
          description: 'Learning the body scan technique for relaxation',
          duration: '45 min',
          completed: false,
          current: false
        },
        {
          title: 'Breathing Exercises',
          description: 'Various breathing techniques for stress reduction',
          duration: '35 min',
          completed: false,
          current: false
        },
        {
          title: 'Mindful Movement',
          description: 'Gentle yoga and movement practices',
          duration: '40 min',
          completed: false,
          current: false
        }
      ],
      resources: [
        {
          title: 'Mindfulness Guide',
          type: 'PDF',
          description: 'Comprehensive guide to mindfulness practices'
        },
        {
          title: 'Meditation Audio Files',
          type: 'Audio',
          description: 'Guided meditation recordings'
        }
      ]
    }
  }
  
  return programs[programId.value] || programs['cognitive-behavioral-therapy']
})

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'In Progress'
    case 'not-started': return 'Not Started'
    case 'completed': return 'Completed'
    default: return status
  }
}
</script>

<style scoped>
/* Wireframe Program Detail Styles */
.wireframe-program-detail {
  padding: 24px;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
}

.wireframe-header {
  margin-bottom: 32px;
  border: 2px solid #333;
  padding: 20px;
  border-radius: 4px;
  background: white;
  color: #333;
}

.wireframe-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.wireframe-subtitle {
  color: #666;
  font-size: 16px;
}

.wireframe-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.wireframe-section {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 24px;
}

.wireframe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #333;
}

.wireframe-section-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.wireframe-program-status-badge {
  padding: 6px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.wireframe-program-status-badge.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-program-status-badge.not-started {
  background: #9E9E9E;
  color: white;
  border-color: #9E9E9E;
}

.wireframe-program-status-badge.completed {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.wireframe-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.wireframe-overview-item {
  border: 2px solid #333;
  border-radius: 4px;
  padding: 16px;
}

.wireframe-overview-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.wireframe-overview-value {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.wireframe-progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wireframe-progress-bar {
  width: 100%;
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
  font-size: 12px;
  color: #666;
  text-align: right;
}

.wireframe-modules-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wireframe-module-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-module-item.wireframe-module-completed {
  background: #f0f8f0;
  border-color: #4CAF50;
}

.wireframe-module-item.wireframe-module-current {
  background: #fff8e1;
  border-color: #FF9800;
}

.wireframe-module-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
}

.wireframe-module-completed .wireframe-module-icon {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.wireframe-module-current .wireframe-module-icon {
  background: #FF9800;
  color: white;
  border-color: #FF9800;
}

.wireframe-module-content {
  flex: 1;
}

.wireframe-module-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-module-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-module-duration {
  font-size: 12px;
  color: #999;
}

.wireframe-resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.wireframe-resource-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  gap: 16px;
}

.wireframe-resource-icon {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 4px;
  flex-shrink: 0;
}

.wireframe-resource-content {
  flex: 1;
}

.wireframe-resource-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.wireframe-resource-type {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.wireframe-resource-description {
  font-size: 14px;
  color: #666;
}

.wireframe-actions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.wireframe-button {
  padding: 8px 16px;
  border: 2px solid #333;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  background: white;
  transition: all 0.2s;
}

.wireframe-button:hover {
  border-color: #666;
  border-width: 2px;
}

.wireframe-button-primary {
  background: #333;
  color: white;
}

.wireframe-button-primary:hover {
  background: #666;
  border-color: #666;
}

.wireframe-button-secondary {
  background: white;
  color: #333;
}

.wireframe-button-small {
  padding: 6px 12px;
  font-size: 12px;
}

.wireframe-button-disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
  .wireframe-overview-grid,
  .wireframe-resources-grid {
    grid-template-columns: 1fr;
  }
  
  .wireframe-actions-grid {
    flex-direction: column;
  }
}
</style>
