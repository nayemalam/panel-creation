import axios from 'axios'

export const fetchCollectionMethods = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/vital/collection_methods`
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Fetching collection methods failed', error)
    // Handle error
    throw error
  }
}
