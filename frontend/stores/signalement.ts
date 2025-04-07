import { defineStore } from 'pinia'
import { API_URLS, createResource } from '../services/api'
import type { SignalementFormData } from '../types/signalement'
import { toApiFormat } from '../types/signalement'

export const useSignalementStore = defineStore('signalement', {
  state: () => ({
    currentStep: 1,
    formData: {
      // Step 1
      commune: '',
      localisationDepot: '',
      dateConstat: '',
      heureConstat: '',
      auteurSignalement: '',
      natureTerrain: '',
      volumeDepot: '',
      typesDepot: [],
      precisionsDepot: '',
      photoDispo: false,
      photos: [],

      // Step 2
      auteurIdentifie: false,
      souhaitePorterPlainte: false,
      indicesDisponibles: [],
      precisionsIndices: '',
      arreteMunicipalExiste: false,
      prejudiceMontantConnu: false,
      prejudiceMontant: 0,
      prejudiceNombrePersonnes: 0,
      prejudiceNombreHeures: 0,
      prejudiceNombreVehicules: 0,
      prejudiceKilometrage: 0,
      prejudiceAutresCouts: 0,
    } as SignalementFormData,
  }),

  actions: {
    updateStep(step: number) {
      this.currentStep = step
    },

    updateBooleanField(field: keyof SignalementFormData, value: string) {
      if (typeof this.formData[field] === 'boolean') {
        this.formData[field] = value === ('oui' as never)
      }
    },

    async saveFormData() {
      const data = await createResource(API_URLS.signalements, toApiFormat(this.formData))
      return data
    },
  },
})

// Export store type
export type SignalementStore = ReturnType<typeof useSignalementStore>
