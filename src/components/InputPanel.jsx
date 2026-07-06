import { useEffect, useRef, useState } from 'react'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

function StateDropdown() {
  const [selectedState, setSelectedState] = useState('California')

  return (
    <div>
      <label htmlFor="property-state" className="text-sm font-medium text-slate-700">
        Property Location (State)
      </label>
      <div className="relative mt-2">
        <select
          id="property-state"
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
          aria-label="Property location state"
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        >
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

function SliderNumberField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  ariaLabel,
  minCaption,
  maxCaption,
}) {
  const [draft, setDraft] = useState(String(value))
  const isEditingRef = useRef(false)

  useEffect(() => {
    if (!isEditingRef.current) {
      setDraft(String(value))
    }
  }, [value])

  const percent = ((value - min) / (max - min)) * 100

  const commitDraft = (raw) => {
    const parsed = parseFloat(raw)
    if (Number.isFinite(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed))
      onChange(clamped)
      return clamped
    }
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm font-semibold text-slate-400">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            onFocus={() => {
              isEditingRef.current = true
            }}
            onChange={(event) => {
              const raw = event.target.value
              if (!/^\d*\.?\d*$/.test(raw)) return
              setDraft(raw)
              if (raw !== '' && raw !== '.') commitDraft(raw)
            }}
            onBlur={() => {
              isEditingRef.current = false
              const clamped = commitDraft(draft)
              setDraft(clamped !== null ? String(clamped) : String(value))
            }}
            aria-label={`${ariaLabel}, exact value`}
            className={`w-24 rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-right text-sm font-bold text-emerald-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-28 ${
              prefix ? 'pl-6' : 'pl-3'
            } ${suffix ? 'pr-6' : 'pr-3'}`}
          />
          {suffix && (
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-sm font-semibold text-slate-400">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          isEditingRef.current = false
          onChange(Number(event.target.value))
        }}
        aria-label={ariaLabel}
        aria-valuetext={`${prefix}${value}${suffix}`}
        style={{ '--range-progress': `${percent}%` }}
        className="premium-slider mt-4 w-full cursor-pointer touch-manipulation"
      />
      <div className="mt-1.5 flex justify-between text-xs text-slate-400">
        <span>{minCaption}</span>
        <span>{maxCaption}</span>
      </div>
    </div>
  )
}

function InputPanel({ monthlyBill, setMonthlyBill, stateTaxRate, setStateTaxRate }) {
  return (
    <section
      className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      aria-label="Solar investment inputs"
    >
      <h2 className="text-lg font-semibold text-slate-900">Your Business Inputs</h2>

      <div className="mt-6 flex flex-col gap-6">
        <StateDropdown />

        <SliderNumberField
          id="monthly-bill"
          label="Average Monthly Electric Bill"
          value={monthlyBill}
          onChange={setMonthlyBill}
          min={500}
          max={50000}
          step={100}
          prefix="$"
          ariaLabel="Average monthly electric bill in US dollars"
          minCaption="$500"
          maxCaption="$50,000"
        />

        <SliderNumberField
          id="tax-rate"
          label="State Corporate Tax Rate"
          value={stateTaxRate * 100}
          onChange={(percent) => setStateTaxRate(percent / 100)}
          min={0}
          max={12}
          step={0.5}
          suffix="%"
          ariaLabel="State corporate tax rate percentage"
          minCaption="0%"
          maxCaption="12%"
        />
      </div>
    </section>
  )
}

export default InputPanel
