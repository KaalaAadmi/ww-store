import React from 'react'
import { FormFieldProps } from '../lib/constants'

const FormField: React.FC<FormFieldProps> = ({ id, type, placeholder, className }) => (
  <div className={className}>
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-7 py-5 bg-white rounded-2xl border border-black border-solid"
      aria-label={placeholder}
    />
  </div>
)

export default FormField
