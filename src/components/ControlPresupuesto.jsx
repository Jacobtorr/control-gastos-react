import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles }from 'react-circular-progressbar';
import Swal from "sweetalert2";

import style from 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
  gastos, 
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
      const totalDisponible = presupuesto - totalGastado;

      // Calcular el porcentaje Gastado
      const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

      setDisponible(totalDisponible);
      setGastado(totalGastado);

      setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
      }, 1000)
    }, [gastos]);
    

    const formatearDinero = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      };

      const handleResetApp = () => {
        const resultado = true;

        if(resultado) {
          Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, resetear!'
          }).then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => {
                setGastos([]);
                setPresupuesto(0);
                setIsValidPresupuesto(false);

              }, 300)
              }
            })
        } 
      }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : '#06b6d4',
              textColor: porcentaje > 100 ? '#DC2626' : '#06b6d4'
            })} 
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
          <button
            className="reset-app"
            type="button"
            onClick={handleResetApp}
          >
            Resetear App
          </button>
            <p>
                <span>Presupuesto:</span> {formatearDinero(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatearDinero(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formatearDinero(gastado)}
            </p>
        </div>
    </div>
  )
}
export default ControlPresupuesto