import { createRouter, createWebHistory } from 'vue-router'
import DashboardContent from '@/components/DashboardContent.vue'
import ProgramsQuestionnaires from '@/components/ProgramsQuestionnaires.vue'
import ProgramDetail from '@/components/ProgramDetail.vue'
import QuestionnaireDetail from '@/components/QuestionnaireDetail.vue'
import TherapielandOverview from '@/components/TherapielandOverview.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardContent
  },
  {
    path: '/my-therapieland',
    name: 'My therapieland',
    component: TherapielandOverview
  },
  {
    path: '/programs-questionnaires',
    name: 'Programs & Questionnaires',
    component: ProgramsQuestionnaires
  },
  {
    path: '/program/:id',
    name: 'Program Detail',
    component: ProgramDetail
  },
  {
    path: '/questionnaire/:id',
    name: 'Questionnaire Detail',
    component: QuestionnaireDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
