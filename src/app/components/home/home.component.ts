import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { EmailService } from '../../services/email.service';

interface Slide {
  image: string;
  title: string;
  description: string;
  showText: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSlide = 0;
  currentTestimonial = 0;
  currentAboutSlideIndex = 0;
  private slideInterval: any;
  private testimonialInterval: any;
  private aboutSlideInterval: any;
  isAboutVisible = false;
  isServicesVisible = false;
  enquiryForm: FormGroup;
  enquiryLoading = false;
  enquirySubmitted = false;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('servicesSection') servicesSection!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private emailService: EmailService
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
      image: 'assets/Image/Homepage01.jpg',
      title: ' UXB Express West UK LTD',
      description: '"UXB Express West UK LTD" As An International Freight Forwarder And Global Providers Of Innovative And Fully Integrated Supply Chain Solutions.',
      showText: true
    },
    {
      image: 'assets/Image/Homepage02.jpg',
      title: 'Global Shipping Network',
      description: 'Connecting businesses worldwide with reliable and efficient logistics solutions.',
      showText: false
    },
    {
      image: 'assets/Image/Homepage03.jpg',
      title: 'Fast & Secure Delivery',
      description: 'Your cargo delivered safely and on time, anywhere in the world.',
      showText: false
    }
  ];

  testimonials: Testimonial[] = [
    {
      quote: ' UXB Express West UK LTD has streamlined our entire supply chain. Fast, efficient, and reliable — saved us weeks on lead time.',
      author: 'John M., Operations Director, UK Manufacturing',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces'
    },
    {
      quote: 'Outstanding service from start to finish. Their door-to-door freight solution made our international shipping hassle-free.',
      author: 'Sarah K., Supply Chain Manager, Global Retail',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces'
    },
    {
      quote: 'Professional team with excellent communication. Our air freight shipments always arrive on time and in perfect condition.',
      author: 'Michael R., CEO, Tech Solutions Inc.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces'
    }
  ];

  aboutSlides = [
    'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920',
    'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920'
  ];

  faqs: FAQ[] = [
    {
      question: 'What types of freight services do you offer?',
      answer: 'We offer comprehensive freight solutions including Air Freight, Sea Freight (FCL & LCL), and Door-to-Door Freight Services. Our services cover everything from airport-to-airport shipping to complete end-to-end logistics management.',
      isOpen: false
    },
    {
      question: 'How can I track my shipment?',
      answer: 'You can track your shipment using our online tracking system. Simply enter your tracking number on our Tracking page, and you\'ll get real-time updates on your shipment\'s status, location, and estimated delivery time.',
      isOpen: false
    },
    {
      question: 'What is the difference between FCL and LCL shipping?',
      answer: 'FCL (Full Container Load) is when you book an entire container for your shipment, ideal for large volumes. LCL (Less than Container Load) allows you to share container space with other shippers, making it cost-effective for smaller shipments. We offer both options to suit your needs.',
      isOpen: false
    },
    {
      question: 'Do you handle customs clearance?',
      answer: 'Yes, we provide comprehensive customs clearance services for both import and export shipments. Our experienced team handles all documentation, duty payments, and regulatory compliance to ensure smooth customs processing.',
      isOpen: false
    },
    {
      question: 'What are your shipping rates?',
      answer: 'Shipping rates vary based on factors such as origin, destination, weight, dimensions, service type, and urgency. We provide competitive, transparent pricing. Please contact us with your shipment details for an accurate quote tailored to your specific requirements.',
      isOpen: false
    },
    {
      question: 'How long does international shipping typically take?',
      answer: 'Shipping times depend on the service type and destination. Air freight typically takes 3-7 business days, while sea freight can take 15-45 days depending on the route. Our door-to-door service includes all handling, which may add a few days for customs clearance. We provide estimated delivery times when you book your shipment.',
      isOpen: false
    },
    {
      question: 'Do you provide insurance for shipments?',
      answer: 'Yes, we offer cargo insurance options to protect your shipments against loss, damage, or theft during transit. We recommend insurance for high-value cargo. Our team can help you choose the appropriate coverage level for your shipment.',
      isOpen: false
    },
    {
      question: 'Can you handle specialized cargo like vehicles or machinery?',
      answer: 'Absolutely. We specialize in handling specialized cargo including vehicles, motorcycles, heavy machinery, and industrial equipment. We have experience with various cargo types and provide appropriate packaging, handling, and transportation solutions.',
      isOpen: false
    }
  ];

  ngOnInit(): void {
    // Initialize text visibility for first slide
    this.updateSlideText();
    // Start automatic sliding
    this.startAutoSlide();
    // Start automatic testimonial rotation
    this.startAutoTestimonial();
    // Start automatic about section slider
    this.startAboutSlider();
  }

  ngAfterViewInit(): void {
    // Set up scroll observer for About Us section
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    // Clear intervals when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
    if (this.aboutSlideInterval) {
      clearInterval(this.aboutSlideInterval);
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

  startAutoTestimonial(): void {
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
  }

  stopAutoTestimonial(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentTestimonial = index;
    this.stopAutoTestimonial();
    this.startAutoTestimonial();
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  startAboutSlider(): void {
    this.aboutSlideInterval = setInterval(() => {
      this.nextAboutSlide();
    }, 4000); // Change slide every 4 seconds
  }

  nextAboutSlide(): void {
    this.currentAboutSlideIndex = (this.currentAboutSlideIndex + 1) % this.aboutSlides.length;
  }

  prevAboutSlide(): void {
    this.currentAboutSlideIndex = (this.currentAboutSlideIndex - 1 + this.aboutSlides.length) % this.aboutSlides.length;
  }

  goToAboutSlide(index: number): void {
    this.currentAboutSlideIndex = index;
  }

  onEnquirySubmit(): void {
    if (this.enquiryForm.valid) {
      this.enquiryLoading = true;
      const formValue = this.enquiryForm.value;
      
      this.emailService.sendEmail({
        name: formValue.name || '',
        email: formValue.email || '',
        phone: formValue.phone,
        subject: formValue.subject,
        message: formValue.message
      })
      .then(() => {
        this.enquirySubmitted = true;
        this.enquiryForm.reset();
        this.enquiryLoading = false;
        // Show success notification
        this.notificationService.success(
          'Enquiry form submitted successfully!',
          'Success',
          5000
        );
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.enquirySubmitted = false;
        }, 3000);
      })
      .catch((error) => {
        this.enquiryLoading = false;
        // Show error notification
        this.notificationService.error(
          'Failed to send enquiry. Please try again.',
          'Error',
          5000
        );
      });
    } else {
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

