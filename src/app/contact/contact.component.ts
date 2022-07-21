import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSending: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      subject: '',
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async submit() {
    if (this.contactForm.invalid) {
      let button = document.getElementById('submit-btn');
      if (!button?.classList.contains('disabled')) {
        this.errorToast('All required fields must be completed');
      }
      if (!button?.classList.contains('animate')) {
        button?.classList.add('animate');
        setTimeout(() => {
          button?.classList.remove('animate');
        }, 750);
      }

      return;
    }
    this.isSending = true;
    let contactForm = JSON.parse(JSON.stringify(this.contactForm.value));
    if (this.contactForm.get('subject')?.value === '') {
      delete contactForm.subject;
    }
    if (this.contactForm.get('name')?.value === '') {
      delete contactForm.name;
    }

    try {
      let response = await this.sendMail(contactForm);
      if (response.ok) {
        this.successToast();
        this.isSending = false;
        return;
      } else {
        this.isSending = false;
        this.errorToast();
      }
    } catch (error) {
      this.isSending = false;
      this.errorToast('Backend unreachable.');
    }
  }

  sendMail(contactForm) {
    return fetch('https://portfolio-backend.inovaperf.me/sendmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactForm),
    });
  }

  successToast(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Message sent',
      detail: 'Your message has been successfully sent!',
    });
  }

  errorToast(detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail || 'There was an error when submitting the contact form',
    });
  }

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }
}
