import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

interface Slide {
  image: string;
  title: string;
  description: string;
  showText: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSlide = 0;
  private slideInterval: any;
  isAboutVisible = false;
  isServicesVisible = false;
  enquiryForm: FormGroup;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService
  ) {
    this.enquiryForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920',
      title: 'Express Logistics Solutions',
      description: '"Express Logistics Solutions" As An International Freight Forwarder And Global Providers Of Innovative And Fully Integrated Supply Chain Solutions.',
      showText: true
    },
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
      title: 'Global Shipping Network',
      description: 'Connecting businesses worldwide with reliable and efficient logistics solutions.',
      showText: false
    },
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
      title: 'Fast & Secure Delivery',
      description: 'Your cargo delivered safely and on time, anywhere in the world.',
      showText: false
    }
  ];

  ngOnInit(): void {
    // Initialize text visibility for first slide
    this.updateSlideText();
    // Start automatic sliding
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    // Set up scroll observer for About Us section
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  setupScrollObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === this.aboutSection?.nativeElement) {
            this.isAboutVisible = true;
          }
          if (entry.target === this.servicesSection?.nativeElement) {
            this.isServicesVisible = true;
          }
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the section is visible
    });

    if (this.aboutSection) {
      observer.observe(this.aboutSection.nativeElement);
    }

    if (this.servicesSection) {
      observer.observe(this.servicesSection.nativeElement);
    }
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlideText();
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlideText();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlideText();
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  updateSlideText(): void {
    // Hide text for all slides first
    this.slides.forEach(slide => slide.showText = false);
    // Show text only for current slide
    this.slides[this.currentSlide].showText = true;
  }

  onEnquirySubmit(): void {
    debugger;
    if (this.enquiryForm.valid) {
      console.log('Enquiry Form Data:', this.enquiryForm.value);
      // Show success notification
      this.notificationService.success(
        'Enquiry form submitted successfully!',
        'Success',
        5000
      );
      // Reset form after submission
      this.enquiryForm.reset();
    } else {
      console.log('Form is invalid');
      // Mark all required fields as touched
      Object.keys(this.enquiryForm.controls).forEach(key => {
        const control = this.enquiryForm.get(key);
        if (control?.hasError('required')) {
          control.markAsTouched();
        }
      });
    }
  }
}

