import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity'
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [{
    id: 1,
    name: 'Product A',
    description: 'test',
    price: 12,
    image: '',
    stock: 0
  }];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product)
      throw new NotFoundException('Product not found');
    return product
  }

  create(payload: any) {
    const newProduct = {
      id: this.counterId,
      ...payload
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: any) {
    const productFound = this.products.findIndex((item) => item.id === id);
    let message = '';
    if (productFound > 0) {
      this.products[productFound] = {
        id: id,
        ...payload,
      };
      message = 'Product updated';
    } else {
      message = 'Product not found';
    }
    return message;
  }

  delete(id: number) {
    const productFound = this.products.findIndex((item) => item.id === id);
    let message = '';
    if (productFound > 0) {
      this.products.splice(productFound, 1);
      message = 'product deleted';
    } else {
      message = 'product not found';
    }
    return message;
  }
}
