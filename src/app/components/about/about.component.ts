import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  currentTaglineIndex = 0;
  currentSlideIndex = 0;
  private taglineInterval: any;

  taglines = [
    {
      words: ['Delivering', 'Beyond', 'Boundaries'],
      subtitle: 'Reliable Air, Sea & Door-to-Door Logistics Worldwide.'
    },
    {
      words: ['Smarter', 'Logistics', 'for a Faster', 'Tomorrow'],
      subtitle: 'Optimizing Your Supply Chain with Precision & Care.'
    },
    {
      words: ['Your', 'Trusted', 'Freight &', 'Distribution Partner'],
      subtitle: 'Secure, Efficient & Cost-Effective Global Delivery.'
    },
    {
      words: ['End-to-End', 'Logistics,', 'Made Simple'],
      subtitle: 'One Partner. Complete Control. Zero Hassle.'
    },
    {
      words: ['On Time.', 'Every Time.'],
      subtitle: 'Your Cargo, Tracked & Delivered with Confidence.'
    }
  ];

  slides = [
    'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920',
    'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Auto-change taglines and images together every 5 seconds
    this.taglineInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.taglineInterval) {
      clearInterval(this.taglineInterval);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.currentTaglineIndex = (this.currentTaglineIndex + 1) % this.taglines.length;
  }

  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.currentTaglineIndex = (this.currentTaglineIndex - 1 + this.taglines.length) % this.taglines.length;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    // Sync tagline with slide (using modulo to handle different array lengths)
    this.currentTaglineIndex = index % this.taglines.length;
  }

  get currentTagline() {
    return this.taglines[this.currentTaglineIndex];
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

