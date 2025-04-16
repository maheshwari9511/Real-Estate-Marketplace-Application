import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListingsService } from './listings.service';
import { ApiResponse } from '../models/apiResponse';
import { Listing } from '../models/listing';
import { MessageService } from './message.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let httpMock: HttpTestingController;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['showAlert']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ListingsService,
        { provide: MessageService, useValue: messageServiceSpy }
      ],
    });
    service = TestBed.inject(ListingsService);
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a property', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: 'Property added', listings: [] };
    const newListing: Listing = { id: 1, imageUrls: [], name: 'New Property', description: 'Description', address: 'Address', bedrooms: 2, bathrooms: 1, price: 100000, parking: true, furnished: false, userId: '1' };

    service.addProperty(newListing).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should delete a property', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: 'Property deleted', listings: [] };
    const propertyId = 1;

    service.deleteProperty(propertyId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/delete/${propertyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should update a property', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: 'Property updated', listings: [] };
    const updatedListing: Listing = { id: 1, imageUrls: [], name: 'Updated Property', description: 'Updated Description', address: 'Updated Address', bedrooms: 3, bathrooms: 2, price: 120000, parking: true, furnished: true, userId: '1' };

    service.updateProperty(updatedListing).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/update/${updatedListing.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should get a property', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: '', listings: [] };
    const propertyId = 1;

    service.getProperty(propertyId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/get/${propertyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get properties', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: '', listings: [] };
    const filter = 'searchTerm=&limit=3';

    service.getProperties(filter).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/get?${filter}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should load listings', () => {
    const mockResponse: ApiResponse = { success: true, user: { id: 1, username: 'testUser', email: 'test@example.com' }, message: '', listings: [] };

    service.loadListings();

    const req = httpMock.expectOne(`${service['baseUrl']}/get?searchTerm=&limit=3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
