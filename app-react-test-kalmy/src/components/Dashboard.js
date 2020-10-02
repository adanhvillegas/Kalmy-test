import React from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button,Segment,Container,Dropdown } from 'semantic-ui-react';
import {Redirect} from "react-router-dom";
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {  toast } from 'react-toastify';
 

const options = [
    { key: '1', text: 'Brand', value: 'Brand' },
    { key: '2', text: 'Model', value: 'Model' },
    { key: '3', text: 'Type', value: 'Type' },    
  ]

class Dashboard extends React.Component{ 
    
    constructor(props) {
        super(props);          
  
        this.state = {
            agrupados:[],
            DataChart:[],
            columnas:[],
            loading:false
        }
        
        this.onChange = this.onChange.bind(this);
        this.generarReporte = this.generarReporte.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    cerrarSesion(){
        localStorage.removeItem('tokenjwt');
        
        this.forceUpdate();       
    }

    generarDataChart(carRents){
        let columnas = [];
        let DataChart = carRents.map(carRent => {
            let obj = {name:carRent.First};

            if(carRent.Group){
                carRent.Group.forEach(carRentGroup => {
                    obj[carRentGroup.Second] =  carRentGroup.Count; 
                    if(!columnas.find(x => x.name === carRentGroup.Second))                                           
                        columnas.push({name:carRentGroup.Second,color:`#${Math.floor(Math.random()*16777215).toString(16)}`});
                })
            } else {
                obj.Cantidad = carRent.Count;
                if(!columnas.find(x => x.name === "Cantidad"))
                    columnas.push({name:"Cantidad",color:`#${Math.floor(Math.random()*16777215).toString(16)}`});
            }

            return obj;
        });

        this.setState({DataChart,columnas});
    }

    generarReporte(){
        const {agrupados} = this.state;
        const token = localStorage.getItem('tokenjwt');
        if(agrupados.length && token)
            fetch('http://localhost:55657/api/rents/getcarrents',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`               
                },
                body:JSON.stringify({a1:agrupados[0],a2:agrupados[1]? agrupados[1] : ""})
            })       
            .then(response =>response.json())
            .then(data => {
                const respuesta = JSON.parse(data);
                this.generarDataChart(respuesta.Data);
            });
    }   

    onChange(e,{value:agrupados}){
        if(agrupados.length <3)
            this.setState({agrupados}); 
        else{
            toast.info("Solo puedes elegir dos parametros de agrupación", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });   
        }
    }
    
    render(){
        const {agrupados,DataChart,columnas} = this.state;
        const token = localStorage.getItem('tokenjwt');
        
        if(!token)
            return(
                <Redirect to="/Login" />
            )   
        
        return (
            <Container className='container-dashboard'>
                <Segment className='segmento-dashboard'>
                    <div style={{display:"flex",width:'100%'}}>
                        <div style={{display:'flex'}}>
                            <h3 style={{whiteSpace:'nowrap'}}>Generar gráfica de reporte de rentas de vehiculos</h3>
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
                            <Button color='red' onClick={this.cerrarSesion}>Cerrar sesión</Button>
                        </div>
                        
                    </div>
                    <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
                        <Dropdown value={agrupados} onChange={this.onChange} placeholder='Agrupados' multiple selection options={options} />
                        <Button color='blue' onClick={this.generarReporte}>Generar gráfica</Button>
                    </div>
                    
                        <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100%'}}>
                            {DataChart.length ? 
                                <ResponsiveContainer width={'85%'} height={"75%"}>
                                    <BarChart                               
                                        data={DataChart}
                                        margin={{
                                        top: 20, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {columnas.map(columna => {
                                            return(
                                                <Bar key={columna.name} dataKey={columna.name} stackId="a" fill={columna.color} />
                                            )
                                        })}                          
                                    </BarChart>
                                </ResponsiveContainer>
                            : <h3>Aún no hay datos para mostrar</h3>}
                        </div>
                    
                </Segment>
            </Container>
        );
    }
   
}

export default Dashboard;