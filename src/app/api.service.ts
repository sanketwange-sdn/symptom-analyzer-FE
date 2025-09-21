import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  // private readonly getAiResponseUrl = 'https://localhost:8080/api/AISymptomsMapping';
  private readonly getAiResponseUrl = 'https://sankets-symptom-to-specialist.up.railway.app/api/AISymptomsMapping';


public getAiResponse(symptoms: any): Observable<any> {
  return this.http.post<any>(`${this.getAiResponseUrl}?symptoms=${encodeURIComponent(symptoms)}`, {});
}
}
