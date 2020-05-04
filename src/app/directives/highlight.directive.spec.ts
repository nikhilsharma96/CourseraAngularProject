import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let elRefMock = {
    nativeElement: document.createElement('div')
  };
  
  // let rendm={
  //   rendere:addClass() 
  // }
  const rendererMock = jasmine.createSpyObj('rendererMock', ['addClass','removeClass']); 

  it('should create an instance', () => {
    const directive = new HighlightDirective(elRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
