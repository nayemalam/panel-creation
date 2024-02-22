import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import CreatePanelForm from './components/CreatePanelForm'
import PanelList from './components/PanelList'
import { local_biomarkers } from './constants'
import './index.css'
import { fetchBiomarkers } from './services/fetchBiomarkers'
import { Biomarker, Panel } from './types'

const App = () => {
  const [panels, setPanels] = useState<Panel[]>([])
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([])
  const [filteredBiomarkers, setFilteredBiomarkers] =
    useState<Biomarker[]>(biomarkers)
  const [isLoadingBiomarkers, setIsLoadingBiomarkers] = useState(true)
  const [isSavingPanel, setIsSavingPanel] = useState(false)

  const savePanel = (data: Panel) => {
    setIsSavingPanel(true)
    const newPanels = [...panels, data]
    setPanels(newPanels)
    localStorage.setItem('panels', JSON.stringify(newPanels))
    setIsSavingPanel(false)
  }

  useEffect(() => {
    const storedBiomarkers = localStorage.getItem('biomarkers')
    if (storedBiomarkers) {
      setBiomarkers(JSON.parse(storedBiomarkers))
      setFilteredBiomarkers(JSON.parse(storedBiomarkers))
      setIsLoadingBiomarkers(false)
      return
    }

    fetchBiomarkers()
      .then((data) => {
        setBiomarkers(data?.markers)
        setFilteredBiomarkers(data?.markers)
        localStorage.setItem('biomarkers', JSON.stringify(data?.markers))
      })
      .catch((error) => {
        // fallback
        setBiomarkers(local_biomarkers)
        setFilteredBiomarkers(local_biomarkers)
        console.error('An error occurred:', error)
      })
      .finally(() => {
        setIsLoadingBiomarkers(false)
      })
  }, [])

  useEffect(() => {
    const storedPanels = localStorage.getItem('panels')
    if (storedPanels) {
      setPanels(JSON.parse(storedPanels))
    }
  }, [])

  return (
    <div className="p-6">
      <CreatePanelForm
        panels={panels}
        biomarkers={biomarkers}
        filteredBiomarkers={filteredBiomarkers}
        setFilteredBiomarkers={setFilteredBiomarkers}
        onSave={savePanel}
        isLoadingBiomarkers={isLoadingBiomarkers}
        isSavingPanel={isSavingPanel}
      />
      <PanelList panels={panels} biomarkers={biomarkers} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
