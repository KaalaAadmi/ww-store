'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalContent, ModalTrigger } from '../ui/animated-modal'
// import { Button } from '@headlessui/react'
import { SizeTable } from '../size-table'
import { data } from '@/lib/size-data'
import { Button } from '../ui/button'

const SIZE_CATEGORIES = {
  apparel: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  poster: ['5"x7"', 'A2', 'A1'],
}

type VariantSelectorProps = {
  colors: string[]
  sizes: string[]
  category:
    | 'tshirt'
    | 'poster'
    | 'hoodie'
    | 'mug'
    | 'sticker'
    | 'phone-case'
    | 'hat'
    | 'bag'
    | 'inner'
  setActiveColor: React.Dispatch<React.SetStateAction<string | null>>
  setActiveSize: React.Dispatch<React.SetStateAction<string | null>>
  activeColor: string | null
  activeSize: string | null
}

export function VariantSelector({
  colors,
  sizes,
  category,
  setActiveColor,
  setActiveSize,
  activeColor,
  activeSize,
}: VariantSelectorProps) {
  // Determine available sizes based on category
  const availableSizes = category === 'poster' ? SIZE_CATEGORIES.poster : SIZE_CATEGORIES.apparel
  const [units, setUnits] = useState<string>('inches')
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    // Update filteredData when the units change
    const filtered = data.filter((item) => item.unit === units)
    setFilteredData(filtered)
  }, [units])
  sizes.includes('_5x7') && sizes.push('5"x7"')

  // Find unavailable sizes
  const unavailableSizes = availableSizes.filter((size) => !sizes.includes(size))

  // Active states
  // const [activeColor, setActiveColor] = useState<string | null>(null)
  // const [activeSize, setActiveSize] = useState<string | null>(null)

  const handleColorClick = (color: string) => {
    setActiveColor((prev: string | null) => (prev === color ? null : color))
  }

  const handleSizeClick = (size: string) => {
    setActiveSize((prev: string | null) => (prev === size ? null : size))
  }

  return (
    <div className="variant-selector">
      {/* Colors */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm uppercase tracking-wide">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isActive = activeColor === color

            return (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                  {
                    'ring-2 ring-blue-600': isActive,
                    'hover:ring-blue-600 ring-1 ring-transparent transition duration-300 ease-in-out':
                      !isActive,
                  },
                )}
              >
                {color}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-sm uppercase tracking-wide">Sizes</h3>
          <div className="flex items-center justify-between">
            {/* <h3 className="text-sm font-medium text-gray-900">Size</h3> */}
            <Modal className="bg-white">
              <ModalTrigger className="mb-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                <span
                  onClick={(e) => e.preventDefault()}
                  className="text-indigo-600 hover:text-indigo-500 mb-4 text-sm uppercase"
                >
                  Size Guide
                </span>
              </ModalTrigger>

              <ModalBody>
                <ModalContent>
                  <h4 className="text-lg md:text-2xl text-neutral-950 font-bold text-center mb-8">
                    Size Guide Information
                  </h4>
                  <div className="flex w-full justify-center items-center gap-2 pb-2">
                    <Button
                      className="hover:bg-indigo-500 hover:text-white"
                      variant={units === 'inches' ? 'primary' : 'secondary'}
                      onClick={(e) => {
                        e.preventDefault()
                        setUnits('inches')
                      }}
                    >
                      <span>Inches</span>
                    </Button>
                    <Button
                      className="hover:bg-indigo-500 hover:text-white"
                      variant={units === 'cm' ? 'primary' : 'secondary'}
                      onClick={(e) => {
                        e.preventDefault()
                        setUnits('cm')
                      }}
                    >
                      <span>Centimeters</span>
                    </Button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <SizeTable data={filteredData} />
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => {
              const isUnavailable = unavailableSizes.includes(size)
              const isActive = activeSize === size

              return (
                <button
                  key={size}
                  onClick={() => !isUnavailable && handleSizeClick(size)}
                  disabled={isUnavailable}
                  aria-disabled={isUnavailable}
                  title={isUnavailable ? `${size} (Not Available)` : size}
                  className={clsx(
                    'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                    {
                      'ring-2 ring-blue-600': isActive,
                      'hover:ring-blue-600 ring-1 ring-transparent transition duration-300 ease-in-out':
                        !isActive && !isUnavailable,
                      'text-neutral-500 ring-1 ring-neutral-300 cursor-not-allowed dark:text-neutral-400 dark:ring-neutral-700':
                        isUnavailable,
                    },
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
