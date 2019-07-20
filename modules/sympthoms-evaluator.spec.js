import evaluator from './sympthoms-evaluator';

describe('sympthoms evaluator', () => {
    it('should return positive', () => {
        const sets = [
            [true, true, 38],
            [true, true, 38.1],
            [true, true, 40],
        ]

        sets.forEach(([cough, fever, temp]) => {
            expect(evaluator({ cough, fever, temp  })).toBe(true)
        })
        
    });

    it('should return negative', () => {
        const sets = [
            [true, false, 38],
            [false, true, 38.1],
            [true, true, 37],
        ]

        sets.forEach(([cough, fever, temp]) => {
            expect(evaluator({ cough, fever, temp  })).toBe(false)
        })
    });
})