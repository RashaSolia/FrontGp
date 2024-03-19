import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Service/auth.service';
import { TripServiceService } from '../Service/trip-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  message: string = '';
  closeResult = '';
  modalRef: NgbModalRef | undefined;
  secondModalRef: NgbModalRef | undefined; // Reference to the second modal

  constructor(private modalService: NgbModal ,private _TripServiceService:TripServiceService,private _Auth:AuthService) {

    this.getCity()
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
 
 
Tripform:FormGroup=new FormGroup({
  availableKg:new FormControl(null),
  arrivalTime:new FormControl(null),
  fromCityName:new FormControl(null),
  countryNameFrom:new FormControl(null),
  toCityName:new FormControl(null),
  countryNameTo:new FormControl(null),
 
 
})


// logMessage() {
//   this.message = this._Auth.sharedVariable;
//   }
createTrip(formData:FormGroup){
   if (localStorage.getItem('userToken')!== null) {
     console.log("createTrip",formData.value)
this._TripServiceService.createTrip(formData.value).subscribe({
next:(Response)=>{console.log(Response)},
error:(err)=>{console.log(err)}
})

  }





}


 
  
}
 