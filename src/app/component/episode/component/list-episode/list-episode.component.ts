import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeModel, EpisodeResponseModel } from '../../models/episode.model';
import { EpisodeService } from '../../services/episode.service';
import { InfoModel } from '../../../shared/models/Information.model';
import { SearchService } from '../../../search/search.service';

@Component({
  selector: 'app-list-episode',
  templateUrl: './list-episode.component.html',
  styleUrls: ['./list-episode.component.scss']
})
export class ListEpisodeComponent implements OnInit {
  public filteredEpisodes: EpisodeModel[] = [];
  public allEpisodes: EpisodeModel[] = [];
  public searchTerm: string = '';
  public searchForm!: FormGroup;
  public infoEpisodes: InfoModel = { count: 0, pages: 0, next: '', prev: '' };
  public loadingNextPage: boolean = false;


  constructor(
    private episodeService: EpisodeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.getAllepisodes();

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

  getAllepisodes() {
    this.episodeService.getAllEpisodes().subscribe((res: EpisodeResponseModel) => {
      if (res && res.results) {
        this.filteredEpisodes = res.results;
        this.allEpisodes = res.results;
        this.infoEpisodes = res.info;
      }
    });
  }

  onScrollDown() {
    if (!this.loadingNextPage && this.infoEpisodes.next) {
      this.loadingNextPage = true;
      this.episodeService.getNextPage(this.infoEpisodes.next).subscribe((res: EpisodeResponseModel) => {
        this.filteredEpisodes = this.filteredEpisodes.concat(res.results); // Atualizar também a lista filtrada
        this.infoEpisodes.next = res.info.next;
        this.loadingNextPage = false;
      });
    }
  }

  onSearch() {
    if (this.searchForm) {
      const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase()?.trim();
      if (searchTerm) {
        this.episodeService.filter(searchTerm).subscribe((res: EpisodeResponseModel) => {
          this.filteredEpisodes = res.results;
        });
      } else {
        this.filteredEpisodes = this.allEpisodes.slice();
      }
    }
  }

  infoEpisodeGo(dados: EpisodeModel) {
    this.router.navigate(['/detalhe-episode'], { state: dados });
  }
}
