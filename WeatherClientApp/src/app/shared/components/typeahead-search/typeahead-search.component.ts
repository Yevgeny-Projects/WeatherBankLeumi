import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-typeahead-search',
  templateUrl: './typeahead-search.component.html',
  styleUrls: ['./typeahead-search.component.scss']
})
export class TypeaheadSearchComponent implements OnInit {
  @Input() searchDataSource: Array<any>;
  @Input() placeholder: string;
  
  @Output() userSelectedResult: EventEmitter<object>;
  @Output() closeSearchEvent: EventEmitter<boolean>;

  @ViewChild('filterInput', {static: false}) public userInput: ElementRef;
  @ViewChild('filterList', {static: false}) public filterList: ElementRef;
  resultDataList: Array<any>;

  constructor() {
    this.userSelectedResult = new EventEmitter<object>();
    this.closeSearchEvent = new EventEmitter<boolean>();
  }

  ngOnInit() {
    setTimeout(() => {
      const userInputHTMLElement: HTMLElement = this.userInput.nativeElement;
      userInputHTMLElement.focus();
    });
  }

  searchQueryOnDataSource($event): void {
    if ($event.target.value.length >= 2) {
      this.resultDataList = [];

      this.enableSearch().then((dataSource) => {
        this.doQuerySearch(dataSource, $event.target.value);
      });
    } else {
      setTimeout(() => {
        const filterListHTMLElement: HTMLElement = this.filterList.nativeElement;
        filterListHTMLElement.style.backgroundColor = 'transparent';
      });

      this.resultDataList = [];
    }
  }

  enableSearch(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.searchDataSource.map(item => Object.assign({}, item)));
    });
  }

  private doQuerySearch(dataArray: Array<any>, queryString: string): void {
    setTimeout(() => {
      const filterListHTMLElement: HTMLElement = this.filterList.nativeElement;
      filterListHTMLElement.style.backgroundColor = '#fff';
    });

    for (const element of dataArray) {
      const feature = element;
      if (feature.name.toLowerCase().search(queryString.toLowerCase()) !== -1) {
        this.resultDataList.push(feature);
      }
    }

    if (this.resultDataList.length === 0) {
      const feature = {
        name:  'No results found for ' + queryString + '. Please enter a different search criteria.'
      };
      this.resultDataList.push(feature);
    }

    for (const element of this.resultDataList) {
      const feature = element;
      const regex = new RegExp( '(' + queryString + ')', 'gi' );
      let updatedText: string;
      if (this.resultDataList.length > 0) {
        updatedText = feature.name.replace(regex, '<strong>' + queryString + '</strong>');
      }
      feature.originalText = feature.name;
      feature.name = updatedText;
    }
  }

  selectedResult(result: any): void {
    this.userInput.nativeElement.value = result.originalText;
    this.userSelectedResult.emit({
      target: (result || null)
    });

    this.resultDataList = [];
  }

  closeSearch(): void {
    this.closeSearchEvent.emit(true);
  }
}
