import { getAvg } from "./averageService";
import logoImg from "./content/logo_1.png";
const scores = [90, 75, 60, 99];
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;
document.write(messageToDisplay);

const img = document.createElement("img");
img.src = logoImg;
document.getElementById("imgContainer").appendChild(img);