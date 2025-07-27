import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ nullable: true })
  likes: string;



}

export const ProductSchema = SchemaFactory.createForClass(Product);