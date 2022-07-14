/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import EntregaDiplomaUpdateComponent from '@/entities/entrega-diploma/entrega-diploma-update.vue';
import EntregaDiplomaClass from '@/entities/entrega-diploma/entrega-diploma-update.component';
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
  describe('EntregaDiploma Management Update Component', () => {
    let wrapper: Wrapper<EntregaDiplomaClass>;
    let comp: EntregaDiplomaClass;
    let entregaDiplomaServiceStub: SinonStubbedInstance<EntregaDiplomaService>;

    beforeEach(() => {
      entregaDiplomaServiceStub = sinon.createStubInstance<EntregaDiplomaService>(EntregaDiplomaService);

      wrapper = shallowMount<EntregaDiplomaClass>(EntregaDiplomaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          entregaDiplomaService: () => entregaDiplomaServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.entregaDiploma = entity;
        entregaDiplomaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entregaDiplomaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.entregaDiploma = entity;
        entregaDiplomaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entregaDiplomaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundEntregaDiploma = { id: 123 };
        entregaDiplomaServiceStub.find.resolves(foundEntregaDiploma);
        entregaDiplomaServiceStub.retrieve.resolves([foundEntregaDiploma]);

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
