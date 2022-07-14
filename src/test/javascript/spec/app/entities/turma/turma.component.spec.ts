/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TurmaComponent from '@/entities/turma/turma.vue';
import TurmaClass from '@/entities/turma/turma.component';
import TurmaService from '@/entities/turma/turma.service';
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
  describe('Turma Management Component', () => {
    let wrapper: Wrapper<TurmaClass>;
    let comp: TurmaClass;
    let turmaServiceStub: SinonStubbedInstance<TurmaService>;

    beforeEach(() => {
      turmaServiceStub = sinon.createStubInstance<TurmaService>(TurmaService);
      turmaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TurmaClass>(TurmaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          turmaService: () => turmaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      turmaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTurmas();
      await comp.$nextTick();

      // THEN
      expect(turmaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.turmas[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      turmaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(turmaServiceStub.retrieve.callCount).toEqual(1);

      comp.removeTurma();
      await comp.$nextTick();

      // THEN
      expect(turmaServiceStub.delete.called).toBeTruthy();
      expect(turmaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
