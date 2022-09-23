import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';


jest.useRealTimers();

const loginDto: AuthDto = {
	email: 'hasan8@mail.ru',
	password: '128'
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

	});


	it('/auth/login (POST) - succsess', async (done) => {
		return request(app.getHttpServer())
			.post('/auth/login ')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
				done();
			});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login ')
			.send({...loginDto, password: '0'})
			.expect(401, {
				statusCode: 401,
				message: 'Неверный пароль',
				error: 'Unauthorized'
			});
	});

	it('/auth/login (POST) - fail email', () => {
		return request(app.getHttpServer())
			.post('/auth/login ')
			.send({ ...loginDto, email: 'hasan3338@mail.ru' })
			.expect(401, {
				statusCode: 401,
				message: 'Пользоватлеь c таким email  не найден',
				error: 'Unauthorized'
			});
	});

	afterAll(() => {
		disconnect();
	});

});
