import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../../components/ModalDelete';
import ModalAdd from '../../components/ModalAdd';
import ModalDetail from '../../components/ModalDetail';
import ModalEdit from '../../components/ModalEdit';

function Home() {
    const [active, setActive] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [datas, setDatas] = useState<any>([])
    const [dataActive, setDataActive] = useState<any>({})

    const fields = [
        {
            name: 'company_name',
            label: 'Company Name',
            type: 'input'
        },
        {
            name: 'email',
            label: 'Email',
            type: 'input'
        },
        {
            name: 'website',
            label: 'Website',
            type: 'input'
        },
        {
            name: 'employee_total',
            label: 'Employee Total',
            type: 'input'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                {
                    name: 'Active',
                    value: 'active'
                },
                {
                    name: 'Inactive',
                    value: 'inactive'
                }
            ]
        }
    ]

    const getData = async () => {
        try {
            // const response = await axios.get('https://company.free.beeceptor.com/api/company')
            // setDatas(response?.data)
            const response = localStorage.getItem('companies')
            if(response){
                setDatas(JSON.parse(response))
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (active && !event.target.closest('.dropdown')) {
            setActive('');
          }
        };
      
        window.addEventListener('click', handleOutsideClick);
      
        return () => window.removeEventListener('click', handleOutsideClick);
      }, [active]);

  return <div className="max-w-7xl mx-auto mt-4">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="flex justify-between my-4">
            <h1 className='uppercase font-bold '>Company Datas</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-sm" onClick={() => setOpenAdd(true)}>
                ADD
            </button>
        </div>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                      <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Company Name</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Website</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Employee Total</th>
                          <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Actions</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {
                        datas?.map((data, i) =>
                            <tr key={i}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{i + 1}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.company_name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {data.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {data.website}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {data.employee_total}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {
                                        data.status === 'active' ?
                                        <span className="flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        :
                                        <span className="flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    }
                                </td>
                                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="inline-block text-left" >
                                        <button type="button" className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none dropdown " id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setActive(data.id === active ? '' : data.id)}>
                                            <span className="sr-only"></span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                            
                                        </button>
                                        {
                                            active === data.id &&
                                            <div className="origin-top-right absolute right-32 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1} >
                                                <div className="" role="none" onClick={() => (setDataActive(data),setOpenDetail(true))}>
                                                    <a href="#" className="text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">
                                                        Detail
                                                    </a>
                                                </div>
                                                <div className="" role="none" onClick={() => (setDataActive(data),setOpenEdit(true))}> 
                                                    <a href="#" className="text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">
                                                        Edit
                                                    </a>
                                                </div>
                                                <div className="" role="none" onClick={() => (setDataActive(data),setOpenDelete(true))}>
                                                    <a href="#" className="text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                  </tbody>
              </table>
          </div>
      </div>
      <Modal open={openDelete} setOpen={setOpenDelete} data={dataActive} reload={getData}/>
      <ModalDetail open={openDetail} setOpen={setOpenDetail} fields={fields} data={dataActive}/>
      <ModalAdd open={openAdd} setOpen={setOpenAdd} fields={fields} reload={getData}/>
      <ModalEdit open={openEdit} setOpen={setOpenEdit} fields={fields} reload={getData}  data={dataActive}/>
    </div>
}

export default Home;
