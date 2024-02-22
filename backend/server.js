const express = require('express')
const axios = require('axios')
const cors = require('cors') // Import the cors module

const app = express()
const PORT = process.env.PORT || 5001

// Middleware to parse JSON bodies
app.use(express.json())

// Enable CORS for all origins
app.use(cors())

// todo: put in env
const apiKey = 'sk_us_rKaxGngfgN1C2Y2pxpdibQ9Y_Ui1y100JE4NzEi1YMA'

const BASE_URL = 'https://api.sandbox.tryvital.io/v3'

app.get('/api/vital/markers', async (req, res) => {
  try {
    // Make a request to the API endpoint with the provided API key using Axios
    const response = await axios.get(`${BASE_URL}/lab_tests/markers`, {
      headers: {
        accept: 'application/json',
        'x-vital-api-key': apiKey,
      },
    })

    const data = response.data
    res.json(data)
  } catch (error) {
    console.error('Error fetching markers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/vital/collection_methods', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/lab_tests/labs`, {
      headers: {
        accept: 'application/json',
        'x-vital-api-key': apiKey,
      },
    })

    const data = response.data.reduce((acc, lab) => {
      lab.collection_methods.forEach((method) => {
        if (!acc.includes(method)) {
          acc.push(method)
        }
      })
      return acc
    }, [])

    res.json(data)
  } catch (error) {
    console.error('Error fetching collection methods:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
