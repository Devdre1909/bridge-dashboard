import React, { useState, useRef, useEffect } from 'react';
import closeCircleIcon from '../components/assests/close-circle.svg';
import dropdownIcon from '../components/assests/arrow-down.svg';
import checkIcon from '../components/assests/tick-square.svg';
import { DarkButton } from './Buttons';
import { parseDatabaseURL } from '../libs/utils'

const DatabaseEngineDropDown = ({ onSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(null); 

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleButtonClick = (databaseEngine) => {
    setIsDropdownOpen(false);
    setSelectedEngine(databaseEngine);
    onSelection(databaseEngine);
  };

  const databaseEngines = [
    'MySQL',
    'PostgreSQL',
  ];

  return (
    <div>
      <button
        className="w-full border border-black h-10 flex items-center text-[#8A8A8D] gap-2 justify-between px-1 py-2"
        onClick={handleDropdownToggle}
      >
        {selectedEngine ? ( // Conditionally render the selected value or "Select"
          <span className='text-black'>{selectedEngine}</span>
        ) : (
          <span>Select</span>
        )}
        <img src={dropdownIcon} alt="dropdown icon" />
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-1 py-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-1/2">
          {databaseEngines.map((engine) => (
            <button
              key={engine}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              onClick={() => handleButtonClick(engine)}
            >
              {engine}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const CustomRadioButton = ({ id, name, value, label, isSelected, onRadioChange }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span
        className={`w-4 h-4 border border-black rounded-md mr-2 ${isSelected ? 'bg-black' : 'bg-white'
          }`}
        onClick={() => onRadioChange(value)}
      >
        {isSelected && (
          <img src={checkIcon} className="mx-auto my-auto" alt="Checkmark" />
        )}
      </span>
      {label}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden"
        checked={isSelected}
        readOnly
      />
    </label>
  );
};

const AuthenticationInputs = ({ userNameValue, passwordValue, onChangeAction }) => {
  return (
    <div>
      <div className='mt-6 mb-4'>
        <label className='font-bold'>Authentication</label>
      </div>
      <div className='my-4'>
        <label className='font-normal mb-4'>Username:</label>
        <input className="border border-gray-400 p-2 w-full" type="text"
          value={userNameValue}
          name="username"
          placeholder="postgres"
          onChange={onChangeAction}
        /> </div>
      <div className='my-4'>
        <label className='font-normal mb-4'>Password:</label>
        <input className="border border-gray-400 p-2 w-full" type="text"
          placeholder="password"
          name="password"
          value={passwordValue}
          onChange={onChangeAction}
        />
      </div>
    </div>
  )
}


const DatabaseMainForm = ({ onSubmitAction }) => {
  const [selectedOption, setSelectedOption] = useState('host');
  const [urlInput, setUrlInput] = useState('');

  const handleUrlChange = (e) => {
    e.preventDefault();
    setUrlInput(e.target.value);
  };

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    host: '',
    port: '',
    database: '',
  });

  const parseUrlData = (url) => {
    const connectionParams = parseDatabaseURL(url);
    const parsedData = {
      host: connectionParams.host,
      port: connectionParams.port,
      database: connectionParams.database,
      username: connectionParams.username,
      password: connectionParams.password,
    };
    onSubmitAction(parsedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selectedOption) {
      case 'url':
        parseUrlData(urlInput);
        break;
      case 'host':
        onSubmitAction(formData);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className='font-bold my-4'>Server</label>
        <div className='flex gap-2 my-4'>
          <label htmlFor="connectBy">Connect by:</label>
          <CustomRadioButton
            id="connectByHost"
            name="connectBy"
            value="host"
            label="Host"
            isSelected={selectedOption === 'host'}
            onRadioChange={handleRadioChange}
          />
          <CustomRadioButton
            id="connectByURL"
            name="connectBy"
            value="url"
            label="URL"
            isSelected={selectedOption === 'url'}
            onRadioChange={handleRadioChange}
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {selectedOption === 'host' && (
            <div>
              <div className='my-4'>
                <label className='font-normal'>Host:</label>
                <input
                  className="border border-gray-400 p-2 w-full"
                  type="text"
                  value={formData.host}
                  name="host"
                  placeholder="localhost"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='my-4'>
                <label className='font-normal mb-4'>Port:</label>
                <input
                  type="text"
                  className="border border-gray-400 p-2 w-full"
                  onChange={handleChange}
                  name="port"
                  placeholder="5432"
                  value={formData.port} />
              </div>
              <div className='my-4'>
                <label className='font-normal mb-4'>Database:</label>
                <input className="border border-gray-400 p-2 w-full"
                  type="text"
                  onChange={handleChange}
                  name="database"
                  placeholder="postgres"
                  value={formData.database} /> </div>
              <AuthenticationInputs userNameValue={formData.username} passwordValue={formData.password} onChangeAction={handleChange} />
            </div>
          )}

          {selectedOption === 'url' && (
            <div>
              <div className='my-4'>
                <label className='font-normal mb-4'>URL:</label>
                <input className="border border-gray-400 p-2 w-full" type="text"
                  onChange={handleUrlChange}
                  name="url"
                  placeholder="jdpc:postgresql://localhost:5432/postgres"
                /> </div>
              {/* <AuthenticationInputs userNameValue={formData.username} passwordValue={formData.password} onChangeAction={handleChange} /> */}
            </div>
          )}

          <div className='ml-2 mr-2 mb-16'>
            <DarkButton variable={'Add Database'} fullWidth={true} onClickAction={handleSubmit} />
          </div>
        </div>
      </div>
    </form>
  );
};

const DatabaseSSHForm = ({ onSubmitAction }) => {
  const [sshFormData, setSshFormData] = useState({
    sshUsername: '',
    sshPassword: '',
    sshHost: '',
    sshPort: '',
    sshKey: '',
  });

  const handleSSHChange = (e) => {
    const { name, value } = e.target;
    setSshFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSSHSubmit = (e) => {
    e.preventDefault();
    console.log('SSH credentials submitted:', sshFormData);
    onSubmitAction();
  };

  return (
    // <form onSubmit={handleSSHSubmit}>
    //   {/* Input fields for SSH credentials */}
    //   <div className="mb-5">
    //     <label className="block text-gray-700 font-medium mb-2" htmlFor="sshUsername">
    //       SSH Username:
    //     </label>
    //     <input
    //       type="text"
    //       name="sshUsername"
    //       id="sshUsername"
    //       className="w-full border rounded-md px-3 py-2"
    //       onChange={handleSSHChange}
    //       value={sshFormData.sshUsername}
    //       required
    //     />
    //   </div>

    //   <div className='ml-2 mr-2 mb-5'>
    //     <DarkButton variable={'Add Database'} fullWidth={true} onClickAction={handleSSHSubmit} />
    //   </div>
    // </form>
    <p className='text-center m-20'>Coming Soon 🙂</p>
  );
};

const AddDatabasePanel = ({ onFinalSubmitAction, handleClosePanel }) => {
  const [selectedDatabaseCredentialMethod, CredentialMethodEngine] = useState('Main');
  const drawerRef = useRef(null);
  const [selectedDatabase, setSelectedDatabase] = useState('');


  const handleDbCredentialMethodButtonClick = (method) => {
    CredentialMethodEngine(method);
  };

  // function to handle clicks outside the drawer
  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      handleClosePanel();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const handleDBSelection = (selectedDatabase) => {
    setSelectedDatabase(selectedDatabase);
  };

  const onSubmitAction = (formData) => {
    let modifiedDBEngine
    switch (selectedDatabase) {
      case "MySQL":
        modifiedDBEngine = 'mysql'
        break;
      case 'PostgreSQL':
        modifiedDBEngine = 'postgres'
      default:
        break;
    }
    onFinalSubmitAction({ ...formData, selectedDatabase: modifiedDBEngine })
  }


  return (
    <div ref={drawerRef} className="fixed -top-20 right-0 h-full w-1/3 bg-white shadow-md p-4 mt-20 rounded-lg">
      <div className='flex-col'>
        <div className='flex justify-between items-center border-b-2 border-slate-400 mb-4 pb-4'>
          <div className='text-black font-bold text-lg'>Add new database</div>
          <button onClick={() => handleClosePanel()}>
            <img src={closeCircleIcon} alt='close panel icon' />
          </button>
        </div>
        <div className="mt-7">
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="input1">
              Select database:
            </label>
            <DatabaseEngineDropDown onSelection={handleDBSelection} />
          </div>
          <div class="relative mt-7 mb-7">
            <div class="border-t-2 border-slate-600 w-full"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 whitespace-nowrap text-xs">
              CONNECTION SETTINGS
            </div>
          </div>
          <div className='mx-9 my-4'>
            <div className='flex justify-center'>
              <button
                className='flex items-center bg-[#161619] text-white flex-1 px-10'
                onClick={() => handleDbCredentialMethodButtonClick('Main')}
              >
                <span className='w-full text-center py-1'>Main</span>
              </button>
              <button
                className='flex items-center bg-[#DEDEDF] text-black flex-1 px-10'
                onClick={() => handleDbCredentialMethodButtonClick('SSH')}
              >
                <span className='w-full text-center py-1'>SSH</span>
              </button>
            </div>
          </div>

        </div>
        <div className='ml-2 mr-2 mb-5'>
          {selectedDatabaseCredentialMethod === 'Main' && <DatabaseMainForm onSubmitAction={onSubmitAction} />}
          {selectedDatabaseCredentialMethod === 'SSH' && <DatabaseSSHForm onSubmitAction={onSubmitAction} />}
        </div>
      </div>
    </div>
  );
};


export default AddDatabasePanel;