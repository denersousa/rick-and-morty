import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterModel, CharacterResponseModel } from '../../models/character.model';
import { InfoModel } from '../../../shared/models/Information.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../../search/search.service';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss']
})
export class ListCharacterComponent implements OnInit {
  public infoCharacter: InfoModel = {count: 0, pages: 0, next: '', prev: ''}
  public filteredCharacter: CharacterModel[] = [];
  public allCharacter: CharacterModel[] = [];
  public loadingNextPage: boolean = false;
  public searchTerm: string = '';
  public searchForm!: FormGroup;

  constructor(
    private characterService: CharacterService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,

  ) {
    this.searchForm = this.formBuilder.group({
    searchTerm: ['']
    });
  }

  ngOnInit() {
    this.characterService.getAllCharacters().subscribe((res: CharacterResponseModel) =>  {
      this.infoCharacter = res.info;
      this.filteredCharacter = res.results;
      this.allCharacter = res.results;
    });

    this.searchForm.get('searchTerm')?.valueChanges.subscribe(() => {
      this.onSearch();
    });

    this.searchService.currentSearchTerm.subscribe(term => {
      if (term !== null && term !== undefined) {
        this.searchForm.get('searchTerm')?.setValue(term, { emitEvent: false });
        this.onSearch();
      }
    });
  }

  onScrollDown() {
    if (!this.loadingNextPage && this.infoCharacter.next) {
      this.loadingNextPage = true;
      this.characterService.getNextPage(this.infoCharacter.next).subscribe((res: CharacterResponseModel) => {
        this.filteredCharacter = this.filteredCharacter.concat(res.results);
        this.loadingNextPage = false;
        this.infoCharacter.next = res.info.next;

      console.log(res.info)
      });
    }
  }

  onSearch() {
    if (this.searchForm) {
      const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase()?.trim();
      if (searchTerm) {
        this.characterService.filter(searchTerm).subscribe((res: CharacterResponseModel) => {
          this.filteredCharacter = res.results;
        });
      }else {
        this.filteredCharacter = this.allCharacter.slice();
      }
    }
  }
}
