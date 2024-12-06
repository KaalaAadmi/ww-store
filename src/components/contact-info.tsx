import React from 'react'
import { ContactInfoProps } from '../lib/constants'

const ContactInfo: React.FC<ContactInfoProps> = ({ title, description }) => (
  <div className="flex flex-col">
    <div className="text-lg font-bold text-black">{title}</div>
    <div className="text-base font-medium text-neutral-500">{description}</div>
  </div>
)

export default ContactInfo
