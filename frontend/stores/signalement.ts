import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface SignalementForm {
  // Step 1 - Location and Basic Info
  commune: string
  adresseDepot: string
  date: string
  heure: string
  auteurSignalement: string
  natureTerrain: string
  volumeDechets: string
  typesDechets: string[]
  precisionsDechets: string
  hasPhotos: 'oui' | 'non'
  photos: File[]

  // Step 2 - Investigation Details
  auteurIdentifie: boolean
  souhaitePorterPlainte: boolean
  indicesDisponibles: string[]
}

// Simple type for our form data
type FormData = {
  commune: string
  adresseDepot: string
  date: string
  heure: string
  // ... other fields
}

export const useSignalementStore = defineStore('signalement', () => {
  // State
  const formData = ref<FormData>({
    commune: '',
    adresseDepot: '',
    date: '',
    heure: '',
    auteurSignalement: '',
    natureTerrain: '',
    volumeDechets: '',
    typesDechets: [],
    precisionsDechets: '',
    hasPhotos: 'non',
    photos: [],
    auteurIdentifie: false,
    souhaitePorterPlainte: false,
    indicesDisponibles: [],
  })

  const currentStep = ref(1)

  // Actions
  function updateStep(step: number) {
    currentStep.value = step
  }

  function updateFormData(data: Partial<FormData>) {
    formData.value = { ...formData.value, ...data }
  }

  function resetForm() {
    formData.value = {
      commune: '',
      adresseDepot: '',
      date: '',
      heure: '',
      auteurSignalement: '',
      natureTerrain: '',
      volumeDechets: '',
      typesDechets: [],
      precisionsDechets: '',
      hasPhotos: 'non',
      photos: [],
      auteurIdentifie: false,
      souhaitePorterPlainte: false,
      indicesDisponibles: [],
    }
    currentStep.value = 1
  }

  // Getters
  const isStep1Valid = computed(() => {
    return (
      formData.value.commune &&
      formData.value.adresseDepot &&
      formData.value.date &&
      formData.value.heure
    )
  })

  const isStep2Valid = computed(() => {
    // Add validation logic for step 2
    return true
  })

  return {
    // State
    formData,
    currentStep,

    // Actions
    updateStep,
    updateFormData,
    resetForm,

    // Getters
    isStep1Valid,
    isStep2Valid,
  }
})
