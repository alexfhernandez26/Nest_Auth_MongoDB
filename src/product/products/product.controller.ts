import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService} from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/auth.decorator';
import { VALID_ROLE } from 'src/auth/interfaces/user-role.interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(VALID_ROLE.user)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user : User
  ) {
    return this.productService.create(createProductDto,user);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Auth(VALID_ROLE.admin)
  update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user:User
  ) {
    return this.productService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  @Auth(VALID_ROLE.admin)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
