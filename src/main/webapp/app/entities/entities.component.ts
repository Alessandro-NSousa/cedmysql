import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import ProcessoService from './processo/processo.service';
import TurmaService from './turma/turma.service';
import EntregaDiplomaService from './entrega-diploma/entrega-diploma.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('processoService') private processoService = () => new ProcessoService();
  @Provide('turmaService') private turmaService = () => new TurmaService();
  @Provide('entregaDiplomaService') private entregaDiplomaService = () => new EntregaDiplomaService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
