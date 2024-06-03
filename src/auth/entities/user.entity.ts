import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Product } from "src/product/products/entities/product.entity";

@Schema()
export class User extends Document{
    @Prop({ required: true, unique: true,index:true })
    email: string;
  
    @Prop({ required: true,select:false })
    password: string;
  
    @Prop({ required: true })
    fullname: string;
  
    @Prop({ default: true })
    isActive: boolean;
  
    @Prop({ type: [String], default: ['user'] })
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(User)
