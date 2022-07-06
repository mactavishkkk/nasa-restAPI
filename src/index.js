import "core-js"
import "regenerator-runtime/runtime"

import Sentry from "./sentry"
import { getSentry } from "./sentry_service"

async function loadSentrys() {
    let sentrys = [];
    let sentrysJSON = await getSentry();
    sentrysJSON.forEach(element => {
        const newSentry = new Sentry(element["sentryId"], element["fullname"], element["year_range_min"], element["year_range_max"]);
        sentrys.push(newSentry);
    });
    renderSentry(sentrys);
}

async function renderSentry(sentry) {
    const olElement = document.getElementById("sentry-list")
    sentry.forEach(element => {
        const liElement = document.createElement("li")
        const text = `ID: ${element.id} | NOME: ${element.name} | Risco de Colisão ente: ${element.yearMinColision} e ${element.yearMaxColision}`
        liElement.innerText = text
        olElement.appendChild(liElement);
    })
}

loadSentrys();