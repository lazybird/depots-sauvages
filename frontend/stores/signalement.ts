import { defineStore } from 'pinia'
import { API_URLS, createOrUpdateResource } from '../services/api'
import type { SignalementFormData } from '../types/signalement'
import { fromApiFormat, toApiFormat } from '../types/signalement'

export const useSignalementStore = defineStore('signalement', {
  state: () => ({
    currentStep: 1,
    currentId: null as number | null,
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
      const data = await createOrUpdateResource(
        API_URLS.signalements,
        toApiFormat(this.formData),
        this.currentId
      )
      // Store the ID from the response if it's a new entry
      if (!this.currentId) {
        this.currentId = data.id
      }
      return data
    },

    // Add method to load existing data
    async loadSignalement(id: number) {
      try {
        const response = await fetch(`${API_URLS.signalements}${id}/`, {
          credentials: 'include',
        })
        if (!response.ok) throw new Error('Failed to load signalement')
        const data = await response.json()
        this.currentId = id
        // Transform API data back to form format
        this.formData = fromApiFormat(data)
      } catch (error) {
        console.error('Error loading signalement:', error)
        throw error
      }
    },
  },
})

// Export store type
export type SignalementStore = ReturnType<typeof useSignalementStore>
