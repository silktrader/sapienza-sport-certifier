import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { IData } from '../idata';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  nameGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
  });
  contactGroup = this._formBuilder.group({
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  saveData(): void {
    this.dataService.setData({
      ...this.nameGroup.value,
      ...this.contactGroup.value,
    });
  }
}
