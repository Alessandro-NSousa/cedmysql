import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITurma } from '@/shared/model/turma.model';

import TurmaService from './turma.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Turma extends Vue {
  @Inject('turmaService') private turmaService: () => TurmaService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public turmas: ITurma[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTurmas();
  }

  public clear(): void {
    this.retrieveAllTurmas();
  }

  public retrieveAllTurmas(): void {
    this.isFetching = true;
    this.turmaService()
      .retrieve()
      .then(
        res => {
          this.turmas = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ITurma): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTurma(): void {
    this.turmaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cedmysqlApp.turma.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTurmas();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
