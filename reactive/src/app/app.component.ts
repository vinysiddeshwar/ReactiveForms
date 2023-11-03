import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


interface CustomField {
  id: number;
  parent_field_id: number;
  field_name: string;
  field_header: string;
  field_type: number;
  is_mandatory: string;
  error_message: string;
  type: string;
  src_module: number;
  on_change: string; 
  on_click: string; 
  default_show: number;
  show_on: number;
  entry_type: string;
  module_id: number;
  display_order: number;
  data_src:string;
  status:number;
  is_indexing:number;
  tooltip_type:string;
  tooltip_title:string;
  tooltip_content :string;
  tootip_activation: string; 
  short_link :number;
  field_indexing_id : number; 
  short_link_enabled : number
  created_by : number; 
  created_date :Date;
  modified_by : number; 
  modified_date  :Date;
  company_id : number; 
  branch_id : number; 
  folder_flag: number; 
  field_width :string;
  revision_no : number; 
  amendment_no : number; 
  action :string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'reactive';

  addCompanyForm!: FormGroup;
  customFields: CustomField[]=[];
  dataToRender!: any[] ;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getCustomFields();
  }

  getCustomFields() {
    this.httpClient.get<CustomField[]>('http://localhost:8080/customField/'+112).subscribe(
      (data) => {
        this.customFields = data;
        this.buildAddCompanyForm();
      }
    );
  }

  buildAddCompanyForm() {
    this.addCompanyForm = this.formBuilder.group({ });
    //Dynamically create form controls based on the received data
    const keys = Object.keys(this.customFields[0]) as Array<keyof typeof this.customFields[0]>;
    this.dataToRender = keys;
    // console.log(keys);
      keys.forEach((key)=>{
        this.addCompanyForm.addControl(
          key, // Use the field name or identifier from the API data
          this.formBuilder.control(
           null, // Set initial value if available
          )          
        );
      });

    }
  

  onSubmit() {
    // printing company details
    if (this.addCompanyForm.valid) {
      const formData = this.addCompanyForm.value;
      console.log(formData)
    }
  }

  typeOfValue(value: any)
  {
    return typeof value;
  }

}
function createValidators(controlData: any, any: any) {
  throw new Error('Function not implemented.');
}

