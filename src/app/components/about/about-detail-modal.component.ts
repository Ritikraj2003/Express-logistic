import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-detail-modal',
  templateUrl: './about-detail-modal.component.html',
  styleUrls: ['./about-detail-modal.component.css']
})
export class AboutDetailModalComponent {
  @Input() title: string = 'Title';
  @Input() imageUrl: string = '';
  @Input() content: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.dismiss('Close clicked');
  }
}

