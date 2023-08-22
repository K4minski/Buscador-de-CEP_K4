import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    // 01310930/json/

    if(input === ''){
      alert('Preencha algum cep!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert('Ops, erro ao buscar!')
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR DE CEP DO K4MINSKI</h1>
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP:"
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#820000"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        
        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>DDD: {cep.ddd}</span>

      </main>
      
      )}
      
      <p className='link-github'>
        <br></br>
        <a href="https://github.com/K4minski" target="_blank">Meu Github ;)</a>.
      </p>

    </div>
  );
}

export default App;

