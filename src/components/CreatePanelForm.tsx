import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  hardcoded_collection_methods,
  mapCollectionMethods,
} from '../constants'
import { fetchCollectionMethods } from '../services/fetchCollectionMethods'
import { Biomarker, CollectionMethod, Panel } from '../types'
import FilterBiomarkers from './FilterBiomarkers'
import { Spinner } from './Spinner'

type Props = {
  panels: Panel[]
  biomarkers: Biomarker[]
  filteredBiomarkers: Biomarker[]
  setFilteredBiomarkers: (biomarkers: Biomarker[]) => void
  isLoadingBiomarkers: boolean
  onSave: (data: Panel) => void
  isSavingPanel: boolean
}

const CreatePanelForm = ({
  panels,
  biomarkers,
  filteredBiomarkers,
  setFilteredBiomarkers,
  isLoadingBiomarkers,
  onSave,
  isSavingPanel,
}: Props) => {
  const { register, handleSubmit, reset, formState } = useForm()
  const [collectionMethods, setCollectionMethods] = useState<
    CollectionMethod[]
  >([])
  const [fetchingCollectionMethods, setFetchingCollectionMethods] =
    useState(true)

  const onSubmit = (data: Panel) => {
    const dataWithId: Panel = {
      ...data,
      id: panels.length + 1,
    }
    onSave(dataWithId)
    reset()
    setFilteredBiomarkers(biomarkers)
  }

  useEffect(() => {
    const storedCollectionMethods = localStorage.getItem('collectionMethods')
    if (storedCollectionMethods) {
      setCollectionMethods(JSON.parse(storedCollectionMethods))
      setFetchingCollectionMethods(false)
      return
    }

    fetchCollectionMethods()
      .then((data) => {
        setCollectionMethods(data)
        localStorage.setItem('collectionMethods', JSON.stringify(data))
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
      .finally(() => {
        setFetchingCollectionMethods(false)
      })
  }, [])

  return (
    <div className="card border bg-white shadow-sm p-4 mb-4 rounded">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('panelName', { required: true })}
          placeholder="Panel Name"
          className="input input-bordered w-full p-2 border rounded foucs:ring-[#03A588] focus:ring-2 focus:ring-[#03A588] focus:ring-opacity-50 focus-visible:!ring-[#03A588] focus-visible:ring-2 focus-visible:ring-opacity-50 focus:outline-none"
          autoComplete="off"
          autoFocus
          required
        />
        {fetchingCollectionMethods ? (
          <div className="cursor-not-allowed input input-bordered w-full p-2 border rounded border-transparent border-r-8 outline outline-[#e5e7eb] outline-1 flex items-center gap-4">
            Loading <Spinner />
          </div>
        ) : (
          <select
            {...register('collectionMethod')}
            className="input input-bordered w-full p-2 border rounded border-transparent border-r-8 outline outline-[#e5e7eb] outline-1"
          >
            <option value="" disabled>
              Select a collection method
            </option>
            {(collectionMethods ?? hardcoded_collection_methods)?.map(
              (option) => (
                <option key={option} value={mapCollectionMethods[option]}>
                  {mapCollectionMethods[option] ?? option}
                </option>
              )
            )}
          </select>
        )}

        <fieldset className="space-y-2">
          <legend className="text-lg font-semibold">
            Biomarkers
            <span className="text-xs text-gray-500 ml-1">
              CMD+K to access this search easier
            </span>
          </legend>
          <FilterBiomarkers
            biomarkers={biomarkers}
            setFilteredBiomarkers={setFilteredBiomarkers}
          />
          <div className="max-h-96 overflow-y-auto">
            {filteredBiomarkers.map((biomarker, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={biomarker.id}
                  className="accent-[#03A588] w-4 h-4 text-[#03A588] border-gray-300 rounded focus:ring-[#03A588] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03A588] focus-visible:ring-opacity-50"
                  {...register('selectedBiomarkers')}
                />
                <span>{biomarker.name}</span>
              </label>
            ))}
          </div>

          {isLoadingBiomarkers && (
            <p className="text-gray-500 text-sm text-center">
              Loading biomarkers...
            </p>
          )}
          {filteredBiomarkers.length === 0 && !isLoadingBiomarkers && (
            <p className="text-gray-500 text-sm text-center">
              No biomarkers found
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="w-full btn btn-secondary px-4 py-2 bg-[#03A588] text-white rounded hover:bg-[#075144] focus:outline-none focus:ring-2 focus:ring-[#075144] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 disabled:focus:ring-gray-300 disabled:opacity-50"
          disabled={!formState?.isDirty || !formState?.isValid || isSavingPanel}
        >
          {isSavingPanel ? 'Saving...' : 'Save Panel'}
        </button>
      </form>
    </div>
  )
}

export default CreatePanelForm
