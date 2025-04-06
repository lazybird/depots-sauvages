<script setup lang="ts">
import '@/assets/styles/form-steps.css'
import { computed } from 'vue'
import { useSignalementStore } from '../../stores/signalement'
import { indicesDisponiblesOptions, yesNoOptions } from './form-data'

const store = useSignalementStore()

const showPrejudiceAmount = computed(() => store.formData.connaissezVousMontantPrejudice === 'oui')
const showPrejudiceEstimation = computed(
  () => store.formData.connaissezVousMontantPrejudice === 'non'
)

const handleSubmit = (event: Event) => {
  event.preventDefault()
  store.updateStep(3)
}

const handlePrevious = () => store.updateStep(1)
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <DsfrRadioButtonSet
        v-model="store.formData.auteurIdentifie"
        name="auteur-identifie"
        legend="L'auteur des faits est-il identifié ?"
        :options="yesNoOptions"
        required
      />

      <DsfrRadioButtonSet
        v-model="store.formData.souhaitePorterPlainte"
        name="souhaite-porter-plainte"
        legend="Souhaitez-vous déposer plainte ?"
        :options="yesNoOptions"
        required
      />

      <div class="fr-form-group">
        <legend class="fr-fieldset__legend fr-text--regular">
          🔍 Des indices pourraient-ils permettre d'identifier l'auteur
        </legend>
        <div class="fr-fieldset__content">
          <div
            v-for="option in indicesDisponiblesOptions"
            :key="option.value"
            class="fr-checkbox-group"
          >
            <input
              type="checkbox"
              :id="option.id"
              :name="option.name"
              :value="option.value"
              v-model="store.formData.indicesDisponibles"
            />
            <label class="fr-label" :for="option.id">{{ option.label }}</label>
          </div>
        </div>
      </div>

      <DsfrInput
        v-model="store.formData.commentairesSupplementaires"
        label="Avez vous d'autres éléments à ajouter"
        hint="N'inscrivez AUCUNE donnée personnelle"
        :isTextarea="true"
      />

      <hr />

      <DsfrRadioButtonSet
        v-model="store.formData.arreteMunicipalExiste"
        name="arrete-municipal"
        legend="Disposez-vous d'un arrêté ou d'une délibération municipale encadrant ce type d'infraction et fixant le montant d'un forfait d'enlévement ?"
        :options="yesNoOptions"
        required
      />

      <DsfrRadioButtonSet
        v-model="store.formData.connaissezVousMontantPrejudice"
        name="connait-montant"
        legend="Connaissez-vous le montant du préjudice subi ?"
        :options="yesNoOptions"
        required
      />

      <template v-if="showPrejudiceAmount">
        <DsfrInput
          v-model="store.formData.montantPrejudice"
          type="number"
          label="Quel est le montant du préjudice ?"
          hint="En euros (€)"
          required
        />
      </template>

      <template v-if="showPrejudiceEstimation">
        <p class="fr-hint-text">Répondez à ces 5 questions pour pouvoir l'estimer :</p>
        <DsfrInput
          v-model="store.formData.nombrePersonnesMobilisees"
          type="number"
          label="Combien de personnes doivent être mobilisées ?"
          hint="Élus et/ou agents"
          required
        />
        <DsfrInput
          v-model="store.formData.dureeInterventionHeures"
          type="number"
          label="Pendant combien d'heures ?"
          hint="Durée totale de l'intervention"
          required
        />
        <DsfrInput
          v-model="store.formData.nombreVehicules"
          type="number"
          label="Combien de véhicules doivent être mobilisés ?"
          required
        />
        <DsfrInput
          v-model="store.formData.kilometrage"
          type="number"
          label="Combien de kilomètres doivent être parcourus ?"
          hint="Distance totale aller-retour"
          required
        />
        <DsfrInput
          v-model="store.formData.autresCouts"
          type="number"
          label="Indiquer ici le montant d'autres coûts éventuels"
          hint="Prestation service externes, surcout en déchetterie, etc. (en €)"
        />
      </template>

      <div class="form-actions">
        <DsfrButton
          type="button"
          label="Précédent"
          icon="fr-icon-arrow-left-line"
          secondary
          @click="handlePrevious"
        />
        <DsfrButton type="submit" label="Suivant" icon="fr-icon-arrow-right-line" icon-right />
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 600px;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
