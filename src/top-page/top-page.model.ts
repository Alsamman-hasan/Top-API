import { Index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {

	@prop()
	count: number;
	
	@prop()
	juniorSalaru: number;
	
	@prop()
	middleSalary: number;
	
	@prop()
	seniorSalary: number;
}

export class TopPageAdvabtage {
	
	@prop()
	title: string;
	
	@prop()
	description: string;
}

export interface TopPageModel extends Base {}
@Index({'$**': 'text'})
export class TopPageModel extends TimeStamps{
	@prop({enum : TopLevelCategory })
	
	@prop()
	firstCategory: TopLevelCategory;
	
	@prop()
	secondCategory: string;

	@prop({required: true})
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;
	
	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvabtage]})
	advantages: TopPageAdvabtage[];
	
	@prop()
	seoText: string;
	
	@prop()
	tagsTitle: string; 
	
	@prop({type: () => [String]})
	tags: string[];
	
}
