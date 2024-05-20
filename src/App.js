import React, { useReducer } from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({
    baseURL: "https://api.mercadopago.com"
});

api.interceptors.request.use(async config   => {
    const token = "APP_USR-2706068965367040-012914-cda0f77005bd3b71e83f084d328dd34e-404532421"
    config.headers.Authorization = `Bearer ${token}`

    return config
});

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function App() {

    const [formData, setFormdata] = useReducer(formReducer, {})

    const handleChange = event => {
        setFormdata ({
            name: event.target.name,
            value: event.target.value
        })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const body = {
            "transaction_amount": 10,
            "description": "produto",
            "payment_method_id": "pix",
            "payer": {
              "email": "vitorsergio.ts@gmail.com",
              "first_name": "",
              "last_name": "",
              "identification": {
                "type": "CPF",
                "number": "01234567890"
              }
            },
            "notification_url": "https://webhook.site/edd33c13-1ccd-4969-bc22-adbd74b19be6"
        }

        api.post("V1/payments", body).then(response => {

        }).catch(err => {
            //alert(err)
        })

    }
  return (
    <div className="App">
      <header className="App-header">
        <p>API Pix Mercado Pago</p>

        
         <form onSubmit={handleSubmit}>
            <div>
            <label>Email</label>
            <input onChange={handleChange} name='email' />
            </div>
            <div>
            <label>Nome</label>
            <input onChange={handleChange} name='nome' />
            </div>
            <div>
            <label>CPF</label>
            <input onChange={handleChange} name='cpf' />
            </div>
            <div>
                <button type='submit'>Pagar</button>
            </div>
         </form>
      </header>
    </div>
  );
}

export default App;
