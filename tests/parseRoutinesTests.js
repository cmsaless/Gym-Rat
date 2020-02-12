const assert = require('assert');
const parseRoutines = require('../middleware/parseRoutines.js');

describe('/middleware/parseRoutines.js', () => {
    describe('extractExercises', () => {
        it('should return array w/ 1 exercise (Squats 3x10)', () => {

            exercises = [{ name: "Squats", sets: 3, reps: 10 }];

            let names = 'Squats';
            let sets = '3';
            let reps = '10';
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
        it('should return an empty array', () => {

            exercises = [];

            let names = [];
            let sets = [];
            let reps = [];
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
        it('should return an empty array', () => {

            exercises = [];

            let names = ['Flips'];
            let sets = ['1','2'];
            let reps = ['1','2','3'];
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
        it(`should return array w/ 3 exercises 
            Squats 3x10, 
            Calf-raises 2x30, 
            Leg Curls 4x8`, () => {

            exercises = [
                { name: "Squats", sets: 3, reps: 10 },
                { name: "Calf-raises", sets: 2, reps: 30 },
                { name: "Leg Curls", sets: 4, reps: 8 }
            ];

            let names = ['Squats', 'Calf-raises', 'Leg Curls'];
            let sets = ['3', '2', '4'];
            let reps = ['10', '30', '8'];
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
        it(`should return array w/ 3 exercises
            Bench Press 3x10,
            Calf-raises 0x0
            Leg Curls 3x10`, () => {

            exercises = [
                { name: "Bench Press", sets: 3, reps: 10 },
                { name: "Calf-raises", sets: 0, reps: 0 },
                { name: "Leg Curls", sets: 3, reps: 10 }
            ];

            let names = ['Bench Press', 'Calf-raises', 'Leg Curls'];
            let sets = ['3','NaN', '3'];
            let reps = ['10','NaN','10'];
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
        it(`should return array w/ 2 exercises
            Bench Press 3x10,
            Leg Curls 4x8`, () => {

            exercises = [
                { name: "Bench Press", sets: 3, reps: 10 },
                { name: "Leg Curls", sets: 4, reps: 8 }
            ];

            let names = ['Bench Press', '', 'Leg Curls'];
            let sets = ['3','5', '4'];
            let reps = ['10','5','8'];
            let retval = parseRoutines.extractExercises(names, sets, reps);

            assert.deepEqual(exercises, retval)
        });
    });
});