import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ApiService } from './api.service';

interface Doctor {
  name: string;
  specialty: string;
  available: string;
}

interface AnalysisResult {
  specialistSuggestion: string;
  urgency: string;
  userFriendlyMessage:string;
  doctors: Doctor[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  symptoms = '';
  result?: AnalysisResult;

  constructor(private apiService:ApiService) {}

  analyze() {
    if (!this.symptoms.trim()) return;
    this.apiService.getAiResponse(this.symptoms).subscribe((res)=>{
      this.result = res
    })
    
  }
}
