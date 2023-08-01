import React from 'react';

const truncateText = (text, firstCount, lastCount) => {
  if (text.length <= firstCount + lastCount) {
    return text;
  }

  const firstPart = text.slice(0, firstCount);
  const lastPart = text.slice(-lastCount);

  return `${firstPart}...${lastPart}`;
};

export const DisplayAPIKey = ({ api_key }) => {
  const truncatedApiKey = truncateText(api_key, 2, 3);

  return (
    <span className='text-base font-bold truncate'>
      {truncatedApiKey}
    </span>
  );
};

export function formatDate(inputTime, type) {
  let day, year
  switch (type) {
    case 0:
      const date = new Date(inputTime);
      day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      year = date.getFullYear();
      return `${day}/${month}/${year}`;
    case 1:
      const dateObj = new Date(inputTime);
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      day = dateObj.getUTCDate();
      const monthIndex = dateObj.getUTCMonth();
      year = dateObj.getUTCFullYear();
      const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;
      return formattedDate;
    default:
      break;
  }
}


export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
};

export const ToastSuccessMessage = ({ variable }) => {
  return (
    <div className={`bg-green-500 text-white px-4 py-2 rounded absolute top-5 left-1/2`}>
      {variable}
    </div>
  )
}

export const ToastErrorMessage = ({ variable }) => {
  return (
    <div className={`bg-red-500 text-white px-4 py-2 rounded absolute top-5 left-1/2`}>
      {variable}
    </div>
  )
}

export const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&-<=>?@_';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export function parseDatabaseURL(connectionString) {
  const regex = /^(postgres|mysql):\/\/(.*?):(.*?)@(.*?)(?::(\d+))?(?:\/(.*))?$/;
  const matches = connectionString.match(regex);

  if (!matches) {
    throw new Error('Invalid connection string format');
  }

  const [, dbType, username, password, host, port, database] = matches;
  return {
    dbType,
    username,
    password,
    host,
    port: port || (dbType === 'postgres' ? '5432' : '3306'),
    database,
  };
}
