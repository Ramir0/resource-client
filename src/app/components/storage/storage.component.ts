import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from 'src/app/models/storage';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

const STORAGE_URL = environment.storage_url;
const STORAGE_URI = '/storages'

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  isCreateModalOpen = false;
  isDeleteConfirmationOpen = false;
  selectedStorage: Storage|null = null;
  storageList: Storage[] = [];
  newStorage: Storage = {
    id: NaN,
    bucket: '',
    path: '',
    storageType: ''
  };

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.fetchStorages().subscribe({
      next: (data) => {
        this.storageList = data;
      },
      error: (err) => this.toastr.error('An error occurred while fetching the list of Storages.', 'Error')
    });
  }

  public fetchStorages(): Observable<Storage[]> {
    return this.httpClient.get<Storage[]>(STORAGE_URL + STORAGE_URI);
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newStorage = {
      id: NaN,
      bucket: '',
      path: '',
      storageType: ''
    };
  }

  createStorage() {
    this.httpClient.post<Storage>(STORAGE_URL + STORAGE_URI, this.newStorage)
      .subscribe({
        next: (savedStorage) => {
          this.toastr.success('Storage with Id: ' + savedStorage.id + ' was created successfully', 'Storage Created');
          this.storageList.push(savedStorage);
          this.closeCreateModal();
        },
        error: (err) => {
          if (err.status === 403) {
            this.toastr.error('Invalid operation. You do not have permission to perform this action.', 'Error');
          } else {
            this.toastr.error('An error occurred while creating the storage.', 'Error');
          }
        }
      });
  }

  editStorage(storage: Storage) {
    console.log("TODO: implement edit feature. storageId:", storage.id);
    this.selectedStorage = null;
  }

  confirmDeleteStorage(storage: Storage) {
    this.selectedStorage = storage;
    this.isDeleteConfirmationOpen = true;
  }

  cancelDeleteStorage() {
    this.selectedStorage = null;
    this.isDeleteConfirmationOpen = false;
  }

  deleteStorage() {
    const storageId = this.selectedStorage?.id;
    this.httpClient.delete(STORAGE_URL + STORAGE_URI + "?id=" + this.selectedStorage?.id)
      .subscribe({
        next: (response) => {
          this.toastr.info('Storage with Id: ' + storageId + ' was deleted successfully', 'Storage Deleted');
          this.storageList = this.storageList.filter(storage => storage.id !== storageId);
        },
        error: (err) => {
          if (err.status === 403) {
            this.toastr.error('Invalid operation. You do not have permission to perform this action.', 'Error');
          } else {
            this.toastr.error('An error occurred while deleting the storage.', 'Error');
          }
        }
      });
    this.selectedStorage = null;
    this.isDeleteConfirmationOpen = false;
  }
}
