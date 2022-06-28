import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css'],
})
export class ShowInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>;
  inspectionTypeList$!: Observable<any[]>;
  inspectionTypeList: any = [];

  //Map to display data associate with FK
  inspectionTypeMap: Map<number, string> = new Map();
  constructor(private service: InspectionApiService) {}

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();
    this.refreshInspectionTypesMap();
  }
  //Variable(pro)
  modalTitle: string = "";
  activeAddEditInspectionComponent: boolean = false;
  inspection: any;

  modalAdd() {
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId: null
    }
    this.modalTitle = "Add Inspection";
    this.activeAddEditInspectionComponent = true;
  }

  modalClose() {
    this.activeAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
  }
  refreshInspectionTypesMap() {
    this.service.getInspectionTypeList().subscribe((data) => {
      this.inspectionTypeList = data;
      for (let i = 0; i < data.length; i++) {
        this.inspectionTypeMap.set(
          this.inspectionTypeList[i].id,
          this.inspectionTypeList[i].inspectionName
        );
      }
    });
  }
}
