var parseRoutines = {
    extractExercises: (namesArr, setsArr, repsArr) => {

        if (namesArr.length != setsArr.length || setsArr.length != repsArr.length) {
            return [];
        }

        let exercises = []

        for (let i = 0; i < namesArr.length; i++) {
            if (namesArr[i] == "") {
                continue;
            }
            let exercise = {
                name: namesArr[i],
                sets: Number.isNaN(parseInt(setsArr[i])) ? 0 : parseInt(setsArr[i]),
                reps: Number.isNaN(parseInt(repsArr[i])) ? 0 : parseInt(repsArr[i])
            };
            exercises.push(exercise);
        }

        return exercises;
    }
}

module.exports = parseRoutines;