export default async function fetchColection (colection){
    try {
        // const response = await fetch(`./src/db/${colection}.json`); //para modo desarrollo
        const response = await fetch(`db/${colection}.json`);  //para modo produccion
        if (!response.ok){
          throw new Error('Se produjo un error con Fetch!');
        }
        const data = await response.json();
        let dbLocalStorage={};
        if (localStorage.getItem("isEasyTasks")){
            dbLocalStorage=JSON.parse(localStorage.getItem("isEasyTasks"));
        }
        dbLocalStorage={...dbLocalStorage, [colection]: data};
        localStorage.setItem("isEasyTasks", JSON.stringify(dbLocalStorage));
        return data;
    } catch (error) {
      console.log(error);
      return false;
    }
}