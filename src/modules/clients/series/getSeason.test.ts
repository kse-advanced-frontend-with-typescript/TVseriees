import {SeasonFromShema, seriesAPI} from './index';
import {createAPI} from '../../CreateTestAPI';
import {Season} from "../../../Components/Seasons/Seasons";
import {getImagePath} from "../../getImagePath";

describe('Series API: getSeason', () => {
    describe('when response is valid', () => {
        const body: SeasonFromShema = {
            season_number: 1,
            episodes: [
                {
                    name: 'Episode 1',
                    overview: '...',
                    episode_number: 1,
                    runtime: null,
                    still_path: null,
                    vote_count: 34,
                    vote_average: 7.2
                },
                {
                    name: 'Episode 2',
                    overview: '...',
                    episode_number: 2,
                    runtime: 56,
                    still_path: 'image url',
                    vote_count: 667,
                    vote_average: 5
                }
            ]
        };


        const result: Season = {
            index: body.season_number,
            episodes: [
                {
                    index: body.episodes[0].episode_number,
                    name:  body.episodes[0].name,
                    duration: 'unknown',
                    averageVote:  body.episodes[0].vote_average,
                    voteCount: body.episodes[0].vote_count,
                    overview:  body.episodes[0].overview,
                    imagePath: ''
                },
                {
                    index: body.episodes[1].episode_number,
                    name: body.episodes[1].name,
                    duration: body.episodes[1].runtime!,
                    averageVote: body.episodes[1].vote_average,
                    voteCount: body.episodes[1].vote_count,
                    overview: body.episodes[1].overview,
                    imagePath: getImagePath(body.episodes[1].still_path!)
                }
            ]
        };

        const {api, fetchMocked} = createAPI(body, seriesAPI);

        it('should return the result', async () => {
            const res = await api.getSeason(1, 2);
            expect(res).toEqual(result);

        });
        it('should construct correct url', async()=>{
            await api.getSeason(6, 7);
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('6/season/7'), expect.any(Object));

        });
    });
    describe('when response is not valid', () => {
        const body: SeasonFromShema = {
            season_number: 1,
            episodes: [
                {
                    id: 1,
                    // @ts-expect-error We want to check invalid data
                    overview: 44555,
                    episode_number: 1,
                    runtime: null,
                    still_path: null,
                    vote_count: 34,
                    vote_average: 7.2
                },
                {
                    // @ts-expect-error We want to check invalid data
                    name: null,
                    overview: '...',
                    episode_number: 2,
                    runtime: 56,
                    still_path: 'image url',
                    vote_count: 667,
                    vote_average: 5
                }
            ]
        };
        const {api} = createAPI(body, seriesAPI);

        it('should throw an error', async () => {
            await expect(api.getSeason(1, 6)).rejects.toThrow('Data is not valid: /episodes/0/name (Expected required property)');
        });
    });

});