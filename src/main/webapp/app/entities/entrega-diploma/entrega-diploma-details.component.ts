import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IEntregaDiploma } from '@/shared/model/entrega-diploma.model';
import EntregaDiplomaService from './entrega-diploma.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class EntregaDiplomaDetails extends mixins(JhiDataUtils) {
  @Inject('entregaDiplomaService') private entregaDiplomaService: () => EntregaDiplomaService;
  @Inject('alertService') private alertService: () => AlertService;

  public entregaDiploma: IEntregaDiploma = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entregaDiplomaId) {
        vm.retrieveEntregaDiploma(to.params.entregaDiplomaId);
      }
    });
  }

  public retrieveEntregaDiploma(entregaDiplomaId) {
    this.entregaDiplomaService()
      .find(entregaDiplomaId)
      .then(res => {
        this.entregaDiploma = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
