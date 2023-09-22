import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;

  /*
   *
   * adding unsubscribe for better memory and network utilization
   * 
   */
  private addCategorySubscription?: Subscription

  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandler: '',
    }
  }


  onFormSubmit() {

    this.addCategorySubscription = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log("Success: ", response);
        },
        error: (response) => {
          console.log("Error: ", response);

        }
      });

  }

  // Unsubscribe 
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
