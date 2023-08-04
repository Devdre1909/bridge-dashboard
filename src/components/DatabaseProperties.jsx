import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { API_BASE_URL, TEST_TOKEN, USER_ID } from '../libs/consts';

const client = new ApolloClient({
  uri: `${API_BASE_URL}/gql`,
  cache: new InMemoryCache(),
});

const GET_DATABASE_SCHEMA = gql`
  query {
    schemas(DatabaseID: 1) {
      nodes {
        CreatedAt
        DatabaseID
        ID
        Name
        UpdatedAt
      }
    }
    tables(DatabaseID: 1) {
      nodes {
        CreatedAt
        DatabaseID
        ID
        Name
        SchemaID
        UpdatedAt
      }
    }
    columns(TableID: 8) {
      nodes {
        CreatedAt
        ID
        Name
        TableID
        UpdatedAt
      }
    }
  }
`;

// const DatabaseTreeViewData = () => {
//   const { loading, error, data } = useQuery(GET_DATABASE_SCHEMA);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const { schemas, tables, columns } = data;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Database Schema</h1>
//       <ul className="space-y-4">
//         {schemas.nodes.map((schema) => (
//           <li key={schema.ID}>
//             <span className="font-bold">{schema.Name}</span>
//             <ul className="ml-4 space-y-2">
//               {tables.nodes
//                 .filter((table) => table.SchemaID === schema.ID)
//                 .map((table) => (
//                   <li key={table.ID}>
//                     <span className="font-bold">{table.Name}</span>
//                     <ul className="ml-4 space-y-2">
//                       {columns.nodes
//                         .filter((column) => column.TableID === table.ID)
//                         .map((column) => (
//                           <li key={column.ID}>{column.Name}</li>
//                         ))}
//                     </ul>
//                   </li>
//                 ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


const DatabaseTreeViewData = () => {
  const { loading, error, data } = useQuery(GET_DATABASE_SCHEMA);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  //   const { schemas, tables, columns } = data;
  const schemaMap = new Map();
  const tableMap = new Map();
  const columnMap = new Map();

  // Organize data into maps for easy lookup
  data.schemas.nodes.forEach((schema) => {
    schemaMap.set(schema.ID, schema);
  });

  data.tables.nodes.forEach((table) => {
    tableMap.set(table.ID, table);
  });

  data.columns.nodes.forEach((column) => {
    columnMap.set(column.ID, column);
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Database Schema</h1>
        <ul className="space-y-4">
          {data.schemas.nodes.map((schema) => (
            <li key={schema.ID}>
              <span className="font-bold">{schema.Name}</span>
              <ul className="ml-4 space-y-2">
                {data.tables.nodes
                  .filter((table) => table.SchemaID === schema.ID)
                  .map((table) => (
                    <li key={table.ID}>
                      <span className="font-bold">{table.Name}</span>
                      <ul className="ml-4 space-y-2">
                        {data.columns.nodes
                          .filter((column) => column.TableID === table.ID)
                          .map((column) => (
                            <li key={column.ID}>{column.Name}</li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function DatabaseTreeView() {
  return (
    <ApolloProvider client={client}>
      <DatabaseTreeViewData />
    </ApolloProvider>
  );
}

