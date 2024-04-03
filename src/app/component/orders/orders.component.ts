import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Service/auth.service';
import { TripServiceService } from '../Service/trip-service.service';
import { IOrder } from '../../models/trip';
import {  Observable ,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../Service/data.service';
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders?: IOrder[];
  message: string = '';
  closeResult = '';
  modalRef: NgbModalRef | undefined;
  secondModalRef: NgbModalRef | undefined; // Reference to the second modal

  constructor(private modalService: NgbModal ,private _TripServiceService:TripServiceService,private _Auth:AuthService,private _DataService:DataService) {
this.getTrip()
    this.getCity()
    this.getCategorey()
    this.getshipment()
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
    
   }

  open(content: any) {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openSecondModal(secondModalContent: any) {
    if (this.modalRef) {
      this.modalRef.close();
    }

    if (this.secondModalRef) {
      // this.secondModalRef.close();
    }

    this.secondModalRef = this.modalService.open(secondModalContent, { ariaLabelledBy: 'modal-basic-title' });

    this.secondModalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  datePickerConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    containerClass: 'theme-dark-blue',
  };

  selectedDate: Date = new Date();
  selectedOption: string = '1';

  onOptionChange() {
    // You can perform additional actions here if needed
  }


// ______________Get city data ____________
cityarr:any[]=[];
getCity(){
  this._TripServiceService.getCities().subscribe((Response)=>{
    console.log(Response)
this.cityarr=Response
  })
}

categoreyarr:any[]=[];
getCategorey(){
  this._TripServiceService.getCategorey().subscribe((Response)=>{
    console.log(Response)
this.categoreyarr=Response
  })
}
 
Tripform:FormGroup=new FormGroup({
  availableKg:new FormControl(null),
  arrivalTime:new FormControl(null),
  fromCityName:new FormControl(null),
  countryNameFrom:new FormControl(null),
  toCityName:new FormControl(null),
  countryNameTo:new FormControl(null),
 
 
})
 
Shipmentform:FormGroup=new FormGroup({
  reward:new FormControl(null),
   dateOfRecieving:new FormControl(null),
  fromCityName:new FormControl(null),
  countryNameFrom:new FormControl(null),
  toCityName:new FormControl(null),
  countryNameTo:new FormControl(null),
  address:new FormControl(null),
  productName:new FormControl(null),
  productPrice:new FormControl(null),
  productWeight:new FormControl(null),
  weight:new FormControl(null),
  image:new FormControl(null),
  categoryName:new FormControl(null),
})
 
  


createTrip(formData:FormGroup){
  
    console.log("createTrip",formData.value)
this._TripServiceService.createTrip(formData.value).subscribe({
next:(Response)=>{console.log(Response)},
error:(err)=>{console.log(err)}
})

 
}



gettrip:any[]=[]
getTrip(){
  this._DataService.getTripData().subscribe((data)=>{
    console.log(data.data)
    this.gettrip=data.data
  })
}


createShipment(formData: FormData) {
  console.log("createShipment", formData);
  this._TripServiceService.createShipment(formData).subscribe({
    next: (Response) => { console.log(Response) },
    error: (err) => { console.log(err) }
  });
}
onSubmit() {
  const formData = new FormData();
  formData.append('reward', this.Shipmentform.get('reward')?.value);
  formData.append('dateOfRecieving', this.Shipmentform.get('dateOfRecieving')?.value);
  formData.append('fromCityName', this.Shipmentform.get('fromCityName')?.value);
  formData.append('countryNameFrom', this.Shipmentform.get('countryNameFrom')?.value);
  formData.append('toCityName', this.Shipmentform.get('toCityName')?.value);
  formData.append('countryNameTo', this.Shipmentform.get('countryNameTo')?.value);
  formData.append('address', this.Shipmentform.get('address')?.value);
  formData.append('productName', this.Shipmentform.get('productName')?.value);
  formData.append('productPrice', this.Shipmentform.get('productPrice')?.value);
  formData.append('productWeight', this.Shipmentform.get('productWeight')?.value);
  formData.append('weight', this.Shipmentform.get('weight')?.value);
  formData.append('image', this.Shipmentform.get('image')?.value);
  formData.append('categoryName', this.Shipmentform.get('categoryName')?.value);


  formData.forEach((value, key) => {
    console.log(key + ': ' + value);
  });
  this.createShipment(formData);

}
getShipment:any[]=[]
getshipment(){
  this._DataService.getShipmentData().subscribe((data)=>{
    console.log(data.data)
    this.getShipment=data.data
  })
}
  
}