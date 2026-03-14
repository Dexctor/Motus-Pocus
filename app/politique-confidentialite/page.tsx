import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Motus Pocus',
  description: 'Politique de confidentialité et protection des données personnelles du site motuspocus.fr.',
  robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialite() {
  return (
    <main
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '120px 20px 80px',
        color: 'rgba(255,255,255,0.75)',
        fontSize: '15px',
        lineHeight: 1.7,
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: '28px',
          color: '#fff',
          marginBottom: '32px',
          letterSpacing: '-0.02em',
        }}
      >
        Politique de confidentialité
      </h1>

      <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
        Dernière mise à jour : mars 2026
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          1. Responsable du traitement
        </h2>
        <p>
          <strong>Motus Pocus</strong> — Gaël<br />
          Email : <a href="mailto:motuspocus.lab@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>motuspocus.lab@gmail.com</a>
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          2. Données collectées
        </h2>
        <p>Les données suivantes sont collectées via le formulaire de contact :</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>Type de projet sélectionné</li>
          <li>URL du site / SaaS</li>
          <li>Prénom</li>
          <li>Adresse email professionnelle</li>
          <li>Message (optionnel)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          3. Finalité du traitement
        </h2>
        <p>
          Les données sont collectées dans le seul but de répondre à votre demande de contact
          et d&apos;évaluer si votre projet est aligné avec les services proposés.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          4. Base légale
        </h2>
        <p>
          Le traitement est fondé sur votre consentement (article 6.1.a du RGPD),
          exprimé par la soumission volontaire du formulaire de contact.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          5. Destinataires
        </h2>
        <p>
          Les données sont transmises uniquement à Gaël (Motus Pocus) via email.
          Aucune donnée n&apos;est vendue, louée ou transmise à des tiers à des fins commerciales.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          6. Durée de conservation
        </h2>
        <p>
          Les données sont conservées pendant une durée maximale de 12 mois
          à compter de la dernière interaction, puis supprimées.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          7. Vos droits
        </h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li><strong>Accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Rectification</strong> — corriger des données inexactes</li>
          <li><strong>Suppression</strong> — demander l&apos;effacement de vos données</li>
          <li><strong>Opposition</strong> — vous opposer au traitement</li>
          <li><strong>Portabilité</strong> — recevoir vos données dans un format lisible</li>
        </ul>
        <p style={{ marginTop: '8px' }}>
          Pour exercer ces droits, contactez{' '}
          <a href="mailto:motuspocus.lab@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>motuspocus.lab@gmail.com</a>.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          8. Cookies
        </h2>
        <p>
          Ce site n&apos;utilise aucun cookie publicitaire, de suivi ou d&apos;analytics tiers.
          Aucune donnée de navigation n&apos;est collectée automatiquement.
        </p>
      </section>

      <section>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          9. Réclamation
        </h2>
        <p>
          En cas de litige, vous pouvez adresser une réclamation auprès de la
          CNIL (Commission Nationale de l&apos;Informatique et des Libertés) :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            cnil.fr
          </a>
        </p>
      </section>

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
        <a
          href="/"
          style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}
        >
          ← Retour au site
        </a>
      </div>
    </main>
  )
}
