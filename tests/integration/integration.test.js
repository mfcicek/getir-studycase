const mongoose = require("mongoose");
const request = require('supertest');
const faker = require('faker');
const config = require('../../config/config')
const app = require('../../app');
const httpStatus = require('../../utils/httpStatusCodes')

describe('Record routes', () => {
    beforeAll(async () => {
        await mongoose.connect(config.mongodb_url);
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    describe('POST /records', () => {

        it('It should return 404 when a request made to different url', async () => {
            const res = await request(app).post('/differentUrl').expect(httpStatus.NOT_FOUND);

            expect(res.body).toEqual({
                code: 404,
                msg: expect.any(String),
            });
        });

        it('It should return 200 and successfully create fetch data from DB', async () => {
            const startDateIso = faker.date.between('2016', '2020');
            const startDate = `${startDateIso.getFullYear()}-${(startDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${startDateIso.getDate().toString().padStart(2, '0')}`;

            const endDateIso = faker.date.between('2016', '2020');
            const endDate = `${endDateIso.getFullYear()}-${(endDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${endDateIso.getDate().toString().padStart(2, '0')}`;

            const res = await request(app)
                .post('/records')
                .send({
                    startDate,
                    endDate,
                    minCount: 1,
                    maxCount: 6000, // this number exists in db
                })
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 200 and fetch all data if request body is missing', async () => {
            const res = await request(app).post('/records').expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 200 and fetch all data if request startDate is missing', async () => {
            const endDateIso = faker.date.between('2016', '2020');
            const endDate = `${endDateIso.getFullYear()}-${(endDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${endDateIso.getDate().toString().padStart(2, '0')}`;
            const res = await request(app)
                .post('/records')
                .send({
                    endDate,
                    minCount: 1,
                    maxCount: 6000, // this number exists in db
                })
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 200 and fetch all data if request endDate is missing', async () => {
            const startDateIso = faker.date.between('2016', '2020');
            const startDate = `${startDateIso.getFullYear()}-${(startDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${startDateIso.getDate().toString().padStart(2, '0')}`;
            const res = await request(app)
                .post('/records')
                .send({
                    startDate,
                    minCount: 1,
                    maxCount: 6000, // this number exists in db
                })
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 200 and fetch all data if request minCount is missing', async () => {
            const startDateIso = faker.date.between('2016', '2020');
            const startDate = `${startDateIso.getFullYear()}-${(startDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${startDateIso.getDate().toString().padStart(2, '0')}`;

            const endDateIso = faker.date.between('2016', '2020');
            const endDate = `${endDateIso.getFullYear()}-${(endDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${endDateIso.getDate().toString().padStart(2, '0')}`;
            const res = await request(app)
                .post('/records')
                .send({
                    startDate,
                    endDate,
                    maxCount: 6000, // this number exists in db
                })
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 200 and fetch all data if request maxCount is missing', async () => {
            const startDateIso = faker.date.between('2016', '2020');
            const startDate = `${startDateIso.getFullYear()}-${(startDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${startDateIso.getDate().toString().padStart(2, '0')}`;

            const endDateIso = faker.date.between('2016', '2020');
            const endDate = `${endDateIso.getFullYear()}-${(endDateIso.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${endDateIso.getDate().toString().padStart(2, '0')}`;
            const res = await request(app)
                .post('/records')
                .send({
                    startDate,
                    endDate,
                    minCount: 1,
                })
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                code: 0,
                msg: 'Success',
                records: expect.any(Array),
            });
        });

        it('It should return 400 when startDate is in wrong format', async () => {
            const startDate = 1;

            const res = await request(app)
                .post('/records')
                .send({
                    startDate,
                })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body).toEqual({
                code: 400,
                msg: expect.any(String),
            });
        });

        it('It should return 400 when endDate is in wrong format', async () => {
            const endDate = 1;

            const res = await request(app)
                .post('/records')
                .send({
                    endDate,
                })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body).toEqual({
                code: 400,
                msg: expect.any(String),
            });
        });

        it('It should return 400 when maxCount is in wrong format', async () => {
            const maxCount = 'name';

            const res = await request(app)
                .post('/records')
                .send({
                    maxCount,
                })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body).toEqual({
                code: 400,
                msg: expect.any(String),
            });
        });

        it('It should return 400 when minCount is in wrong format', async () => {
            const minCount = 'name';

            const res = await request(app)
                .post('/records')
                .send({
                    minCount,
                })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body).toEqual({
                code: 400,
                msg: expect.any(String),
            });
        });
    });
});