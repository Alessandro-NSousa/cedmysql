import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Processo = () => import('@/entities/processo/processo.vue');
// prettier-ignore
const ProcessoUpdate = () => import('@/entities/processo/processo-update.vue');
// prettier-ignore
const ProcessoDetails = () => import('@/entities/processo/processo-details.vue');
// prettier-ignore
const Turma = () => import('@/entities/turma/turma.vue');
// prettier-ignore
const TurmaUpdate = () => import('@/entities/turma/turma-update.vue');
// prettier-ignore
const TurmaDetails = () => import('@/entities/turma/turma-details.vue');
// prettier-ignore
const EntregaDiploma = () => import('@/entities/entrega-diploma/entrega-diploma.vue');
// prettier-ignore
const EntregaDiplomaUpdate = () => import('@/entities/entrega-diploma/entrega-diploma-update.vue');
// prettier-ignore
const EntregaDiplomaDetails = () => import('@/entities/entrega-diploma/entrega-diploma-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'processo',
      name: 'Processo',
      component: Processo,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'processo/new',
      name: 'ProcessoCreate',
      component: ProcessoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'processo/:processoId/edit',
      name: 'ProcessoEdit',
      component: ProcessoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'processo/:processoId/view',
      name: 'ProcessoView',
      component: ProcessoDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'turma',
      name: 'Turma',
      component: Turma,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'turma/new',
      name: 'TurmaCreate',
      component: TurmaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'turma/:turmaId/edit',
      name: 'TurmaEdit',
      component: TurmaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'turma/:turmaId/view',
      name: 'TurmaView',
      component: TurmaDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entrega-diploma',
      name: 'EntregaDiploma',
      component: EntregaDiploma,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entrega-diploma/new',
      name: 'EntregaDiplomaCreate',
      component: EntregaDiplomaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entrega-diploma/:entregaDiplomaId/edit',
      name: 'EntregaDiplomaEdit',
      component: EntregaDiplomaUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'entrega-diploma/:entregaDiplomaId/view',
      name: 'EntregaDiplomaView',
      component: EntregaDiplomaDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
