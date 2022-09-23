import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';


const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'test',
	title: 'testTitle',
	description: 'descriptionTest',
	rating: 5,
	productId
};

jest.useRealTimers();

const loginDto: AuthDto = {
	email: 'hasan8@mail.ru',
	password: '128'
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDto);
		token = body.access_token;

	});


	it('/review/create (POST) - succsess', async (done) => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
				done();
			});
	});

	it('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400);
	});


	it('/review/byProduct/:productId (GET) - succsess', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
				done();
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
				done();
			});
	});

	it('/review/:id (DELETE) - succsess', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.set('Authorization', `Bearer ${token}`)
			.expect(404);
	});

	afterAll(() => {
		disconnect();
	});

});