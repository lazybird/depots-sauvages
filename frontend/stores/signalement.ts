import { defineStore } from 'pinia'

export const useSignalementStore = defineStore('signalement', {
  state: () => ({
    currentStep: 1,
    formData: {
      // Step 1 - Location and Basic Info
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

      // Step 2 - Investigation Details
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
    },
  }),

  actions: {
    updateStep(step: number) {
      this.currentStep = step
    },
  },
})

// Export store type
export type SignalementStore = ReturnType<typeof useSignalementStore>
