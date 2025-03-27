<script setup lang="ts">
import '@/assets/styles/form-steps.css'
import { computed, ref } from 'vue'
import { getInitialFormData, indicesDisponiblesOptions, yesNoOptions } from './form-data'

const props = defineProps({
  onValidStep: {
    type: Function,
    required: true,
  },
})

const formData = ref(getInitialFormData())

const showPrejudiceAmount = computed(() => formData.value.connaissezVousMontantPrejudice === 'oui')
const showPrejudiceEstimation = computed(
  () => formData.value.connaissezVousMontantPrejudice === 'non'
)

const handleSubmit = () => {
  props.onValidStep(formData.value)
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <DsfrRadioButtonSet
        v-model="formData.auteurIdentifie"
        name="auteur-identifie"
        legend="L'auteur des faits est-il identifié ?"
        :options="yesNoOptions"
        required
      />

      <DsfrRadioButtonSet
        v-model="formData.souhaitePorterPlainte"
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
              v-model="formData.indicesDisponibles"
            />
            <label class="fr-label" :for="option.id">{{ option.label }}</label>
          </div>
        </div>
      </div>

      <DsfrInput
        v-model="formData.commentairesSupplementaires"
        label="Avez vous d'autres éléments à ajouter"
        hint="N'inscrivez AUCUNE donnée personnelle"
        isTextarea="true"
      />

      <hr />

      <DsfrRadioButtonSet
        v-model="formData.arreteMunicipalExiste"
        name="arrete-municipal"
        legend="Disposez-vous d'un arrêté ou d'une délibération municipale encadrant ce type d'infraction et fixant le montant d'un forfait d'enlévement ?"
        :options="yesNoOptions"
        required
      />

      <DsfrRadioButtonSet
        v-model="formData.connaissezVousMontantPrejudice"
        name="connait-montant"
        legend="Connaissez-vous le montant du préjudice subi ?"
        :options="yesNoOptions"
        required
      />

      <!-- Add the amount field when "Oui" is selected -->
      <DsfrInput
        v-if="showPrejudiceAmount"
        v-model="formData.montantPrejudice"
        type="number"
        label="Quel est le montant du préjudice ?"
        required
      />

      <!-- Add estimation fields when "Non" is selected -->
      <template v-if="showPrejudiceEstimation">
        <p class="fr-hint-text">Répondez à ces 5 questions pour pouvoir l'estimer :</p>
        <DsfrInput
          v-model="formData.nombrePersonnesMobilisees"
          type="number"
          label="Combien de personnes doivent être mobilisées ?"
          hint="Élus et/ou agents"
          required
        />

        <DsfrInput
          v-model="formData.dureeInterventionHeures"
          type="number"
          label="Pendant combien d'heures ?"
          required
        />

        <DsfrInput
          v-model="formData.nombreVehicules"
          type="number"
          label="Combien de véhicules doivent être mobilisés ?"
          required
        />

        <DsfrInput
          v-model="formData.kilometrage"
          type="number"
          label="Combien de kilomètres doivent être parcourus ?"
          required
        />

        <DsfrInput
          v-model="formData.autresCouts"
          type="number"
          label="Indiquer ici le montant d'autres coûts éventuels (en €)"
          hint="Prestation service externes, surcout en déchetterie, etc."
        />
      </template>

      <div class="form-actions">
        <DsfrButton
          type="button"
          label="Précédent"
          icon="fr-icon-arrow-left-line"
          secondary
          @click="$emit('previous')"
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
