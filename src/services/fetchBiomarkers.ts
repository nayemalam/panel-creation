import axios from 'axios'

export const fetchBiomarkers = async () => {
  try {
    const response = await axios.get(`http://localhost:5001/api/vital/markers`)
    const data = response.data
    return data
  } catch (error) {
    console.error('Fetching biomarkers failed', error)
    // Handle error
    throw error
  }
}
