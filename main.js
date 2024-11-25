let objects = [];
let statusa = "";

function setup() {
    const canvas = createCanvas(600, 500); // Canvas maior para destaque
    canvas.parent("canvas");
    const video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    globalThis.video = video; // Disponibiliza o vídeo globalmente
}

function draw() {
    background(0);
    image(video, 0, 0, 600, 500); // Ajustado para corresponder ao canvas maior

    if (statusa) {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];
            const color = obj.label === document.querySelector("#objeto-a-encontrar").value ? "#FFD700" : "#FF0000";

            fill(color);
            textSize(20); // Aumenta o tamanho do texto
            text(`${obj.label} (${floor(obj.confidence * 100)}%)`, obj.x + 10, obj.y + 25);
            noFill();
            stroke(color);
            rect(obj.x, obj.y, obj.width, obj.height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", () => {
        console.log("Modelo carregado com sucesso!");
        statusa = true;
        document.querySelector("#objetos").innerText = "Status: Detectando objetos...";
    });
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    objects = results;
}
