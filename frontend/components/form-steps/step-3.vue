<script setup lang="ts">
import { useSignalementStore } from '@/stores/signalement'

const store = useSignalementStore()
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
            ProtectEnvi sur Tchap</a
          >
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
            sur le guide pas à pas</a
          >
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
            Gend'Elu</a
          >
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.confirmation-container {
  max-width: 800px;
}

.form-wrapper {
  padding: 0 1rem;
}

.success-title {
  color: var(--text-default-success);
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.confirmation-content {
  background: var(--background-contrast-grey);
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
}

.confirmation-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-default-grey);
}

.confirmation-section:last-of-type {
  margin-bottom: 2rem;
  padding-bottom: 0;
  border: none;
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

@media (max-width: 768px) {
  .confirmation-container {
    padding: 0 0.5rem;
  }

  .success-title {
    font-size: 1.5rem;
  }

  .confirmation-content {
    padding: 1.5rem;
  }
}
</style>
