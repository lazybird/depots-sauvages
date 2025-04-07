// Base interface with snake_case for API
export interface SignalementData {
  // Step 1
  commune: string
  localisation_depot: string
  date_constat: string
  heure_constat: string
  auteur_signalement: string
  nature_terrain: string
  volume_depot: string
  types_depot: string[]
  precisions_depot: string
  photo_dispo: boolean

  // Step 2
  auteur_identifie: boolean
  souhaite_porter_plainte: boolean
  indices_disponibles: string[]
  precisions_indices: string
  arrete_municipal_existe: boolean
  prejudice_montant_connu: boolean
  prejudice_montant: number
  prejudice_nombre_personnes: number
  prejudice_nombre_heures: number
  prejudice_nombre_vehicules: number
  prejudice_kilometrage: number
  prejudice_autres_couts: number
}

// Store interface with camelCase
export interface SignalementFormData {
  // Step 1
  commune: string
  localisationDepot: string
  dateConstat: string
  heureConstat: string
  auteurSignalement: string
  natureTerrain: string
  volumeDepot: string
  typesDepot: string[]
  precisionsDepot: string
  photoDispo: boolean
  photos: File[] // Additional field for file handling

  // Step 2
  auteurIdentifie: boolean
  souhaitePorterPlainte: boolean
  indicesDisponibles: string[]
  precisionsIndices: string
  arreteMunicipalExiste: 'oui' | 'non'
  prejudiceMontantConnu: 'oui' | 'non'
  prejudiceMontant: number
  prejudiceNombrePersonnes: number
  prejudiceNombreHeures: number
  prejudiceNombreVehicules: number
  prejudiceKilometrage: number
  prejudiceAutresCouts: number
}

// Helper function to transform store data to API format
export const toApiFormat = (formData: SignalementFormData): SignalementData => ({
  commune: formData.commune,
  localisation_depot: formData.localisationDepot,
  date_constat: formData.dateConstat,
  heure_constat: formData.heureConstat,
  auteur_signalement: formData.auteurSignalement,
  nature_terrain: formData.natureTerrain,
  volume_depot: formData.volumeDepot,
  types_depot: formData.typesDepot,
  precisions_depot: formData.precisionsDepot,
  photo_dispo: formData.photoDispo,

  auteur_identifie: formData.auteurIdentifie,
  souhaite_porter_plainte: formData.souhaitePorterPlainte,
  indices_disponibles: formData.indicesDisponibles,
  precisions_indices: formData.precisionsIndices,
  arrete_municipal_existe: formData.arreteMunicipalExiste === 'oui',
  prejudice_montant_connu: formData.prejudiceMontantConnu === 'oui',
  prejudice_montant: formData.prejudiceMontant,
  prejudice_nombre_personnes: formData.prejudiceNombrePersonnes,
  prejudice_nombre_heures: formData.prejudiceNombreHeures,
  prejudice_nombre_vehicules: formData.prejudiceNombreVehicules,
  prejudice_kilometrage: formData.prejudiceKilometrage,
  prejudice_autres_couts: formData.prejudiceAutresCouts,
})
