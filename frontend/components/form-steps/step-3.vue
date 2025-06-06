<script setup lang="ts">
import { computed } from 'vue'
import { getDocumentUrl } from '../../services/api'
import { useSignalementStore } from '../../stores/signalement'

const store = useSignalementStore()
const emit = defineEmits(['restart'])

// Create a computed property for the document URL
const documentUrl = computed(() => getDocumentUrl(store.currentId))

// Function to handle document download
const downloadDocument = () => {
  // Create an invisible anchor element
  const a = document.createElement('a')
  a.href = documentUrl.value
  a.download = `signalement-${store.currentId}.odt`
  a.target = '_blank'

  // Append to body, click, and remove to trigger download
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div class="confirmation-container">
    <DsfrAlert type="success" title="Merci pour votre signalement" />

    <div class="confirmation-content">
      <section class="confirmation-section">
        <p>
          Dans quelques instants vous recevrez un document pré-rempli qui estime le montant de votre
          préjudice. Ce document est indispensable pour votre plainte. Vous pourrez terminer de le
          compléter et l'ajouter à votre procédure.
        </p>
        <p>
          La brigade compétente va également recevoir un résumé des informations que vous avez
          rempli. Pour signer votre plainte, appelez la brigade afin de convenir d'un rendez-vous.
        </p>
      </section>

      <section class="confirmation-section document-section">
        <div class="document-header">
          <span class="document-icon">📄</span>
          <h3 class="document-title">Document disponible</h3>
        </div>
        <p>Le document récapitulatif de votre signalement est prêt, vous pouvez le télécharger:</p>

        <button class="fr-btn download-button" @click="downloadDocument">
          <span class="fr-icon-download-line" aria-hidden="true"></span>
          Télécharger le document
        </button>
      </section>

      <section class="confirmation-section">
        <h3>📞 Demandez conseil à un enquêteur environnement</h3>
        <p>
          Vous avez une question, besoin d'un renseignement ou d'un conseil spécifique ? Contactez
          un gendarme spécialisé (Enquêteur environnement) via
          <a
            href="#"
            class="fr-link fr-icon-external-link-line fr-link--icon-right"
            target="_blank"
          >
            ProtectEnvi sur Tchap
          </a>
        </p>
        <p>Nous nous engageons à vous répondre le plus rapidement possible.</p>
      </section>

      <section class="confirmation-section">
        <h3>📑 Procédure administrative</h3>
        <p>
          Si vous souhaitez plus d'informations concernant la procédure administrative rendez-vous
          <a
            href="#"
            class="fr-link fr-icon-external-link-line fr-link--icon-right"
            target="_blank"
          >
            sur le guide pas à pas
          </a>
          de la Région Île de France (ACDéchets).
        </p>
      </section>

      <section class="confirmation-section">
        <h3>🙋🏻‍♂️ Conseils pratiques</h3>
        <p>
          Retrouvez des conseils pratiques sur l'application à destination des élus :
          <a
            href="#"
            class="fr-link fr-icon-external-link-line fr-link--icon-right"
            target="_blank"
          >
            Gend'Elu
          </a>
        </p>
      </section>

      <!-- Restart button with updated styling -->
      <div class="action-buttons">
        <button class="fr-btn restart-button" @click="$emit('restart')">
          Faire un nouveau signalement
          <span class="fr-icon-arrow-right-line" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirmation-container {
  max-width: 800px;
  margin: 0 auto;
}

.confirmation-content {
  background: var(--background-contrast-grey);
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
  margin-top: 1.5rem;
}

.confirmation-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-default-grey);
}

.confirmation-section:last-of-type {
  margin-bottom: 1.5rem;
  padding-bottom: 0;
  border: none;
}

.document-section {
  background-color: #f5f5fe; /* Light blue background */
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e3e3fd;
}

.document-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.document-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.document-title {
  margin: 0;
  color: #000091; /* DSFR blue */
}

h3 {
  color: var(--text-title-grey);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

p {
  line-height: 1.5;
  margin: 0.5rem 0;
}

.download-button {
  background-color: #000091; /* DSFR blue */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  margin-top: 1rem;
}

.download-button .fr-icon-download-line {
  margin-right: 0.5rem;
}

.action-buttons {
  margin-top: 2rem;
  text-align: center;
}

.restart-button {
  background-color: #000091; /* DSFR blue */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.restart-button .fr-icon-arrow-right-line {
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .confirmation-container {
    padding: 0 0.5rem;
  }
  .confirmation-content {
    padding: 1.5rem;
  }
}
</style>
