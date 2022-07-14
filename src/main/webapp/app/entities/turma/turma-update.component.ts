import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { ITurma, Turma } from '@/shared/model/turma.model';
import TurmaService from './turma.service';

const validations: any = {
  turma: {
    curso: {},
    sigla: {},
    ano: {},
  },
};

@Component({
  validations,
})
export default class TurmaUpdate extends Vue {
  @Inject('turmaService') private turmaService: () => TurmaService;
  @Inject('alertService') private alertService: () => AlertService;

  public turma: ITurma = new Turma();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.turmaId) {
        vm.retrieveTurma(to.params.turmaId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.turma.id) {
      this.turmaService()
        .update(this.turma)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.turma.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.turmaService()
        .create(this.turma)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.turma.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveTurma(turmaId): void {
    this.turmaService()
      .find(turmaId)
      .then(res => {
        this.turma = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
