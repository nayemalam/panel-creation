import { Button, Tooltip } from '@chakra-ui/react'
import { Disclosure } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  QueueListIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Biomarker, FilterSelectTypes, Panel } from '../types'
import BiomarkerDetails from './BiomarkerDetails'

type Props = {
  panels: Panel[]
  biomarkers: Biomarker[]
}

const PanelList = ({ panels, biomarkers }: Props) => {
  const storedFilter = JSON.parse(localStorage.getItem('filter'))
  const [filter, setFilter] = useState<
    { cardView: boolean; listView: boolean } | undefined
  >({
    cardView: !!storedFilter ? storedFilter?.cardView : true,
    listView: !!storedFilter ? storedFilter?.listView : false,
  })

  const handleFilterSelect = (filterType: FilterSelectTypes) => {
    setFilter({
      cardView: filterType === 'card',
      listView: filterType === 'list',
    })
    localStorage.setItem(
      'filter',
      JSON.stringify({
        cardView: filterType === 'card',
        listView: filterType === 'list',
      })
    )
  }

  const sortedPanelsById = useMemo(() => {
    return panels.sort((a, b) => b.id - a.id)
  }, [panels])

  return (
    <>
      {panels?.length > 0 && (
        <span className="isolate flex rounded-md justify-end pb-4">
          <Tooltip
            hasArrow
            label="Card view"
            placement="top"
            className="p-2 rounded-md !text-sm !text-white !bg-[#2D3748]"
          >
            <Button
              className={`relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 ${
                filter.cardView ? '!bg-gray-300' : ''
              }`}
              onClick={() => handleFilterSelect('card')}
            >
              <Squares2X2Icon
                className="h-5 w-5 text-gray-800"
                aria-hidden="true"
              />
            </Button>
          </Tooltip>
          <Tooltip
            hasArrow
            label="List view"
            placement="top"
            className="p-2 rounded-md !text-sm !text-white !bg-[#2D3748]"
          >
            <Button
              className={`relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10
          ${filter.listView ? '!bg-gray-300' : ''}`}
              onClick={() => handleFilterSelect('list')}
            >
              <QueueListIcon
                className="h-5 w-5 text-gray-800"
                aria-hidden="true"
              />
            </Button>
          </Tooltip>
        </span>
      )}

      {panels.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filter?.cardView &&
              sortedPanelsById?.map((panel, index) => (
                <AnimatePresence key={`${panel.panelName}-${index}`}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="card border bg-white shadow-md p-4 rounded"
                  >
                    {filter.cardView && (
                      <div className="card-body">
                        <div className="border-b border-gray-200 pb-2 flex items-center gap-4">
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {panel.panelName}
                          </h3>
                          <p className="text-sm">
                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                              {panel.collectionMethod}
                            </span>
                          </p>
                        </div>

                        <BiomarkerDetails
                          selectedBiomarkers={panel.selectedBiomarkers}
                          biomarkers={biomarkers}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ))}
          </div>
          {filter.listView &&
            sortedPanelsById?.map((panel, index) => (
              <AnimatePresence key={`${panel.panelName}-${index}`}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card border bg-white shadow-md p-4 rounded my-2"
                >
                  <dl className="divide-y divide-gray-900/10 border-gray-900/10">
                    <Disclosure as="div" className="py-2">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-center justify-between text-left text-gray-900">
                              <div className="flex items-center gap-4">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                  {panel.panelName}
                                </h3>
                                <p className="text-sm">
                                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                    {panel.collectionMethod}
                                  </span>
                                </p>
                              </div>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <ChevronUpIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ChevronDownIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <BiomarkerDetails
                              selectedBiomarkers={panel.selectedBiomarkers}
                              biomarkers={biomarkers}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </dl>
                </motion.div>
              </AnimatePresence>
            ))}
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p>No panels created yet</p>
        </div>
      )}
    </>
  )
}

export default PanelList
