export type FilterSelectTypes = 'card' | 'list'

type ExpectedResults = {
  id: number
  name: string
  slug: string
  lab_id: number
  provider_id: string | null
  loinc: {
    id: number
    name: string
    slug: string
    code: string
    unit: string
  }
}

export type Biomarker = {
  id: number
  name: string
  slug: string
  description: string
  lab_id: number
  provider_id: string
  type: string
  unit: null
  price: string
  expected_results: ExpectedResults[]
}

export type CollectionMethod = 'testkit' | 'at_home_phlebotomy' | 'walk_in_test'

export type Panel = {
  id: number
  panelName: string
  collectionMethod: string
  selectedBiomarkers: string[]
}
