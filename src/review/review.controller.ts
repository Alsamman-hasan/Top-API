import { Body, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewservice: ReviewService) { }
	
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewservice.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deleteDoc = await this.reviewservice.delete(id);
		if (!deleteDoc) {
			throw new HttpException(' не найдено ', HttpStatus.NOT_FOUND);
		}
	}

	// @UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email:string) {
		return this.reviewservice.findByProductId(productId);
	}
}
