(function() {
    "use strict";
    var o = {
            1349: function(o, e, a) {
                var t = a(8355),
                    i = a(5130),
                    r = a(6768);

                function n(o, e, a, t, i, n) {
                    const s = (0, r.g2)("router-view"),
                        c = (0, r.g2)("PieComponent");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(s), (0, r.bF)(c)])
                }
                const s = o => ((0, r.Qi)("data-v-ed97399a"), o = o(), (0, r.jt)(), o),
                    c = { class: "text-center" },
                    l = s((() => (0, r.Lk)("div", { class: "text-center p-3", style: { "background-color": "rgba(0, 0, 0, 0.2)" } }, [(0, r.eW)(" © 2024 "), (0, r.Lk)("a", { class: "text-dark", href: "https://www.linkedin.com/in/nazadoto/" }, "Nazareno Navarrete")], -1))),
                    d = [l];

                function u(o, e, a, t, i, n) { return (0, r.uX)(), (0, r.CE)("footer", c, d) }
                var m = {},
                    p = a(1241);
                const g = (0, p.A)(m, [
                    ["render", u],
                    ["__scopeId", "data-v-ed97399a"]
                ]);
                var b = g,
                    k = { name: "App", components: { PieComponent: b }, methods: {}, mounted() {} };
                const v = (0, p.A)(k, [
                    ["render", n]
                ]);
                var f = v,
                    h = a(1387),
                    L = a(4232);
                const C = o => ((0, r.Qi)("data-v-4de2e8af"), o = o(), (0, r.jt)(), o),
                    y = { class: "todo" },
                    _ = { class: "container mt-4 mb-2" },
                    x = { class: "text-center" },
                    w = { key: 0, class: "container" },
                    E = { class: "col-md-6" },
                    S = { class: "col-md-6 mt-2" },
                    P = { key: 1, class: "text-center" },
                    I = { class: "row g-3 div-forms border" },
                    M = { class: "col-md-6" },
                    N = C((() => (0, r.Lk)("h2", { class: "titulo-div-forms mb-2" }, "Perfil", -1))),
                    A = { class: "row g-3 div-forms border mt-2" },
                    X = { class: "col-md-6" },
                    q = C((() => (0, r.Lk)("h2", { class: "titulo-div-forms mb-2" }, "Productos", -1))),
                    U = C((() => (0, r.Lk)("br", null, null, -1))),
                    F = { class: "row g-3 div-forms border mt-2" },
                    V = { class: "col-md-6" },
                    T = C((() => (0, r.Lk)("h2", { class: "titulo-div-forms mb-2" }, " Tu link ", -1))),
                    W = ["href"],
                    D = C((() => (0, r.Lk)("br", null, null, -1))),
                    Q = { key: 0, class: "row g-3 div-forms border mt-2" },
                    J = { class: "col-md-6" },
                    O = C((() => (0, r.Lk)("h2", { class: "titulo-div-forms mb-2" }, "Tu código QR", -1))),
                    $ = ["href"],
                    z = C((() => (0, r.Lk)("br", null, null, -1)));

                function j(o, e, a, t, i, n) {
                    const s = (0, r.g2)("NavbarAdminComponent"),
                        c = (0, r.g2)("NavbarComponent"),
                        l = (0, r.g2)("router-link");
                    return (0, r.uX)(), (0, r.CE)("div", y, [n.esAdmin() ? ((0, r.uX)(), (0, r.Wv)(s, { key: 0 })) : ((0, r.uX)(), (0, r.Wv)(c, { key: 1 })), (0, r.Lk)("div", _, [(0, r.Lk)("h1", x, "Bienvenid@, " + (0, L.v_)(i.nombreNegocio), 1), n.esAdmin() ? ((0, r.uX)(), (0, r.CE)("div", w, [(0, r.Lk)("div", E, [(0, r.bF)(l, { class: "btn btn-menu", to: "/register" }, { default: (0, r.k6)((() => [(0, r.eW)("Nuevo Negocio")])), _: 1 })]), (0, r.Lk)("div", S, [(0, r.bF)(l, { class: "btn btn-menu", to: "/u/negocios" }, { default: (0, r.k6)((() => [(0, r.eW)("Listar Negocios")])), _: 1 })])])) : ((0, r.uX)(), (0, r.CE)("div", P, [(0, r.Lk)("div", I, [(0, r.Lk)("div", M, [N, (0, r.bF)(l, { class: "btn btn-menu", to: "/u/modificar" }, { default: (0, r.k6)((() => [(0, r.eW)("Ver Información")])), _: 1 })])]), (0, r.Lk)("div", A, [(0, r.Lk)("div", X, [q, (0, r.bF)(l, { class: "btn btn-menu", to: "/u/nuevoProducto" }, { default: (0, r.k6)((() => [(0, r.eW)("Nuevo Producto")])), _: 1 }), U, (0, r.bF)(l, { class: "btn btn-menu", to: "/u/productos" }, { default: (0, r.k6)((() => [(0, r.eW)("Listar Productos")])), _: 1 })])]), (0, r.Lk)("div", F, [(0, r.Lk)("div", V, [T, (0, r.Lk)("a", { href: "https://puestito.online/" + i.nombreUsuario, target: "_blank" }, "https://puestito.online/" + (0, L.v_)(i.nombreUsuario), 9, W), D])]), "2100" !== i.fechaVence ? ((0, r.uX)(), (0, r.CE)("div", Q, [(0, r.Lk)("div", J, [O, (0, r.Lk)("a", { ref: "qrcode", href: "https://puestito.online/" + i.nombreUsuario, target: "_blank" }, null, 8, $), z, (0, r.Lk)("button", { onClick: e[0] || (e[0] = (...o) => n.descargarQR && n.descargarQR(...o)), class: "btn btn-menu margenbtn" }, "Descargar QR")])])) : (0, r.Q3)("", !0)]))])])
                }
                var R = a(852),
                    B = a.n(R);
                const G = o => ((0, r.Qi)("data-v-6ee14e69"), o = o(), (0, r.jt)(), o),
                    K = { class: "" },
                    H = { class: "navbar navbar-expand-lg navbar-dark bg-dark" },
                    Y = { class: "container-fluid" },
                    Z = G((() => (0, r.Lk)("button", { class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNavDarkDropdown", "aria-controls": "navbarNavDarkDropdown", "aria-expanded": "false", "aria-label": "Toggle navigation" }, [(0, r.Lk)("span", { class: "navbar-toggler-icon" })], -1))),
                    oo = { class: "collapse navbar-collapse", id: "navbarNavDarkDropdown" },
                    eo = { class: "navbar-nav" },
                    ao = { class: "test nav-item" },
                    to = { class: "test nav-item" },
                    io = { class: "test nav-item dropdown" },
                    ro = { class: "dropdown-menu dropdown-menu-dark" },
                    no = { class: "test nav-item" },
                    so = G((() => (0, r.Lk)("button", { class: "nav-link", "data-bs-toggle": "modal", "data-bs-target": "#exampleModal" }, " Salir ", -1))),
                    co = { class: "modal fade", id: "exampleModal", tabindex: "-1", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
                    lo = { class: "modal-dialog" },
                    uo = { class: "modal-content" },
                    mo = G((() => (0, r.Lk)("div", { class: "modal-header text-center" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "exampleModalLabel" }, "¿Cerrar sesión?"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    po = { class: "modal-footer text-center" },
                    go = G((() => (0, r.Lk)("button", { type: "button", class: "btn btn-secondary", "data-bs-dismiss": "modal" }, "No", -1)));

                function bo(o, e, a, t, i, n) { const s = (0, r.g2)("router-link"); return (0, r.uX)(), (0, r.CE)("div", K, [(0, r.Lk)("nav", H, [(0, r.Lk)("div", Y, [(0, r.bF)(s, { class: "navbar-brand", to: "/u/home" }, { default: (0, r.k6)((() => [(0, r.eW)((0, L.v_)(n.leerUsuario()) + " | ", 1)])), _: 1 }), Z, (0, r.Lk)("div", oo, [(0, r.Lk)("ul", eo, [(0, r.Lk)("li", ao, [(0, r.bF)(s, { class: "nav-link", to: "/u/home" }, { default: (0, r.k6)((() => [(0, r.eW)("Inicio ")])), _: 1 })]), (0, r.Lk)("li", to, [(0, r.bF)(s, { class: "nav-link", to: "/u/modificar" }, { default: (0, r.k6)((() => [(0, r.eW)("Pefil")])), _: 1 })]), (0, r.Lk)("li", io, [(0, r.Lk)("button", { class: (0, L.C4)([{ active: n.isActiveProductos() }, "dropdown-toggle nav-link"]), "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " Productos ", 2), (0, r.Lk)("ul", ro, [(0, r.Lk)("li", null, [(0, r.bF)(s, { class: "dropdown-item", to: "/u/nuevoProducto" }, { default: (0, r.k6)((() => [(0, r.eW)("Nuevo Producto")])), _: 1 })]), (0, r.Lk)("li", null, [(0, r.bF)(s, { class: "dropdown-item", to: "/u/productos" }, { default: (0, r.k6)((() => [(0, r.eW)("Listar Productos")])), _: 1 })])])]), (0, r.Lk)("li", no, [so, (0, r.Lk)("div", co, [(0, r.Lk)("div", lo, [(0, r.Lk)("div", uo, [mo, (0, r.Lk)("div", po, [go, (0, r.Lk)("button", { type: "button", class: "btn btn-menu-danger", "data-bs-dismiss": "modal", onClick: e[0] || (e[0] = (...o) => n.cerrarSesion && n.cerrarSesion(...o)) }, "Sí, cerrar sesión")])])])])])])])])])]) }
                a(4114);
                var ko = { mounted() {}, methods: { isActiveProductos() { return "/u/nuevoProducto" == this.$route.path || "/u/productos" == this.$route.path }, isActiveCategorias() { return "/u/nuevaCategoria" == this.$route.path || "/u/categorias" == this.$route.path }, leerUsuario() { return localStorage.getItem("nombre") }, cerrarSesion() { localStorage.clear(), sc.push("/") } }, components: { "router-link": h.Wk } };
                const vo = (0, p.A)(ko, [
                    ["render", bo],
                    ["__scopeId", "data-v-6ee14e69"]
                ]);
                var fo = vo;
                const ho = o => ((0, r.Qi)("data-v-0eddee93"), o = o(), (0, r.jt)(), o),
                    Lo = { class: "" },
                    Co = { class: "navbar navbar-expand-lg navbar-dark bg-dark" },
                    yo = { class: "container-fluid" },
                    _o = ho((() => (0, r.Lk)("button", { class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNavDarkDropdown", "aria-controls": "navbarNavDarkDropdown", "aria-expanded": "false", "aria-label": "Toggle navigation" }, [(0, r.Lk)("span", { class: "navbar-toggler-icon" })], -1))),
                    xo = { class: "collapse navbar-collapse", id: "navbarNavDarkDropdown" },
                    wo = { class: "navbar-nav" },
                    Eo = { class: "test nav-item" },
                    So = { class: "test nav-item" },
                    Po = { class: "test nav-item" },
                    Io = { class: "test nav-item" },
                    Mo = ho((() => (0, r.Lk)("button", { class: "nav-link", "data-bs-toggle": "modal", "data-bs-target": "#exampleModal" }, " Salir ", -1))),
                    No = { class: "modal fade", id: "exampleModal", tabindex: "-1", "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" },
                    Ao = { class: "modal-dialog" },
                    Xo = { class: "modal-content" },
                    qo = ho((() => (0, r.Lk)("div", { class: "modal-header text-center" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "exampleModalLabel" }, "¿Cerrar sesión?"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    Uo = { class: "modal-footer text-center" },
                    Fo = ho((() => (0, r.Lk)("button", { type: "button", class: "btn btn-secondary", "data-bs-dismiss": "modal" }, "No", -1)));

                function Vo(o, e, a, t, i, n) { const s = (0, r.g2)("router-link"); return (0, r.uX)(), (0, r.CE)("div", Lo, [(0, r.Lk)("nav", Co, [(0, r.Lk)("div", yo, [(0, r.bF)(s, { class: "navbar-brand", to: "/u/home" }, { default: (0, r.k6)((() => [(0, r.eW)((0, L.v_)(n.leerUsuario()) + " | ", 1)])), _: 1 }), _o, (0, r.Lk)("div", xo, [(0, r.Lk)("ul", wo, [(0, r.Lk)("li", Eo, [(0, r.bF)(s, { class: "nav-link", to: "/u/home" }, { default: (0, r.k6)((() => [(0, r.eW)("Inicio")])), _: 1 })]), (0, r.Lk)("li", So, [(0, r.bF)(s, { class: "nav-link", to: "/u/registrar" }, { default: (0, r.k6)((() => [(0, r.eW)("Nuevo Negocio")])), _: 1 })]), (0, r.Lk)("li", Po, [(0, r.bF)(s, { class: "nav-link", to: "/u/negocios" }, { default: (0, r.k6)((() => [(0, r.eW)("Listar Negocios")])), _: 1 })]), (0, r.Lk)("li", Io, [Mo, (0, r.Lk)("div", No, [(0, r.Lk)("div", Ao, [(0, r.Lk)("div", Xo, [qo, (0, r.Lk)("div", Uo, [Fo, (0, r.Lk)("button", { type: "button", class: "btn btn-menu-danger", "data-bs-dismiss": "modal", onClick: e[0] || (e[0] = (...o) => n.cerrarSesion && n.cerrarSesion(...o)) }, "Sí, cerrar sesión")])])])])])])])])])]) }
                var To = { methods: { leerUsuario() { return localStorage.getItem("nombre") }, cerrarSesion() { localStorage.clear(), sc.push("/") } }, components: { "router-link": h.Wk } };
                const Wo = (0, p.A)(To, [
                    ["render", Vo],
                    ["__scopeId", "data-v-0eddee93"]
                ]);
                var Do = Wo,
                    Qo = a(788),
                    Jo = {
                        data() { return { nombreUsuario: "", nombreNegocio: "", fechaVence: "" } },
                        components: { NavbarComponent: fo, NavbarAdminComponent: Do, "router-link": h.Wk },
                        mounted() { this.leerUsuario(), "admin" != this.nombreUsuario && this.generarQR() },
                        methods: {
                            generarQR() {
                                const o = localStorage.getItem("nombre");
                                if (o) {
                                    const e = B()(0, "L"),
                                        a = 9;
                                    e.size = a;
                                    const t = "http://192.168.0.5:8080/" + o;
                                    e.addData(t), e.make(), this.renderQRCode(e.createImgTag(a, 0))
                                }
                            },
                            renderQRCode(o) {
                                const e = this.$refs.qrcode;
                                e.innerHTML = o
                            },
                            leerUsuario() { this.nombreUsuario = localStorage.getItem("usuario"), this.nombreNegocio = localStorage.getItem("nombre"), this.fechaVence = localStorage.getItem("año") },
                            esAdmin() { return "admin" == localStorage.getItem("usuario") },
                            descargarQR() {
                                const o = this.$refs.qrcode.firstChild,
                                    e = document.createElement("canvas"),
                                    a = e.getContext("2d");
                                e.width = o.width, e.height = o.height, a.drawImage(o, 0, 0), e.toBlob((o => {
                                    (0, Qo.saveAs)(o, "codigoQR-" + this.nombreUsuario + ".jpg")
                                }), "image/jpeg")
                            }
                        }
                    };
                const Oo = (0, p.A)(Jo, [
                    ["render", j],
                    ["__scopeId", "data-v-4de2e8af"]
                ]);
                var $o = Oo;
                const zo = o => ((0, r.Qi)("data-v-42939feb"), o = o(), (0, r.jt)(), o),
                    jo = { class: "container2 mt-4" },
                    Ro = { key: 0, class: "pantalla-carga text-center" },
                    Bo = zo((() => (0, r.Lk)("div", { class: "logo-carga" }, [(0, r.Lk)("img", { class: "logo-img", src: "/favicon.ico", width: "50", alt: "" }), (0, r.Lk)("div", { class: "texto-carga" }, " Buscando negocios ")], -1))),
                    Go = [Bo],
                    Ko = { key: 1 },
                    Ho = { class: "mt-2" },
                    Yo = zo((() => (0, r.Lk)("h1", null, "¿Qué estás buscando?", -1))),
                    Zo = { class: "izquierda ancho-busqueda" },
                    oe = { class: "negocios-body" },
                    ee = { class: "modalMapa mt-2", style: { height: "400px" } },
                    ae = { style: { "max-width": "150px" } },
                    te = { style: { "font-size": "20px" } },
                    ie = zo((() => (0, r.Lk)("br", null, null, -1))),
                    re = { style: { "text-align": "center" } },
                    ne = ["href"],
                    se = zo((() => (0, r.Lk)("img", { src: "/favicon.ico", width: "20", alt: "" }, null, -1))),
                    ce = [se],
                    le = ["href"],
                    de = zo((() => (0, r.Lk)("img", { style: { margin: "0px 10px" }, width: "20", src: "/recursos/instagram.png" }, null, -1))),
                    ue = [de],
                    me = ["href"],
                    pe = zo((() => (0, r.Lk)("img", { style: { margin: "0px 10px" }, width: "20", src: "/recursos/facebook.png" }, null, -1))),
                    ge = [pe],
                    be = { style: { margin: "5px 0px" } },
                    ke = zo((() => (0, r.Lk)("b", null, "Dirección:", -1))),
                    ve = { style: { margin: "5px 0px" } },
                    fe = zo((() => (0, r.Lk)("b", null, "Correo:", -1))),
                    he = { style: { margin: "5px 0px" } },
                    Le = zo((() => (0, r.Lk)("b", null, "Teléfono:", -1))),
                    Ce = { style: { "text-align": "center", margin: "7px 0px" } },
                    ye = { class: "item-imagen" },
                    _e = { key: 0 },
                    xe = ["src"],
                    we = { class: "item-texto-block" },
                    Ee = { class: "item-nombre" },
                    Se = { key: 0, class: "item-descripcion" },
                    Pe = { class: "item-btn" },
                    Ie = ["onClick"],
                    Me = zo((() => (0, r.Lk)("img", { src: "/recursos/pin.png", width: "30", alt: "" }, null, -1))),
                    Ne = [Me],
                    Ae = zo((() => (0, r.Lk)("img", { src: "/favicon.ico", width: "30", alt: "" }, null, -1))),
                    Xe = { key: 0, class: "text-center mt-3" };

                function qe(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarPublicoComponent"),
                        l = (0, r.g2)("GMapInfoWindow"),
                        d = (0, r.g2)("GMapMarker"),
                        u = (0, r.g2)("GMapMap"),
                        m = (0, r.g2)("router-link");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(c), (0, r.Lk)("div", jo, [n.cargando ? ((0, r.uX)(), (0, r.CE)("div", Ro, Go)) : ((0, r.uX)(), (0, r.CE)("div", Ko, [(0, r.Lk)("div", Ho, [Yo, (0, r.Lk)("div", Zo, [(0, r.bo)((0, r.Lk)("input", { class: "form-control barra-busqueda", "onUpdate:modelValue": e[0] || (e[0] = o => n.busqueda = o), type: "text", name: "busqueda", id: "", placeholder: "Buscar", title: "Ingrese una palabra clave..." }, null, 512), [
                        [i.Jo, n.busqueda]
                    ])]), (0, r.Lk)("button", { class: "btn btn-menu derecha", onClick: e[1] || (e[1] = (...o) => s.mostrarMapa && s.mostrarMapa(...o)) }, (0, L.v_)(n.mapaMostrado2 ? "Ocultar\n                        Mapa" : "Ver Mapa"), 1)]), (0, r.Lk)("div", oe, [(0, r.bo)((0, r.Lk)("div", ee, [(0, r.bF)(u, { style: { height: "400px" }, center: n.mapCenter, zoom: n.zoom, options: n.options }, { default: (0, r.k6)((() => [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(n.negocios, ((o, a) => ((0, r.uX)(), (0, r.Wv)(d, { key: a, position: o.location, title: o.nombre, onClick: o => s.openInfoWindow(a) }, { default: (0, r.k6)((() => [n.infoWindowOpened == a ? ((0, r.uX)(), (0, r.Wv)(l, { key: 0, options: n.infoWindow[a].options, closeclick: !0, onCloseclick: e[2] || (e[2] = o => s.openInfoWindow(null)) }, { default: (0, r.k6)((() => [(0, r.Lk)("div", ae, [(0, r.Lk)("b", te, (0, L.v_)(o.nombre), 1), ie, (0, r.Lk)("div", re, [(0, r.Lk)("a", { style: { "text-decoration": "none", color: "white", "font-size": "12px", padding: "4px 6px" }, href: "https://puestito.online/" + o.usuario, target: "_blank" }, ce, 8, ne), o.instagram ? ((0, r.uX)(), (0, r.CE)("a", { key: 0, href: o.instagram, target: "blank" }, ue, 8, le)) : (0, r.Q3)("", !0), o.facebook ? ((0, r.uX)(), (0, r.CE)("a", { key: 1, href: o.facebook, target: "blank" }, ge, 8, me)) : (0, r.Q3)("", !0)]), (0, r.Lk)("p", be, [ke, (0, r.eW)(" " + (0, L.v_)(o.direccion), 1)]), (0, r.Lk)("p", ve, [fe, (0, r.eW)(" " + (0, L.v_)(o.correo), 1)]), (0, r.Lk)("p", he, [Le, (0, r.eW)(" " + (0, L.v_)(o.telefono), 1)]), (0, r.Lk)("p", Ce, '"' + (0, L.v_)(o.descripcion) + '"', 1)])])), _: 2 }, 1032, ["options"])) : (0, r.Q3)("", !0)])), _: 2 }, 1032, ["position", "title", "onClick"])))), 128))])), _: 1 }, 8, ["center", "zoom", "options"])], 512), [
                        [i.aG, n.mapaMostrado2]
                    ]), (0, r.Lk)("ul", null, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.negociosFiltrados, ((o, e) => ((0, r.uX)(), (0, r.CE)("li", { class: "item-container mt-2", key: e }, [(0, r.Lk)("div", ye, [o.imagen ? ((0, r.uX)(), (0, r.CE)("div", _e, [(0, r.Lk)("img", { class: "imagen", src: o.imagen, alt: " " }, null, 8, xe)])) : (0, r.Q3)("", !0)]), (0, r.Lk)("div", we, [(0, r.Lk)("div", Ee, (0, L.v_)(o.nombre), 1), o.descripcion ? ((0, r.uX)(), (0, r.CE)("div", Se, ' "' + (0, L.v_)(o.descripcion) + '" ', 1)) : (0, r.Q3)("", !0)]), (0, r.Lk)("div", Pe, [(0, r.Lk)("a", { class: "cursor-pointer mt-1", onClick: a => s.localizar(o, e) }, Ne, 8, Ie), (0, r.bF)(m, { class: "item-texto-block-end", to: "/" + o.usuario, target: "_blank" }, { default: (0, r.k6)((() => [Ae])), _: 2 }, 1032, ["to"])])])))), 128))]), 0 === s.negociosFiltrados.length ? ((0, r.uX)(), (0, r.CE)("div", Xe, " No se encontraron resultados para esa búsqueda. ")) : (0, r.Q3)("", !0)])]))])])
                }
                const Ue = o => ((0, r.Qi)("data-v-7a361c7e"), o = o(), (0, r.jt)(), o),
                    Fe = { class: "navbar navbar-light bg-light" },
                    Ve = Ue((() => (0, r.Lk)("img", { src: "/favicon.ico", width: "30", height: "30", class: "d-inline-block align-top", alt: "" }, null, -1)));

                function Te(o, e, a, t, i, n) { const s = (0, r.g2)("router-link"); return (0, r.uX)(), (0, r.CE)("nav", Fe, [(0, r.bF)(s, { class: "navbar-brand", to: "/" }, { default: (0, r.k6)((() => [Ve, (0, r.eW)(" Puestito Online ")])), _: 1 }), i.usuario ? ((0, r.uX)(), (0, r.Wv)(s, { key: 0, to: "/u/home" }, { default: (0, r.k6)((() => [(0, r.eW)("Mi Negocio")])), _: 1 })) : ((0, r.uX)(), (0, r.Wv)(s, { key: 1, to: "/u/login" }, { default: (0, r.k6)((() => [(0, r.eW)("Login")])), _: 1 }))]) }
                var We = { data() { return { usuario: "" } }, mounted() { this.obtenerUsuario() }, methods: { obtenerUsuario() { this.usuario = localStorage.getItem("usuario") } } };
                const De = (0, p.A)(We, [
                    ["render", Te],
                    ["__scopeId", "data-v-7a361c7e"]
                ]);
                var Qe = De,
                    Je = {
                        components: { NavbarPublicoComponent: Qe },
                        name: "MapaComponent",
                        data() { return { options: { disableDefaultUI: !0, styles: [{ featureType: "poi.business", stylers: [{ visibility: "off" }] }, { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }] }, infoWindowOpened: null, infoWindow: [], mapCenter: { lat: -27.7876, lng: -64.2596 }, zoom: 14, negocios: [], busqueda: "", mapaMostrado: !1, mapaMostrado2: !1, cargando: !0 } },
                        created() { this.fetchNegocios() },
                        mounted() { console.log(this.$route.params), this.$route.params && sc.push("/", this.$route.params) },
                        computed: {
                            negociosFiltrados() {
                                return this.negocios.filter((o => {
                                    const e = o.nombre || "",
                                        a = o.descripcion || "";
                                    return e.toLowerCase().includes(this.busqueda.toLowerCase()) || a.toLowerCase().includes(this.busqueda.toLowerCase())
                                }))
                            }
                        },
                        methods: {
                            localizar(o, e) { this.mapaMostrado2 = !0, this.mapCenter = o.location, this.infoWindowOpened = e },
                            openInfoWindow(o) { this.infoWindowOpened == o ? this.infoWindowOpened = null : this.infoWindowOpened = o },
                            async inicializarMapa() {
                                try {
                                    navigator.geolocation ? navigator.geolocation.getCurrentPosition((o => {
                                        const e = { lat: o.coords.latitude, lng: o.coords.longitude };
                                        this.mapCenter = e
                                    }), (o => { console.log("Error al geolocalizar. Inicializando en Plaza Libertad. ", o) })) : console.log("No funciona geolocation. Centrando mapa en Plaza Libertad.")
                                } catch (o) { console.error("Error al obtener la ubicación actual:", o) }
                            },
                            async fetchNegocios() {
                                try {
                                    const o = await t.A.get("/negocios");
                                    this.negocios = o.data, this.infoWindow = Array(this.negocios.length).fill({ open: !1, options: { pixelOffset: { width: 0, height: -10 }, maxWidth: 320, maxHeight: 320 } })
                                } catch (o) { console.error("Error al obtener los datos de los negocios:", o) } finally { this.cargando = !1 }
                            },
                            mostrarMapa() { this.mapaMostrado2 ? this.mapaMostrado2 = !1 : this.mapaMostrado ? this.mapaMostrado2 = !0 : (this.mapaMostrado = !0, this.mapaMostrado2 = !0, this.$nextTick((() => { this.inicializarMapa() }))) }
                        }
                    };
                const Oe = (0, p.A)(Je, [
                    ["render", qe],
                    ["__scopeId", "data-v-42939feb"]
                ]);
                var $e = Oe;
                const ze = o => ((0, r.Qi)("data-v-b5985b94"), o = o(), (0, r.jt)(), o),
                    je = { class: "total" },
                    Re = { class: "fondo text-center" },
                    Be = ze((() => (0, r.Lk)("img", { src: "/favicon.ico", width: "100", alt: "logo", class: "mb-4" }, null, -1))),
                    Ge = ze((() => (0, r.Lk)("h1", { class: "titulo" }, "Puestito Online", -1))),
                    Ke = { class: "width-size" },
                    He = ze((() => (0, r.Lk)("label", { for: "usuario" }, "Usuario", -1))),
                    Ye = { class: "width-size" },
                    Ze = ze((() => (0, r.Lk)("label", { for: "contraseña" }, "Contraseña", -1))),
                    oa = ze((() => (0, r.Lk)("div", { class: "col-md-8" }, [(0, r.Lk)("button", { type: "submit", class: "btn btn-entrar" }, "Entrar")], -1))),
                    ea = ze((() => (0, r.Lk)("div", { class: "derecha" }, null, -1)));

                function aa(o, e, a, t, n, s) {
                    const c = (0, r.g2)("router-link");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.Lk)("div", je, [(0, r.Lk)("div", Re, [Be, Ge, (0, r.Lk)("form", { class: "row g-3", onSubmit: e[2] || (e[2] = (0, i.D$)(((...o) => s.login && s.login(...o)), ["prevent"])) }, [(0, r.Lk)("div", Ke, [He, (0, r.bo)((0, r.Lk)("input", { class: "form-control mb-3", type: "text", "onUpdate:modelValue": e[0] || (e[0] = o => n.usuario = o), required: "" }, null, 512), [
                        [i.Jo, n.usuario]
                    ])]), (0, r.Lk)("div", Ye, [Ze, (0, r.bo)((0, r.Lk)("input", { class: "form-control mb-4", type: "password", "onUpdate:modelValue": e[1] || (e[1] = o => n.contraseña = o), required: "" }, null, 512), [
                        [i.Jo, n.contraseña]
                    ])]), oa, (0, r.bF)(c, { to: "/u/planes" }, { default: (0, r.k6)((() => [(0, r.eW)("Registrar Negocio")])), _: 1 }), (0, r.bF)(c, { to: "/" }, { default: (0, r.k6)((() => [(0, r.eW)("Volver")])), _: 1 })], 32)]), ea])])
                }
                var ta = a(4874),
                    ia = a.n(ta),
                    ra = {
                        components: {},
                        data() { return { usuario: "", "contraseña": "" } },
                        methods: {
                            checkAuthentication() {
                                const o = !!localStorage.getItem("token");
                                o && this.$router.push("/u/home")
                            },
                            async login() {
                                try {
                                    const o = await t.A.post("/login", { usuario: this.usuario, "contraseña": this.contraseña });
                                    if (200 === o.status) {
                                        localStorage.setItem("token", o.data.token), localStorage.setItem("nombre", o.data.nombre), localStorage.setItem("usuario", o.data.nomUsuario);
                                        const e = new Date(o.data.fechaVence);
                                        localStorage.setItem("año", e.getFullYear()), this.$router.push("/u/home");
                                        const a = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                        a.fire({ icon: "success", title: "Inicio de sesión exitoso." })
                                    }
                                } catch (o) { ia().fire({ icon: "error", text: "Usuario/contraseña incorrectos." }) }
                            }
                        },
                        mounted() { this.checkAuthentication() }
                    };
                const na = (0, p.A)(ra, [
                    ["render", aa],
                    ["__scopeId", "data-v-b5985b94"]
                ]);
                var sa = na;
                const ca = o => ((0, r.Qi)("data-v-e5902c60"), o = o(), (0, r.jt)(), o),
                    la = { class: "container mt-4 mb-2" },
                    da = { class: "row g-3 mt-4 border" },
                    ua = { class: "row g-3 border" },
                    ma = ca((() => (0, r.Lk)("h4", { class: "titulo- mb-2" }, "Información de acceso", -1))),
                    pa = ca((() => (0, r.Lk)("h4", { class: "subtitulo" }, "Cómo ingresarás a la plataforma.", -1))),
                    ga = { class: "col-md-6" },
                    ba = { class: "col-md-6" },
                    ka = ca((() => (0, r.Lk)("h4", { class: "titulo- mb-2" }, "Información del negocio", -1))),
                    va = ca((() => (0, r.Lk)("h4", { class: "subtitulo" }, "Más adelante podés modificar esta información.", -1))),
                    fa = { class: "col-md-6" },
                    ha = { class: "col-md-6" },
                    La = { class: "col-md-6" },
                    Ca = { class: "col-md-6" },
                    ya = { class: "col-md-6" },
                    _a = { class: "col-md-6" },
                    xa = { class: "col-md-6" },
                    wa = { class: "col-md-6" },
                    Ea = ca((() => (0, r.Lk)("label", { class: "form-label text-center", for: "imagen" }, "Logo (JPG)", -1))),
                    Sa = { key: 0, class: "btn btn-menu botones m-auto mb-2", type: "submit" },
                    Pa = { key: 1, class: "btn btn-menu botones m-auto mb-2", type: "submit" };

                function Ia(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarAdminComponent"),
                        l = (0, r.g2)("NavbarPublicoComponent");
                    return (0, r.uX)(), (0, r.CE)("div", null, ["admin" == o.usuario ? ((0, r.uX)(), (0, r.Wv)(c, { key: 0 })) : ((0, r.uX)(), (0, r.Wv)(l, { key: 1 })), (0, r.Lk)("div", la, [(0, r.Lk)("div", da, [(0, r.Lk)("form", { onSubmit: e[10] || (e[10] = (0, i.D$)(((...o) => s.registrarNegocio && s.registrarNegocio(...o)), ["prevent"])), id: "form-checkout" }, [(0, r.Lk)("div", ua, [ma, pa, (0, r.Lk)("div", ga, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "username", "onUpdate:modelValue": e[0] || (e[0] = o => n.negocio.usuario = o), placeholder: "Nombre de Usuario", required: "" }, null, 512), [
                        [i.Jo, n.negocio.usuario]
                    ])]), (0, r.Lk)("div", ba, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "password", id: "password", "onUpdate:modelValue": e[1] || (e[1] = o => n.negocio.contraseña = o), placeholder: "Contraseña", required: "" }, null, 512), [
                        [i.Jo, n.negocio.contraseña]
                    ])]), ka, va, (0, r.Lk)("div", fa, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[2] || (e[2] = o => n.negocio.nombre = o), placeholder: "Nombre (Así aparecerás en la página)", required: "" }, null, 512), [
                        [i.Jo, n.negocio.nombre]
                    ])]), (0, r.Lk)("div", ha, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "descripcion", "onUpdate:modelValue": e[3] || (e[3] = o => n.negocio.descripcion = o), placeholder: "Descripción (Qué ofreces)" }, null, 512), [
                        [i.Jo, n.negocio.descripcion]
                    ])]), (0, r.Lk)("div", La, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "email", id: "email", "onUpdate:modelValue": e[4] || (e[4] = o => n.negocio.email = o), placeholder: "Email", required: "" }, null, 512), [
                        [i.Jo, n.negocio.email]
                    ])]), (0, r.Lk)("div", Ca, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "direccion", "onUpdate:modelValue": e[5] || (e[5] = o => n.negocio.direccion = o), placeholder: "Dirección (por ej. Libertad 20, Santiago del Estero, Argentina)" }, null, 512), [
                        [i.Jo, n.negocio.direccion]
                    ])]), (0, r.Lk)("div", ya, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "number", id: "telefono", "onUpdate:modelValue": e[6] || (e[6] = o => n.negocio.telefono = o), placeholder: "Teléfono (por ej. +5493855223287)" }, null, 512), [
                        [i.Jo, n.negocio.telefono]
                    ])]), (0, r.Lk)("div", _a, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "instagram", "onUpdate:modelValue": e[7] || (e[7] = o => n.negocio.instagram = o), placeholder: "Link de Instagram" }, null, 512), [
                        [i.Jo, n.negocio.instagram]
                    ])]), (0, r.Lk)("div", xa, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "facebook", "onUpdate:modelValue": e[8] || (e[8] = o => n.negocio.facebook = o), placeholder: "Link de Facebook" }, null, 512), [
                        [i.Jo, n.negocio.facebook]
                    ])]), (0, r.Lk)("div", wa, [Ea, (0, r.Lk)("input", { class: "form-control", type: "file", name: "imagen", id: "imagen", accept: ".jpg", onChange: e[9] || (e[9] = o => s.imagenSeleccionada(o)), required: "" }, null, 32)]), n.plan ? ((0, r.uX)(), (0, r.CE)("button", Pa, "Ir a Pagar")) : ((0, r.uX)(), (0, r.CE)("button", Sa, "Contratar"))])], 32)])])])
                }
                var Ma = {
                    components: { NavbarAdminComponent: Do, NavbarPublicoComponent: Qe },
                    data() { return { plan: null, negocio: { usuario: "", "contraseña": "", nombre: "", fechaVence: "", email: "", imagen: "", direccion: "", telefono: "", descripcion: "", instagram: "", facebook: "" } } },
                    mounted() { this.obtenerPlan() },
                    methods: {
                        async obtenerPlan() { this.plan = localStorage.getItem("plan"), console.log("RegistrarComponent: ", this.plan) },
                        imagenSeleccionada(o) {
                            const e = o.target.files[0];
                            if (e) {
                                const o = new FileReader;
                                o.onload = o => { this.negocio.imagen = o.target.result }, o.readAsDataURL(e)
                            }
                        },
                        resetForm() { this.negocio.usuario = "", this.negocio.contraseña = "", this.negocio.nombre = "", this.negocio.fechaVence = "", this.negocio.email = "", this.negocio.imagen = "", this.negocio.direccion = "", this.negocio.telefono = "", this.negocio.direccion = "", this.negocio.instagram = "", this.negocio.facebook = "" },
                        async registrarNegocio() {
                            if (this.plan) {
                                localStorage.setItem("usuario", this.negocio.usuario);
                                try {
                                    const e = await t.A.post("/facturar/crearOrden", { plan: this.plan });
                                    try {
                                        let o = new Date;
                                        const a = o.getMonth() - 1;
                                        o.setMonth(a + this.plan), this.negocio.fechaVence = o.toISOString().slice(0, 19).replace("T", " "), window.open(await e.data.init_point, "_blank"), await t.A.post("/register", this.negocio).then((() => {
                                            sc.push("/u/login");
                                            const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                            o.fire({ icon: "success", title: "Registro exitoso." })
                                        })).catch((o => { ia().fire({ icon: "error", text: o.response.data.message }), console.error("Error al registrar usuario:", o) }))
                                    } catch (o) { console.log(o) }
                                } catch (o) { console.log(o) }
                            } else {
                                let o = new Date;
                                this.negocio.fechaVence = o.toISOString().slice(0, 19).replace("T", " "), await t.A.post("/register", this.negocio).then((() => {
                                    sc.push("/u/login");
                                    const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                    o.fire({ icon: "success", title: "Registro exitoso." })
                                })).catch((o => { ia().fire({ icon: "error", text: o.response.data.message }), console.error("Error al registrar usuario:", o) }))
                            }
                        }
                    }
                };
                const Na = (0, p.A)(Ma, [
                    ["render", Ia],
                    ["__scopeId", "data-v-e5902c60"]
                ]);
                var Aa = Na;
                const Xa = o => ((0, r.Qi)("data-v-ce547948"), o = o(), (0, r.jt)(), o),
                    qa = { class: "container mt-4 mb-2" },
                    Ua = Xa((() => (0, r.Lk)("h1", null, "Negocios", -1))),
                    Fa = { class: "izquierda ancho-busqueda" },
                    Va = { key: 0 },
                    Ta = ["src"],
                    Wa = { class: "item-texto-block m-2" },
                    Da = { key: 0, class: "item-descripcion" },
                    Qa = Xa((() => (0, r.Lk)("b", null, "Nombre de usuario:", -1))),
                    Ja = { class: "item-descripcion" },
                    Oa = Xa((() => (0, r.Lk)("b", null, "Nombre del negocio:", -1))),
                    $a = { key: 1, class: "item-descripcion" },
                    za = Xa((() => (0, r.Lk)("b", null, "Descripción:", -1))),
                    ja = { key: 2, class: "item-descripcion" },
                    Ra = Xa((() => (0, r.Lk)("b", null, "Fecha de Vencimiento:", -1))),
                    Ba = ["onClick"],
                    Ga = { class: "item-texto-block-end" },
                    Ka = ["href"],
                    Ha = Xa((() => (0, r.Lk)("img", { width: "40", src: "/recursos/instagram.png" }, null, -1))),
                    Ya = [Ha],
                    Za = { key: 1 },
                    ot = ["href"],
                    et = Xa((() => (0, r.Lk)("img", { width: "36", src: "/recursos/facebook.png" }, null, -1))),
                    at = [et],
                    tt = { key: 3 },
                    it = { class: "item-btn" },
                    rt = Xa((() => (0, r.Lk)("img", { src: "/favicon.ico", width: "30", alt: "" }, null, -1))),
                    nt = { class: "modal fade", id: "modificarProducto", tabindex: "-1", "aria-labelledby": "modificarProductoLabel", "aria-hidden": "true", ref: "modalModificar" },
                    st = { class: "modal-dialog modal-dialog-centered" },
                    ct = { class: "modal-content" },
                    lt = Xa((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "modificarProductoLabel" }, "Modificar Datos"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    dt = { class: "modal-body" },
                    ut = { class: "row g-3 div-forms border" },
                    mt = Xa((() => (0, r.Lk)("h4", { class: "titulo-div-forms mb-2" }, "Información del Usuario", -1))),
                    pt = Xa((() => (0, r.Lk)("h4", { class: "titulo-div-forms mb-2" }, "Información del Negocio", -1))),
                    gt = Xa((() => (0, r.Lk)("label", { class: "form-label mr-2", for: "imagen" }, "Imagen (JPG)", -1))),
                    bt = Xa((() => (0, r.Lk)("div", { class: "text-end" }, [(0, r.Lk)("button", { class: "btn btn-menu botones mt-3", type: "submit", "aria-label": "Close" }, "Modificar")], -1)));

                function kt(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarAdminComponent"),
                        l = (0, r.g2)("router-link");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(c), (0, r.Lk)("div", qa, [Ua, (0, r.Lk)("div", Fa, [(0, r.bo)((0, r.Lk)("input", { class: "form-control barra-busqueda", "onUpdate:modelValue": e[0] || (e[0] = o => n.busqueda = o), type: "text", name: "busqueda", id: "", placeholder: "Buscar", title: "Ingrese una palabra clave..." }, null, 512), [
                        [i.Jo, n.busqueda]
                    ])]), (0, r.Lk)("ul", null, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.negociosFiltrados, ((o, e) => ((0, r.uX)(), (0, r.CE)("li", { class: "item-container mt-2", key: e }, [o.imagen ? ((0, r.uX)(), (0, r.CE)("div", Va, [(0, r.Lk)("img", { class: "imagen", src: o.imagen, alt: " " }, null, 8, Ta)])) : (0, r.Q3)("", !0), (0, r.Lk)("div", Wa, [o.usuario ? ((0, r.uX)(), (0, r.CE)("div", Da, [Qa, (0, r.eW)(' "' + (0, L.v_)(o.usuario) + '" ', 1)])) : (0, r.Q3)("", !0), (0, r.Lk)("div", Ja, [Oa, (0, r.eW)(" " + (0, L.v_)(o.nombre), 1)]), o.descripcion ? ((0, r.uX)(), (0, r.CE)("div", $a, [za, (0, r.eW)(' "' + (0, L.v_)(o.descripcion) + '" ', 1)])) : (0, r.Q3)("", !0), o.fechaVence ? ((0, r.uX)(), (0, r.CE)("div", ja, [Ra, (0, r.eW)(' "' + (0, L.v_)(s.formatear(o.fechaVence)) + '" ', 1)])) : (0, r.Q3)("", !0), (0, r.Lk)("button", { class: "btn btn-menu derecha mt-2 mb-2", title: "Modificar", "data-bs-toggle": "modal", "data-bs-target": "#modificarProducto", onClick: e => s.modificarNegocio(o) }, "Modificar", 8, Ba)]), (0, r.Lk)("div", Ga, [o.instagram ? ((0, r.uX)(), (0, r.CE)("a", { key: 0, class: "m-2", href: o.instagram, target: "blank" }, Ya, 8, Ka)) : ((0, r.uX)(), (0, r.CE)("div", Za, "Sin Instagram")), o.facebook ? ((0, r.uX)(), (0, r.CE)("a", { key: 2, class: "m-2", href: o.facebook, target: "blank" }, at, 8, ot)) : ((0, r.uX)(), (0, r.CE)("div", tt, "Sin Facebook"))]), (0, r.Lk)("div", it, [(0, r.bF)(l, { class: "item-texto-block-end", to: "/" + o.usuario }, { default: (0, r.k6)((() => [rt])), _: 2 }, 1032, ["to"])])])))), 128))])]), (0, r.Lk)("div", nt, [(0, r.Lk)("div", st, [(0, r.Lk)("div", ct, [lt, (0, r.Lk)("div", dt, [(0, r.Lk)("form", { onSubmit: e[12] || (e[12] = (0, i.D$)((o => s.modificarPerfil(n.negocioModificar)), ["prevent"])) }, [(0, r.Lk)("div", ut, [mt, (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[1] || (e[1] = o => n.negocioModificar.usuario = o), placeholder: "Nombre de Usuario", required: "" }, null, 512), [
                        [i.Jo, n.negocioModificar.usuario]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "password", id: "nombre", "onUpdate:modelValue": e[2] || (e[2] = o => n.negocioModificar.contraseña = o), placeholder: "Contraseña" }, null, 512), [
                        [i.Jo, n.negocioModificar.contraseña]
                    ])]), pt, (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[3] || (e[3] = o => n.negocioModificar.nombre = o), placeholder: "Nombre del Negocio", required: "" }, null, 512), [
                        [i.Jo, n.negocioModificar.nombre]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "email", id: "correo", "onUpdate:modelValue": e[4] || (e[4] = o => n.negocioModificar.correo = o), placeholder: "Correo" }, null, 512), [
                        [i.Jo, n.negocioModificar.correo]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "number", id: "telefono", "onUpdate:modelValue": e[5] || (e[5] = o => n.negocioModificar.telefono = o), placeholder: "Teléfono" }, null, 512), [
                        [i.Jo, n.negocioModificar.telefono]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "direccion", "onUpdate:modelValue": e[6] || (e[6] = o => n.negocioModificar.direccion = o), placeholder: "Dirección", required: "" }, null, 512), [
                        [i.Jo, n.negocioModificar.direccion]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "descripcion", "onUpdate:modelValue": e[7] || (e[7] = o => n.negocioModificar.descripcion = o), placeholder: "Descripción" }, null, 512), [
                        [i.Jo, n.negocioModificar.descripcion]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "date", id: "fechaVence", "onUpdate:modelValue": e[8] || (e[8] = o => n.negocioModificar.fechaVence = o), placeholder: "Fecha de Vencimiento" }, null, 512), [
                        [i.Jo, n.negocioModificar.fechaVence]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "instagram", "onUpdate:modelValue": e[9] || (e[9] = o => n.negocioModificar.instagram = o), placeholder: "Instagram" }, null, 512), [
                        [i.Jo, n.negocioModificar.instagram]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "facebook", "onUpdate:modelValue": e[10] || (e[10] = o => n.negocioModificar.facebook = o), placeholder: "Facebook" }, null, 512), [
                        [i.Jo, n.negocioModificar.facebook]
                    ])]), (0, r.Lk)("div", null, [gt, (0, r.Lk)("input", { class: "form-control", type: "file", name: "imagen", id: "imagen", accept: ".jpg", onChange: e[11] || (e[11] = (...e) => o.imagenSeleccionada && o.imagenSeleccionada(...e)) }, null, 32)])]), bt], 32)])])])], 512)])
                }
                var vt = a(5768),
                    ft = {
                        components: { NavbarAdminComponent: Do },
                        data() { return { negocios: [], busqueda: "", negocioModificar: { usuario: "", "contraseña": "", nombre: "", descripcion: "", correo: "", direccion: "", telefono: "", instagram: "", facebook: "", imagen: "", fechaVence: "" } } },
                        mounted() { this.fetchNegocios() },
                        methods: {
                            modificarPerfil(o) {
                                t.A.put("/modificarPerfilAdmin", { negocio: o }).then((() => {
                                    console.log("enviado");
                                    const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 2e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                    o.fire({ icon: "success", title: "Datos modificados." }), setTimeout((function() { sc.push("/u/u/negocios") }), 2e3)
                                })).catch((o => { console.log("error"), console.error("Error al actualizar la información en la base de datos:", o) }))
                            },
                            modificarNegocio(o) { this.negocioModificar.usuario = o.usuario, this.negocioModificar.contraseña = o.contraseña, this.negocioModificar.nombre = o.nombre, this.negocioModificar.descripcion = o.descripcion, this.negocioModificar.correo = o.correo, this.negocioModificar.direccion = o.direccion, this.negocioModificar.telefono = o.telefono, this.negocioModificar.instagram = o.instagram, this.negocioModificar.facebook = o.facebook, this.negocioModificar.imagen = o.imagen, this.negocioModificar.fechaVence = (0, vt.GP)(new Date(o.fechaVence), "yyyy-MM-dd"), console.log(this.negocioModificar) },
                            formatear(o) { return (0, vt.GP)(new Date(o), "dd/MM/yyyy") },
                            async fetchNegocios() {
                                try {
                                    const o = await t.A.get("/listarNegocios");
                                    this.negocios = o.data
                                } catch (o) { console.error("Error al obtener los datos de los negocios:", o) } finally { this.cargando = !1 }
                            }
                        },
                        computed: {
                            negociosFiltrados() {
                                return this.negocios.filter((o => {
                                    const e = o.nombre || "",
                                        a = o.descripcion || "";
                                    return e.toLowerCase().includes(this.busqueda.toLowerCase()) || a.toLowerCase().includes(this.busqueda.toLowerCase())
                                }))
                            }
                        }
                    };
                const ht = (0, p.A)(ft, [
                    ["render", kt],
                    ["__scopeId", "data-v-ce547948"]
                ]);
                var Lt = ht;
                const Ct = o => ((0, r.Qi)("data-v-4becb255"), o = o(), (0, r.jt)(), o),
                    yt = { class: "container mt-4 mb-2" },
                    _t = Ct((() => (0, r.Lk)("h1", { class: "text-center" }, "Nuevo Producto", -1))),
                    xt = { class: "row g-3 div-forms border mt-2" },
                    wt = Ct((() => (0, r.Lk)("h4", { class: "titulo-div-forms mb-2" }, "Información del Producto", -1))),
                    Et = { class: "col-md-6" },
                    St = { class: "col-md-12 mt-3" },
                    Pt = { class: "col-md-6" },
                    It = Ct((() => (0, r.Lk)("option", { selected: "", disabled: "" }, "Categoría", -1))),
                    Mt = ["value"],
                    Nt = Ct((() => (0, r.Lk)("div", { class: "col-md-6 izq" }, [(0, r.Lk)("button", { type: "button", class: "btn btn-agregar", "data-bs-toggle": "modal", "data-bs-target": "#agregarCategoria" }, " Agregar Categoría ")], -1))),
                    At = { class: "col-md-6" },
                    Xt = { class: "col-md-6" },
                    qt = Ct((() => (0, r.Lk)("label", { class: "form-label mr-2", for: "imagen" }, "Imagen (JPG)", -1))),
                    Ut = Ct((() => (0, r.Lk)("div", null, [(0, r.Lk)("button", { class: "btn btn-menu botones mt-3", type: "submit" }, "Agregar")], -1))),
                    Ft = { class: "modal fade", id: "agregarCategoria", tabindex: "-1", "aria-labelledby": "agregarCategoriaLabel", "aria-hidden": "true" },
                    Vt = { class: "modal-dialog modal-dialog-centered" },
                    Tt = { class: "modal-content" },
                    Wt = Ct((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "agregarCategoriaLabel" }, "Nueva Categoría"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    Dt = { class: "modal-body" },
                    Qt = Ct((() => (0, r.Lk)("div", { class: "modal-footer" }, [(0, r.Lk)("button", { type: "button", class: "btn btn-secondary", "data-bs-dismiss": "modal" }, "Cerrar"), (0, r.Lk)("button", { class: "btn btn-primary", type: "submit", "data-bs-dismiss": "modal" }, "Agregar")], -1)));

                function Jt(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarComponent");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(c), (0, r.Lk)("div", yt, [_t, (0, r.Lk)("form", { onSubmit: e[5] || (e[5] = (0, i.D$)((o => s.nuevoProducto(this.producto)), ["prevent"])), enctype: "multipart/form-data" }, [(0, r.Lk)("div", xt, [wt, (0, r.Lk)("div", Et, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[0] || (e[0] = o => n.producto.nombre = o), placeholder: "Nombre del Producto", required: "" }, null, 512), [
                        [i.Jo, n.producto.nombre]
                    ])]), (0, r.Lk)("div", St, [(0, r.bo)((0, r.Lk)("textarea", { class: "form-control", type: "text", id: "descripcion", "onUpdate:modelValue": e[1] || (e[1] = o => n.producto.descripcion = o), placeholder: "Descripción" }, null, 512), [
                        [i.Jo, n.producto.descripcion]
                    ])]), (0, r.Lk)("div", Pt, [(0, r.bo)((0, r.Lk)("select", { class: "form-select", "onUpdate:modelValue": e[2] || (e[2] = o => n.producto.categoria = o), id: "", required: "" }, [It, ((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(n.categorias, (o => ((0, r.uX)(), (0, r.CE)("option", { key: o.id, value: o.categoria_nombre }, (0, L.v_)(o.categoria_nombre), 9, Mt)))), 128))], 512), [
                        [i.u1, n.producto.categoria]
                    ])]), Nt, (0, r.Lk)("div", At, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "number", id: "precio", "onUpdate:modelValue": e[3] || (e[3] = o => n.producto.precio = o), placeholder: "Precio (sin $)" }, null, 512), [
                        [i.Jo, n.producto.precio]
                    ])]), (0, r.Lk)("div", Xt, [qt, (0, r.Lk)("input", { class: "form-control", type: "file", name: "imagen", id: "imagen", accept: ".jpg", onChange: e[4] || (e[4] = o => s.imagenSeleccionada(o)) }, null, 32)])]), Ut], 32), (0, r.Lk)("div", Ft, [(0, r.Lk)("div", Vt, [(0, r.Lk)("div", Tt, [Wt, (0, r.Lk)("div", Dt, [(0, r.Lk)("form", { onSubmit: e[7] || (e[7] = (0, i.D$)(((...o) => s.agregarCategoria && s.agregarCategoria(...o)), ["prevent"])) }, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[6] || (e[6] = o => n.categoria_nombre = o), placeholder: "Nombre de la Categoría", required: "" }, null, 512), [
                        [i.Jo, n.categoria_nombre]
                    ]), Qt], 32)])])])])])])
                }
                var Ot = {
                    components: { NavbarComponent: fo },
                    data() { return { producto: { nombre: "", descripcion: "", categoria: "Categoría", precio: "", imagen: "", usuario: "" }, categoria_nombre: "", categorias: [], modalAbierto: !1 } },
                    created() { this.obtenerCategorias(), this.obtenerUsuario() },
                    methods: {
                        obtenerUsuario() { this.producto.usuario = localStorage.getItem("usuario") },
                        obtenerCategorias() { t.A.get(`/categorias?usuario=${localStorage.getItem("usuario")}`).then((o => { this.categorias = o.data })).catch((o => { console.error("Error al obtener las categorías:", o) })) },
                        imagenSeleccionada(o) {
                            const e = o.target.files[0];
                            if (e) {
                                const o = new FileReader;
                                o.onload = o => { this.producto.imagen = o.target.result }, o.readAsDataURL(e)
                            }
                        },
                        nuevoProducto(o) {
                            t.A.post("/nuevoProducto", { producto: o }).then((() => {
                                const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 2e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                o.fire({ icon: "success", title: "Producto agregado." }), this.modalAbierto = !0, setTimeout((function() { sc.push("/u/nuevoProducto") }), 2e3)
                            })).catch((() => { ia().fire({ icon: "error", text: "No se pudo agregar el producto." }) }))
                        },
                        agregarCategoria() {
                            t.A.post("nuevaCategoria", { categoria_nombre: this.categoria_nombre, usuario_nombre: localStorage.getItem("usuario") }).then((() => {
                                this.obtenerCategorias(), this.producto.categoria = this.categoria_nombre, this.categoria_nombre = "";
                                const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                o.fire({ icon: "success", title: "Categoría agregada." }), this.modalAbierto = !0
                            })).catch((() => { ia().fire({ icon: "error", text: "No se pudo agregar la categoría." }) }))
                        }
                    }
                };
                const $t = (0, p.A)(Ot, [
                    ["render", Jt],
                    ["__scopeId", "data-v-4becb255"]
                ]);
                var zt = $t;
                const jt = o => ((0, r.Qi)("data-v-268193d0"), o = o(), (0, r.jt)(), o),
                    Rt = { class: "container mt-4 mb-2" },
                    Bt = jt((() => (0, r.Lk)("h1", { class: "text-center" }, "Listado de Productos", -1))),
                    Gt = { class: "flex" },
                    Kt = { class: "izquierda ancho-busqueda" },
                    Ht = { class: "ancho border border-2 mt-2" },
                    Yt = { class: "table table-light table-striped text-center", id: "informe-table" },
                    Zt = jt((() => (0, r.Lk)("thead", null, [(0, r.Lk)("tr", null, [(0, r.Lk)("th", null, "Nombre del Producto"), (0, r.Lk)("th", null, "Descripción"), (0, r.Lk)("th", null, "Categoría"), (0, r.Lk)("th", null, "Precio"), (0, r.Lk)("th", null, "¿Disponible?"), (0, r.Lk)("th", null, "Imagen"), (0, r.Lk)("th"), (0, r.Lk)("th")])], -1))),
                    oi = { class: "form-check form-switch" },
                    ei = ["onChange", "checked"],
                    ai = ["src"],
                    ti = { key: 1 },
                    ii = jt((() => (0, r.Lk)("img", { class: "imagen", src: "/recursos/missing-img.png", alt: "" }, null, -1))),
                    ri = [ii],
                    ni = ["onClick"],
                    si = ["onClick"],
                    ci = { key: 0, class: "text-center mt-3" },
                    li = { class: "modal fade", id: "modificarProducto", tabindex: "-1", "aria-labelledby": "modificarProductoLabel", "aria-hidden": "true", ref: "modalModificar" },
                    di = { class: "modal-dialog modal-dialog-centered" },
                    ui = { class: "modal-content" },
                    mi = jt((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "modificarProductoLabel" }, "Modificar Producto"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    pi = { class: "modal-body" },
                    gi = { class: "row g-3 div-forms border" },
                    bi = jt((() => (0, r.Lk)("h4", { class: "titulo-div-forms mb-2" }, "Información del Producto", -1))),
                    ki = jt((() => (0, r.Lk)("option", { selected: "", disabled: "" }, "Categoría", -1))),
                    vi = ["value"],
                    fi = jt((() => (0, r.Lk)("div", null, [(0, r.Lk)("button", { type: "button", class: "btn btn-agregar", "data-bs-toggle": "modal", "data-bs-target": "#agregarCategoria" }, " Agregar Categoría ")], -1))),
                    hi = jt((() => (0, r.Lk)("label", { class: "form-label mr-2", for: "imagen" }, "Imagen (JPG)", -1))),
                    Li = jt((() => (0, r.Lk)("div", { class: "text-end" }, [(0, r.Lk)("button", { class: "btn btn-menu botones mt-3", type: "submit", "data-bs-dismiss": "modal", "aria-label": "Close" }, "Modificar")], -1))),
                    Ci = { class: "modal fade", id: "agregarCategoria", tabindex: "-1", "aria-labelledby": "agregarCategoriaLabel", "aria-hidden": "true" },
                    yi = { class: "modal-dialog modal-dialog-centered" },
                    _i = { class: "modal-content" },
                    xi = jt((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "agregarCategoriaLabel" }, "Nueva Categoría"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    wi = { class: "modal-body" },
                    Ei = jt((() => (0, r.Lk)("div", { class: "modal-footer" }, [(0, r.Lk)("button", { type: "button", class: "btn btn-secondary", "data-bs-target": "#modificarProducto", "data-bs-toggle": "modal", "data-bs-dismiss": "modal" }, "Cerrar"), (0, r.Lk)("button", { class: "btn btn-primary", type: "submit", "data-bs-target": "#modificarProducto", "data-bs-toggle": "modal", "data-bs-dismiss": "modal" }, "Agregar")], -1)));

                function Si(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarComponent");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(c), (0, r.Lk)("div", Rt, [Bt, (0, r.Lk)("div", Gt, [(0, r.Lk)("div", Kt, [(0, r.bo)((0, r.Lk)("input", { class: "form-control barra-busqueda", "onUpdate:modelValue": e[0] || (e[0] = o => n.busqueda = o), type: "text", name: "busqueda", id: "", placeholder: "Buscar", title: "Ingrese una palabra clave..." }, null, 512), [
                        [i.Jo, n.busqueda]
                    ])])]), (0, r.Lk)("div", Ht, [(0, r.Lk)("table", Yt, [Zt, (0, r.Lk)("tbody", null, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.productosFiltrados, ((o, e) => ((0, r.uX)(), (0, r.CE)("tr", { class: "mauto", key: e }, [(0, r.Lk)("td", null, (0, L.v_)(o.producto_nombre), 1), (0, r.Lk)("td", null, (0, L.v_)(o.producto_descripcion), 1), (0, r.Lk)("td", null, (0, L.v_)(o.producto_categoria), 1), (0, r.Lk)("td", null, (0, L.v_)(o.producto_precio), 1), (0, r.Lk)("td", null, [(0, r.Lk)("div", oi, [(0, r.Lk)("input", { type: "checkbox", onChange: e => s.actualizarEstadoProducto(o), class: "form-check-input", name: "", id: "productoDisponible", checked: 1 === o.producto_disponibilidad }, null, 40, ei)])]), (0, r.Lk)("td", null, [o.producto_imagen ? ((0, r.uX)(), (0, r.CE)("img", { key: 0, class: "imagen", src: o.producto_imagen, alt: "" }, null, 8, ai)) : ((0, r.uX)(), (0, r.CE)("div", ti, ri))]), (0, r.Lk)("td", null, [(0, r.Lk)("button", { class: "btn btn-menu", title: "Modificar", "data-bs-toggle": "modal", "data-bs-target": "#modificarProducto", onClick: e => s.modificar(o) }, "Modificar", 8, ni)]), (0, r.Lk)("td", null, [(0, r.Lk)("button", { class: "btn btn-menu-danger", title: "Eliminar", onClick: e => s.eliminar(o.producto_id) }, "Eliminar", 8, si)])])))), 128))])]), 0 === s.productosFiltrados.length ? ((0, r.uX)(), (0, r.CE)("div", ci, " No se encontraron resultados para esa búsqueda. ")) : (0, r.Q3)("", !0)]), (0, r.Lk)("div", li, [(0, r.Lk)("div", di, [(0, r.Lk)("div", ui, [mi, (0, r.Lk)("div", pi, [(0, r.Lk)("form", { onSubmit: e[6] || (e[6] = (0, i.D$)((o => s.modificarProducto(this.productoModificar)), ["prevent"])) }, [(0, r.Lk)("div", gi, [bi, (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[1] || (e[1] = o => n.productoModificar.producto_nombre = o), required: "" }, null, 512), [
                        [i.Jo, n.productoModificar.producto_nombre]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("textarea", { class: "form-control", type: "text", id: "descripcion", "onUpdate:modelValue": e[2] || (e[2] = o => n.productoModificar.producto_descripcion = o), placeholder: "Descripción" }, null, 512), [
                        [i.Jo, n.productoModificar.producto_descripcion]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("select", { class: "form-select", "onUpdate:modelValue": e[3] || (e[3] = o => n.productoModificar.producto_categoria = o), id: "", required: "" }, [ki, ((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(n.categorias, (o => ((0, r.uX)(), (0, r.CE)("option", { key: o.id, value: o.categoria_nombre }, (0, L.v_)(o.categoria_nombre), 9, vi)))), 128))], 512), [
                        [i.u1, n.productoModificar.producto_categoria]
                    ])]), fi, (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "number", id: "precio", "onUpdate:modelValue": e[4] || (e[4] = o => n.productoModificar.producto_precio = o), placeholder: "Precio (sin $)" }, null, 512), [
                        [i.Jo, n.productoModificar.producto_precio]
                    ])]), (0, r.Lk)("div", null, [hi, (0, r.Lk)("input", { class: "form-control", type: "file", name: "imagen", id: "imagen", accept: ".jpg", onChange: e[5] || (e[5] = (...o) => s.imagenSeleccionada && s.imagenSeleccionada(...o)) }, null, 32)])]), Li], 32)])])])], 512), (0, r.Lk)("div", Ci, [(0, r.Lk)("div", yi, [(0, r.Lk)("div", _i, [xi, (0, r.Lk)("div", wi, [(0, r.Lk)("form", { onSubmit: e[8] || (e[8] = (0, i.D$)(((...o) => s.agregarCategoria && s.agregarCategoria(...o)), ["prevent"])) }, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[7] || (e[7] = o => n.categoria_nombre = o), placeholder: "Nombre de la Categoría", required: "" }, null, 512), [
                        [i.Jo, n.categoria_nombre]
                    ]), Ei], 32)])])])])])])
                }
                var Pi = {
                    components: { NavbarComponent: fo },
                    data() { return { productos: [], productoModificar: "", busqueda: "", usuario: localStorage.getItem("usuario"), producto: { nombre: "", descripcion: "", categoria: "Categoría", precio: "", imagen: "", usuario: "" }, categoria_nombre: "", categorias: [], modalAbierto: !1 } },
                    created() { this.fetchProductos() },
                    computed: {
                        productosFiltrados() {
                            return this.productos.filter((o => {
                                const e = o.producto_nombre || "",
                                    a = o.producto_descripcion || "",
                                    t = o.producto_categoria || "",
                                    i = o.producto_precio || "";
                                return e.toLowerCase().includes(this.busqueda.toLowerCase()) || a.toLowerCase().includes(this.busqueda.toLowerCase()) || t.toLowerCase().includes(this.busqueda.toLowerCase()) || i.toLowerCase().includes(this.busqueda.toLowerCase())
                            }))
                        }
                    },
                    methods: {
                        async fetchCategorias() { t.A.get(`/categorias?usuario=${localStorage.getItem("usuario")}`).then((o => { this.categorias = o.data })).catch((o => { console.error("Error al obtener las categorías:", o) })) },
                        modificar(o) { this.fetchCategorias(), this.productoModificar = o },
                        actualizarEstadoProducto(o) { o.producto_disponibilidad ? o.producto_disponibilidad = 0 : o.producto_disponibilidad = 1, t.A.put("/actualizarDisponibilidad", { productoId: o.producto_id, nuevoEstado: o.producto_disponibilidad }).then((() => {})).catch((e => { console.error("Error al actualizar el estado en la base de datos:", e), o.producto_disponibilidad = !o.producto_disponibilidad })) },
                        async fetchProductos() {
                            try {
                                const o = await t.A.get(`/productos?usuario=${this.usuario}`);
                                this.productos = o.data
                            } catch (o) { console.error("Error al cargar los productos:", o) }
                        },
                        modificarProducto(o) {
                            t.A.put("/modificarProducto", { producto: o }).then((() => {
                                const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 2e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                o.fire({ icon: "success", title: "Producto modificado." })
                            })).catch((o => { console.error("Error al actualizar el estado en la base de datos:", o) }))
                        },
                        eliminar(o) {
                            ia().fire({ icon: "info", title: "<strong>¿Estas segur@?</strong>", html: "", showCancelButton: !0, confirmButtonColor: "#3085d6", cancelButtonText: "No, cancelar", confirmButtonText: "Sí, eliminar!" }).then((e => {
                                e.isConfirmed && t.A.delete("/eliminarProducto", { data: { productoId: o } }).then((() => {
                                    const e = this.productos.findIndex((e => e.producto_id === o)); - 1 !== e && this.productos.splice(e, 1);
                                    const a = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                    a.fire({ icon: "success", title: "Producto eliminado." })
                                })).catch((o => { console.error("Error al eliminar el producto:", o), ia().fire({ icon: "error", title: "Error al eliminar", text: o.message }) }))
                            }))
                        },
                        agregarCategoria() {
                            t.A.post("nuevaCategoria", { categoria_nombre: this.categoria_nombre, usuario_nombre: localStorage.getItem("usuario") }).then((() => {
                                this.productoModificar.producto_categoria = this.categoria_nombre, this.categoria_nombre = "";
                                const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 3e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                o.fire({ icon: "success", title: "Categoría agregada." }), this.modalAbierto = !0
                            })).catch((() => { ia().fire({ icon: "error", text: "No se pudo agregar la categoría." }) }))
                        },
                        imagenSeleccionada(o) {
                            const e = o.target.files[0];
                            if (e) {
                                const o = new FileReader;
                                o.onload = o => { this.productoModificar.producto_imagen = o.target.result }, o.readAsDataURL(e)
                            }
                        }
                    }
                };
                const Ii = (0, p.A)(Pi, [
                    ["render", Si],
                    ["__scopeId", "data-v-268193d0"]
                ]);
                var Mi = Ii;

                function Ni(o, e, a, t, i, n) { const s = (0, r.g2)("NavbarComponent"); return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(s)]) }
                var Ai = { components: { NavbarComponent: fo } };
                const Xi = (0, p.A)(Ai, [
                    ["render", Ni]
                ]);
                var qi = Xi;

                function Ui(o, e, a, t, i, n) { const s = (0, r.g2)("NavbarComponent"); return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(s)]) }
                var Fi = { components: { NavbarComponent: fo } };
                const Vi = (0, p.A)(Fi, [
                    ["render", Ui]
                ]);
                var Ti = Vi;
                const Wi = o => ((0, r.Qi)("data-v-f64b34b2"), o = o(), (0, r.jt)(), o),
                    Di = { key: 0, class: "pantalla-carga text-center" },
                    Qi = Wi((() => (0, r.Lk)("div", { class: "logo-carga" }, [(0, r.Lk)("img", { class: "logo-img", src: "/favicon.ico", width: "50", alt: "" }), (0, r.Lk)("div", { class: "texto-carga" }, " Cargando productos ")], -1))),
                    Ji = [Qi],
                    Oi = { key: 1 },
                    $i = { class: "navbar navbar-expand-lg navbar-light bg-light" },
                    zi = { class: "container-fluid" },
                    ji = Wi((() => (0, r.Lk)("button", { class: "navbar-brand navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" }, [(0, r.Lk)("span", { class: "navbar-toggler-icon" })], -1))),
                    Ri = { class: "collapse navbar-collapse", id: "navbarSupportedContent" },
                    Bi = { class: "navbar-nav me-auto mb-2 mb-lg-0" },
                    Gi = { key: 0, class: "nav-item" },
                    Ki = ["onClick"],
                    Hi = { class: "container2" },
                    Yi = { key: 0 },
                    Zi = { class: "presentacion" },
                    or = { class: "imagen-container" },
                    er = ["src"],
                    ar = { class: "texto-superpuesto" },
                    tr = { class: "texto-superpuesto2" },
                    ir = { class: "text-center" },
                    rr = ["href"],
                    nr = Wi((() => (0, r.Lk)("img", { width: "40", src: "/recursos/pin.png" }, null, -1))),
                    sr = [nr],
                    cr = Wi((() => (0, r.Lk)("br", null, null, -1))),
                    lr = ["href"],
                    dr = Wi((() => (0, r.Lk)("img", { width: "40", src: "/recursos/instagram.png" }, null, -1))),
                    ur = [dr],
                    mr = ["href"],
                    pr = Wi((() => (0, r.Lk)("img", { width: "36", src: "/recursos/facebook.png" }, null, -1))),
                    gr = [pr],
                    br = { class: "tarjeta-container" },
                    kr = { class: "ancho" },
                    vr = { class: "izquierda ancho-busqueda" },
                    fr = ["id"],
                    hr = { key: 0 },
                    Lr = ["onClick"],
                    Cr = { class: "p-2" },
                    yr = { key: 0, class: "item-imagen" },
                    _r = ["src"],
                    xr = { class: "item-texto-block" },
                    wr = { class: "item-texto-block-start" },
                    Er = { class: "item-nombre" },
                    Sr = { class: "item-precio" },
                    Pr = { key: 0, class: "item-descripcion" },
                    Ir = { key: 1, class: "item-texto-block-end" },
                    Mr = ["onClick"],
                    Nr = { class: "cantidad" },
                    Ar = ["onClick", "disabled"],
                    Xr = { key: 0, class: "ver-carrito-btn" },
                    qr = { "data-bs-toggle": "modal", "data-bs-target": "#modalCarrito" },
                    Ur = { key: 1, class: "text-center mt-3" },
                    Fr = { key: 1, class: "container text-center mt-4 no-negocio" },
                    Vr = (0, r.Fv)('<div class="error-container" data-v-f64b34b2><div class="error-content" data-v-f64b34b2><h1 class="display-1 text-danger" data-v-f64b34b2>404</h1><h2 class="display-4" data-v-f64b34b2>Página no encontrada</h2><p class="lead" data-v-f64b34b2>Lo sentimos, la página que buscas no se encuentra disponible o no tiene productos disponibles.</p></div></div>', 1),
                    Tr = [Vr],
                    Wr = { class: "modal fade", id: "modalCarrito", tabindex: "-1", "aria-labelledby": "modalCarritoLabel", "aria-hidden": "true" },
                    Dr = { class: "modal-dialog" },
                    Qr = { class: "modal-content" },
                    Jr = Wi((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h5", { class: "modal-title" }, "¿Todo listo para encargar?"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    Or = { class: "modal-body" },
                    $r = { key: 0, class: "item-imagen" },
                    zr = ["src"],
                    jr = { class: "item-texto-block" },
                    Rr = { class: "item-texto-block-start" },
                    Br = { class: "item-nombre" },
                    Gr = { class: "item-precio" },
                    Kr = { key: 0, class: "item-descripcion" },
                    Hr = { class: "item-texto-block-end" },
                    Yr = ["onClick"],
                    Zr = { class: "cantidad" },
                    on = ["onClick", "disabled"],
                    en = { class: "text-end mt-4" },
                    an = { class: "modal-footer" },
                    tn = ["disabled"],
                    rn = { class: "modal fade", id: "modalPedido", tabindex: "-1", "aria-labelledby": "modalPedidoLabel", "aria-hidden": "true" },
                    nn = { class: "modal-dialog" },
                    sn = { class: "modal-content" },
                    cn = Wi((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h5", { class: "modal-title" }, "Tus datos"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    ln = { class: "modal-body" },
                    dn = Wi((() => (0, r.Lk)("option", { value: "Transferencia" }, "Transferencia", -1))),
                    un = Wi((() => (0, r.Lk)("option", { value: "Efectivo" }, "Efectivo", -1))),
                    mn = [dn, un],
                    pn = { class: "modal-footer" },
                    gn = ["disabled"];

                function bn(o, e, a, t, n, s) {
                    return (0, r.uX)(), (0, r.CE)("div", null, [n.cargando ? ((0, r.uX)(), (0, r.CE)("div", Di, Ji)) : ((0, r.uX)(), (0, r.CE)("div", Oi, [(0, r.Lk)("nav", $i, [(0, r.Lk)("div", zi, [(0, r.Lk)("a", { class: "navbar-brand", onClick: e[0] || (e[0] = (...o) => s.scrollToInicio && s.scrollToInicio(...o)), href: "#" }, "~ " + (0, L.v_)(n.nombreNegocio.toUpperCase()) + " ~", 1), ji, (0, r.Lk)("div", Ri, [(0, r.Lk)("ul", Bi, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.categoriasOrdenadas, ((o, e) => ((0, r.uX)(), (0, r.CE)("div", { key: e }, [s.categoriasConProductosFiltrados.includes(o) ? ((0, r.uX)(), (0, r.CE)("li", Gi, [(0, r.Lk)("a", { class: "nav-link", onClick: e => { s.scrollToCategoria(o), s.collapseNavbar() } }, (0, L.v_)(o), 9, Ki)])) : (0, r.Q3)("", !0)])))), 128))])])])]), (0, r.Lk)("div", Hi, [n.productos.length ? ((0, r.uX)(), (0, r.CE)("div", Yi, [(0, r.Lk)("div", Zi, [(0, r.Lk)("div", or, [(0, r.Lk)("img", { src: n.negocio.imagen, alt: "", class: "img-negocio" }, null, 8, er), (0, r.Lk)("div", ar, [(0, r.eW)("BIENVENIDOS "), (0, r.Lk)("div", tr, '"' + (0, L.v_)(n.negocio.descripcion) + '"', 1), (0, r.Lk)("div", ir, [(0, r.Lk)("a", { href: "https://www.google.com/maps/search/" + encodeURIComponent(n.negocio.direccion), target: "_blank" }, sr, 8, rr), (0, r.eW)(), cr, n.negocio.instagram ? ((0, r.uX)(), (0, r.CE)("a", { key: 0, class: "mauto", href: n.negocio.instagram, target: "blank" }, ur, 8, lr)) : (0, r.Q3)("", !0), n.negocio.facebook ? ((0, r.uX)(), (0, r.CE)("a", { key: 1, class: "mauto", href: n.negocio.facebook, target: "blank" }, gr, 8, mr)) : (0, r.Q3)("", !0)])])])]), (0, r.Lk)("div", br, [(0, r.Lk)("div", kr, [(0, r.Lk)("div", vr, [(0, r.bo)((0, r.Lk)("input", { class: "form-control barra-busqueda", "onUpdate:modelValue": e[1] || (e[1] = o => n.busqueda = o), type: "text", name: "busqueda", id: "", placeholder: "Buscar producto", title: "Ingrese una palabra clave..." }, null, 512), [
                        [i.Jo, n.busqueda]
                    ])]), ((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.categoriasOrdenadas, ((o, e) => ((0, r.uX)(), (0, r.CE)("div", { class: "mt-2", key: e, id: o }, [s.filteredProductos(o) ? ((0, r.uX)(), (0, r.CE)("div", hr, [(0, r.Lk)("div", { class: "titulo-categoria", onClick: e => s.toggleCategoria(o) }, (0, L.v_)(o), 9, Lr), (0, r.Lk)("div", { class: (0, L.C4)({ "categoria-productos": !0, "categoria-activa": n.categoriaSeleccionada === o }) }, [(0, r.Lk)("div", Cr, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(s.filteredProductos(o), ((o, e) => ((0, r.uX)(), (0, r.CE)("div", { class: "item-container mt-2", key: e }, [o.producto_imagen ? ((0, r.uX)(), (0, r.CE)("div", yr, [(0, r.Lk)("div", null, [(0, r.Lk)("img", { class: "imagen", src: o.producto_imagen, alt: " " }, null, 8, _r)])])) : (0, r.Q3)("", !0), (0, r.Lk)("div", xr, [(0, r.Lk)("div", wr, [(0, r.Lk)("div", Er, (0, L.v_)(o.producto_nombre), 1), (0, r.Lk)("div", Sr, " $" + (0, L.v_)(o.producto_precio), 1), o.producto_descripcion ? ((0, r.uX)(), (0, r.CE)("div", Pr, ' "' + (0, L.v_)(o.producto_descripcion) + '" ', 1)) : (0, r.Q3)("", !0)])]), 2100 !== n.negocio.fechaVence ? ((0, r.uX)(), (0, r.CE)("div", Ir, [(0, r.Lk)("button", { class: "btn-mas", onClick: e => s.agregarAlCarrito(o) }, " + ", 8, Mr), (0, r.Lk)("div", Nr, (0, L.v_)(o.cantidadSeleccionada), 1), (0, r.Lk)("button", { class: "btn-menos", onClick: e => s.quitarDelCarrito(o), disabled: !o.cantidadSeleccionada }, " - ", 8, Ar)])) : (0, r.Q3)("", !0)])))), 128))])], 2)])) : (0, r.Q3)("", !0)], 8, fr)))), 128)), n.carrito.length > 0 ? ((0, r.uX)(), (0, r.CE)("div", Xr, [(0, r.Lk)("button", qr, "Ver Carrito $" + (0, L.v_)(n.total), 1)])) : (0, r.Q3)("", !0), 0 === s.productosFiltrados.length ? ((0, r.uX)(), (0, r.CE)("div", Ur, " No se encontraron resultados para esa búsqueda. ")) : (0, r.Q3)("", !0)])])])) : ((0, r.uX)(), (0, r.CE)("div", Fr, Tr))])])), (0, r.Lk)("div", Wr, [(0, r.Lk)("div", Dr, [(0, r.Lk)("div", Qr, [Jr, (0, r.Lk)("div", Or, [((0, r.uX)(!0), (0, r.CE)(r.FK, null, (0, r.pI)(n.carrito, ((o, e) => ((0, r.uX)(), (0, r.CE)("div", { class: "item-container mt-2", key: e }, [o.producto_imagen ? ((0, r.uX)(), (0, r.CE)("div", $r, [(0, r.Lk)("div", null, [(0, r.Lk)("img", { class: "imagen", src: o.producto_imagen, alt: " " }, null, 8, zr)])])) : (0, r.Q3)("", !0), (0, r.Lk)("div", jr, [(0, r.Lk)("div", Rr, [(0, r.Lk)("div", Br, (0, L.v_)(o.producto_nombre), 1), (0, r.Lk)("div", Gr, " $" + (0, L.v_)(o.producto_precio), 1), o.producto_descripcion ? ((0, r.uX)(), (0, r.CE)("div", Kr, ' "' + (0, L.v_)(o.producto_descripcion) + '" ', 1)) : (0, r.Q3)("", !0)])]), (0, r.Lk)("div", Hr, [(0, r.Lk)("button", { class: "btn-mas", onClick: e => s.agregarAlCarrito(o) }, " + ", 8, Yr), (0, r.Lk)("div", Zr, (0, L.v_)(o.cantidadSeleccionada), 1), (0, r.Lk)("button", { class: "btn-menos", onClick: e => s.quitarDelCarrito(o), disabled: !o.cantidadSeleccionada }, " - ", 8, on)])])))), 128)), (0, r.Lk)("h4", en, "Total: $" + (0, L.v_)(n.total), 1)]), (0, r.Lk)("div", an, [(0, r.Lk)("button", { type: "button", class: "ver-carrito-btn2", disabled: !n.carrito.length > 0, "data-bs-toggle": "modal", "data-bs-target": "#modalPedido" }, "Realizar pedido", 8, tn)])])])]), (0, r.Lk)("div", rn, [(0, r.Lk)("div", nn, [(0, r.Lk)("div", sn, [cn, (0, r.Lk)("form", { onSubmit: e[6] || (e[6] = (0, i.D$)(((...o) => s.realizarPedido && s.realizarPedido(...o)), ["prevent"])) }, [(0, r.Lk)("div", ln, [(0, r.bo)((0, r.Lk)("input", { type: "text", class: "form-control", placeholder: "Nombre y Apellido (obligatorio)", "onUpdate:modelValue": e[2] || (e[2] = o => n.pedido.nombre = o), required: "" }, null, 512), [
                        [i.Jo, n.pedido.nombre]
                    ]), (0, r.bo)((0, r.Lk)("select", { class: "form-control form-select mt-4", id: "", "onUpdate:modelValue": e[3] || (e[3] = o => n.pedido.medio = o), required: "" }, mn, 512), [
                        [i.u1, n.pedido.medio]
                    ]), (0, r.bo)((0, r.Lk)("input", { type: "text", class: "form-control mt-4", placeholder: "Dirección (opcional)", "onUpdate:modelValue": e[4] || (e[4] = o => n.pedido.direccion = o) }, null, 512), [
                        [i.Jo, n.pedido.direccion]
                    ]), (0, r.bo)((0, r.Lk)("input", { type: "text", class: "form-control mt-4", placeholder: "Detalle del pedido (opcional)", "onUpdate:modelValue": e[5] || (e[5] = o => n.pedido.detalle = o) }, null, 512), [
                        [i.Jo, n.pedido.detalle]
                    ])]), (0, r.Lk)("div", pn, [(0, r.Lk)("button", { type: "submit", class: "ver-carrito-btn2", disabled: !n.carrito.length > 0 }, "Realizar pedido", 8, gn)])], 32)])])])])
                }
                var kn = {
                    data() { return { categoriaSeleccionada: null, mostrarModal: !0, nombreNegocio: "", productos: [], busqueda: "", negocio: { usuario: "", nombre: "", correo: "", telefono: "", direccion: "", descripcion: "", imagen: "", fechaVence: "" }, cargando: !0, carrito: [], total: 0, pedido: { nombre: "", medio: "Transferencia", direccion: "", detalle: "" } } },
                    mounted() { this.nombreNegocio = this.$route.params.nombreNegocio, this.obtenerInformacionNegocio() },
                    computed: {
                        categoriasOrdenadas() { return [...new Set(this.productosFiltrados.map((o => o.producto_categoria)))].sort() },
                        productosFiltrados() {
                            const o = o => o.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            return this.productos.filter((e => {
                                const a = e.producto_nombre || "",
                                    t = e.producto_descripcion || "",
                                    i = e.producto_categoria || "",
                                    r = e.producto_precio || "",
                                    n = o(this.busqueda.toLowerCase());
                                return o(a.toLowerCase()).includes(n) || o(t.toLowerCase()).includes(n) || o(i.toLowerCase()).includes(n) || o(r.toString().toLowerCase()).includes(n)
                            }))
                        },
                        categoriasConProductosFiltrados() { return [...new Set(this.productosFiltrados.map((o => o.producto_categoria)))] }
                    },
                    methods: {
                        toggleCategoria(o) { this.categoriaSeleccionada === o ? this.categoriaSeleccionada = null : this.categoriaSeleccionada = o },
                        async obtenerCarrito() {
                            if (null !== sessionStorage.getItem("carrito")) { this.carrito = JSON.parse(sessionStorage.getItem("carrito")), this.total = parseFloat(sessionStorage.getItem("total")); for (const o of this.productos) { const e = this.carrito.findIndex((e => e.producto_id === o.producto_id)); - 1 !== e && (o.cantidadSeleccionada = this.carrito[e].cantidadSeleccionada) } }
                            null !== localStorage.getItem("pedido") && (this.pedido = JSON.parse(localStorage.getItem("pedido")))
                        },
                        realizarPedido() {
                            localStorage.setItem("pedido", JSON.stringify(this.pedido));
                            const o = `¡Hola *${this.negocio.nombre}*! Quiero realizar un pedido:\n`,
                                e = this.carrito.map((o => `*${o.producto_nombre}:* $${o.producto_precio} (${o.cantidadSeleccionada})\n\n`)),
                                a = `*Total: $${this.total}*\n\n`;
                            let t = `*Nombre:* ${this.pedido.nombre}\n*Medio de pago:* ${this.pedido.medio}\n`;
                            this.pedido.direccion ? t += `*Dirección:* ${this.pedido.direccion}\n` : this.pedido.detalle ? t += `*Detalle:* ${this.pedido.detalle}\n\n¡Muchas gracias!` : t += "\n¡Muchas gracias!";
                            const i = o + e.join("") + a + t,
                                r = navigator.userAgent || navigator.vendor || window.opera,
                                n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(r);
                            let s = n ? "whatsapp://send" : "https://web.whatsapp.com/send";
                            const c = `${s}?phone=${this.negocio.telefono}&text=${encodeURIComponent(i)}`;
                            sessionStorage.clear(), location.reload(1), window.open(c)
                        },
                        agregarAlCarrito(o) { const e = this.carrito.findIndex((e => e.producto_id === o.producto_id)); - 1 !== e ? (o.cantidadSeleccionada++, this.carrito[e].cantidadSeleccionada = o.cantidadSeleccionada, this.total += Number(o.producto_precio)) : (o.cantidadSeleccionada = 1, this.carrito.push(o), this.total += Number(o.producto_precio)), sessionStorage.setItem("carrito", JSON.stringify(this.carrito)), sessionStorage.setItem("total", JSON.stringify(this.total)) },
                        quitarDelCarrito(o) { const e = this.carrito.findIndex((e => e.producto_id === o.producto_id)); - 1 !== e && (o.cantidadSeleccionada--, this.carrito[e].cantidadSeleccionada = o.cantidadSeleccionada, this.total -= Number(o.producto_precio), 0 === this.carrito[e].cantidadSeleccionada && this.carrito.splice(e, 1)), sessionStorage.setItem("carrito", JSON.stringify(this.carrito)), sessionStorage.setItem("total", JSON.stringify(this.total)) },
                        async obtenerInformacionNegocio() {
                            try {
                                const o = await t.A.get(`/negocio?usuario=${this.nombreNegocio}`);
                                this.negocio = o.data, this.fetchProductos()
                            } catch (o) { console.error("Error al cargar los productos:", o) } finally { this.cargando = !1 }
                        },
                        scrollToCategoria(o) {
                            const e = document.getElementById(o);
                            if (e) {
                                const o = document.querySelector(".navbar").offsetHeight,
                                    a = e.getBoundingClientRect().top;
                                window.scrollTo({ top: window.scrollY + a - o, behavior: "smooth" })
                            }
                            this.toggleCategoria(o)
                        },
                        scrollToInicio() { window.scrollTo({ top: 0, behavior: "smooth" }) },
                        collapseNavbar() {
                            const o = document.querySelector(".navbar-toggler"),
                                e = document.querySelector(".navbar-collapse");
                            o && e.classList.contains("show") && o.click()
                        },
                        async fetchProductos() {
                            try {
                                const o = await t.A.get(`/productos?usuario=${this.nombreNegocio}`),
                                    e = o.data.filter((o => o.producto_disponibilidad)),
                                    a = e.sort(((o, e) => {
                                        const a = o.producto_nombre.toUpperCase(),
                                            t = e.producto_nombre.toUpperCase();
                                        return a < t ? -1 : a > t ? 1 : 0
                                    }));
                                a.forEach((o => { o.cantidadSeleccionada = 0 })), this.productos = a, this.obtenerCarrito()
                            } catch (o) { console.error("Error al cargar los productos:", o) } finally { this.cargando = !1 }
                        },
                        filteredProductos(o) { return this.productosFiltrados.filter((e => e.producto_categoria === o && 1 === e.producto_disponibilidad)) }
                    }
                };
                const vn = (0, p.A)(kn, [
                    ["render", bn],
                    ["__scopeId", "data-v-f64b34b2"]
                ]);
                var fn = vn;
                const hn = o => ((0, r.Qi)("data-v-29d97268"), o = o(), (0, r.jt)(), o),
                    Ln = { class: "container mt-2 mb-2" },
                    Cn = { key: 0 },
                    yn = { class: "tarjeta-container" },
                    _n = hn((() => (0, r.Lk)("div", { class: "titulo-categoria" }, "Mi Perfil", -1))),
                    xn = { class: "p-2 text-center" },
                    wn = { class: "tarjetaProducto" },
                    En = { key: 0 },
                    Sn = ["src"],
                    Pn = { class: "textoTarjeta" },
                    In = { class: "flex mt-2" },
                    Mn = { class: "izquierda" },
                    Nn = hn((() => (0, r.Lk)("hr", { class: "mt-2 mb-2" }, null, -1))),
                    An = { class: "descripcion text-start" },
                    Xn = hn((() => (0, r.Lk)("strong", null, "Correo:", -1))),
                    qn = hn((() => (0, r.Lk)("br", null, null, -1))),
                    Un = hn((() => (0, r.Lk)("strong", null, "Teléfono:", -1))),
                    Fn = hn((() => (0, r.Lk)("br", null, null, -1))),
                    Vn = hn((() => (0, r.Lk)("strong", null, "Dirección:", -1))),
                    Tn = hn((() => (0, r.Lk)("br", null, null, -1))),
                    Wn = hn((() => (0, r.Lk)("strong", null, "Descripción:", -1))),
                    Dn = hn((() => (0, r.Lk)("br", null, null, -1))),
                    Qn = { class: "text-center" },
                    Jn = ["href"],
                    On = hn((() => (0, r.Lk)("img", { width: "40", src: "/recursos/instagram.png" }, null, -1))),
                    $n = [On],
                    zn = { key: 1 },
                    jn = ["href"],
                    Rn = hn((() => (0, r.Lk)("img", { width: "36", src: "/recursos/facebook.png" }, null, -1))),
                    Bn = [Rn],
                    Gn = { key: 3 },
                    Kn = hn((() => (0, r.Lk)("button", { class: "btn btn-menu derecha mt-2 mb-2", title: "Modificar", "data-bs-toggle": "modal", "data-bs-target": "#modificarProducto" }, "Modificar", -1))),
                    Hn = { class: "modal fade", id: "modificarProducto", tabindex: "-1", "aria-labelledby": "modificarProductoLabel", "aria-hidden": "true", ref: "modalModificar" },
                    Yn = { class: "modal-dialog modal-dialog-centered" },
                    Zn = { class: "modal-content" },
                    os = hn((() => (0, r.Lk)("div", { class: "modal-header" }, [(0, r.Lk)("h1", { class: "modal-title fs-5", id: "modificarProductoLabel" }, "Modificar Datos"), (0, r.Lk)("button", { type: "button", class: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })], -1))),
                    es = { class: "modal-body" },
                    as = { class: "row g-3 div-forms border" },
                    ts = hn((() => (0, r.Lk)("h4", { class: "titulo-div-forms mb-2" }, "Información del Negocio", -1))),
                    is = hn((() => (0, r.Lk)("label", { class: "form-label mr-2", for: "imagen" }, "Imagen (JPG)", -1))),
                    rs = hn((() => (0, r.Lk)("div", { class: "text-end" }, [(0, r.Lk)("button", { class: "btn btn-menu botones mt-3", type: "submit", "data-bs-dismiss": "modal", "aria-label": "Close" }, "Modificar")], -1)));

                function ns(o, e, a, t, n, s) {
                    const c = (0, r.g2)("NavbarComponent");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(c), (0, r.Lk)("div", Ln, [n.negocio ? ((0, r.uX)(), (0, r.CE)("div", Cn, [(0, r.Lk)("div", yn, [(0, r.Lk)("div", null, [_n, (0, r.Lk)("div", xn, [(0, r.Lk)("div", wn, [n.negocio.imagen ? ((0, r.uX)(), (0, r.CE)("div", En, [(0, r.Lk)("img", { class: "imagen", src: n.negocio.imagen, alt: " " }, null, 8, Sn)])) : (0, r.Q3)("", !0), (0, r.Lk)("div", Pn, [(0, r.Lk)("div", In, [(0, r.Lk)("h3", Mn, (0, L.v_)(n.negocio.nombre), 1)]), Nn, (0, r.Lk)("div", An, [Xn, (0, r.eW)(" " + (0, L.v_)(n.negocio.correo) + " ", 1), qn, Un, (0, r.eW)(" " + (0, L.v_)(n.negocio.telefono) + " ", 1), Fn, Vn, (0, r.eW)(" " + (0, L.v_)(n.negocio.direccion) + " ", 1), Tn, Wn, (0, r.eW)(" " + (0, L.v_)(n.negocio.descripcion) + " ", 1), Dn, (0, r.Lk)("div", Qn, [n.negocio.instagram ? ((0, r.uX)(), (0, r.CE)("a", { key: 0, class: "mauto", href: n.negocio.instagram, target: "blank" }, $n, 8, Jn)) : ((0, r.uX)(), (0, r.CE)("div", zn, "Sin Instagram")), n.negocio.facebook ? ((0, r.uX)(), (0, r.CE)("a", { key: 2, class: "mauto", href: n.negocio.facebook, target: "blank" }, Bn, 8, jn)) : ((0, r.uX)(), (0, r.CE)("div", Gn, "Sin Facebook"))])]), Kn])])])])]), (0, r.Lk)("div", Hn, [(0, r.Lk)("div", Yn, [(0, r.Lk)("div", Zn, [os, (0, r.Lk)("div", es, [(0, r.Lk)("form", { onSubmit: e[8] || (e[8] = (0, i.D$)((o => s.modificarPerfil(this.negocio)), ["prevent"])) }, [(0, r.Lk)("div", as, [ts, (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "nombre", "onUpdate:modelValue": e[0] || (e[0] = o => n.negocio.nombre = o), placeholder: "Nombre del Negocio", required: "" }, null, 512), [
                        [i.Jo, n.negocio.nombre]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "email", id: "correo", "onUpdate:modelValue": e[1] || (e[1] = o => n.negocio.correo = o), placeholder: "Correo" }, null, 512), [
                        [i.Jo, n.negocio.correo]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "number", id: "telefono", "onUpdate:modelValue": e[2] || (e[2] = o => n.negocio.telefono = o), placeholder: "Teléfono" }, null, 512), [
                        [i.Jo, n.negocio.telefono]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "direccion", "onUpdate:modelValue": e[3] || (e[3] = o => n.negocio.direccion = o), placeholder: "Dirección", required: "" }, null, 512), [
                        [i.Jo, n.negocio.direccion]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "descripcion", "onUpdate:modelValue": e[4] || (e[4] = o => n.negocio.descripcion = o), placeholder: "Descripción" }, null, 512), [
                        [i.Jo, n.negocio.descripcion]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "instagram", "onUpdate:modelValue": e[5] || (e[5] = o => n.negocio.instagram = o), placeholder: "Instagram" }, null, 512), [
                        [i.Jo, n.negocio.instagram]
                    ])]), (0, r.Lk)("div", null, [(0, r.bo)((0, r.Lk)("input", { class: "form-control", type: "text", id: "facebook", "onUpdate:modelValue": e[6] || (e[6] = o => n.negocio.facebook = o), placeholder: "Facebook" }, null, 512), [
                        [i.Jo, n.negocio.facebook]
                    ])]), (0, r.Lk)("div", null, [is, (0, r.Lk)("input", { class: "form-control", type: "file", name: "imagen", id: "imagen", accept: ".jpg", onChange: e[7] || (e[7] = (...o) => s.imagenSeleccionada && s.imagenSeleccionada(...o)) }, null, 32)])]), rs], 32)])])])], 512)])) : (0, r.Q3)("", !0)])])
                }
                var ss = {
                    components: { NavbarComponent: fo },
                    data() { return { negocio: { usuario: "", nombre: "", correo: "", telefono: "", direccion: "", descripcion: "", imagen: "", instagram: "", facebook: "" } } },
                    mounted() {},
                    created() { this.obtenerInformacionNegocio() },
                    methods: {
                        modificarPerfil(o) {
                            t.A.put("/modificarPerfil", { negocio: o }).then((() => {
                                localStorage.setItem("nombre", this.negocio.nombre);
                                const o = ia().mixin({ toast: !0, position: "bottom-end", showConfirmButton: !1, timer: 2e3, timerProgressBar: !0, didOpen: o => { o.addEventListener("mouseenter", ia().stopTimer), o.addEventListener("mouseleave", ia().resumeTimer) } });
                                o.fire({ icon: "success", title: "Datos modificados." }), setTimeout((function() { sc.push("/u/productos") }), 2e3)
                            })).catch((o => { console.error("Error al actualizar la información en la base de datos:", o) }))
                        },
                        async obtenerInformacionNegocio() {
                            try {
                                const o = await t.A.get(`/miNegocio?usuario=${localStorage.getItem("usuario")}`);
                                this.negocio = o.data
                            } catch (o) { console.error("Error al cargar los productos:", o) }
                        },
                        imagenSeleccionada(o) {
                            const e = o.target.files[0];
                            if (e) {
                                const o = new FileReader;
                                o.onload = o => { this.negocio.imagen = o.target.result }, o.readAsDataURL(e)
                            }
                        }
                    }
                };
                const cs = (0, p.A)(ss, [
                    ["render", ns],
                    ["__scopeId", "data-v-29d97268"]
                ]);
                var ls = cs;
                const ds = o => ((0, r.Qi)("data-v-67c506f2"), o = o(), (0, r.jt)(), o),
                    us = { class: "contenedor" },
                    ms = { class: "mt-4 mb-4" },
                    ps = ds((() => (0, r.Lk)("h1", { class: "text-center" }, "¡Potenciá tu negocio!", -1))),
                    gs = ds((() => (0, r.Lk)("hr", null, null, -1))),
                    bs = { class: "row justify-content-center text-center mb-4" },
                    ks = { class: "col-md-6" },
                    vs = ds((() => (0, r.Lk)("div", { class: "titulo-plan" }, [(0, r.Lk)("h3", null, "Plan Básico")], -1))),
                    fs = { class: "border mt-2 p-2 text-center" },
                    hs = ds((() => (0, r.Lk)("div", { class: "titulo-plan" }, " Gratis ", -1))),
                    Ls = ds((() => (0, r.Lk)("ul", { class: "text-start" }, [(0, r.Lk)("li", null, "✅Menú online autoadministrable."), (0, r.Lk)("li", null, "❌Visualización en nuestra plataforma."), (0, r.Lk)("li", null, "❌Carrito y pedidos por WhatsApp."), (0, r.Lk)("li", null, "❌Código QR para el menú.")], -1))),
                    Cs = ds((() => (0, r.Lk)("hr", null, null, -1))),
                    ys = { class: "row justify-content-center text-center" },
                    _s = ds((() => (0, r.Lk)("div", { class: "col-md-6" }, [(0, r.Lk)("div", { class: "titulo-plan" }, [(0, r.Lk)("h3", null, "Plan Completo")]), (0, r.Lk)("div", { class: "mt-2 p-2 text-center" }, [(0, r.Lk)("ul", { class: "text-start" }, [(0, r.Lk)("li", null, "✅Menú online autoadministrable."), (0, r.Lk)("li", null, "✅Visualización en nuestra plataforma."), (0, r.Lk)("li", null, "✅Carrito y pedidos por WhatsApp."), (0, r.Lk)("li", null, "✅Código QR para el menú.")])])], -1))),
                    xs = { class: "col-md-12" },
                    ws = { class: "mt-2 text-center" },
                    Es = { class: "border p-2 m-2 col-md-3" },
                    Ss = ds((() => (0, r.Lk)("div", { class: "titulo-plan" }, " 1 Mes ", -1))),
                    Ps = ds((() => (0, r.Lk)("div", { class: "precio-plan" }, " $1500 ", -1))),
                    Is = { class: "border p-2 m-2 col-md-3" },
                    Ms = ds((() => (0, r.Lk)("div", { class: "titulo-plan" }, " 6 Meses ", -1))),
                    Ns = ds((() => (0, r.Lk)("div", { class: "precio-plan" }, " $7500 ", -1))),
                    As = { class: "border p-2 m-2 col-md-3" },
                    Xs = ds((() => (0, r.Lk)("div", { class: "titulo-plan" }, " 12 Meses ", -1))),
                    qs = ds((() => (0, r.Lk)("div", { class: "precio-plan" }, " $15000 ", -1)));

                function Us(o, e, a, t, i, n) { const s = (0, r.g2)("NavbarPublicoComponent"); return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(s), (0, r.Lk)("div", us, [(0, r.Lk)("div", ms, [ps, gs, (0, r.Lk)("div", bs, [(0, r.Lk)("div", ks, [vs, (0, r.Lk)("div", fs, [hs, Ls, (0, r.Lk)("button", { class: "btn btn-menu", onClick: e[0] || (e[0] = o => n.elegirPlan("")) }, "REGISTRAR")])])]), Cs, (0, r.Lk)("div", ys, [_s, (0, r.Lk)("div", xs, [(0, r.Lk)("div", ws, [(0, r.Lk)("div", Es, [Ss, Ps, (0, r.Lk)("button", { class: "btn btn-menu", onClick: e[1] || (e[1] = o => n.elegirPlan(1)) }, "CONTRATAR")]), (0, r.Lk)("div", Is, [Ms, Ns, (0, r.Lk)("button", { class: "btn btn-menu", onClick: e[2] || (e[2] = o => n.elegirPlan(6)) }, "CONTRATAR")]), (0, r.Lk)("div", As, [Xs, qs, (0, r.Lk)("button", { class: "btn btn-menu", onClick: e[3] || (e[3] = o => n.elegirPlan(12)) }, "CONTRATAR")])])])])])])]) }
                var Fs = { components: { NavbarPublicoComponent: Qe }, methods: { elegirPlan(o) { o ? (localStorage.setItem("plan", o), console.log("PlanesComponent: ", localStorage.getItem("plan")), sc.push("/u/registrar")) : (console.log("plan nulo"), localStorage.clear(), sc.push("/u/registrar")) } } };
                const Vs = (0, p.A)(Fs, [
                    ["render", Us],
                    ["__scopeId", "data-v-67c506f2"]
                ]);
                var Ts = Vs;
                const Ws = o => ((0, r.Qi)("data-v-33359f1f"), o = o(), (0, r.jt)(), o),
                    Ds = { key: 0 },
                    Qs = { class: "contenedor text-center" },
                    Js = { class: "caja" },
                    Os = Ws((() => (0, r.Lk)("img", { src: "/recursos/approve.png", width: "100" }, null, -1))),
                    $s = Ws((() => (0, r.Lk)("h1", null, "Pago Aprobado.", -1))),
                    zs = { key: 1 },
                    js = { class: "contenedor text-center" },
                    Rs = { class: "caja" },
                    Bs = Ws((() => (0, r.Lk)("img", { src: "/recursos/decline.png", width: "100" }, null, -1))),
                    Gs = Ws((() => (0, r.Lk)("h1", null, "No se pudo realizar el pago.", -1))),
                    Ks = { key: 2 },
                    Hs = { class: "contenedor text-center" },
                    Ys = { class: "caja" },
                    Zs = Ws((() => (0, r.Lk)("img", { src: "/recursos/pending.png", width: "100" }, null, -1))),
                    oc = Ws((() => (0, r.Lk)("h1", null, "Pago Pendiente.", -1)));

                function ec(o, e, a, t, i, n) {
                    const s = (0, r.g2)("NavbarPublicoComponent"),
                        c = (0, r.g2)("router-link");
                    return (0, r.uX)(), (0, r.CE)("div", null, [(0, r.bF)(s), "approved" == i.estado ? ((0, r.uX)(), (0, r.CE)("div", Ds, [(0, r.Lk)("div", Qs, [(0, r.Lk)("div", Js, [Os, $s, (0, r.bF)(c, { class: "btn btn-menu mt-3", to: "/u/login" }, { default: (0, r.k6)((() => [(0, r.eW)("Ingresar")])), _: 1 })])])])) : (0, r.Q3)("", !0), "failure" == i.estado || "null" == i.estado ? ((0, r.uX)(), (0, r.CE)("div", zs, [(0, r.Lk)("div", js, [(0, r.Lk)("div", Rs, [Bs, Gs, (0, r.bF)(c, { class: "btn btn-menu mt-3", to: "/u/login" }, { default: (0, r.k6)((() => [(0, r.eW)("Volver")])), _: 1 })])])])) : (0, r.Q3)("", !0), "pending" == i.estado ? ((0, r.uX)(), (0, r.CE)("div", Ks, [(0, r.Lk)("div", Hs, [(0, r.Lk)("div", Ys, [Zs, oc, (0, r.bF)(c, { class: "btn btn-menu mt-3", to: "/u/login" }, { default: (0, r.k6)((() => [(0, r.eW)("Volver")])), _: 1 })])])])) : (0, r.Q3)("", !0)])
                }
                var ac = { components: { NavbarPublicoComponent: Qe }, data() { return { estado: "" } }, mounted() { this.getStatus() }, methods: { getStatus() { this.estado = this.$route.query.status, console.log(this.estado) } } };
                const tc = (0, p.A)(ac, [
                    ["render", ec],
                    ["__scopeId", "data-v-33359f1f"]
                ]);
                var ic = tc;
                const rc = [{ path: "/", component: $e, meta: { requiresAuth: !1 } }, { path: "/u/home", component: $o, meta: { requiresAuth: !0 } }, { path: "/u/login", component: sa }, { path: "/u/registrar", component: Aa, meta: { requiresAuth: !1 } }, { path: "/u/planes", component: Ts, meta: { requiresAuth: !1 } }, { path: "/u/registrar/return", component: ic, meta: { requiresAuth: !1 } }, { path: "/u/negocios", component: Lt, meta: { requiresAuth: !0 } }, { path: "/u/modificar", component: ls, meta: { requiresAuth: !0 } }, { path: "/u/nuevoProducto", component: zt, meta: { requiresAuth: !0 } }, { path: "/u/productos", component: Mi, meta: { requiresAuth: !0 } }, { path: "/u/nuevaCategoria", component: qi, meta: { requiresAuth: !0 } }, { path: "/u/categorias", component: Ti, meta: { requiresAuth: !0 } }, { path: "/:nombreNegocio", component: fn, meta: { requiresAuth: !1 } }],
                    nc = (0, h.aE)({ history: (0, h.LA)(), routes: rc, linkActiveClass: "active", linkExactActiveClass: "active" });
                nc.beforeEach(((o, e, a) => {
                    const t = localStorage.getItem("token");
                    o.matched.some((o => o.meta.requiresAuth)) ? t ? a() : a("/u/login") : a()
                }));
                var sc = nc,
                    cc = a(4679);
                const lc = "prod";
                t.A.defaults.baseURL = "dev" == lc ? "http://192.168.1.235:3500" : "https://puestito.online:3500";
                const dc = (0, i.Ef)(f);
                dc.use(sc), dc.use(cc.Ay, { load: { key: "AIzaSyC8vrGiWbmnS138WURJk2odQ9HU_BIEz9s" } }), dc.mount("#app")
            }
        },
        e = {};

    function a(t) { var i = e[t]; if (void 0 !== i) return i.exports; var r = e[t] = { exports: {} }; return o[t].call(r.exports, r, r.exports, a), r.exports }
    a.m = o,
        function() {
            var o = [];
            a.O = function(e, t, i, r) {
                if (!t) {
                    var n = 1 / 0;
                    for (d = 0; d < o.length; d++) {
                        t = o[d][0], i = o[d][1], r = o[d][2];
                        for (var s = !0, c = 0; c < t.length; c++)(!1 & r || n >= r) && Object.keys(a.O).every((function(o) { return a.O[o](t[c]) })) ? t.splice(c--, 1) : (s = !1, r < n && (n = r));
                        if (s) {
                            o.splice(d--, 1);
                            var l = i();
                            void 0 !== l && (e = l)
                        }
                    }
                    return e
                }
                r = r || 0;
                for (var d = o.length; d > 0 && o[d - 1][2] > r; d--) o[d] = o[d - 1];
                o[d] = [t, i, r]
            }
        }(),
        function() { a.n = function(o) { var e = o && o.__esModule ? function() { return o["default"] } : function() { return o }; return a.d(e, { a: e }), e } }(),
        function() { a.d = function(o, e) { for (var t in e) a.o(e, t) && !a.o(o, t) && Object.defineProperty(o, t, { enumerable: !0, get: e[t] }) } }(),
        function() { a.g = function() { if ("object" === typeof globalThis) return globalThis; try { return this || new Function("return this")() } catch (o) { if ("object" === typeof window) return window } }() }(),
        function() { a.o = function(o, e) { return Object.prototype.hasOwnProperty.call(o, e) } }(),
        function() { a.r = function(o) { "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o, "__esModule", { value: !0 }) } }(),
        function() {
            var o = { 524: 0 };
            a.O.j = function(e) { return 0 === o[e] };
            var e = function(e, t) {
                    var i, r, n = t[0],
                        s = t[1],
                        c = t[2],
                        l = 0;
                    if (n.some((function(e) { return 0 !== o[e] }))) { for (i in s) a.o(s, i) && (a.m[i] = s[i]); if (c) var d = c(a) }
                    for (e && e(t); l < n.length; l++) r = n[l], a.o(o, r) && o[r] && o[r][0](), o[r] = 0;
                    return a.O(d)
                },
                t = self["webpackChunkmenu"] = self["webpackChunkmenu"] || [];
            t.forEach(e.bind(null, 0)), t.push = e.bind(null, t.push.bind(t))
        }();
    var t = a.O(void 0, [504], (function() { return a(1349) }));
    t = a.O(t)
})();
//# sourceMappingURL=app.592e750f.js.map