import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import AlertService from '@/shared/alert/alert.service';

import { IEntregaDiploma, EntregaDiploma } from '@/shared/model/entrega-diploma.model';
import EntregaDiplomaService from './entrega-diploma.service';

const validations: any = {
  entregaDiploma: {
    dataDeEntrega: {},
    observacoes: {},
  },
};

@Component({
  validations,
})
export default class EntregaDiplomaUpdate extends mixins(JhiDataUtils) {
  @Inject('entregaDiplomaService') private entregaDiplomaService: () => EntregaDiplomaService;
  @Inject('alertService') private alertService: () => AlertService;

  public entregaDiploma: IEntregaDiploma = new EntregaDiploma();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entregaDiplomaId) {
        vm.retrieveEntregaDiploma(to.params.entregaDiplomaId);
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
    if (this.entregaDiploma.id) {
      this.entregaDiplomaService()
        .update(this.entregaDiploma)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.entregaDiploma.updated', { param: param.id });
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
      this.entregaDiplomaService()
        .create(this.entregaDiploma)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.entregaDiploma.created', { param: param.id });
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

  public retrieveEntregaDiploma(entregaDiplomaId): void {
    this.entregaDiplomaService()
      .find(entregaDiplomaId)
      .then(res => {
        this.entregaDiploma = res;
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
