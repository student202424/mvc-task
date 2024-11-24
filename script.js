const URL = 'https://docs.google.com/spreadsheets/u/2/d/1C_k1RWXF9FTc7iQqXh8NrlrHdWD7G1PZD2qxTziDUFU/export?format=tsv&id=1C_k1RWXF9FTc7iQqXh8NrlrHdWD7G1PZD2qxTziDUFU&gid=0';
const SEP_LINE = '\r\n';
const SEP_CELL = '\t';
const DOM_TABLE = document.querySelector('.topchart');

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(SEP_LINE)
        .map(element => element.split(SEP_CELL));
    const headers = table.shift();

    return {
        headers: headers,
        songs: table.map(element => {
                const songData = {};
                headers.forEach((header, i) => songData[header] = element[i]);
                return songData;
            }
        )
    };
}

function render(data) {
    DOM_TABLE.innerHTML = `
    ${header(data.headers)}
    <tbody>
        ${body(data.songs)}
    </tbody>`;
}

function header(headers) {
    return `
    <thead>
    <tr>
        <th scope="col">${headers[0]}</th>
        <th scope="col">${headers[1]}</th>
        <th scope="col">${headers[2]}</th>
        <th scope="col">${headers[3]}</th>
    </tr>
    </thead>`;
}

function body(songs) {
    return `
    <tbody>
        ${songs.map(it => row(it)).join("")}
    </tbody>`;
}

function row(song) {
    return `
    <tr>
        <th scope="row">${song.number}</th>
        <td>${song.autor}</td>
        <td>${song.song}</td>
        <td>${song.time}</td>
    </tr>`;
}

loadData();
