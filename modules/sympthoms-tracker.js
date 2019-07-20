import uuidv4 from 'uuid/v4';
import client from './clients/lamba-client';

/**
 * This module sends results to the cloud for further analysis
 */
const tracker = {
    /**
     * @param {object} data Symphtoms to track
     * @returns {Promise} Response 
     */
    track: (data) => {
        const payload = { ...data, id: uuidv4(), tick: + new Date() }
        return client({
            method: 'post',
            data: payload,
        })
    }
};

export default tracker;