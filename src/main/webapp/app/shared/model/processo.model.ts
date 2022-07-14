import { ITurma } from '@/shared/model/turma.model';
import { IEntregaDiploma } from '@/shared/model/entrega-diploma.model';

import { StatusProcesso } from '@/shared/model/enumerations/status-processo.model';
import { Status } from '@/shared/model/enumerations/status.model';
import { Enviado } from '@/shared/model/enumerations/enviado.model';
export interface IProcesso {
  id?: number;
  statusProcesso?: StatusProcesso | null;
  matricula?: string;
  nome?: string | null;
  data?: Date | null;
  numeroDaDefesa?: string | null;
  statusSigaa?: Status | null;
  numeroSipac?: string | null;
  enviadoBiblioteca?: Enviado | null;
  turma?: ITurma | null;
  entregaDiploma?: IEntregaDiploma | null;
}

export class Processo implements IProcesso {
  constructor(
    public id?: number,
    public statusProcesso?: StatusProcesso | null,
    public matricula?: string,
    public nome?: string | null,
    public data?: Date | null,
    public numeroDaDefesa?: string | null,
    public statusSigaa?: Status | null,
    public numeroSipac?: string | null,
    public enviadoBiblioteca?: Enviado | null,
    public turma?: ITurma | null,
    public entregaDiploma?: IEntregaDiploma | null
  ) {}
}
