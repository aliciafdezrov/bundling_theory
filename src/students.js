import { getAvg } from "./averageService";
const scores = [90, 75, 60, 99];
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;
document.write(messageToDisplay);