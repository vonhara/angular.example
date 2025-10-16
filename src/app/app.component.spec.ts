import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]*/
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-example' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-example');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const toolbarText = 'Ohjelmistokehitysprosessin automatisointi -opintojakson harjoitusprojekti';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mat-toolbar span span')?.textContent).toContain(toolbarText);
  });
});
