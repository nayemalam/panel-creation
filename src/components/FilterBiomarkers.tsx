import React, { useEffect } from 'react'
import { Biomarker } from '../types'

type Props = {
  biomarkers: Biomarker[]
  setFilteredBiomarkers: (biomarkers: Biomarker[]) => void
}

const FilterBiomarkers = ({ biomarkers, setFilteredBiomarkers }: Props) => {
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    if (query === '') {
      setFilteredBiomarkers(biomarkers)
    } else {
      const filtered = biomarkers.filter((biomarker: Biomarker) =>
        biomarker.name.toLowerCase().includes(query)
      )
      setFilteredBiomarkers(filtered)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault()
        document.getElementById('search-biomarkers').focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="!my-4 !mx-1">
      <input
        id="search-biomarkers"
        type="text"
        placeholder="Search biomarkers..."
        onChange={handleFilter}
        className="input input-bordered w-full p-2 border rounded foucs:ring-[#03A588] focus:ring-2 focus:ring-[#03A588] focus:ring-opacity-50 focus-visible:!ring-[#03A588] focus-visible:ring-2 focus-visible:ring-opacity-50 focus:outline-none"
        autoComplete="off"
      />
      <p className="text-gray-500 text-sm text-center mt-2">
        {biomarkers.length} biomarkers found
      </p>
    </div>
  )
}

export default FilterBiomarkers
