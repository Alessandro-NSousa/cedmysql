/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import TurmaDetailComponent from '@/entities/turma/turma-details.vue';
import TurmaClass from '@/entities/turma/turma-details.component';
import TurmaService from '@/entities/turma/turma.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Turma Management Detail Component', () => {
    let wrapper: Wrapper<TurmaClass>;
    let comp: TurmaClass;
    let turmaServiceStub: SinonStubbedInstance<TurmaService>;

    beforeEach(() => {
      turmaServiceStub = sinon.createStubInstance<TurmaService>(TurmaService);

      wrapper = shallowMount<TurmaClass>(TurmaDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { turmaService: () => turmaServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTurma = { id: 123 };
        turmaServiceStub.find.resolves(foundTurma);

        // WHEN
        comp.retrieveTurma(123);
        await comp.$nextTick();

        // THEN
        expect(comp.turma).toBe(foundTurma);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundTurma = { id: 123 };
        turmaServiceStub.find.resolves(foundTurma);

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
