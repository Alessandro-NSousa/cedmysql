/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import EntregaDiplomaDetailComponent from '@/entities/entrega-diploma/entrega-diploma-details.vue';
import EntregaDiplomaClass from '@/entities/entrega-diploma/entrega-diploma-details.component';
import EntregaDiplomaService from '@/entities/entrega-diploma/entrega-diploma.service';
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
  describe('EntregaDiploma Management Detail Component', () => {
    let wrapper: Wrapper<EntregaDiplomaClass>;
    let comp: EntregaDiplomaClass;
    let entregaDiplomaServiceStub: SinonStubbedInstance<EntregaDiplomaService>;

    beforeEach(() => {
      entregaDiplomaServiceStub = sinon.createStubInstance<EntregaDiplomaService>(EntregaDiplomaService);

      wrapper = shallowMount<EntregaDiplomaClass>(EntregaDiplomaDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { entregaDiplomaService: () => entregaDiplomaServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEntregaDiploma = { id: 123 };
        entregaDiplomaServiceStub.find.resolves(foundEntregaDiploma);

        // WHEN
        comp.retrieveEntregaDiploma(123);
        await comp.$nextTick();

        // THEN
        expect(comp.entregaDiploma).toBe(foundEntregaDiploma);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEntregaDiploma = { id: 123 };
        entregaDiplomaServiceStub.find.resolves(foundEntregaDiploma);

        // WHEN
        comp.beforeRouteEnter({ params: { entregaDiplomaId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.entregaDiploma).toBe(foundEntregaDiploma);
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
