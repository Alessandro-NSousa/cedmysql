import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEntregaDiploma } from '@/shared/model/entrega-diploma.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import EntregaDiplomaService from './entrega-diploma.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class EntregaDiploma extends mixins(JhiDataUtils) {
  @Inject('entregaDiplomaService') private entregaDiplomaService: () => EntregaDiplomaService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public entregaDiplomas: IEntregaDiploma[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEntregaDiplomas();
  }

  public clear(): void {
    this.retrieveAllEntregaDiplomas();
  }

  public retrieveAllEntregaDiplomas(): void {
    this.isFetching = true;
    this.entregaDiplomaService()
      .retrieve()
      .then(
        res => {
          this.entregaDiplomas = res.data;
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

  public prepareRemove(instance: IEntregaDiploma): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEntregaDiploma(): void {
    this.entregaDiplomaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('cedmysqlApp.entregaDiploma.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllEntregaDiplomas();
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
