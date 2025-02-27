export const initialStore=()=>{
  const savedSlug = localStorage.getItem('slug') || '';
  return{
    listaContactos:[],
    slug: savedSlug,
  }
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'set_slug':
      localStorage.setItem('slug', action.payload);
      return {
        ...store,
        slug: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
