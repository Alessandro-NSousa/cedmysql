/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProcessoUpdateComponent from '@/entities/processo/processo-update.vue';
import ProcessoClass from '@/entities/processo/processo-update.component';
import ProcessoService from '@/entities/processo/processo.service';

import TurmaService from '@/entities/turma/turma.service';

import EntregaDiplomaService from '@/entities/entrega-diploma/entrega-diploma.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Processo Management Update Component', () => {
    let wrapper: Wrapper<ProcessoClass>;
    let comp: ProcessoClass;
    let processoServiceStub: SinonStubbedInstance<ProcessoService>;

    beforeEach(() => {
      processoServiceStub = sinon.createStubInstance<ProcessoService>(ProcessoService);

      wrapper = shallowMount<ProcessoClass>(ProcessoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          processoService: () => processoServiceStub,
          alertService: () => new AlertService(),

          turmaService: () =>
            sinon.createStubInstance<TurmaService>(TurmaService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          entregaDiplomaService: () =>
            sinon.createStubInstance<EntregaDiplomaService>(EntregaDiplomaService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.processo = entity;
        processoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(processoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.processo = entity;
        processoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(processoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundProcesso = { id: 123 };
        processoServiceStub.find.resolves(foundProcesso);
        processoServiceStub.retrieve.resolves([foundProcesso]);

        // WHEN
        comp.beforeRouteEnter({ params: { processoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.processo).toBe(foundProcesso);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
