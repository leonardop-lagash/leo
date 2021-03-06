const Router = require("restify-router").Router;
const router = new Router();

const {
  getApps,
  newApps,
  editApp,
  getOne,
  getAppsName
} = require("../services/aplicaciones");

router.get("/all", async (req, res) => {
  let data = await getApps(req, res);
  if (data) {
    res.send(200, data);
  } else {
    res.send(500, { error: "No se pudieron cargar las apps" });
  }
});

router.get("/getname/:name", async (req, res) => {
  let data = await getAppsName(req, res);
  console.log(data);
  if (data) {
    if (data.length > 0) {
      res.send(200, data);
    } else {
      res.send(404, { msj: "no encontrada" });
    }
  } else {
    res.send(500, { msj: "Error al obtener la data" });
  }
});

router.get("/getapps/:category", async (req, res) => {
  if (req.params.category) {
    let data = await getOne(req, res);
    if (!data.err) {
      res.send(200, data);
    } else {
      return { msj: "error al traer la data" };
    }
  } else {
    let data = await getApps(req, res);
    if (data) {
      res.send(200, data);
    } else {
      res.send(500, { error: "No se pudieron cargar las apps" });
    }
  }
});

router.post("/add", async (req, res) => {
  let result = await newApps(req, res);
  if (result.msj === true) {
    res.send(200, { msj: "se agrego correctamente" });
  } else {
    res.send(500, { msj: "error al agregar" });
  }
});

router.put("/update/:name", async (req, res) => {
  let result = await editApp(req, res);
  if (result.msj === true) {
    res.send(200, { mjs: "actualizado con exito!" });
  } else {
    res.send(500, { mjs: "error al actualizar" });
  }
});

module.exports = router;
