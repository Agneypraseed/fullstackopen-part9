interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (daily_exercise_hours: number[], target: number): Result => {
    const ratings = daily_exercise_hours.map((value) => {
        if (value >= target) {
            return 3;
        } else if (value >= target - 1 && value < target) {
            return 2;
        } else {
            return 1;
        }
    });

    const overallRating = Math.round(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length);

    let overallDescription: string;
    if (overallRating == 3) overallDescription = "Very Good";
    else if (overallRating >= 2 && overallRating < 3) overallDescription = "not too bad but could be better";
    else overallDescription = "Please try harder";

    let result: Result = {
        periodLength: daily_exercise_hours.length,
        trainingDays: daily_exercise_hours.filter((element) => element !== 0).length,
        success: daily_exercise_hours.every((value) => value >= target),
        rating: overallRating,
        ratingDescription: overallDescription,
        target: target,
        average:
            daily_exercise_hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
            daily_exercise_hours.length,
    };

    return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
