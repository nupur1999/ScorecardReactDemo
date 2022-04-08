import { Table } from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import useFetching from "./useFetching";
import Typography from '@mui/material/Typography';
//npx json-server --watch src/db.json --port 8000

const TableData = () => {
  const { isLoaded ,data: dataSource ,possibleScoreData:possible , scoreData:score , scorePercent:totalPercent} = useFetching("http://localhost:8000/dataSource");
 // const { Text } = Typography;
  const columns = [
    {
      title: "Page/Table",
      dataIndex: "Page",
      key: "1",
      //Footer:"Total",
      width: 200,
    },
    {
      title: "Possible Score",
      dataIndex: "Possible",
      key: "2",
      width: 149,
    },
    {
      title: "Your Organization",
      dataIndex: "Your Organization",
      key: "Your Organization",
      children: [
        {
          title: "Score",
          dataIndex: "score",
          key: "score",
          width: 124,
        },
        {
          title: "Score %",
          dataIndex: "score_percent",
          key: "score_percent",
          width: 124,
        },
      ],
    },
  ];

  return (
    <div>
       {!isLoaded && <h1>Loading...</h1>}
     {isLoaded && <Table 
     bordered
      dataSource={dataSource} 
      columns={columns} 
      summary={() => {
        return(
          <>
          <Table.Summary.Row>
           <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
              {possible}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
               {score}
              </Table.Summary.Cell> 
              <Table.Summary.Cell>
               {totalPercent}
               </Table.Summary.Cell>  
           </Table.Summary.Row>
          </>
        )
      }
      }     
      />}
    </div>
  );
};

export default TableData;
