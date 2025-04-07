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
      arreteMunicipalExiste: 'non',
      prejudiceMontantConnu: 'non',
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

    async saveFormData() {
      const data = await createResource(API_URLS.signalements, toApiFormat(this.formData))
      return data
    },
  },
})

// Export store type
export type SignalementStore = ReturnType<typeof useSignalementStore>
