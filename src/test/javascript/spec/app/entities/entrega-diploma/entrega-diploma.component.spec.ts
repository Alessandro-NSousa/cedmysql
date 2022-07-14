/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import EntregaDiplomaComponent from '@/entities/entrega-diploma/entrega-diploma.vue';
import EntregaDiplomaClass from '@/entities/entrega-diploma/entrega-diploma.component';
import EntregaDiplomaService from '@/entities/entrega-diploma/entrega-diploma.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('EntregaDiploma Management Component', () => {
    let wrapper: Wrapper<EntregaDiplomaClass>;
    let comp: EntregaDiplomaClass;
    let entregaDiplomaServiceStub: SinonStubbedInstance<EntregaDiplomaService>;

    beforeEach(() => {
      entregaDiplomaServiceStub = sinon.createStubInstance<EntregaDiplomaService>(EntregaDiplomaService);
      entregaDiplomaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EntregaDiplomaClass>(EntregaDiplomaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          entregaDiplomaService: () => entregaDiplomaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      entregaDiplomaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEntregaDiplomas();
      await comp.$nextTick();

      // THEN
      expect(entregaDiplomaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.entregaDiplomas[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      entregaDiplomaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(entregaDiplomaServiceStub.retrieve.callCount).toEqual(1);

      comp.removeEntregaDiploma();
      await comp.$nextTick();

      // THEN
      expect(entregaDiplomaServiceStub.delete.called).toBeTruthy();
      expect(entregaDiplomaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
