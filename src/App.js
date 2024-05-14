import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; 

function App() {
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [rut, setRut] = useState("");
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [estudiantesList, setEstudiantes] = useState([]);
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    getEstudiantes();
  }, []);

  const add = () => {
    if (!nombre || !curso || !rut || !fecha) {
      alert("Todos los campos son requeridos");
      return;
    }

    Axios.post("http://localhost:3006/create", {
      nombre: nombre,
      curso: curso,
      rut: rut,
      fecha: fecha 
    })
    .then(() => {
      getEstudiantes();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro Exitoso</strong>",
        html: "<i>El estudiante <strong> "+nombre+"</strong> fue registrado con éxito </i>",
        icon: 'success',
        timer: 3000
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error al registrar estudiante: " + error.message);
      alert("No se encontró el recurso solicitado en el servidor.");
    });
  };

  const update = () => {
    if (!id || !nombre || !curso || !rut || !fecha) {
      alert("Todos los campos son requeridos");
      return;
    }

    Axios.put("http://localhost:3006/update", {
      nombre: nombre,
      id: id,
      curso: curso,
      rut: rut,
      fecha: fecha 
    })
    .then(() => {
      getEstudiantes();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización Exitosa</strong>",
        html: "<i>El estudiante <strong> "+nombre+"</strong> fue actualizado con éxito </i>",
        icon: 'success',
        timer: 3000
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error al actualizar estudiante: " + error.message);
      alert("No se encontró el recurso solicitado en el servidor.");
    });
  };

  const deleteEst = (val) => {
    Swal.fire({
      title: 'Confirmar Eliminado?',
      html:"<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed){
        Axios.delete(`http://localhost:3006/delete/${val.id}`)
          .then(() => {
            getEstudiantes();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title: `${val.nombre} fue eliminado.`,
              showConfirmButton:false,
              timer:2000
            });
          })
          .catch((error) => {
            console.error(error);
            alert("Error al eliminar estudiante");
            alert("No se logró eliminar el empleado!");
            Swal.fire({
              icon:'error',
              title:'Oops...',
              text:'No se logró eliminar el empleado!',
              footer: error.message === "Network Error" ? "Intente más tarde" : ""
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre('');
    setCurso('');
    setRut('');
    setEditar(false);
  };

  const getEstudiantes = () => {
    Axios.get("http://localhost:3006/estudiantes")
      .then((response) => {
        setEstudiantes(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error al obtener estudiantes");
      });
  };

  const editarEstudiante = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setCurso(val.curso);
    setRut(val.rut);
    setId(val.id);
  };

  return (
    <div className="container">
      <div className="App">
        <div className="card text-center">
          <div className="card-header">
            GESTIÓN ESTUDIANTES ATRASADOS
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre: </span>
              <input 
                type="text" 
                onChange={(event) => setNombre(event.target.value)} 
                className="form-control" 
                value={nombre}
                placeholder="Estudiante" 
                aria-label="Estudiante" 
                aria-describedby="basic-addon1" />
            </div>
            <br/>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">Curso: </span>
              <input 
                type="text" 
                value={curso} 
                onChange={(event) => setCurso(event.target.value)} 
                className="form-control" 
                placeholder="Curso" 
                aria-label="Curso" 
                aria-describedby="basic-addon2" />
            </div>
            <br/>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">Rut: </span>
              <input 
                type="number" 
                value={rut} 
                onChange={(event) => setRut(event.target.value)} 
                className="form-control" 
                placeholder="Rut" 
                aria-label="Rut" 
                aria-describedby="basic-addon3" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon4">Fecha: </span>
              <input 
                type="date" 
                value={fecha} 
                onChange={(event) => setFecha(event.target.value)} 
                className="form-control" 
                placeholder="Fecha" 
                aria-label="Fecha" 
                aria-describedby="basic-addon4" />
            </div>
          </div>
          <div className="card-footer text-muted">
            {editar ? (
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
            ) : (
              <button className='btn btn-success' onClick={add}>Registrar</button>
            )}
          </div>
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Curso</th>
              <th scope="col">RUT</th>
              <th scope="col">Fecha</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesList.map((val, key) => (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.curso}</td>
                <td>{val.rut}</td>
                <td>{val.fecha}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => editarEstudiante(val)} className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => deleteEst(val)} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/login" className="btn btn-primary">Salir</Link>
    </div>
  );
};

export default App;
