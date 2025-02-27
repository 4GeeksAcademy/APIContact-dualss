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
        const agendas = response.agendas; // Cogemos lo que nos ha traido el get para pasarlo ahora 

        // 10. Actualizar el estado con los usuarios obtenidos
        setUsers(agendas);
      } catch (error) {
        // 11. Manejar errores en caso de que la solicitud falle
        console.error('Error al obtener los usuarios:', error);
      }
    };

    // 12. Llamar a la función fetchUsers
    fetchUsers();
  }, []); // 13. El array vacío [] asegura que useEffect solo se ejecute una vez (al montar el componente)

  // 14. Función para manejar cambios en el input de texto
  const handleInputChange = (e) => {
    // 15. Actualizar el estado con el valor del input
    setNewUserName(e.target.value);
  };


  // Función para manejar el cambio en el select
  const handleSelectChange = (e) => {
    const selectedSlug = e.target.value; // Obtener el valor seleccionado (slug)
    dispatch({ type: 'set_slug', payload: selectedSlug }); // Guardar el slug en el estado global
    console.log('Slug seleccionado:', selectedSlug); // Opcional: Mostrar el slug en la consola
  };

  // 16. Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // 17. Prevenir el comportamiento por defecto del formulario (recargar la página)

    // 18. Verificar que el nombre no esté vacío
    if (!newUserName.trim()) {
      alert('Por favor, ingresa un nombre válido.');
      return;
    }

    try {
      // 19. Hacer una solicitud POST al endpoint con el nuevo nombre
      await post(newUserName);
      setNewUserName('');

      // 21. Actualizar la lista de usuarios haciendo una nueva solicitud GET
      const updatedResponse = await get('?offset=0&limit=100');
      const updatedAgendas = updatedResponse.agendas;
      setUsers(updatedAgendas);
    } catch (error) {

      console.error('Error al agregar el usuario:', error);
    }
  };

  // 23. Renderizar el componente
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

// 27. Exportar el componente para que pueda ser usado en otros archivos
export default Home;