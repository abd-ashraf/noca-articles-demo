import { Component, EventEmitter, Output } from '@angular/core';
import { ArticleFilter } from '../../../models/article-filter.model';

@Component({
  selector: 'app-articles-filter-bar',
  standalone: false,
  templateUrl: './articles-filter-bar.component.html',
  styleUrls: ['./articles-filter-bar.component.scss'],
})
export class ArticlesFilterBarComponent {
  @Output() filterChanged = new EventEmitter<ArticleFilter>();

  articleCategories = ['Hub', 'Crank arm'];
  bicycleCategories = ['e-Cargo bike', 'Road', 'Gravel', 'e-Gravel', 'e-Trekking', 'e-City', 'e-Trekking', 'Foldable'];
  materials = ['Aluminium', 'Steel', 'Alloy', 'Carbon', 'Nickel'];

  filter: ArticleFilter = {};

  apply() {
    this.filterChanged.emit({ ...this.filter });
  }

  clear() {
    this.filter = {};
    this.filterChanged.emit(this.filter);
  }
}
