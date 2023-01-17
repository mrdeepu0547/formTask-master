import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public updateTable=new Subject();
  public updateTable$=this.updateTable.asObservable();

  private baseUrl='http://poc.aquilasoftware.com/poclite';
 private postUrl='http://poc.aquilasoftware.com/poclite/psapi/savePSDetails'
 private udata='http://poc.aquilasoftware.com/poclite/common/getLookupsData?lookupNames=gender,salutation,race,maritial_status,address_type,phone_type,language'
  constructor(private http:HttpClient) { }
  getPersons(jsonObj):Observable<any>{
  return this.http.get(this.baseUrl+'/psapi/getPSList?jsonObj='+jsonObj);
  }
  addPersons(post){
    return this.http.post(this.postUrl,JSON.stringify(post)).subscribe(result=>{
      console.log(result);
    })
  }
  getData(){
  return this.http.get(this.udata);
  }
  lookUpsData:any
  public getLookupData():Observable<any> {
  return  this.http.get(`${this.baseUrl}/common/getLookupsData?lookupNames=gender,salutation,race,maritial_status,address_type,phone_type,language`);
  }
  public getPSDetails(id):Observable<any>{
    return this.http.get(`${this.baseUrl}/psapi/getPSDetails?jsonObj={"psId":${id}}`);
  }
  private subject = new Subject();
   public editData:any
   sendPostData(editData) {
     this.subject.next(editData);
}
accessPostData() {
    return this.subject.asObservable();
}
public getUserOfficeList(userId): Observable<any> {
  return this.http.get(this.baseUrl+'/common/getUserOfficeList?jsonObj={"userId":1}');
}
public getPSList(obj): Observable<any> {
  return this.http.get(this.baseUrl + '/common/getPSList?jsonObj=' +obj);
}
public getPSLists(obj): Observable<any> {
  return this.http.get('http://poc.aquilasoftware.com/poclite/psapi/getPSList?jsonObj=' + JSON.stringify(obj))
}

}
