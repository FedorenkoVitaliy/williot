import React, {useState, useEffect} from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Header from "../Header/Header";
import InfoBlock from "../InfoBlock/InfoBlock";
import "./App.scss"

const App = () => {
  const socket = new WebSocket("ws://localhost:8999");
  const [socketData, setSocketData] = useState([]);
  const [chartData, setChartData] = useState({
    'ID1': [],
    'ID2': [],
  });

  useEffect(() => {
    socket.onmessage = (event) => setSocketData(JSON.parse(event.data));
    return socket.close;
  }, [])

  useEffect(() => {
    if (socketData.length && socketData[0].data<100 && socketData[1].data<100) {
        setChartData((prev) => ({
          'ID1': [...prev['ID1'], socketData[0].data],
          'ID2': [...prev['ID2'], socketData[1].data]
        }))
      }
  }, [socketData]);

  return (
    <div className="App">
      <Header
        title="Wiliot"
        subtitle='Test'
      />
      <div className="content">
        <div className="temps-list">
          {
            socketData?.map(({id, temperature}) => (
              <InfoBlock
                key={id}
                title={`ID ${id}`}
                subtitle={`Temp: ${temperature}C`}
                style={{width: `calc(100%/${socketData.length} - 12px)`}}
              />
            ))
          }
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: {
              text: 'Data'
            },
            plotOptions:{
              line:{
                marker:{
                  enabled: true
                }
              }
            },
            series: [
              {
                marker: {
                  enabled: false
                },
                name: 'ID 1',
                data: chartData["ID1"]
              },
              {
                marker: {
                  enabled: false
                },
                name: 'ID 2',
                data: chartData["ID2"]
              },
            ]
          }}
        />
      </div>
    </div>
  );
}

export default App;
