import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — Motus Pocus',
  description: 'Mentions légales du site motuspocus.fr — informations légales obligatoires.',
  robots: { index: true, follow: true },
}

export default function MentionsLegales() {
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
        Mentions légales
      </h1>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          1. Éditeur du site
        </h2>
        <p>
          <strong>Motus Pocus</strong><br />
          Auto-entrepreneur — SIRET : en cours d&apos;immatriculation<br />
          Responsable de la publication : Gaël<br />
          Email : <a href="mailto:motuspocus.lab@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>motuspocus.lab@gmail.com</a>
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          2. Hébergement
        </h2>
        <p>
          Ce site est hébergé par Vercel Inc.<br />
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
          Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>vercel.com</a>
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          3. Propriété intellectuelle
        </h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, maquettes)
          est la propriété exclusive de Motus Pocus, sauf mention contraire.
          Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          4. Données personnelles
        </h2>
        <p>
          Les informations collectées via le formulaire de contact (prénom, email, URL, message)
          sont utilisées uniquement pour répondre à votre demande.
          Elles ne sont ni vendues ni transmises à des tiers.
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
          de vos données. Pour exercer ces droits, contactez{' '}
          <a href="mailto:motuspocus.lab@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>motuspocus.lab@gmail.com</a>.
        </p>
        <p style={{ marginTop: '8px' }}>
          Consultez notre{' '}
          <a href="/politique-confidentialite" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            politique de confidentialité
          </a>{' '}
          pour plus de détails.
        </p>
      </section>

      <section>
        <h2 style={{ fontWeight: 600, fontSize: '18px', color: '#fff', marginBottom: '12px' }}>
          5. Cookies
        </h2>
        <p>
          Ce site n&apos;utilise aucun cookie publicitaire ou de suivi tiers.
          Aucun outil d&apos;analytics tiers n&apos;est actuellement installé.
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
