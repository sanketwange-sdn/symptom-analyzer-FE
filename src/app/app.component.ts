import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';
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
  isLoading = false;
  @ViewChild('resultSection') resultSection?: ElementRef;
  constructor(private apiService: ApiService) {}

  analyze() {
    if (!this.symptoms.trim()) return;
    this.isLoading = true;
    this.result = undefined; // Clear previous result
    this.apiService.getAiResponse(this.symptoms).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
        setTimeout(() => {  // Add this setTimeout to delay until after view update
        if (this.resultSection) {
          this.resultSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
      },
      error: () => {
        this.isLoading = false;
        // Handle error if needed, e.g., alert('Error analyzing symptoms');
      }
    });
  }
}
