import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController, } from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";
import { CategoryService } from '../../services/category.service'
/*
describe('categoryService', () => {

  let mockCategoryService : any;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          CategoryService
            // {provide: CategoryService, useValue: mockCategoryService},
            // {provide: LoggingService, useValue: mockLoggingService}
        ],
        imports: [
            HttpClientModule,
            HttpClientTestingModule,
        ]
    });
  });

  describe('getCategories', () => {

    it('should return a promise containing a list of categories', 
      async(inject([CategoryService, HttpTestingController], (categoryService, backend: HttpTestingController) => {

        //setup stubs
        let stubCategoryId = 1;
        let stubResponse = {
          "body": {
            "statusCode": 200,
            "body": {
              "category_id":"7",
              "category_name":"Broth"
            }
          }
        };
        
        let expectedResponse = stubResponse.body.body;

        let url = "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/categories/read_categories.php";
        spyOn(categoryService.http, "get").and.callThrough();

        //call function under test
        categoryService.readCategories()
        .then(response => {
            // Assert
            expect(categoryService.http.get).toHaveBeenCalled();
            expect(response.statusCode).toEqual(200);

            expect(response).toEqual(expectedResponse);
        });
        
        backend.match({
          url: url,
          method: 'GET'
        })[0].flush(stubResponse);

      })))
  });

});
*/

/*
describe('CategoryService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CategoryService,
        { 
          provide: XHRBackend, 
          useClass: MockBackend 
        },
      ]
    });
  });

  describe('readCategories()', () => {

    it('should return a Promise of Categories',
        inject([CategoryService, XHRBackend], (categoryService, mockBackend) => {

        const mockResponse = {
          data: [
            { category_id: 1, category_name: "starter" },
            { category_id: 2, category_name: "Curry" },
            { category_id: 3, category_name: "Pasta" },
            { category_id: 4, category_name: "Meat" },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        categoryService.readCategories().then((categories) => {
          expect(categories.length).toBe(4);
          expect(categories[0].category_name).toEqual('Starter');
          expect(categories[1].category_name).toEqual('Curry');
          expect(categories[2].category_name).toEqual('Pasta');
          expect(categories[3].category_name).toEqual('Meat');
        });

    }));
  });
});
*/

/*
import { fakeAsync, async, ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';
import { JsonpModule, Jsonp, BaseRequestOptions, BaseResponseOptions, Response, ResponseOptions, Http, HttpModule, XHRBackend  } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { MockBackend, MockConnection } from "@angular/http/testing";

import { CategoryService } from '../../services/category.service';
*/

/*
describe('Service: CategoryService', () => {
  
  let mockBackend: MockBackend;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //imports: [JsonpModule],
      imports: [HttpModule],
      providers: [
        CategoryService,
        MockBackend,
        BaseRequestOptions,
        {
          //provide: Jsonp,
          provide: XHRBackend, useClass: MockBackend,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: Http,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    });
    mockBackend = TestBed.get(MockBackend);
    service = TestBed.get(CategoryService);
  });

  describe('readCategories()', () => {

    it('should return CategoryItems', fakeAsync(() => {
      let fakeResponse = {
        "resultCount": 8,
        "results": [
          {
            "category_id": 1,
            "category_name": "Starter"
          }
          ,
          {
            "category_id": 2,
            "category_name": "Curry"
          },
          {
            "category_id": 3,
            "category_name": "Pasta"
          },
          {
            "category_id": 4,
            "category_name": "Meat"
          },
          {
            "category_id": 5,
            "category_name": "Fish"
          },
          {
            "category_id": 6,
            "category_name": "Soup"
          },
          {
            "category_id": 7,
            "category_name": "Broth"
          },
          {
            "category_id": 8,
            "category_name": "Desert"
          }
        ]
      };

      const mockResponse = {
        data: [
          { 
            category_id: 1,
            category_name: "starter"
          },
          { 
            category_id: 2,
            category_name: "Curry"
          },
          { 
            category_id: 3,
            category_name: "Pasta"
          },
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });




      mockBackend.connections.subscribe((conn:MockConnection) => {
        conn.mockRespond(new Response(<ResponseOptions>
          {
            body: JSON.stringify(fakeResponse)
          }));
      });

      service.readCategories().then((data) => {
        expect(data.length).toBe(8);
        //expect(service.results[0].category_name).toBe("starter");
        tick();
    
      //expect(service.readCategories.length).toBe(8);
      //expect(service.results[0].name).toBe("Starter");

      })

    }))
  })
})
*/
