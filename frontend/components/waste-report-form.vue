<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getInitialFormData, STEPS } from './form-steps/form-data'
import Step1 from './form-steps/step-1.vue'
import Step2 from './form-steps/step-2.vue'
import Step3 from './form-steps/step-3.vue'

// State
const currentStep = ref(1)
const formData = ref(getInitialFormData())

// Computed
const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === STEPS.length)
const currentStepTitle = computed(() => STEPS[currentStep.value - 1])
const isConfirmationStep = computed(() => currentStep.value === STEPS.length)

// Methods
const goToNextStep = () => !isLastStep.value && currentStep.value++
const goToPreviousStep = () => !isFirstStep.value && currentStep.value--

const handleStepValidation = (stepData) => {
  formData.value = {
    ...formData.value,
    ...stepData,
  }
  goToNextStep()
}

const resetForm = () => {
  currentStep.value = 1
  formData.value = getInitialFormData()
}

const emit = defineEmits(['stepChange'])

watch(currentStep, (newStep) => {
  emit('stepChange', newStep)
})
</script>

<template>
  <div class="waste-report">
    <div class="form-header">
      <DsfrStepper :steps="STEPS" :current-step="currentStep" />
    </div>

    <div v-if="!isLastStep" class="form-wrapper">
      <div class="form-content">
        <Step1 v-if="currentStep === 1" :on-valid-step="handleStepValidation" />
        <Step2
          v-if="currentStep === 2"
          :on-valid-step="handleStepValidation"
          @previous="goToPreviousStep"
        />
        <Step3 v-if="currentStep === 3" @restart="resetForm" />
      </div>
    </div>

    <!-- Confirmation step -->
    <div v-else class="form-wrapper confirmation-step">
      <Step3 @restart="resetForm" />
    </div>
  </div>
</template>

<style scoped>
.waste-report {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.form-wrapper {
  margin: 0;
  max-width: 800px;
}

.form-content {
  min-height: 200px;
  margin: 2rem 0;
}

.confirmation-step {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  color: var(--text-default-success);
  margin-bottom: 1rem;
  font-size: 2rem;
}

@media (min-width: 768px) {
  .waste-report {
    padding: 0;
    margin: 0 auto;
    max-width: 1000px;
  }

  .form-wrapper {
    padding: 0;
  }
}
</style>
