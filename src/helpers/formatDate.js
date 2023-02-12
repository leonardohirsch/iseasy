/** función para convertir timestamp a formato fecha en string */
export default function formatDate(dateTime){
    const date = new Date(dateTime);
    const dateString = date.getDate()+
          " "+date.toLocaleString('es-ES', { month: 'short' })+
          " "+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes();
    return dateString;
}