import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Navbar from "../../components/header/Navbar"
import MenuAdmin from "../../components/AdminView/MenuAdmin"


var prueba = [];

const createLocation = () => {


    const nameRef = useRef(null);
    const addressRef = useRef(null);
      

    async function onSubmit(e) {
        e.preventDefault();

        const nameValue = nameRef.current.value;
        const addressValue = addressRef.current.value;

        if (!nameValue || !addressValue) {
            toast.error("Ingrese sus credenciales");
            return;
        }

        try {
            const response = await axios.post('/site/save', {

                name: nameValue,
                address: addressValue,

            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
            )
            if (response.status === 201) {
                toast.success('Lugar Creado Exitosamente!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (error) {

            const { response } = error;

            let mess = "";

            if (response.status === 401) mess = "Datos Erroneos, intente de nuevo";
            else if (response.status === 400) mess = "Datos Erroneos";
            else if (response.status === 500) mess = "Error con el servidor";
            else if (response.status === 404) mess = "Usuario inexistente";
            toast(mess, { type: "warning", position: toast.POSITION.TOP_CENTER });
        }
    }



    return (
        <>
            <Navbar/>
            <MenuAdmin />
            <div className="relative flex flex-col justify-center pt-12 overflow-hidden">

            <div className="w-full p-16 m-auto bg-gray-100 rounded-md shadow-xl lg:max-w-xl">

            <form className="" onSubmit={onSubmit}>
                <ToastContainer />

                <div className="grid gap-6 mb-6 lg:grid-cols-1">
                    <div>
                        <label
                            className="block mb-2  text-sm font-medium text-gray-900 "
                            htmlFor="Loc-name"
                        >
                            Nombre del Lugar
                        </label>
                        <input
                            type="text"
                            id="loc-name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            placeholder="Escriba el Nombre del Lugar "
                            required
                            ref={nameRef}
                        />
                    </div>
                    <div>
                        <label
                            
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="Loc-address"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="loc-address"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                            placeholder="Escriba la direccion de evento"
                            ref={addressRef}
                            required
                        />
                    </div>

                </div>

                <div className="flex justify-center">

                    <Link
                        to="/peopleView"
                        className="text-white mx-5 bg-nav-color hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Atras
                    </Link>

                    <button
                        type="submit"
                        className="text-white bg-nav-color hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Guardar
                    </button>
                </div>
            </form>
            </div>
            </div>
        </>
    );
};
export default createLocation;