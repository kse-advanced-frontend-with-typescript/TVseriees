import {Images, initSeriesAPI} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';
import {getImagePath} from '../../../getImagePath';

describe('Series API: getSeason', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {

        const body: Images = {
            backdrops: [
                {file_path: null},
                {file_path: null},
                {file_path: null},
                {file_path: 'url1'},
                {file_path: 'url2'},
                {file_path: 'url3'},

            ]
        };


        const result: string[] = [getImagePath('url1'), getImagePath('url2'), getImagePath('url3')];

        const fetchMocked = createFetchMockedWithBody(body);
        const api = initSeriesAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.getImages(2);
            expect(res).toEqual(result);

        });
        it('should construct correct url', async()=>{
            await api.getImages(12);
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('12/images'), expect.any(Object));

        });
    });
    describe('when response is not valid', () => {
        const body: Images = {
            backdrops: [
                // @ts-expect-error We want to check invalid data
                {file_path: 333333},
                // @ts-expect-error We want to check invalid data
                {file_path: false},
                {file_path: null},
                {file_path: 'url1'},
                {file_path: 'url2'},
                {file_path: 'url3'},

            ]
        };

        const api = initSeriesAPI(API_KEY, createFetchMockedWithBody(body));

        it('should throw an error', async () => {
            await expect(api.getImages(4)).rejects.toThrow('Data is not valid: /backdrops/0/file_path (Expected union value)');
        });
    });

});