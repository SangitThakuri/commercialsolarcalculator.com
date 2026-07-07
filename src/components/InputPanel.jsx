import { useEffect, useRef, useState } from 'react'
import InfoTooltip from './InfoTooltip.jsx'
import { US_STATES } from '../data/usStates.js'

function StateDropdown() {
  const [selectedState, setSelectedState] = useState('California')

  return (
    <div>
      <div className="flex items-center gap-1.5">
        <label htmlFor="property-state" className="text-sm font-medium text-slate-700">
          Property Location (State)
        </label>
        <InfoTooltip
          id="property-state-tooltip"
          text="For your reference only — this does not automatically change the tax rate below. Set your state's corporate tax rate separately using the slider."
        />
      </div>
      <div className="relative mt-2">
        <select
          id="property-state"
          value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
          aria-label="Property location state"
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm font-medium text-slate-700 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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

export function SliderNumberField({
  id,
  label,
  tooltip,
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
  formatValue = (v) => String(v),
}) {
  const [draft, setDraft] = useState(formatValue(value))
  const [isDragging, setIsDragging] = useState(false)
  const [validationHint, setValidationHint] = useState(null)
  const isEditingRef = useRef(false)
  const hintTimeoutRef = useRef(null)

  useEffect(() => {
    if (!isEditingRef.current) {
      setDraft(formatValue(value))
    }
  }, [value, formatValue])

  useEffect(() => () => clearTimeout(hintTimeoutRef.current), [])

  const percent = ((value - min) / (max - min)) * 100

  const flashValidationHint = (message) => {
    setValidationHint(message)
    clearTimeout(hintTimeoutRef.current)
    if (message) {
      hintTimeoutRef.current = setTimeout(() => setValidationHint(null), 2600)
    }
  }

  const commitDraft = (raw) => {
    const parsed = parseFloat(raw)
    if (!Number.isFinite(parsed)) return null

    const clamped = Math.min(max, Math.max(min, parsed))
    if (clamped !== parsed) {
      flashValidationHint(
        `Adjusted to ${prefix}${formatValue(clamped)}${suffix} — allowed range is ${prefix}${formatValue(min)}${suffix} to ${prefix}${formatValue(max)}${suffix}.`,
      )
    }
    onChange(clamped)
    return clamped
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <label htmlFor={id} className="text-sm font-medium text-slate-700">
            {label}
          </label>
          {tooltip && <InfoTooltip id={`${id}-tooltip`} text={tooltip} />}
        </div>
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
              setDraft(String(value))
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
              setDraft(formatValue(clamped !== null ? clamped : value))
            }}
            aria-label={`${ariaLabel}, exact value`}
            className={`w-24 rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-right text-sm font-bold text-emerald-600 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-28 ${
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

      <div className="relative mt-4">
        {isDragging && (
          <span
            className="pointer-events-none absolute -top-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white shadow-lg"
            style={{ left: `${percent}%` }}
          >
            {prefix}
            {formatValue(value)}
            {suffix}
          </span>
        )}
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
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onKeyDown={() => setIsDragging(true)}
          onBlur={() => setIsDragging(false)}
          aria-label={ariaLabel}
          aria-valuetext={`${prefix}${value}${suffix}`}
          style={{ '--range-progress': `${percent}%` }}
          className="premium-slider w-full cursor-pointer touch-manipulation"
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-slate-400">
        <span>{minCaption}</span>
        <span>{maxCaption}</span>
      </div>
      {validationHint && (
        <p className="mt-1.5 text-xs font-medium text-amber-600" role="status">
          {validationHint}
        </p>
      )}
    </div>
  )
}

function InputPanel({ monthlyBill, setMonthlyBill, stateTaxRate, setStateTaxRate }) {
  return (
    <section
      className="animate-fade-in-up rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 print:shadow-none print:ring-0"
      aria-label="Solar investment inputs"
    >
      <h2 className="text-lg font-semibold text-slate-900">Your Business Inputs</h2>

      <div className="mt-6 flex flex-col gap-6">
        <StateDropdown />

        <SliderNumberField
          id="monthly-bill"
          label="Average Monthly Electric Bill"
          tooltip="Enter your average pre-solar monthly electric bill. This single number drives the system sizing and every savings estimate below."
          value={monthlyBill}
          onChange={setMonthlyBill}
          min={500}
          max={50000}
          step={100}
          prefix="$"
          ariaLabel="Average monthly electric bill in US dollars"
          minCaption="$500"
          maxCaption="$50,000"
          formatValue={(v) => Math.round(v).toLocaleString('en-US')}
        />

        <SliderNumberField
          id="tax-rate"
          label="State Corporate Tax Rate"
          tooltip="Your state's corporate income tax rate. Combined with the 21% federal rate, this sets your MACRS depreciation tax shield."
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
