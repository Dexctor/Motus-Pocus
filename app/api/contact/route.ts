import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/contact
 *
 * Pour activer l'envoi d'email, deux options :
 *
 * ── Option A : Resend (recommandé) ──────────────────────────────
 * 1. npm install resend
 * 2. Créer un compte sur resend.com et obtenir une clé API
 * 3. Ajouter dans .env.local : RESEND_API_KEY=re_xxxx
 * 4. Décommenter le bloc Resend ci-dessous
 *
 * ── Option B : Formspree (sans code) ───────────────────────────
 * Remplacer le fetch('/api/contact') dans Contact.tsx par :
 * action="https://formspree.io/f/VOTRE_ID" method="POST"
 * et supprimer ce fichier.
 * ───────────────────────────────────────────────────────────────
 */

// ── Décommenter pour Resend ──
// import { Resend } from 'resend'
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, email, url, type, message, _trap } = body

    // Honeypot — bots fill hidden fields, humans don't
    if (_trap) {
      return NextResponse.json({ success: true }) // Silent reject
    }

    if (!prenom || !email || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // ── Bloc Resend (décommenter + installer resend) ──
    // await resend.emails.send({
    //   from: 'Site Motus Pocus <no-reply@motuspocus.fr>',
    //   to: 'motuspocus.lab@gmail.com',
    //   replyTo: email,
    //   subject: `Nouveau contact — ${type || 'Non précisé'}`,
    //   text: [
    //     `Prénom : ${prenom}`,
    //     `Email : ${email}`,
    //     `Type de projet : ${type || 'Non précisé'}`,
    //     `Message :\n${message}`,
    //   ].join('\n\n'),
    // })

    // ── Log de développement (à retirer en prod) ──
    console.log('Contact form submission:', { prenom, email, url, type, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
