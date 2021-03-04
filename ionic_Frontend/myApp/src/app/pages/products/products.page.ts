import { Component, OnInit } from '@angular/core';
import { ProductService, Prod } from '../service-products/product.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Prod[] = [];
  constructor(private prod:ProductService,public alertController: AlertController) { }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() { 
    this.getData();
  }

  getData() {
    this.prod.getProduts().subscribe(data => {
      // console.log(data);
      this.products = data;
    }, error => {
        console.log(error); 
    });
  }
  async deleteData(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmacion!',
      message: 'Desea Eliminar El <strong>Producto</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Producto Conservado');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.prod.deleteProduts(id).subscribe(data => {
              // console.log(data);
              this.getData();
            }, error => {
              console.log(error);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
