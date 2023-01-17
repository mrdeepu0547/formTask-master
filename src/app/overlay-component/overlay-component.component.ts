import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-overlay-component',
  templateUrl: './overlay-component.component.html',
  styleUrls: ['./overlay-component.component.scss']
})
export class OverlayComponentComponent {
  public site:any;
  lookUpsData: any;
  public psStatus=[
    {id:1,name:'Active'},
    {id:2,name:'In-Active'},
    {id:3,name:'All'}
  ]
  constructor(private primengConfig: PrimeNGConfig, public http: HttpClient, public datePipe: DatePipe, public dataService: DataService) { }
  ngOnInit() {
    this.dataService.getLookupData()
      this.primengConfig.overlayOptions = {
        appendTo: 'body'
    };
    this.dataService. getUserOfficeList(1).subscribe(result => {
      this.site = result;
    });

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
    //form defiened here
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
  public submitted: boolean = false;
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
        this.personForm.reset();
        this.submitted = false;
      })
    }
  }
}
