import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITurma } from '@/shared/model/turma.model';
import TurmaService from './turma.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TurmaDetails extends Vue {
  @Inject('turmaService') private turmaService: () => TurmaService;
  @Inject('alertService') private alertService: () => AlertService;

  public turma: ITurma = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.turmaId) {
        vm.retrieveTurma(to.params.turmaId);
      }
    });
  }

  public retrieveTurma(turmaId) {
    this.turmaService()
      .find(turmaId)
      .then(res => {
        this.turma = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
