import React from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form,Segment,Input,Message } from 'semantic-ui-react';
import {Redirect} from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component{
    constructor(props) {
        super(props);          
  
        this.state = {
            user:'',
            password:'',
            loading:false,
            error:false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }   

    onSubmit(){
        const {user:Username,password:Password} = this.state;

        if(Username && Password){
            console.log(`Peticion login - usuario: ${Username} contraseña: ${Password}`);                          
            this.setState({loading:true});
            fetch('http://localhost:55657/api/login/authenticate',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'                
                },
                body:JSON.stringify({Username,Password})
            })
            .then(response =>response.json())
            .then(data => {
                const respuesta = JSON.parse(data);
                console.log("respuesta: ",respuesta);
                if(respuesta.StatusCode === 200){
                    console.log("Usuario autorizado");
                    localStorage.setItem('tokenjwt',respuesta.Data);
                    return(
                        <Redirect to="/" />
                    )                    
                } else {
                    toast.info(respuesta.Message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });                    
                }
            }).finally(() => this.setState({loading:false}));  
        } else {
            toast.info("Asegurate de llenar todos los campos", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });   
            this.setState({error:true});
        }
              
    }

    onChange(e,{value,name}){
        this.setState({[name]:value,error:false});
    }

    render(){
        const {user,password,error} = this.state;

        const token = localStorage.getItem('tokenjwt');
        if(token){
            return(
                <Redirect to="/" />
            )
        }

        return (
            <div className='container-login'>
                <Segment>
                    <h2>Inicia sesión</h2>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Usuario</label>
                            <Input error={error} name='user' value={user} placeholder='Usuario' onChange={this.onChange}/>                            
                        </Form.Field>
                        <Form.Field>
                            <label>Contraseña</label>
                            <Input error={error} name='password' type='password' value={password} placeholder='Contraseña' onChange={this.onChange}/>                            
                        </Form.Field> 
                        {error ? <Message
                            warning
                            header='Faltan datos por llenar'
                            list={[
                                'Asegurate de haber llenado todos los campos para ingresar',
                            ]}
                            />
                        :null} 
                        <div style={{display:'flex',justifyContent:'center'}}>
                            <Button color='blue' type='submit'>Ingresar</Button>
                        </div>          
                        
                    </Form>
                </Segment>
            </div>
        );    
    }
        
}

export default Login;