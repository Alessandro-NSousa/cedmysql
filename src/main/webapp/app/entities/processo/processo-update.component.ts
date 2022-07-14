import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import TurmaService from '@/entities/turma/turma.service';
import { ITurma } from '@/shared/model/turma.model';

import EntregaDiplomaService from '@/entities/entrega-diploma/entrega-diploma.service';
import { IEntregaDiploma } from '@/shared/model/entrega-diploma.model';

import { IProcesso, Processo } from '@/shared/model/processo.model';
import ProcessoService from './processo.service';
import { StatusProcesso } from '@/shared/model/enumerations/status-processo.model';
import { Status } from '@/shared/model/enumerations/status.model';
import { Enviado } from '@/shared/model/enumerations/enviado.model';

const validations: any = {
  processo: {
    statusProcesso: {},
    matricula: {
      required,
    },
    nome: {},
    data: {},
    numeroDaDefesa: {},
    statusSigaa: {},
    numeroSipac: {},
    enviadoBiblioteca: {},
  },
};

@Component({
  validations,
})
export default class ProcessoUpdate extends Vue {
  @Inject('processoService') private processoService: () => ProcessoService;
  @Inject('alertService') private alertService: () => AlertService;

  public processo: IProcesso = new Processo();

  @Inject('turmaService') private turmaService: () => TurmaService;

  public turmas: ITurma[] = [];

  @Inject('entregaDiplomaService') private entregaDiplomaService: () => EntregaDiplomaService;

  public entregaDiplomas: IEntregaDiploma[] = [];
  public statusProcessoValues: string[] = Object.keys(StatusProcesso);
  public statusValues: string[] = Object.keys(Status);
  public enviadoValues: string[] = Object.keys(Enviado);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.processoId) {
        vm.retrieveProcesso(to.params.processoId);
      }
      vm.initRelationships();
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
    if (this.processo.id) {
      this.processoService()
        .update(this.processo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.processo.updated', { param: param.id });
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
      this.processoService()
        .create(this.processo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('cedmysqlApp.processo.created', { param: param.id });
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

  public retrieveProcesso(processoId): void {
    this.processoService()
      .find(processoId)
      .then(res => {
        this.processo = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.turmaService()
      .retrieve()
      .then(res => {
        this.turmas = res.data;
      });
    this.entregaDiplomaService()
      .retrieve()
      .then(res => {
        this.entregaDiplomas = res.data;
      });
  }
}
