# Vital Panel Creation Application ⚕️
This application allows users to create panels consisting of biomarkers for lab testing. Users can select from a list of biomarkers, filter them, and create custom panels with a name, biomarkers, and a collection method.

## Task
1. List biomarkers:
   - fetches biomarkers from vital API (fetchBiomarkers) and stores them in state (biomarkers and filteredBiomarkers).
   - This API is being fetched in our backend (see `backend/server.js`)
  
2. Filter the list of biomarkers:
   - local filtering (FilterBiomarkers component) where users can search for biomarkers by name

3. Create a panel with a name, a set of biomarkers, and a collection method:
   - The CreatePanelForm component allows users to create panels by typing a panel name, selecting a collection method and selecting as many biomarkers.
   - users can add multiple biomarkers to a panel.
   - button added to save the panel (i.e. Save Panel button).

4. See a list of created panels:
   - The PanelList component displays a list of created panels.

5. React and TypeScript:
   - The code is written in React and TypeScript as requested.

#### Bonus:
- loading states are handled with isLoadingBiomarkers and isSavingPanel states.
- error handling is implemented in the useEffect hook for fetching biomarkers, with a fallback to local biomarkers (local_biomarkers).
- accessibility; inputs have appropriate accessibility attributes (placeholder, aria-label, etc.).
- UX: The UI provides feedback to users during loading, saving states and fallback options.
- tried to copy Vital's button colors to ensure consistency
- responsive design: designed to work across different screen sizes.
- filtering output: card view and list view (easier to see all the panels)
- CMD+K functionality: users can use the `CMD+K` shortcut to focus on the biomarkers search input
- collection methods and biomarkers are stored in localStorage since these items don't change often and can be reused across sessions; also to avoid unnecessary API calls
- sorting descending order for the list of panels

## How To Run
To run the application locally: 

1. Clone or download .zip file
2. cd into the folder `vital-frontend-task/backend`
3. Install dependencies using `npm install`.
4. cd into the folder `vital-frontend-task`
5. Install dependencies using `yarn install`.
6. Obtain an API key or use the hardcoded sandbox one listed in the app.
7. Run the application using `yarn start:app` (this will run both the backend and the frontend)

Backend will be running on `http://localhost:5001` 
Frontend will be running on `http://localhost:3000`

The Backend API calls configured are:
- `GET /api/vital/markers` to fetch the list of biomarkers
- `GET /api/vital/collection_methods` to fetch the list of collection methods: retrieves all collection methods, removes any duplicates and returns an array of collection methods

If you want to run the applications individually:
- backend: `cd backend` and run `node server.js`
- frontend: `cd frontend` and run `yarn start`

If you want to build and run it in production:
- run the backend first: `cd backend` and run `node server.js`
- `yarn build` and `yarn preview`
  
## Dependencies
- React hook Form: simplifies form management and validation.
- Axios: helps for making HTTP requests to the Vital API.
- Framer Motion: animation capabilities for a smoother user experience.
- TailwindCSS: utility based css framework, helps to iterate design faster
- ChakraUI: since the company uses it, it made sense to also include it in the project

## Notes
I spent approximately 2.5 hours on this task. 

Some compromises were made in terms of functionality, that is, 
- not having any delete or update functionalities, though it would be nice to have
- didn't put api key in environment variable but that should be a must
- focused more on design and mobile friendly
- didn't have time to write tests but that would be ideal
- the application currently manages panels client-side in memory since there is no API endpoint for creating panels
- I did a few error handling but additional error handling and validation could be implemented for user inputs and API responses

___

# vital-frontend-task

This is a blank project to start the task with. You are expected to add all the necessary files and folders to complete the task.
This provides you with a Dockerfile to build the image and run the project, which expects a `yarn start` command to be available.

## Running the project

Build the image:

`docker build -t vital .`

To run this project:

`docker run --rm -p 8000:8000 vital`