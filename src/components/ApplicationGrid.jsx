import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import application_name_icon from '../components/assests/application_name_icon.svg';
import application_options_icon from '../components/assests/application_options_icon.svg';
import calendar_icon from '../components/assests/calendar.svg';
import copy_icon from '../components/assests/copy_icon.svg';
import databases_icon from '../components/assests/databases_icon.svg';
import endpoints_icon from '../components/assests/endpoints_icon.svg';
import key_icon from '../components/assests/key_icon.svg';
import folder_open from '../components/assests/folder-open.svg';
import edit_icon from '../components/assests/edit-2.svg';
import trash_icon from '../components/assests/trash.svg';
import redo from '../components/assests/redo.svg';
import {
  DisplayAPIKey, formatDate, copyToClipboard,
  ToastSuccessMessage, ToastErrorMessage, generateRandomString
} from '../libs/utils'
import { LightButton } from './Buttons';
import { API_BASE_URL, TEST_TOKEN, USER_ID } from '../libs/consts';
import UpudateApplicationPanel from './UpdateApplicationPanel'
import { useNavigate } from 'react-router-dom';


const client = new ApolloClient({
  uri: `${API_BASE_URL}/gql`,
  cache: new InMemoryCache(),
});

const GET_APPLICATIONS = gql`
  query {
    applications(orderBy: "created_at", user_id: ${USER_ID}) {
      nodes {
        ID
        api_key
        name
        updated_at
      }
      totalCount
    }
  }
`;

const GET_APPLICATION_DATABASE_COUNT = gql`
  query Databases($applicationID: Int!) {
    databases(ApplicationID: $applicationID) {
      totalCount
    }
  }
`;

const GET_APPLICATION_ENDPOINT_COUNT = gql`
  query Endpoints($applicationID: Int!) {
    endpoints(ApplicationID: $applicationID) {
      totalCount
    }
  }
`;

export default function ApplicationGrid() {
  return (
    <ApolloProvider client={client}>
      <ApplicationGridWithData />
    </ApolloProvider>
  );
}

function ApplicationGridWithData() {
  const { loading, error, data } = useQuery(GET_APPLICATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
      {data.applications.nodes.map((application) => {
        return <BoxWrapper applicationData={application}/>;
      })}
    </div>
  );
}

function BoxWrapper({ applicationData }) {
  const { name, api_key, ID, updated_at } = applicationData;
  var dbResponse = useQuery(GET_APPLICATION_DATABASE_COUNT, {
    variables: { applicationID: ID },
  });
  let databaseCount = 0
  if (dbResponse.data) {
    databaseCount = dbResponse.data.databases.totalCount
  }

  var endpointResponse = useQuery(GET_APPLICATION_ENDPOINT_COUNT, {
    variables: { applicationID: ID },
  });
  let endpointCount = 0
  if (endpointResponse.data) {
    endpointCount = endpointResponse.data.endpoints.totalCount
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [nameValue, setInput1Value] = useState('');
  const [appKeyValue, setInput2Value] = useState('');

  const handleEditButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClosePanel = () => {
    setIsDrawerOpen(false)
  };

  const handleNameChange = (e) => {
    setInput1Value(e.target.value);
  };

  const handleAppKeyChange = (event) => {
    setInput2Value(event.target.value);
  };

  const handleAutoGenerateClickFunction = () => {
    const randomValue = generateRandomString();
    setInput2Value(randomValue);
  };


  const handleOptionButtonClick = () => {
    setIsHidden(!isHidden);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied, isError, isSuccess]);

  async function handleDeleteAction() {
    try {
      await axios.delete(`${API_BASE_URL}/database/${ID}/delete`, {
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

  async function handleEdit(e) {
    e.preventDefault();
    let payload = {}
    if (nameValue !== "") {
      payload.name = nameValue
    }
    if (appKeyValue !== "") {
      payload.api_key = appKeyValue
    }

    try {
      await axios.patch(`${API_BASE_URL}/application/${ID}/update`, payload, {
        headers: {
          'Authorization': 'Bearer ' + TEST_TOKEN
        }
      });
      setIsSuccess(true)
      window.location.reload()
    } catch (e) {
      setIsError(true)
    }
  };

  const navigate = useNavigate();

  const handleOpenApplication = () => {
    const application_id = ID
    const application_name = name
    navigate(`/application/${encodeURIComponent(application_id)}/${encodeURIComponent(application_name)}`);
  };

  return (
    <div className="flex-col items-start px-3 py-4 bg-white h-60 p-[0.75rem 1rem] rounded-md shadow-md">
      <div className="flex justify-between items-center h-1/6 border-b-2 mb-3 pb-4 cursor-pointer" onClick={handleOpenApplication}>
        <div className='text-black font-bold text-xl'>{name}</div>
        <div>
          <img src={application_name_icon}
            alt='application name icon' />
        </div>
      </div>
      <div className="flex flex-col items-start h-4/6 space-y-4">
        <div className='flex gap-2 mt-3 items-center cursor-pointer' onClick={handleOpenApplication}>
          <div>
            <img src={databases_icon} alt='databases icon' />
          </div>
          <span className='text-base font-normal'>Database: </span>
          <span className='text-base font-bold'>{databaseCount}</span>
        </div>
        <div className='flex gap-2 items-center cursor-pointer'>  {/* TODO: add action to open endpoint page here */}
          <div>
            <img src={endpoints_icon} alt='endpoint icon' />
          </div>
          <span className='text-base font-normal'>Endpoints: </span>
          <span className='text-base font-bold'>{endpointCount}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={key_icon} alt='key icon' />
          </div>
          <span className='text-base font-normal whitespace-nowrap'>API Key: </span>
          <DisplayAPIKey api_key={api_key} />
          {isCopied && <ToastSuccessMessage variable={'Copied to clipboard!'} />}
          <button onClick={() => {
            copyToClipboard(api_key);
            setIsCopied(true);
          }}>
            <img src={copy_icon} alt='copy icon' />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center h-1/6">
        <div className={`flex justify-between items-start gap-1 ${isHidden ? ' hidden' : ''}`} id="dateDiv">
          <div>
            <img src={calendar_icon}
              alt='calendar icon' />
          </div>
          <div className='text-black font-normal text-sm' >
            {formatDate(updated_at, 0)}
          </div>
        </div>
        <div className='bg-gray-200 items-center'>
          <button onClick={handleOptionButtonClick} className={`flex items-center justify-center rounded-md ${isHidden ? 'hidden' : ''}  py-1 px-0.5 w-7 h-7 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50`}>
            <img src={application_options_icon} alt='application options icon' className="" />
          </button>

          {isOpen && (
            <div className='flex gap-2 bg-white -ml-1'>
              <button onClick={() => { setIsHidden(false); setIsOpen(false) }} className='flex items-center justify-center rounded-md py-1 px-0.5 bg-gray-200 w-8 h-7 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50'>
                <img src={redo} alt='back button' className="w-6 h-6" />
              </button>
              <div className='flex gap-3 ml-2'>
                <LightButton variable={"Open"} icon={folder_open} onClickAction={handleOpenApplication}/>
                <LightButton variable={"Edit"} icon={edit_icon} onClickAction={handleEditButtonClick} className='cursor-pointer'/>
                <LightButton variable={"Delete"} icon={trash_icon} borderColor={'border-rose-500'} textColor={'text-rose-500'} onClickAction={handleDeleteAction} />
              </div>
            </div>
          )}
        </div>
      </div>
      {isError && <ToastErrorMessage variable={'Error occured!'} />}
      {isSuccess && <ToastSuccessMessage variable={'Done!'} />}
      {isDrawerOpen && (
        <UpudateApplicationPanel onSubmitAction={handleEdit}
          appKeyValue={appKeyValue} nameValue={nameValue}
          handleAppKeyChange={handleAppKeyChange}
          handleNameChange={handleNameChange}
          handleClosePanel={handleClosePanel}
          handleAutoGenerateClick={handleAutoGenerateClickFunction}
        />
      )}
    </div>
  )
}
