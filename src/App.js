import React, { useState, Fragment, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';
import FirebaseService from './services/tutorial.service';

var mqtt    = require('mqtt');
var options = {
  port: '37358',
  //clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
username: 'xgfuilnu',
  password: 'ww8nPsHUbbJ-',   
};
var client  = mqtt.connect('wss://soldier.cloudmqtt.com:37358',options);
console.log(client);//var client  = mqtt.connect('mqtts://xgfuilnu:ww8nPsHUbbJ-@soldier.cloudmqtt.com:37358', options);

// preciouschicken.com is the MQTT topic
client.subscribe('temp');

function App() {
  const [ligado, setLigado] = useState(0);
  const [temps, setTemps] = useState([])
  useEffect(() => {
    let tempsReceived = [];
    FirebaseService.getDataList('Esp32/TemperatureInternal', (dataReceived) =>   {
      dataReceived.forEach((item, i) => {
        tempsReceived.push({name: ''+i, Temperatura: item, pv: 2400, amt: 2400});
      })
      setTemps(tempsReceived)
    });
    
  }, [])

  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    });

  // Sets default React state 
  const [mesg, setMesg] = useState(<Fragment><em>0</em></Fragment>);

  return (
    <div className="App">
    <header className="App-header">
    <h1>Sistema de automação residencial</h1>
    <p>Temperatura: {mesg}ºC</p>
        <div class="button-row-container">
        <h3 style={{paddingRight: '1vw'}}>Led: </h3>
		    <div class="switch-container switch-ios">
				<input value={ligado} type="checkbox" name="ios" id="ios" onClick={() => {
          setLigado(ligado === 0 ? 1 : 0);
          client.publish('esp/test',''+ligado)
        }
        }/>
				<label for="ios"></label>
			</div>
      <h3 style={{paddingLeft: '1vw'}}>{ligado === 1 ? 'Ligado' : 'Desligado'}</h3>
      </div>
      <p>Gráfico de Temperatura</p>
      
        <div style={{background: '#fff'}}>
        <LineChart width={600} height={300} data={temps} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="Temperatura" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
        </header>
        </div>
  );
}

export default App;