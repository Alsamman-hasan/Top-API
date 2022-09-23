import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class HhDataDto {

	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalaru: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvabtageDto {

	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@IsArray()
	@Type(() => TopPageAdvabtageDto)
	advantages: TopPageAdvabtageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];

}
