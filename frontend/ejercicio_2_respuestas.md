2.1- ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)

Para implementar las acciones del frontend utilizando Redux crearia un Slice y Reducer para cada entidad (login, clientes, casos) ademas de reorganizar los servicios. Siguiendo el ejemplo seria en el caso de autenticacion authSlice.ts, authService.ts dentro de una carpeta auth dentro de otra carpeta que podria llamarse Store y asi para cada servicio dentro de la misma carpeta Store, tambien tendria que crear un archivo store.ts para configurar los reducers.
Tambien para facilitar el uso de dispatch y selector podria crear hooks personalizados.

2.2- Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

Podria hacerlo con la libreria react-router-dom, en el index.js tendria que encapsular mi App entre BrowserRoutes y Routes ya no lamando directamente a la componente sino renderizarlo en la propiedad element de Route. Por ejemplo si en este caso yo quiero crear una pagina aparte para logearme tendria mi pagina de Inicio y Login y quedaria de esta forma:

<BrowserRouter>
    <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
    </Routes>
</BrowserRouter>

Si tengo parametros que utilizar en mis paginas tendria que utilizar el useParams para que funionen correctamente.
