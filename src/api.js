
const apiURL = 'https://playground.4geeks.com/contact/agendas';

// Función genérica para hacer una solicitud GET
export const get = async (endpoint) => {
  try {
    const response = await fetch(apiURL + endpoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la solicitud GET:', error);
    throw error;
  }
};

// Función genérica para hacer una solicitud POST
export const post = async (endpoint, body) => {
  try {
    const response = await fetch(apiURL + '/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    throw error;
  }
};

// Función genérica para hacer una solicitud PUT
export const put = async (endpoint, body) => {
  try {
    const response = await fetch(apiURL + '/' + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la solicitud PUT:', error);
    throw error;
  }
};


// Función genérica para hacer una solicitud DELETE
export const remove = async (endpoint) => {
  try {
    const response = await fetch(apiURL + '/' + endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const contentLength = response.headers.get('Content-Length');
    if (contentLength && parseInt(contentLength) > 0) {
      const data = await response.json();
      return data;
    } else {
      return null; // No hay cuerpo en la respuesta
    }
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error);
    throw error;
  }
};
