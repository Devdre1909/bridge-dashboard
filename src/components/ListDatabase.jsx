import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import folder_open from '../components/assests/folder-open.svg';
import edit_icon from '../components/assests/edit-2.svg';
import trash_icon from '../components/assests/trash.svg';
import info_icon from '../components/assests/info-circle.svg';
import application_options_icon from '../components/assests/application_options_icon.svg';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { API_BASE_URL, TEST_TOKEN, } from '../libs/consts';
import {
  formatDate,
  ToastSuccessMessage, ToastErrorMessage,
} from '../libs/utils'
import AddDatabasePanel from './AddDatabasePanel';

const client = new ApolloClient({
  uri: `${API_BASE_URL}/gql`,
  cache: new InMemoryCache(),
});

const GET_DATABASES = gql`
  query Databases($applicationID: Int!) {
      databases(ApplicationID: $applicationID) {
          totalCount
          nodes {
              ApplicationID
              CreatedAt
              Database
              DbEngine
              Host
              ID
              Password
              Port
              UpdatedAt
              Username
          }
      }
  }
`

const GET_ENDPOINT_COUNT = gql`
query Endpoints($databaseID: Int!) {
    endpoints(DatabaseID: $databaseID) {
        totalCount
    }
}
`
export default function ListDatabase() {
  const { application_id } = useParams();
  return (
    <ApolloProvider client={client}>
      <DatabaseHeader application_id={application_id} />
    </ApolloProvider>
  );
}

function ListDatabaseWithData({ application_id }) {
  const { loading, error, data } = useQuery(GET_DATABASES, {
    variables: { applicationID: application_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data.databases.nodes.map((database, index) => {
        return <DatabaseBody index={index} databaseData={database} />;
      })}
    </>
  );
}

function DatabaseHeader({ application_id }) {
  return (
    <div className="table w-full">
      <div className='table-header-group bg-[#DEDEDF]'>
        <div className='table-row h-12'>
          <div className='table-cell text-left py-3 px-5 font-medium'>#</div>
          <div className='table-cell text-left py-3 font-medium'>Name</div>
          <div className='table-cell text-left py-3 font-medium'>Engine</div>
          <div className='table-cell text-left py-3 font-medium'>Endpoints</div>
          <div className='table-cell text-left py-3 font-medium'>Port</div>
          <div className='table-cell text-left py-3 font-medium'>Date created</div>
          <div className='table-cell'></div>
        </div>
      </div>
      <div className='table-row-group'>
        <ListDatabaseWithData application_id={application_id} />
      </div>
    </div>
  )
}

function DatabaseBody({ databaseData, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEditButtonClick = () => {
    setIsOpen(false)
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClosePanel = () => {
    setIsDrawerOpen(false)
  };

  const handleOptionButtonClick = () => {
    setIsOpen(!isOpen);
  };

  var endpointResponse = useQuery(GET_ENDPOINT_COUNT, {
    variables: { databaseID: databaseData.ID },
  });
  let endpointCount = 0
  if (endpointResponse.data) {
    endpointCount = endpointResponse.data.endpoints.totalCount
  }
  const buttonRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  async function handleDeleteAction() {
    try {
      await axios.delete(`${API_BASE_URL}/database/${databaseData.ID}/delete`, {
        headers: {
          'Authorization': 'Bearer ' + TEST_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      setIsSuccess(true)
      window.location.reload()
    } catch (e) {
      setIsError(true)
    }
  }

  const handleFormSubmit = async (data) => {
    const payload = {
      host: data.host,
      port: Number(data.port),
      database: data.database,
      username: data.username,
      password: data.password,
      db_engine: data.selectedDatabase
    };

    try {
      await axios.post(`${API_BASE_URL}/application/${databaseData.applicationID}/add-database`, payload, {
        headers: {
          'Authorization': 'Bearer ' + TEST_TOKEN
        }
      });
      setIsSuccess(true)
      window.location.reload()
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <div className='table-row'>
      <div className='table-cell px-5 py-4 font-bold text-base'>{index + 1}</div>
      <div className='table-cell font-bold text-base'>{databaseData.Database}</div>
      <div className='table-cell font-bold text-base'>{databaseData.DbEngine}</div>
      <div className='table-cell font-bold text-base'>{endpointCount}</div>
      <div className='table-cell font-bold text-base'>{databaseData.Port}</div>
      <div className='table-cell font-bold text-base'>{formatDate(databaseData.CreatedAt, 1)}</div>
      <div className='table-cell' ref={drawerRef}>
        <div className="relative">
          <button onClick={handleOptionButtonClick} className={`flex items-center justify-center rounded-md py-1 px-0.5 w-7 h-7 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50`} ref={buttonRef}>
            <img src={application_options_icon} alt='application options icon' />
          </button>
          {isOpen && (
            <div
              className="absolute right-0 z-10 bg-white mr-6 mt-3 rounded-lg"
              style={{
                top: buttonRef.current.offsetHeight,
              }}
            >
              <div className=''>
                <div className='flex gap-2 p-2 pr-8  text-gray-800 hover:bg-gray-200 cursor-pointer'>
                  <img src={folder_open} alt='folder open icon' />
                  <button>Open</button>
                </div>
                <div className='flex gap-2 p-2 pr-8 text-gray-800 hover:bg-gray-200 cursor-pointer' onClick={handleEditButtonClick}>
                  <img src={edit_icon} alt='edit icon' />
                  <button>Edit</button>
                </div>
                <div className='flex gap-2 p-2 pr-8 text-gray-800 hover:bg-gray-200 cursor-pointer'>
                  <img src={info_icon} alt='info icon' />
                  <button>Properties</button>
                </div>
                <div className='flex gap-2 p-2 pr-8 text-gray-800 hover:bg-gray-200 cursor-pointer' onClick={handleDeleteAction}>
                  <img src={trash_icon} alt='trash icon' />
                  <button>Delete</button>
                </div>
              </div>
            </div>
          )}
          {isDrawerOpen && (
            <AddDatabasePanel // TODO: populate input fields with existing values
              handleClosePanel={handleClosePanel}
              onFinalSubmitAction={handleFormSubmit}
            />
          )}
        </div>
        {isOpen && <div style={{ height: buttonRef.current.offsetHeight + 'px' }} />}
      </div>
      {isError && <ToastErrorMessage variable={'Error occured!'} />}
      {isSuccess && <ToastSuccessMessage variable={'Done!'} />}

    </div>
  );
}
