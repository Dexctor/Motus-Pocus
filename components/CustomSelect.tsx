'use client'

import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
  icon: string
  desc: string
}

const OPTIONS: Option[] = [
  { value: 'conversion', label: 'Vidéo Conversion',         icon: '🎬', desc: 'Hero section · 60–90 sec' },
  { value: 'onboarding', label: 'Vidéo Onboarding',         icon: '🚀', desc: 'Post-signup · 60–120 sec' },
  { value: 'ads',        label: 'Vidéo Ads',                icon: '📱', desc: 'LinkedIn / YouTube · 15–30 sec' },
  { value: 'boost',      label: 'Package Boost',            icon: '⚡', desc: '1 vidéo · 1 500–2 000 €' },
  { value: 'scale',      label: 'Package Scale',            icon: '📈', desc: '2 vidéos · 2 800–3 500 €' },
  { value: 'growth',     label: 'Package Growth',           icon: '🏆', desc: 'Pack complet · 4 500–6 500 €' },
  { value: 'other',      label: 'Je ne sais pas encore',    icon: '💬', desc: 'On en discute ensemble' },
]

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export default function CustomSelect({ value, onChange, required }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const selected = OPTIONS.find((o) => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Hidden native select for form validation / submission */}
      <select
        name="type"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      >
        <option value="">—</option>
        {OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${open ? 'rgba(62,207,142,0.4)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: open ? '8px 8px 0 0' : '8px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: open ? '0 0 0 3px rgba(62,207,142,0.07)' : 'none',
        }}
      >
        {selected ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px' }}>{selected.icon}</span>
            <span style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{selected.label}</span>
          </span>
        ) : (
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>
            Choisissez une option…
          </span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          style={{
            flexShrink: 0,
            color: 'rgba(255,255,255,0.35)',
            transition: 'transform 0.25s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown list */}
      <div
        role="listbox"
        className="custom-select-dropdown"
        style={{
          maxHeight: open ? '360px' : '0px',
          opacity: open ? 1 : 0,
          overflowY: open ? 'auto' : 'hidden',
        }}
      >
        {OPTIONS.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => { onChange(option.value); setOpen(false) }}
              className={`custom-select-option${isSelected ? ' selected' : ''}`}
            >
              <span style={{ fontSize: '18px', width: '26px', textAlign: 'center', flexShrink: 0 }}>
                {option.icon}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isSelected ? 'var(--accent)' : '#fff',
                  lineHeight: 1.3,
                }}>
                  {option.label}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '2px',
                }}>
                  {option.desc}
                </span>
              </span>
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
