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
      typesDepot: [] as string[],
      precisionsDepot: '',
      photoDispo: false,
      photos: [] as File[],

      // Step 2
      auteurIdentifie: false,
      souhaitePorterPlainte: false,
      indicesDisponibles: [] as string[],
      precisionsIndices: '',
      arreteMunicipalExiste: 'non' as 'oui' | 'non',
      prejudiceMontantConnu: 'non' as 'oui' | 'non',
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
      try {
        const data = await createResource(API_URLS.signalements, toApiFormat(this.formData))
        return data
      } catch (error) {
        console.error('Error saving form data:', error)
        throw error
      }
    },
  },
})

// Export store type
export type SignalementStore = ReturnType<typeof useSignalementStore>
