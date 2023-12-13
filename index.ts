import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils";
import express = require("express");
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi/", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(height, weight);
    return res.json({ height, weight, bmi });
});

app.post("/exercises/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (target == null || !daily_exercises)
        res.json({
            error: "parameters missing",
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allValuesAreNumbers: boolean = daily_exercises.slice(2).every((value: any) => !isNotNumber(value));
    if (isNotNumber(target) || !allValuesAreNumbers) {
        res.json({
            error: "malformatted parameters",
        });
    }
    res.json(calculateExercises(daily_exercises, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
