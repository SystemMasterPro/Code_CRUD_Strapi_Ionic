import { Component, OnInit } from '@angular/core';
import { ProductService, Prod } from '../service-products/product.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  product: Prod = {
    name: "",
    description: "",
    price:"",
  };
  editando = false;
  constructor(private prod:ProductService,private route:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("id")) {
        this.prod.getProdutsFind(paramMap.get("id")).subscribe((data) => {
            this.product = data;
            this.editando = true;
        });
      }
    });
  }

  saveProduct() { 
    this.prod.addProduts(this.product.name, this.product.description, this.product.price).subscribe(data => {
      // console.log(data);
      this.route.navigate(['/products']);
    }, error => {
      console.log(error);
    });
  }

  updateProduct() { 
    this.prod.updateProduts(this.product.id, { name: this.product.name, description: this.product.description, price: this.product.price }).subscribe(data => {
      // console.log(data);
      this.route.navigate(['/products']);
    }, error => {
      console.log(error); 
    });
  }

}
