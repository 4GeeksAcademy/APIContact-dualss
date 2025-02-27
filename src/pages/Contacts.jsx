import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { get, remove } from '../api';

const Contacts = () => {
    const [listaContactos, setlistaContactos] = useState([]);
    const { store } = useGlobalReducer();
    const selectedSlug = store.slug;


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get('/' + selectedSlug + '/contacts');
                const allContacts = response; // Cogemos lo que nos ha traido el get para pasarlo ahora 

                // 10. Actualizar el estado con los usuarios obtenidos
                setlistaContactos(allContacts.contacts);
            } catch (error) {
                // 11. Manejar errores en caso de que la solicitud falle
                console.error('Error al obtener los usuarios:', error);
            }
        };

        // 12. Llamar a la función fetchUsers
        fetchUsers();
        const interval = setInterval(fetchUsers, 5000);
        return () => clearInterval(interval);
    }, [selectedSlug]);

      const handleDelete = async(id) => {
        try {
            await remove(selectedSlug + '/contacts/' + id);
            const updatedResponse = await get('/'+selectedSlug + '/contacts');
            setlistaContactos(updatedResponse.contacts);

        } catch (error) {
            console.error('Error al eliminar el contacto:', error); 
        }
      };

    return (
        <div className='fondo'>
            <div className="container contact">
                <h1 className="pt-3">Hola {selectedSlug}, aqui tienes tus contactos </h1>
                <Link to="/AddContact" className="p-3">
                    <button type="button" className="btn btn-info mb-3">Add New Contact</button>
                </Link>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                {listaContactos.length > 0 ? (
                    listaContactos.map((contact, index) => (
                        <div key={index} className="col-md-3">
                            <Card
                                name={contact.name}
                                address={contact.address}
                                phone={contact.phone}
                                email={contact.email}
                                id={contact.id}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))
                ) : (
                    <p>No hay contactos disponibles</p>
                )}
                </div>
            </div>
            </div>
    );
}

export default Contacts;