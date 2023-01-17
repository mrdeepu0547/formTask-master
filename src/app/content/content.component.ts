import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {


  personForm = new FormGroup({
    psId: new FormControl(0),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required]),
    salutation: new FormControl('', [Validators.required]),
    maritialStatus: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    language: new FormControl(null, [Validators.required]),
    addressType: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    addressLine2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneType: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    timeZone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })
  modalRef?: BsModalRef;
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  lookUpsData: any;

  public PSId: number;
  constructor(public http: HttpClient, private modalService: BsModalService, public datePipe: DatePipe, public dataService: DataService) { }
  ngOnInit() {
    this.getLookupData();
    this.getPSDetails()

  }
  public data = {
    "psId": 0,
    "saluationId": "DR",
    "genderId": "U",
    "lastName": "1-louisville",
    "firstName": " l",
    "raceId": "O",
    "maritalStatusID": "U",
    "dob": "01/01/1998",
    "ssn": "",
    "languageId": 1,
    "locationId": "Home111",
    "city": "Antioch",
    "addressLine": "5-10/1/1/10/N/P",
    "addressLine2": "",
    "zipcode": "37011",
    "phoneTypeid": "Home",
    "phone": "7896325410",
    "stateId": 43,
    "countyId": 751,
    "timeZoneId": 1,
    "countryId": "USA",
    "officeId": 140,
    "mappedOfficeIds": "140",
    "updatedUserId": 1
  }
  public getLookupData() {
    this.dataService.getLookupData().subscribe(result => {
      this.lookUpsData = result;
      console.log(this.lookUpsData)
    })
  }
  public getPSDetails() {
    try {
      this.dataService.getPSDetails(this.PSId).subscribe(res => {
        console.log(res);
        this.personForm.get('lastName').setValue(res.lastname);
        this.personForm.get('firstName').patchValue(res.firstname);
        this.personForm.get('gender').patchValue(res.genderId);
        this.personForm.get('salutation').patchValue(res.salutation);
        this.personForm.get('maritialStatus').patchValue(res.maritialStatusId)
        this.personForm.get('dateOfBirth').patchValue(res.dob)
        this.personForm.get('race').patchValue(res.raceId)
        this.personForm.get('ssn').patchValue(res.ssn)
        this.personForm.get('language').patchValue(res.languageId)
        this.personForm.get('addressType').patchValue(res.locationId)
        this.personForm.get('addressLine1').patchValue(res.addressLane1)
        this.personForm.get('addressLine2').patchValue(res.addressLine2)
        this.personForm.get('zipCode').patchValue(res.zipCode)
        this.personForm.get('phoneType').patchValue(res.phoneType1)
        this.personForm.get('phone').patchValue(res.phone1)
        this.personForm.get('city').patchValue(res.city)
        this.personForm.get('state').patchValue(res.state)
        this.getZipCodeData(res.zipCode)
      })
    } catch (error) {

    }
  }
  /**
   * get ZipCode Data
   */
  public getZipCodeData(zipCode:number ) {
    console.log(zipCode)
    this.http.get(`http://poc.aquilasoftware.com/poclite/psapi/getZipCodeDetails?jsonObj={"zipCode":"${zipCode}"}`).subscribe(
      (result:any)=>{
        console.log(result)
        console.log(result.timeZoneId)
        this.personForm.get('timeZone').patchValue(result.timeZone)
        this.personForm.get('country').patchValue(result.country)
      }
    )
  }
  public submitted = false;
  /**
 * editSubmit

 */
  public editSubmit() {
    if (this.personForm.invalid) {
      alert("invalid data");
    } else {
      this.data.psId = this.PSId
      this.data.firstName = this.personForm.value.firstName
      this.data.lastName = this.personForm.value.lastName
      this.data.city = this.personForm.value.city
      this.data.phone = this.personForm.value.phone
      this.data.zipcode = this.personForm.value.zipCode
      this.data.addressLine = this.personForm.value.addressLine1
      this.data.addressLine2 = this.personForm.value.addressLine2
      this.data.dob=this.personForm.value.dateOfBirth
      this.data.genderId=this.personForm.value.gender
      this.data.saluationId=this.personForm.value.salutation
      this.data.maritalStatusID=this.personForm.value.maritialStatus
      console.log(this.data)
      this.onSubmit();






      // this.dataGetter.sendPostData(this.data)
      console.log(this.PSId);
      this.modalService.hide();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.personForm.invalid) {
      alert("invalid data");
    }
    else {
      console.log(this.personForm.value.dateOfBirth)
      console.log(this.personForm.getRawValue());
      this.data.saluationId = this.personForm.value.salutation;
      this.data.firstName = this.personForm.value.firstName;
      this.data.lastName = this.personForm.value.lastName;
      console.log(this.personForm.value.dateOfBirth)
      this.data.dob = this.datePipe.transform(this.personForm.value.dateOfBirth, 'MM/dd/yyyy');
      console.log(this.data.dob)
      this.http.post('http://poc.aquilasoftware.com/poclite/psapi/savePSDetails', JSON.stringify(this.data)).subscribe(result => {
        console.log(result);
        this.dataService.updateTable.next(true);
        // this.personForm.reset();
        this.submitted = false;
      })
    }
  }
}


