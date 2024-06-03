import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private producModel: Model<Product>
    
  ){}

   async create(createProductDto : CreateProductDto,user:User ) : Promise<Product> {
    const productModel = new this.producModel({
      ...createProductDto,
      user:user._id
    });
    
    return productModel.save();
  }

  async findAll() : Promise<Product[]> {
    return this.producModel.find().populate('user').exec();
  }


  async findOne(id: string) : Promise<Product>{
    let product : Product;
    
    product = await this.producModel.findById(id).populate('user').exec();
    if(!product){
      throw new NotFoundException(`No existe producto con el id ${id}`)
    }
    return product;
  }


  async update(id: string, updateProductDto:  UpdateProductDto) {
    
    const pokemonUpdated = await this.producModel.findByIdAndUpdate(id,updateProductDto,{new :true}).exec();
    if(!pokemonUpdated) throw new NotFoundException(`no se encontro producto con el id ${id}`)

    return pokemonUpdated;
  }

 async remove(id: string) {
    const {deletedCount} = await this.producModel.deleteOne({_id:id}).exec();

    if(!deletedCount) throw new BadRequestException(`product with id ${id} not found`);

    return;
  }
}
