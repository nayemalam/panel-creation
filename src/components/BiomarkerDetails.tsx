import { Biomarker } from '../types'

type Props = {
  selectedBiomarkers: string[]
  biomarkers: Biomarker[]
}

function BiomarkerDetails({ selectedBiomarkers, biomarkers }: Props) {
  const findBiomarkerDetails = (id) => biomarkers.find((b) => b?.id === id)

  return (
    <div className="mt-4">
      {(!selectedBiomarkers || selectedBiomarkers?.length === 0) && (
        <p className="text-sm text-gray-500">No selected biomarkers</p>
      )}
      {selectedBiomarkers &&
        selectedBiomarkers?.map((id) => {
          const biomarker = findBiomarkerDetails(Number(id))
          return (
            biomarker && (
              <div
                key={biomarker.id}
                className="mt-2 bg-gray-50 p-2 rounded px-4 border border-gray-200"
              >
                <p className="text-sm">{biomarker.description}</p>
                <div className="mt-1">
                  <p className="text-xs text-gray-600">
                    Type: {biomarker.type}
                  </p>
                  {biomarker.expected_results &&
                    biomarker.expected_results?.map((result) => (
                      <div key={result.id} className="mt-1">
                        <p className="text-xs text-gray-600">
                          {result?.name}: {result?.loinc?.name} (
                          {result?.loinc?.unit})
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )
          )
        })}
    </div>
  )
}

export default BiomarkerDetails
