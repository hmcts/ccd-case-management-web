import { ConditionalShowDirective } from './conditional-show.directive';
import { ConditionalShowRegistrarService } from './conditional-show-registrar.service';
import { async } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

let registrarService: ConditionalShowRegistrarService;
let conditionalShowDirective1: any;
let conditionalShowDirective2: any;

describe('ConditionalShowRegistrarService', () => {

  beforeEach( async(() => {
    registrarService = new ConditionalShowRegistrarService();
    conditionalShowDirective1 = createSpyObj<ConditionalShowDirective>('conditionalShowDirective1', ['refreshVisibility']);
    conditionalShowDirective2 = createSpyObj<ConditionalShowDirective>('conditionalShowDirective2', ['refreshVisibility']);
  }));

  it('should register', () => {
    registrarService.register(conditionalShowDirective1);
    registrarService.register(conditionalShowDirective2);
    expect(registrarService.registeredDirectives.length).toEqual(2);
  });

  it('should refresh visibility of registered directives', () => {
    registrarService.register(conditionalShowDirective1);
    registrarService.register(conditionalShowDirective2);
    registrarService.refresh();
    expect(conditionalShowDirective1.refreshVisibility).toHaveBeenCalled();
    expect(conditionalShowDirective2.refreshVisibility).toHaveBeenCalled();
  });

});
