import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { setDefaultLocale, registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { CreatePedidosDetails } from "./PedidosDetails/CreatePedidosDetails";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ServicesContext } from "../../context/ServicesContext";
import { toast } from "react-toastify";
import { useListaVehicle } from "../../Hooks/useListaVehicle";
import { useCustomerGet } from "../../Hooks/useCustomerGet";
import { useServiciosGet } from "../../Hooks/useServiciosGet";

const CreatePedidos = ({ isAuthenticated }) => {
  const { appointmentId } = useParams();
  console.log("Este es el appointmentId: ", appointmentId);
  const { formData, setFormData } = useContext(ServicesContext);

  registerLocale("es", es); // Registra el locale español
  setDefaultLocale("es"); // Establece el locale por defecto a español

  const { dataCustomer } = useCustomerGet(isAuthenticated);
  const { dataVehicle1 } = useListaVehicle(isAuthenticated);
  const { dataServicio } = useServiciosGet(isAuthenticated);

  useEffect(() => {
    const tokenRecibido = localStorage.getItem("token");
    if (dataVehicle1.length && dataCustomer.length && dataServicio.length) {
      if (appointmentId !== undefined && appointmentId !== null) {
        console.log("Este es el appoiment en el fetch: ", appointmentId);
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://localhost:7184/api/Appointment/${appointmentId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${tokenRecibido}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("Ha ocurrido un error");
            }
            const data = await response.json();
            const vehicleSelected = dataVehicle1.find(
              (v) => v.value === data.vehicleId
            );
            const employeeSelected = dataCustomer.find(
              (c) => c.value === data.employeeId
            );
            const servicesSelected = data.serviceId.map((service) =>
              dataServicio.find((s) => s.value === service)
            );
            const fechaFormateada = DateTime.fromISO(
              data.appointmentDate
            ).toJSDate();
            console.log("Este es la fecha traida del back: ", fechaFormateada);
            setFormData({
              AppointmentDate: fechaFormateada,
              Comments: data.comments,
              Vehicle: vehicleSelected,
              Employee: employeeSelected,
              Services: servicesSelected,
            });
            console.log("Este es el dataVehicle: ", data.vehicleId);
            console.log("Esta es la data del formData:", formData);
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
        fetchData();
      }
    }
  }, [appointmentId, dataVehicle1, dataCustomer, dataServicio]);

  const navigate = useNavigate();

  const EnvioData = async () => {
    try {
      console.log("Este es el formData: ", formData);
      const tokenRecibido = localStorage.getItem("token");

      const url =
        appointmentId !== undefined && appointmentId !== null
          ? "https://localhost:7184/api/Appointment"
          : "https://localhost:7184/api/Appointment";

      const metodo =
        appointmentId !== undefined && appointmentId !== null ? "PUT" : "POST";
      const fechaISO = DateTime.fromJSDate(formData.AppointmentDate)
        .setZone("America/Asuncion")
        .toISO(); // Ej: "2025-05-19T17:18:03.000-03:00"

      const body = {
        appointmentdate: fechaISO,
        comments: formData.Comments,
        vehicle: formData.Vehicle?.value || formData.Vehicle,
        employee: formData.Employee?.value || formData.Employee,
        services: formData.Services.map((service) => ({
          serviceId: service.value,
        })),
      };

      if (appointmentId !== undefined && appointmentId !== null) {
        body.appointmentId = appointmentId;
      }

      const response = await fetch(url, {
        method: metodo,
        headers: {
          Authorization: `Bearer ${tokenRecibido}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Ha ocurrido un error");
      }

      toast.success("El elemento pedidos se ha creado con exito");

      navigate("/ListaPedidos");
    } catch (error) {
      toast.error("Ocurrio un error al crear el pedido");
    }
  };

  const handleChange = (e, value) => {
    setFormData({ ...formData, Comments: value });
  };

  const handleEmployeeChange = (event, value) => {
    setFormData({ ...formData, Employee: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="container mt-5">
      {/* Tarjeta principal */}
      <div className="card shadow-lg mt-5 col-lg-11 mx-auto">
        {/* Header azul */}
        <div className="card-header bg-primary text-white d-flex justify-content-center">
          <h2 className="mb-0">Crear Pedido</h2>
        </div>

        {/* Wrapper gris con borde y padding */}
        <div className="mt-3 border rounded p-3 bg-light">
          {/* Tarjeta interior blanca con sombra */}
          <div className="card shadow-sm mt-1 p-3">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Columna del formulario */}
                <div className="col-md-6 mb-3">
                  {/* Fecha */}
                  <DatePicker
                    selected={formData.AppointmentDate}
                    onChange={(sel) =>
                      setFormData({ ...formData, AppointmentDate: sel })
                    }
                    dateFormat="dd-MM-yyyy"
                    className="form-control mb-3"
                    dropdownMode="select"
                  />

                  {/* Comentarios */}
                  <textarea
                    rows={4}
                    placeholder="Comentarios"
                    className="form-control mb-3"
                    value={formData.Comments}
                    onChange={(e) =>
                      setFormData({ ...formData, Comments: e.target.value })
                    }
                  />

                  {/* Vehículo */}
                  <Select
                    options={dataVehicle1}
                    value={formData.Vehicle}
                    onChange={(opt) =>
                      setFormData({ ...formData, Vehicle: opt })
                    }
                    placeholder="Elige vehículo..."
                    className="mb-3"
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "2px solid #4a90e2",
                      }),
                      menu: (base) => ({ ...base, zIndex: 100 }),
                    }}
                  />

                  {/* Empleado */}
                  <Select
                    options={dataCustomer}
                    value={formData.Employee}
                    onChange={(opt) =>
                      setFormData({ ...formData, Employee: opt })
                    }
                    placeholder="Elige empleado..."
                  />
                </div>

                {/* Columna lateral de servicios */}
                <div className="col-md-6">
                  <Select
                    options={dataServicio}
                    value={formData.Services}
                    onChange={(opt) =>
                      setFormData({ ...formData, Services: opt })
                    }
                    placeholder="Elige servicios..."
                    isMulti
                  />
                  <div className="mt-3">
                    <CreatePedidosDetails />
                  </div>
                </div>
              </div>

              {/* Botón de envío centrado */}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-5 py-2"
                >
                  <i className="bi bi-send me-2" />
                  Enviar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePedidos;
