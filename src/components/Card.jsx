import { Link } from "react-router-dom";

export const Card = ({ name, address, phone, email, id, onDelete }) => (
    <div className="card mt-1 cardEdit" style={{ height: "15rem", width: "20rem" }}>
        <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <p className="card-text">
                <i className="bi bi-house"></i> {address}
            </p>
            <p className="card-text">
                <i className="bi bi-phone"></i> {phone}
            </p>
            <p className="card-text">
                <i className="bi bi-envelope"></i> {email}
            </p>
            <Link
                to={`/AddContact/${id}`} // Redirigir a AddContact con el ID
                state={{ contact: { id, name, address, phone, email } }}>
                <i
                    className="bi bi-pencil me-3"
                    style={{ cursor: 'pointer' }}
                ></i>
            </Link>
            <i
                className="bi bi-trash"
                onClick={() => onDelete(id)}
                style={{ cursor: 'pointer' }}
            ></i>
        </div>
    </div>
);
