import{AdminUser} from "../Controllers/firebase.js"

const ver =  document.getElementById('vdata')

async function cargar(){
    ver.innerHTML=''
    const docref = AdminUser()
    const querySnapshot = await docref
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`);
        ver.innerHTML+=`
            <tr>
            <th scope="row">${doc.data().userIdentification}</th>
            <td>${doc.data().userName}</td>
            <td>${doc.data().userBDaten}</td>
            <td>${doc.data().userAddr}</td>
            <td>${doc.data().userPhone}</td>
            <td>${doc.data().userGen}</td>
            <td>${doc.data().userRh}</td>
            <td>${doc.data().userEmail}</td>
            <td><button class="btn btn-danger" id="btn-eliminar" onclick="eliminarUsuario('${doc.id}')">Eliminar</button></td>
            </tr>
        `
    });
} 



window.addEventListener('DOMContentLoaded', async()=>{
    cargar()
})