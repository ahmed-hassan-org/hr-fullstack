import { Injectable } from '@angular/core';
import { HttpCall } from './http/HttpCall.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http:HttpCall) { }
}
