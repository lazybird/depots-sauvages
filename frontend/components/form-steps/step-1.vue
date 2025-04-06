<script setup lang="ts">
import '@/assets/styles/form-steps.css'
import { computed, ref } from 'vue'
import {
  auteurOptions,
  getInitialFormData,
  natureTerrainOptions,
  typesDechetsList,
  volumeOptions,
} from './form-data'
import { useSignalementStore } from '@/stores/signalement'

const props = defineProps({
  onValidStep: {
    type: Function,
    required: true,
  },
})

const store = useSignalementStore()

const formData = ref(getInitialFormData())

// Add hasPhotos field
formData.value.hasPhotos = 'non'

const showPhotoUpload = computed(() => formData.value.hasPhotos === 'oui')

const yesNoOptions = [
  { label: 'Oui', value: 'oui' },
  { label: 'Non', value: 'non' },
]

const handleSubmit = () => {
  if (store.isStep1Valid) {
    store.updateStep(2)
  }
}

const handleFileChange = (event) => {
  formData.value.photos = Array.from(event.target.files)
}
</script>

<template>
  <h2 class="step-question">Où se trouve le dépôt sauvage et comment vous contacter ?</h2>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <DsfrInput
        v-model="store.formData.commune"
        label="📍 Sur quelle commune a eu lieu le dépôt ?"
        required
      />

      <DsfrInput
        v-model="store.formData.adresseDepot"
        label="🏠 Quelle est l'adresse du dépôt de déchets ?"
        required
      />

      <DsfrSelect
        v-model="store.formData.auteurSignalement"
        label="👮 Qui a réalisé la constatation ?"
        :options="auteurOptions"
        required
      />

      <div class="date-time">
        <DsfrInput
          v-model="store.formData.date"
          type="date"
          label="🗓️ Date de constatation"
          required
        />
        <DsfrInput
          v-model="store.formData.heure"
          type="time"
          label="⏰ Heure de constatation"
          required
        />
      </div>

      <div class="photo-section">
        <DsfrRadioButtonSet
          v-model="store.formData.hasPhotos"
          name="has-photos"
          legend="📷 Avez-vous des photos du dépôt ?"
          :options="yesNoOptions"
          required
        />

        <DsfrFileUpload
          v-if="showPhotoUpload"
          v-model="store.formData.photos"
          label="Ajouter vos photos"
          hint="Formats acceptés : .jpg, .jpeg, .png, .pdf"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          @change="handleFileChange"
        />
      </div>

      <DsfrRadioButtonSet
        v-model="store.formData.natureTerrain"
        name="nature-terrain"
        legend="🌍 Nature du terrain"
        :options="natureTerrainOptions"
        required
      />

      <DsfrSelect
        v-model="store.formData.volumeDechets"
        label="📏 Volume estimé"
        :options="volumeOptions"
        required
      />

      <div class="fr-form-group">
        <legend class="fr-fieldset__legend fr-text--regular">🧱 Types de déchets</legend>
        <div class="fr-fieldset__content">
          <div v-for="option in typesDechetsList" :key="option.value" class="fr-checkbox-group">
            <input
              type="checkbox"
              :id="option.id"
              :name="option.name"
              :value="option.value"
              v-model="store.formData.typesDechets"
            />
            <label class="fr-label" :for="option.id">{{ option.label }}</label>
          </div>
        </div>
      </div>

      <DsfrTextarea
        v-model="store.formData.precisionsDechets"
        label="✏️ Précisions sur les déchets"
        hint="N'inscrivez AUCUNE DONNÉE personnelle"
      />

      <div class="form-actions">
        <DsfrButton type="submit" label="Suivant" icon="fr-icon-arrow-right-line" icon-right />
      </div>
    </form>
  </div>
</template>

<style scoped>
.photo-section {
  border-radius: 8px;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

.photo-section :deep(.fr-upload) {
  margin-top: 1rem;
}
</style>
