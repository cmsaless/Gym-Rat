const Utils = require('./utils.js');

var parseRoutines = {

    /**
     * Takes in a request object that is then parsed to form a routine object
     * with a name and a list of exercises.
     */
    createRoutine: function(requestObject) {

        // Get the name of the routine.
        let routineName = requestObject['routine-name'];

        // From the exercises that were passed in, parse them as well.
        let exercises = this.extractExercises(requestObject['exercise-name'], requestObject['exercise-sets'], requestObject['exercise-reps']);

        let routine = {
            name: routineName,
            exercises: exercises
        };

        return routine;
    },

    /**
     * Take an array of exercise names, an array of sets, and an array of reps
     * and match them up in an exercise object which in turn are put
     * in an array and returned.
     */
    extractExercises: (names, sets, reps) => {

        let exercises = [];

        // If the type of names is a string rather than an array, that means only
        // a single exercise was passed in.
        if (typeof names === 'string') {

            exercise = {
                name: names,
                sets: sets,
                reps: reps
            };

            exercises.push(exercise)

        // Otherwise, (if the names variable is actually an array)...
        } else {

            // If our arrays are not the same length, then we need to return an 
            // empty array for exercises.
            if (names.length != sets.length || sets.length != reps.length) {
                return [];
            }

            // Go through each name to make an exercise and add the (converted) number of 
            // sets and reps as well.
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

    /**
     * Take a routine object and make a view-friendly model to
     * display on the frontend.
     */
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