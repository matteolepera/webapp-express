function index(req, res) {
    console.log("index")
}

function show(req, res) {
    console.log("show")
}

const controller = {
    index,
    show,
}

export default controller;