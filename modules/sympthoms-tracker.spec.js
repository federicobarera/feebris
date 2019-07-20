import client from './clients/lamba-client';
import tracker from './sympthoms-tracker';

jest.mock('./clients/lamba-client');

describe('tracking tests', () => {

    beforeEach(() => {
        client.mockClear();
    })

    it('should pass on data to microservice', () => {
        tracker.track({ a: 1 });

        expect(client.mock.calls[0][0].data).toMatchObject({ a: 1 });
    });

    it('should post data', () => {
        tracker.track({ a: 1 });

        expect(client.mock.calls[0][0].method).toBe('post');
    });

    it('should add id and tick to postback', () => {
        tracker.track({ a: 1 });
        
        const { id, tick } = client.mock.calls[0][0].data;
        expect(id).not.toBe(undefined);
        expect(tick).not.toBe(undefined);
    });
});