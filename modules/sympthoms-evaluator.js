const max_temp = 38;

/**
 * This module evaluates the sympthoms of the patient and returns a diagnosys attempt
 * @param {bool} cough Does the patient have cough
 * @param {float} temp Patient's temperature
 * @param {bool} fever Has the patient had fever over the last 5 days
 * @returns {bool} Has flu or not
 */
const evaluate = ({ cough, temp, fever }) => {
    return fever && cough && temp >= max_temp;
}

export default evaluate;