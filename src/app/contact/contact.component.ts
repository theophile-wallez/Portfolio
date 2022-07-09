import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder) {}
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      subject: '',
      message: ['', [Validators.required]],
    });
  }

  submit() {}

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }
}
