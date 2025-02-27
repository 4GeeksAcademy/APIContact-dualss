import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {post, put } from '../api';

const AddContact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const { store } = useGlobalReducer();
    const selectedSlug = store.slug;
    const { state } = useLocation();
    const navigate = useNavigate();

    useState(() => {
        if(state && state.contact){
            const { name, email, phone, address } = state.contact;
            setName(name);
            setEmail(email);
            setPhone(phone);
            setAddress(address);
        }
    }, [state]);
    

    const resetInputs = () => {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
    };

    const envioFormulario = async (event) => {
        event.preventDefault();

        if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || address.trim() === '') {
            return;
        }

        const bodyContact = {
            name,
            phone,
            email,
            address,
        };

        try {
            if (state && state.contact) {
                // Modo edición: Hacer una solicitud PUT
                await put(selectedSlug + '/contacts/' + state.contact.id, bodyContact);
            } else {
                // Modo agregar: Hacer una solicitud POST
                await post(selectedSlug + '/contacts/', bodyContact);
            }

            resetInputs();
            navigate('/contacts'); // Redirigir a la lista de contactos
        } catch (error) {
            console.error("Error al guardar el contacto:", error);
        }
    };

        return (
            <div className='fondo'>
                <div className="container">
                <form onSubmit={envioFormulario} className="p-3">
                <h1 className="text-center">{state && state.contact ? 'Edit Contact' : 'Add a new contact'}</h1>
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={(n) => setName(n.target.value)}
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        className="form-control"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone"
                        value={phone}
                        onChange={(p) => setPhone(p.target.value)}
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmailForm"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(a) => setAddress(a.target.value)}
                    />
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" className="btn btn-outline-danger">
                        {state && state.contact ? 'Save Changes' : 'Send'}
                    </button>
                </div>
                    <Link to="/contacts" className="backContact">
                        or get back to contacts
                    </Link>
                
            </form>
            </div>
            </div>
        );
    };

    export default AddContact;