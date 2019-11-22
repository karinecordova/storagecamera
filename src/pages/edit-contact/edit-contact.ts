import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Item } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {
  model: Contact;
  key: string;
  photo: string;
 
    

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactProvider, private toast: ToastController, public camera: Camera) {
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key =  this.navParams.data.key;
      
     
      
      
    } else {
      this.model = new Contact();
    }
  
  }
  save() {
    this.saveContact()
      .then(() => {
        this.toast.create({ message: 'Contato salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveContact() {
    if (this.key) {
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
  }


   /* Criamos o método getPhoto que foi declarado na interface. Cada parâmetro aqui é importante e vai definir o funcionamento da câmera. Nesse exemplo vamos tirar uma foto em JPEG e que vai vir como resultado o base64 da imagem em qualidade 100. Em celulares com menos memória é melhor diminuir um pouco a qualidade
   *
   * @param type - photo or gallery
   */
   getPhoto(type){
  
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      
      this.photo = 'data:image/jpeg;base64,' + imageData;
      
    
    }, (err) => {
      // Handle error
    })
    return this.photo;
  }

}
