const data = {
  nombre: "Prueba",
  email: "prueba@test.com",
  edad: 25,
  pais: "Argentina",
  nivel: "Junior",
  modalidad: "Presencial",
  tecnologias: ["React", "Node"],
  aceptaTerminos: true
};

fetch("http://localhost:8080/participantes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(res => res.text().then(text => ({ status: res.status, text })))
  .then(console.log)
  .catch(console.error);
