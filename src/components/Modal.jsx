import { useState, useEffect } from 'react';
import Alerta from './Alerta';
import CerrarBtn from '../img/cerrar.svg';
import Swal from 'sweetalert2';

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    const [alerta, setAlerta] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
            setId(gastoEditar.id);
          }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 250);
    }

    // Funcion de eventos que ocurren luego del submit
    const handleSubmit = e => {
        e.preventDefault();

        // Validacion del formulario
        if([nombre, cantidad, categoria].includes('')) {
            setAlerta('Todos los campos son obligatorios');

            setTimeout(() => {
                setAlerta('');
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, fecha, id});
    }

  return (
    <div className="modal" onClick={ocultarModal}>
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn} 
                alt="Cerrar Modal" 
                onClick={ocultarModal}
            />
        </div>

        <form 
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} 
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        >
            <legend> {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id='nombre'
                    type="text"
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad del gasto: Ej. 300'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="ropa">Ropa</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />

            { alerta && <Alerta tipo="error">{alerta}</Alerta> }
        </form>
    </div>
  )
}
export default Modal;