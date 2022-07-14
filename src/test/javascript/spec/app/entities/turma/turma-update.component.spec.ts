/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TurmaUpdateComponent from '@/entities/turma/turma-update.vue';
import TurmaClass from '@/entities/turma/turma-update.component';
import TurmaService from '@/entities/turma/turma.service';

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
  describe('Turma Management Update Component', () => {
    let wrapper: Wrapper<TurmaClass>;
    let comp: TurmaClass;
    let turmaServiceStub: SinonStubbedInstance<TurmaService>;

    beforeEach(() => {
      turmaServiceStub = sinon.createStubInstance<TurmaService>(TurmaService);

      wrapper = shallowMount<TurmaClass>(TurmaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          turmaService: () => turmaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.turma = entity;
        turmaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(turmaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.turma = entity;
        turmaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(turmaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTurma = { id: 123 };
        turmaServiceStub.find.resolves(foundTurma);
        turmaServiceStub.retrieve.resolves([foundTurma]);

        // WHEN
        comp.beforeRouteEnter({ params: { turmaId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.turma).toBe(foundTurma);
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
