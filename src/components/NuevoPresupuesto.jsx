import { useState } from "react";
import Alerta from "./Alerta";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [alerta, setAlerta] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0) {
            setAlerta('No es un presupuesto valido');
            return;
        } 

        setAlerta('');
        setIsValidPresupuesto(true);
    }


  return (
    <div className="contenedor-presupuesto contenedor sombra">
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>

                <input 
                type="number"
                className="nuevo-presupuesto"
                placeholder="Añade tu Presupuesto"
                value={presupuesto}
                onChange={ e =>setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input type="submit" value="Añadir" />

            {alerta && <Alerta tipo="error">{alerta}</Alerta>}
        </form>

    </div>
  )
}
export default NuevoPresupuesto