import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

export default function ModalAdd({open, setOpen, fields, reload}) {
  const [forms, setForms] = useState({})
  useEffect(() => {
    if(fields){
      const getField = fields.map(field => field.name)
      let obj = {}
      getField.map(field => { 
        obj[field] = ''
      })
      setForms(obj)
    }
  }, [fields])
  
  const handleChange = (value, key) => {
    setForms({
      ...forms,
      [key]: value
    })
  }

  const handleSubmit = async () => {
    try {
      const id = Math.random().toString(36).substr(2) + Date.now().toString(36);
      const senData = {
        id,
        ...forms
      }
      // const response = await axios.post('https://company.free.beeceptor.com/api/company', forms)
      const response = localStorage.getItem('companies')
      if(response){
        const data = JSON.parse(response)
        localStorage.setItem('companies', JSON.stringify([...data, senData]))
      } else {
        localStorage.setItem('companies', JSON.stringify([senData]))
      }
      setOpen(false)
      await reload()
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Add Company
                  </DialogTitle>
                  <div className="mt-4">
                    <form className="mb-2 w-full">
                      {
                        fields.map((field, i) => {
                          return field.type === 'input' ? 
                          <div className="mb-4" key={i}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                              {field.label}
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={field.name} type="text" placeholder={field.label} onChange={(e) => handleChange(e.target.value, field.name)}/>
                          </div> :
                           <div className="mb-4" key={i}>
                           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                             {field.label}
                           </label>
                           <div className="relative">
                              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={(e) => handleChange(e.target.value, field.name)}>
                                <option value="">Select</option>
                                {
                                  field.options.map((option, o) => <option value={option.value} key={o}>{option.name}</option>)
                                }
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                              </div>
                            </div>
                         </div>
                        })
                      }
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
