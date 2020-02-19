const Utils = require('./utils.js');

var parseRoutines = {

    createRoutine: function(requestObject) {

        let routineName = requestObject['routine-name'];
        let exercises = this.extractExercises(requestObject['exercise-name'], requestObject['exercise-sets'], requestObject['exercise-reps']);

        let routine = {
            name: routineName,
            exercises: exercises
        };

        return routine;
    },

    extractExercises: (names, sets, reps) => {

        let exercises = [];

        if (typeof names === 'string') {

            exercise = {
                name: names,
                sets: sets,
                reps: reps
            };

            exercises.push(exercise)

        } else {

            if (names.length != sets.length || sets.length != reps.length) {
                return [];
            }

            for (let i = 0; i < names.length; i++) {
                if (names[i] == "") {
                    continue;
                }
                let exercise = {
                    name: names[i],
                    sets: Number.isNaN(parseInt(sets[i])) ? 0 : parseInt(sets[i]),
                    reps: Number.isNaN(parseInt(reps[i])) ? 0 : parseInt(reps[i])
                };
                exercises.push(exercise);
            }
        }

        return exercises;
    },

    createViewModel: (routine) => {
        
        let routineViewModel = {
            inUse: routine.inUse ? '✅' : '❌',
            name: routine.name,
            numOfExercises: routine.exercises.length,
            numOfTimesCompleted: routine.numOfTimesCompleted,
            createdAtFormatted: Utils.formatDate(routine.createdAt),
            _id: routine._id
        };

        return routineViewModel;
    }
}

module.exports = parseRoutines;