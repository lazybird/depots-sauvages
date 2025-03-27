<template>
  <div class="home-page">
    <DsfrCallout v-if="currentStep !== 3">
      <p>
        Ce formulaire vous permet de signaler un dépôt sauvage aux autorités compétentes. Votre
        signalement sera traité dans les plus brefs délais.
      </p>
    </DsfrCallout>

    <WasteReportForm @step-change="updateStep" />
  </div>
</template>

<script setup lang="ts">
import WasteReportForm from '@/components/waste-report-form.vue'
import { ref } from 'vue'

const currentStep = ref(1)

const updateStep = (step: number) => {
  currentStep.value = step
}
</script>

<style scoped>
.home-page {
  max-width: 1000px;
  margin: 0 auto;
}

.fr-callout {
  margin-bottom: 2rem;
}
</style>
