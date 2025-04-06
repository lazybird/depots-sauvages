import { defineStore } from 'pinia'

interface SignalementForm {
  // Step 1
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

  // Step 2
  auteurIdentifie: boolean
  souhaitePorterPlainte: boolean
  indicesDisponibles: string[]
  commentairesSupplementaires: string
  arreteMunicipalExiste: 'oui' | 'non'
  connaissezVousMontantPrejudice: 'oui' | 'non'
  montantPrejudice: number
  nombrePersonnesMobilisees: number
  dureeInterventionHeures: number
  nombreVehicules: number
  kilometrage: number
  autresCouts: number
}

export const useSignalementStore = defineStore('signalement', {
  state: () => ({
    currentStep: 1,
    formData: {
      // Step 1
      commune: '',
      adresseDepot: '',
      auteurSignalement: '',
      date: '',
      heure: '',
      hasPhotos: 'non',
      photos: [],
      natureTerrain: '',
      volumeDechets: '',
      typesDechets: [],
      precisionsDechets: '',

      // Step 2
      auteurIdentifie: false,
      souhaitePorterPlainte: false,
      indicesDisponibles: [],
      commentairesSupplementaires: '',
      arreteMunicipalExiste: 'non',
      connaissezVousMontantPrejudice: 'non',
      montantPrejudice: 0,
      nombrePersonnesMobilisees: 0,
      dureeInterventionHeures: 0,
      nombreVehicules: 0,
      kilometrage: 0,
      autresCouts: 0,
    } as SignalementForm,
  }),

  actions: {
    updateStep(step: number) {
      this.currentStep = step
    },
  },
})
