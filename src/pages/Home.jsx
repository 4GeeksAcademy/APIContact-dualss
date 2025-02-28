import React, { useEffect, useState } from 'react';
import { get, post } from '../api';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get('?offset=0&limit=100');
        const agendas = response.agendas; 
        setUsers(agendas);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []); 

  const handleInputChange = (e) => {
    setNewUserName(e.target.value);
  };
  // Función para manejar el cambio en el select
  const handleSelectChange = (e) => {
    const selectedSlug = e.target.value; // Obtener el valor seleccionado (slug)
    dispatch({ type: 'set_slug', payload: selectedSlug }); // Guardar el slug en el estado global
    console.log('Slug seleccionado:', selectedSlug); // Opcional: Mostrar el slug en la consola
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Para que no recargue la pagina
    if (!newUserName.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }

    try {
      await post(newUserName);
      setNewUserName('');
      const updatedResponse = await get('?offset=0&limit=100');
      const updatedAgendas = updatedResponse.agendas;
      setUsers(updatedAgendas);
    } catch (error) {

      console.error('Error al agregar el usuario:', error);
    }
  };
  return (
    <div className='fondo'>
    <div className='container listaAgenda mt-5 align-items-centre'>
      <h1>Lista de Agendas</h1>
      <h4>Agenda actual: {store.slug}</h4>
      <Link to="/Contacts">
          <button type="button" className="btn btn-info">Ver agenda</button>
        </Link>
      <form onSubmit={handleSubmit} className='mt-3'>
        <input
          type="text"
          placeholder="Nombre de la agenda"
          value={newUserName}
          onChange={handleInputChange}
          className='mb-3 me-3'
        />
        <button className='btn btn-secondary botonuser' type="submit">Nueva Agenda</button>
      </form>

     
      <div>
        <select className="form-select" aria-label="Selecciona la agenda" onChange={handleSelectChange}>
          <option value="">Seleccione agenda</option>
          {users.map((agenda) => (
            <option key={agenda.id} value={agenda.slug}>{agenda.slug}</option>
          ))}
        </select>
      </div>
      </div>
    </div>
    
  );
};

export default Home;