import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/auth/entities/user.entity";

@Schema()
export class Product extends Document {

    @Prop({
        unique:true,
        required:true
    })
    name: string;

    @Prop({
        required:true
    })
    price: number;

    @Prop({
      type:[{type:MongooseSchema.Types.ObjectId,ref:'User'}]
    })
    user:User
}

export const ProductSchema = SchemaFactory.createForClass(Product);
